import { faqs, siteConfig } from "./constants";
import { jobAdvertIsComplete, type JobListing } from "./jobs";
import { closingDateHasPassed } from "./vacancies";

type ParsedSalary =
  | { kind: "range"; minValue: number; maxValue: number }
  | { kind: "single"; value: number }
  | { kind: "min"; value: number }
  | { kind: "max"; value: number };

export function parseSalaryRange(salary: string): ParsedSalary | null {
  const cleaned = salary.replace(/plus overtime/gi, "").replace(/\+/g, "").trim();

  if (/\b(approximately|approx\.?|depending on experience)\b/i.test(cleaned)) {
    return null;
  }

  const matches = cleaned.match(/\d[\d,]*(?:\.\d+)?/g);
  if (!matches || matches.length === 0) {
    return null;
  }

  const values = matches
    .map((match) => Number.parseFloat(match.replace(/,/g, "")))
    .filter((value) => Number.isFinite(value) && value > 0);

  if (values.length === 0 || values.length > 2) {
    return null;
  }

  if (values.length === 1) {
    if (/\bup to\b/i.test(cleaned)) return { kind: "max", value: values[0] };
    if (/\bfrom\b/i.test(cleaned)) return { kind: "min", value: values[0] };
    return { kind: "single", value: values[0] };
  }

  return {
    kind: "range",
    minValue: Math.min(values[0], values[1]),
    maxValue: Math.max(values[0], values[1]),
  };
}

function buildBaseSalarySchema(
  salary: string,
  unitText: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR"
) {
  const parsed = parseSalaryRange(salary);
  if (!parsed) {
    return undefined;
  }

  const value =
    parsed.kind === "single"
      ? { "@type": "QuantitativeValue", value: parsed.value, unitText }
      : parsed.kind === "min"
        ? { "@type": "QuantitativeValue", minValue: parsed.value, unitText }
        : parsed.kind === "max"
          ? { "@type": "QuantitativeValue", maxValue: parsed.value, unitText }
          : {
              "@type": "QuantitativeValue",
              minValue: parsed.minValue,
              maxValue: parsed.maxValue,
              unitText,
            };

  return {
    "@type": "MonetaryAmount",
    currency: "GBP",
    value,
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: `+44${siteConfig.phone.replace(/^0/, "")}`,
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
    },
    identifier: {
      "@type": "PropertyValue",
      propertyID: "UK Companies House",
      value: siteConfig.companiesHouseNumber,
    },
    sameAs: [
      siteConfig.companiesHouseUrl,
      siteConfig.linkedIn,
      siteConfig.facebook,
      siteConfig.instagram,
      ...(siteConfig.googleReviewsUrl ? [siteConfig.googleReviewsUrl] : []),
    ],
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "AdministrativeArea", name: "England" },
      { "@type": "AdministrativeArea", name: "Scotland" },
      { "@type": "AdministrativeArea", name: "Wales" },
      { "@type": "AdministrativeArea", name: "Northern Ireland" },
    ],
  };
}

export function getProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    telephone: `+44${siteConfig.phone.replace(/^0/, "")}`,
    email: siteConfig.email,
    priceRange: "$$",
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "AdministrativeArea", name: "England" },
      { "@type": "AdministrativeArea", name: "Scotland" },
      { "@type": "AdministrativeArea", name: "Wales" },
      { "@type": "AdministrativeArea", name: "Northern Ireland" },
    ],
    serviceType: [
      "Permanent recruitment",
      "Fixed-fee recruitment",
      "Exclusive recruitment",
      "Retained recruitment",
      "Lift engineer recruitment",
      "Lift recruitment agency",
      "Fire and security recruitment",
      "Gate engineer recruitment",
      "Automatic door engineer recruitment",
      "Industrial door engineer recruitment",
      "Refrigeration engineer recruitment",
      "HVAC recruitment",
      "Automotive recruitment",
      "Vehicle technician recruitment",
      "HGV technician recruitment",
      "UK-wide engineering recruitment",
      "Headhunting",
      "Candidate sourcing",
    ],
    sameAs: [
      siteConfig.companiesHouseUrl,
      siteConfig.linkedIn,
      siteConfig.facebook,
      siteConfig.instagram,
      ...(siteConfig.googleReviewsUrl ? [siteConfig.googleReviewsUrl] : []),
    ],
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    telephone: `+44${siteConfig.phone.replace(/^0/, "")}`,
    email: siteConfig.email,
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "AdministrativeArea", name: "England" },
      { "@type": "AdministrativeArea", name: "Scotland" },
      { "@type": "AdministrativeArea", name: "Wales" },
      { "@type": "AdministrativeArea", name: "Northern Ireland" },
    ],
    sameAs: [
      siteConfig.companiesHouseUrl,
      siteConfig.linkedIn,
      siteConfig.facebook,
      siteConfig.instagram,
      ...(siteConfig.googleReviewsUrl ? [siteConfig.googleReviewsUrl] : []),
    ],
  };
}

export function getFaqSchema(items = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function getWebPageSchema(
  title: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${siteConfig.url}${url}`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    about: {
      "@type": "ProfessionalService",
      name: siteConfig.legalName,
    },
  };
}

const SALARY_UNIT = {
  hour: "HOUR",
  day: "DAY",
  week: "WEEK",
  month: "MONTH",
  year: "YEAR",
} as const;

function jobPostingDescription(job: JobListing) {
  const sections = [
    job.summary,
    ...job.overview,
    job.workingHours ? `Working hours: ${job.workingHours}` : "",
    job.responsibilities.length
      ? `Responsibilities:\n${job.responsibilities.map((item) => `- ${item}`).join("\n")}`
      : "",
    job.requirements.length
      ? `Requirements:\n${job.requirements.map((item) => `- ${item}`).join("\n")}`
      : "",
    job.benefits.length
      ? `Benefits:\n${job.benefits.map((item) => `- ${item}`).join("\n")}`
      : "",
  ];

  return sections
    .map((section) => section.trim())
    .filter(Boolean)
    .join("\n\n");
}

function verifiedEmploymentType(job: JobListing) {
  const text = `${job.type} ${job.workingHours}`;
  if (/\bfull[-\s]?time\b/i.test(text)) return "FULL_TIME";
  if (/\bpart[-\s]?time\b/i.test(text)) return "PART_TIME";
  return undefined;
}

function hiringOrganization(job: JobListing) {
  if (job.employerConfidential) {
    return {
      "@type": "Organization",
      name: "confidential",
    };
  }

  return {
    "@type": "Organization",
    name: siteConfig.legalName,
    sameAs: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
  };
}

export function getJobPostingSchema(job: JobListing) {
  if (
    job.status !== "open" ||
    !job.postedDate ||
    !jobAdvertIsComplete(job) ||
    closingDateHasPassed(job.closingDate)
  ) {
    return null;
  }

  const salaryUnit = job.payFrequency ? SALARY_UNIT[job.payFrequency] : undefined;
  const baseSalary =
    job.salary && salaryUnit ? buildBaseSalarySchema(job.salary, salaryUnit) : undefined;
  const employmentType = verifiedEmploymentType(job);

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: jobPostingDescription(job),
    datePosted: job.postedDate,
    ...(job.closingDate ? { validThrough: job.closingDate } : {}),
    ...(employmentType ? { employmentType } : {}),
    directApply: true,
    hiringOrganization: hiringOrganization(job),
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        ...(job.region ? { addressRegion: job.region } : {}),
        addressCountry: "GB",
      },
    },
    ...(baseSalary ? { baseSalary } : {}),
    url: `${siteConfig.url}/jobs/${job.slug}`,
  };
}

export function getGoogleReviewsSchema(data: {
  rating: number;
  totalReviews: number;
  reviews: {
    authorName: string;
    rating: number;
    text: string;
    publishedAt: string;
  }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.legalName,
    url: siteConfig.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: data.rating,
      reviewCount: data.totalReviews,
      bestRating: 5,
      worstRating: 1,
    },
    review: data.reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.authorName,
      },
      datePublished: review.publishedAt,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.text,
    })),
  };
}

export function getJobListSchema(jobList: JobListing[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Current Jobs at JLD Recruit Ltd",
    itemListElement: jobList.filter(jobAdvertIsComplete).map((job, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/jobs/${job.slug}`,
      name: `${job.title} — ${job.location}`,
    })),
  };
}
