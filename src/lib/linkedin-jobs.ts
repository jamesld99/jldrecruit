import { siteConfig } from "@/lib/constants";
import { getSupplementalActivityIds } from "@/lib/job-enrichments";

export type LinkedInJobPost = {
  activityId: string;
  linkedInUrl: string;
  linkedInSlug: string;
  title: string;
  location: string;
  region: string;
  salary: string;
  sector: string;
  type: "Permanent";
  summary: string;
  overview: string[];
  requirements: string[];
  benefits: string[];
  workingHours: string;
  postedDate: string;
  headline: string;
  rawText: string;
};

type DiscussionForumPosting = {
  "@type": string;
  datePublished?: string;
  mainEntityOfPage?: string;
  text?: string;
  url?: string;
};

const LINKEDIN_COMPANY_URL =
  process.env.LINKEDIN_COMPANY_URL ?? siteConfig.linkedIn;

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36";

const UK_REGIONS: Record<string, string> = {
  barnstaple: "Devon",
  torquay: "Devon",
  exeter: "Devon",
  plymouth: "Devon",
  bournemouth: "Dorset",
  macclesfield: "Cheshire",
  colchester: "Essex",
  braintree: "Essex",
  london: "London",
  truro: "Cornwall",
  "st austell": "Cornwall",
  liskeard: "Cornwall",
};

const LINKEDIN_SLUG_HINTS: Record<
  string,
  { title?: string; location?: string; region?: string }
> = {
  "intruder-alarm-engineer-yorkshire-lancashire": {
    title: "Intruder Alarm Engineer",
    location: "Yorkshire / Lancashire / Greater Manchester",
    region: "Multiple locations",
  },
  "intruder-alarm-engineer-south-east-area": {
    title: "Intruder Alarm Engineer",
    location: "South East",
    region: "South East",
  },
  "industrial-door-engineer-colchester-42120": {
    title: "Industrial Door Engineer",
    location: "Colchester",
    region: "Essex",
  },
  "industrial-door-engineer-colchester": {
    title: "Industrial Door Engineer",
    location: "Colchester",
    region: "Essex",
  },
  "lift-service-engineer-london-45000-to": {
    title: "Lift Service Engineer",
    location: "London",
    region: "London",
  },
  "mobile-vehicle-technician-40000-to-45000": {
    title: "Mobile Vehicle Technician",
    location: "Braintree",
    region: "Essex",
  },
};

function normalizeLinkedInCompanyUrl(url: string) {
  return url.replace("www.linkedin.com", "uk.linkedin.com").split("?")[0];
}

function extractActivityId(url: string) {
  const match = url.match(/activity-(\d+)/);
  return match?.[1] ?? "";
}

function extractLinkedInSlug(url: string) {
  const match = url.match(/jld-recruit-ltd_(.+)-activity-/i);
  return match?.[1]?.toLowerCase() ?? "";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function detectSector(title: string) {
  const value = title.toLowerCase();

  if (
    /fire|security|intruder|alarm|cctv|access control/.test(value)
  ) {
    return "Fire & Security";
  }
  if (/lift/.test(value)) {
    return "Lift Engineering";
  }
  if (/door|gate|shutter/.test(value)) {
    return "Gate & Door";
  }
  if (/refrigeration|hvac|air conditioning/.test(value)) {
    return "Refrigeration";
  }
  if (/vehicle|mot|automotive|hgv|mechanic|technician/.test(value)) {
    return "Automotive";
  }

  return "Engineering";
}

function normalizeSalary(value: string) {
  return value
    .replace(/\s*-\s*/g, " – ")
    .replace(/to/gi, " – ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSalary(headline: string) {
  const match = headline.match(
    /£[\d,]+(?:\s*(?:to|–|-)\s*£?[\d,]+)?(?:\+)?(?:\s+Plus\s+[A-Za-z]+)?/i
  );

  return match ? normalizeSalary(match[0]) : "Competitive salary";
}

function inferRegion(location: string) {
  const normalized = location.toLowerCase();

  for (const [place, region] of Object.entries(UK_REGIONS)) {
    if (normalized.includes(place)) {
      return region;
    }
  }

  if (normalized.includes("yorkshire")) return "Yorkshire";
  if (normalized.includes("lancashire")) return "Lancashire";
  if (normalized.includes("manchester")) return "Greater Manchester";
  if (normalized.includes("south east")) return "South East";
  if (normalized.includes("essex")) return "Essex";

  return "United Kingdom";
}

function inferLocation(headline: string, linkedInSlug: string, salary: string) {
  const slugParts = linkedInSlug
    .replace(/-\d+$/, "")
    .split("-")
    .filter(Boolean);

  const locationCandidates = [
    "south east area",
    "greater manchester",
    "yorkshire lancashire greater manchester",
    "braintree essex",
    "barnstaple devon",
    "torquay devon",
    "bournemouth",
    "macclesfield",
    "colchester",
    "london",
  ];

  for (const candidate of locationCandidates) {
    if (headline.toLowerCase().includes(candidate)) {
      return candidate
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
        .replace("Devon", "Devon")
        .replace("Essex", "Essex");
    }
  }

  const withoutSalary = headline.replace(salary, "").trim();
  const parts = withoutSalary.split(/\s+/);
  const lastWords = parts.slice(-3).join(" ");

  if (/[A-Za-z]/.test(lastWords) && lastWords.length > 3) {
    return lastWords.replace(/\b(devon|essex|uk)\b/i, (match) =>
      match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()
    );
  }

  const slugLocation = slugParts.slice(-2).join(" ");
  return slugLocation
    ? slugLocation.replace(/\b\w/g, (char) => char.toUpperCase())
    : "United Kingdom";
}

function inferTitle(headline: string, salary: string, location: string) {
  let title = headline.replace(salary, "").trim();

  if (location && title.toLowerCase().endsWith(location.toLowerCase())) {
    title = title.slice(0, -location.length).trim();
  }

  title = title.replace(/^[\p{Extended_Pictographic}\s]+/u, "").trim();

  return title || "Recruitment Opportunity";
}

function isPitchCopy(line: string) {
  return /(?:i'm currently working with|i am currently working with|we are currently working with|well established|family run|family-run|if you(?:'|’)re interested|get in touch|please contact|dm me|drop me a message|looking for an experienced|this is a great opportunity|exciting opportunity|don't miss|don’t miss|📩|👉|🔥|✅)/i.test(
    line
  );
}

function extractRequirements(text: string) {
  const bulletItems = text
    .split("\n")
    .map((line) => line.replace(/^[\s•✅\-–]+/, "").trim())
    .filter(
      (line) =>
        line.length > 20 &&
        !isPitchCopy(line) &&
        /(?:experience|licence|license|required|must|essential|beneficial|qualification|certification|ability|knowledge|competent|hold a|holding a|nvq|ecs|cscs|f-gas|17th|18th)/i.test(
          line
        )
    );

  if (bulletItems.length > 0) {
    return bulletItems.slice(0, 6);
  }

  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(
      (sentence) =>
        sentence.length > 30 &&
        !isPitchCopy(sentence) &&
        !sentence.includes("Benefits include") &&
        /(?:experience|licence|license|required|must|essential|beneficial|qualification|certification|knowledge|competent|hold a|holding a)/i.test(
          sentence
        )
    )
    .slice(0, 6);
}

function splitBulletSection(text: string, label: string) {
  const pattern = new RegExp(`${label}:?\\s*([\\s\\S]*?)(?=\\n\\n|$)`, "i");
  const match = text.match(pattern);
  if (!match) return [] as string[];

  return match[1]
    .split("\n")
    .map((line) => line.replace(/^[\s•✅\-–]+/, "").trim())
    .filter(Boolean);
}

function buildOverview(text: string, summary: string) {
  const paragraphs = text
    .split("\n\n")
    .map((part) => part.replace(/\n/g, " ").trim())
    .filter(
      (part) =>
        part.length > 40 &&
        !part.startsWith("Benefits include") &&
        !part.startsWith("If you're") &&
        !part.startsWith("If you’re") &&
        !part.startsWith("📩")
    );

  if (paragraphs.length > 0) {
    return paragraphs.slice(0, 4);
  }

  return [summary];
}

function inferWorkingHours(text: string) {
  if (/monday to friday with no weekend/i.test(text)) {
    return "Monday to Friday — no weekend work";
  }
  if (/saturdays on a rota/i.test(text)) {
    return "Monday to Friday with Saturdays on a rota basis";
  }
  if (/monday to friday,? 7:00am to 4:00pm/i.test(text)) {
    return "Monday to Friday, 7:00am to 4:00pm";
  }
  if (/40 hour working week/i.test(text)) {
    return "40-hour working week with flexible start and finish times";
  }
  if (/on call rota/i.test(text)) {
    return "Monday to Friday with on-call rota participation";
  }

  return "Monday to Friday (full details confirmed with employer)";
}

function parseLinkedInPost(post: DiscussionForumPosting): LinkedInJobPost | null {
  const linkedInUrl = post.mainEntityOfPage ?? post.url ?? "";
  const rawText = post.text?.trim() ?? "";
  const activityId = extractActivityId(linkedInUrl);

  if (!activityId || !rawText) {
    return null;
  }

  const linkedInSlug = extractLinkedInSlug(linkedInUrl);
  const slugHints = LINKEDIN_SLUG_HINTS[linkedInSlug];
  const headline = rawText.split("\n")[0]?.trim() ?? "";
  const salary = extractSalary(headline);
  const location = slugHints?.location ?? inferLocation(headline, linkedInSlug, salary);
  const title = slugHints?.title ?? inferTitle(headline, salary, location);
  const sector = detectSector(title);
  const overview = buildOverview(rawText, headline);
  const requirements = extractRequirements(rawText);
  const benefits = splitBulletSection(rawText, "Benefits include");
  const summary = overview[0] ?? headline;
  const postedDate = post.datePublished
    ? post.datePublished.slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  return {
    activityId,
    linkedInUrl,
    linkedInSlug,
    title,
    location,
    region: slugHints?.region ?? inferRegion(location),
    salary,
    sector,
    type: "Permanent",
    summary,
    overview,
    requirements,
    benefits,
    workingHours: inferWorkingHours(rawText),
    postedDate,
    headline,
    rawText,
  };
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function isJobVacancyText(text: string) {
  const headline = text.split("\n")[0] ?? "";

  return (
    /£[\d,]/.test(headline) ||
    /^[\p{Extended_Pictographic}]/u.test(headline.trim())
  );
}

async function fetchLinkedInHtml(url: string) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "en-GB,en;q=0.9",
    },
    next: { revalidate: 300, tags: ["jobs", "linkedin-jobs"] },
  });

  if (!response.ok) {
    throw new Error(`LinkedIn request failed (${response.status}) for ${url}`);
  }

  return response.text();
}

function getCompanyPageUrls(companyUrl: string) {
  const normalized = normalizeLinkedInCompanyUrl(companyUrl).replace(/\/$/, "");

  return [...new Set([normalized, `${normalized}/jobs`])];
}

function extractActivityIdsFromHtml(html: string) {
  return [
    ...new Set([...html.matchAll(/activity-(\d{10,})/g)].map((match) => match[1])),
  ];
}

function extractPostTextFromEmbedHtml(html: string) {
  const decoded = decodeHtmlEntities(html);
  const headlineMatch = decoded.match(/[🔒🚪🛗🔧🔥][^\n<]{10,220}/);

  if (!headlineMatch) {
    return null;
  }

  const parts = [headlineMatch[0].trim()];
  const seen = new Set(parts);

  for (const match of decoded.matchAll(/>([^<>]{35,500})</g)) {
    const sentence = match[1].replace(/\s+/g, " ").trim();

    if (
      sentence.length < 35 ||
      seen.has(sentence) ||
      /sign in|cookie|linkedin/i.test(sentence)
    ) {
      continue;
    }

    if (
      /^(I['’]m|They['’]re|Salary|Benefits|If you|The role|An MOT|Monday|Candidates|Experience)/i.test(
        sentence
      ) ||
      sentence.includes("£")
    ) {
      parts.push(sentence);
      seen.add(sentence);
    }
  }

  return parts.join("\n\n");
}

async function fetchPostFromEmbed(activityId: string): Promise<DiscussionForumPosting | null> {
  try {
    const html = await fetchLinkedInHtml(
      `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityId}`
    );
    const text = extractPostTextFromEmbedHtml(html);

    if (!text || !isJobVacancyText(text)) {
      return null;
    }

    return {
      "@type": "DiscussionForumPosting",
      datePublished: new Date().toISOString(),
      mainEntityOfPage: `https://www.linkedin.com/posts/jld-recruit-ltd_job-activity-${activityId}`,
      text,
      url: `https://www.linkedin.com/posts/jld-recruit-ltd_job-activity-${activityId}`,
    };
  } catch {
    return null;
  }
}

function extractJsonLdPosts(html: string) {
  const match = html.match(
    /<script type="application\/ld\+json">\s*(\{[\s\S]*?\})\s*<\/script>/
  );

  if (!match) {
    return [] as DiscussionForumPosting[];
  }

  const data = JSON.parse(match[1]) as {
    "@graph"?: DiscussionForumPosting[];
  };

  return (data["@graph"] ?? []).filter(
    (entry) => entry["@type"] === "DiscussionForumPosting" && entry.text
  );
}

export async function fetchLinkedInJobPosts(): Promise<LinkedInJobPost[]> {
  const companyUrl = normalizeLinkedInCompanyUrl(LINKEDIN_COMPANY_URL);
  const postsByActivityId = new Map<string, DiscussionForumPosting>();
  const pageUrls = getCompanyPageUrls(companyUrl);

  for (const pageUrl of pageUrls) {
    try {
      const html = await fetchLinkedInHtml(pageUrl);

      for (const post of extractJsonLdPosts(html)) {
        const activityId = extractActivityId(post.mainEntityOfPage ?? post.url ?? "");

        if (activityId && post.text && isJobVacancyText(post.text)) {
          postsByActivityId.set(activityId, post);
        }
      }

      for (const activityId of extractActivityIdsFromHtml(html)) {
        if (postsByActivityId.has(activityId)) {
          continue;
        }

        const embedPost = await fetchPostFromEmbed(activityId);

        if (embedPost) {
          postsByActivityId.set(activityId, embedPost);
        }
      }
    } catch (error) {
      console.error(`LinkedIn sync failed for ${pageUrl}:`, error);
    }
  }

  for (const activityId of getSupplementalActivityIds()) {
    if (postsByActivityId.has(activityId)) {
      continue;
    }

    const embedPost = await fetchPostFromEmbed(activityId);

    if (embedPost) {
      postsByActivityId.set(activityId, embedPost);
    }
  }

  return [...postsByActivityId.values()]
    .map(parseLinkedInPost)
    .filter((post): post is LinkedInJobPost => post !== null)
    .sort(
      (a, b) =>
        new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    );
}

export function buildJobSlug(post: LinkedInJobPost, preferredSlug?: string) {
  if (preferredSlug) {
    return preferredSlug;
  }

  const base = post.linkedInSlug
    ? post.linkedInSlug.replace(/-\d+(?:-to|-plus-overtime)?$/, "")
    : slugify(`${post.title}-${post.location}`);

  return base || slugify(post.title);
}
