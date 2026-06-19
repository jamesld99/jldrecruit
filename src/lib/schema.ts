import { faqs, siteConfig } from "./constants";
import type { JobListing } from "./jobs";

type ParsedSalary =
  | { kind: "range"; minValue: number; maxValue: number }
  | { kind: "single"; value: number };

export function parseSalaryRange(salary: string): ParsedSalary | null {
  const cleaned = salary
    .replace(/plus overtime/gi, "")
    .replace(/\+/g, "")
    .trim();

  const matches = cleaned.match(/\d[\d,]*/g);
  if (!matches || matches.length === 0) {
    return null;
  }

  const values = matches
    .map((match) => Number.parseInt(match.replace(/,/g, ""), 10))
    .filter((value) => Number.isFinite(value) && value > 0);

  if (values.length === 0) {
    return null;
  }

  if (values.length === 1) {
    return { kind: "single", value: values[0] };
  }

  const minValue = Math.min(values[0], values[1]);
  const maxValue = Math.max(values[0], values[1]);

  return { kind: "range", minValue, maxValue };
}

function buildBaseSalarySchema(salary: string) {
  const parsed = parseSalaryRange(salary);
  if (!parsed) {
    return undefined;
  }

  if (parsed.kind === "single") {
    return {
      "@type": "MonetaryAmount",
      currency: "GBP",
      value: {
        "@type": "QuantitativeValue",
        value: parsed.value,
        unitText: "YEAR",
      },
    };
  }

  return {
    "@type": "MonetaryAmount",
    currency: "GBP",
    value: {
      "@type": "QuantitativeValue",
      minValue: parsed.minValue,
      maxValue: parsed.maxValue,
      unitText: "YEAR",
    },
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

export function getJobPostingSchema(job: JobListing) {
  const validThrough = new Date(job.postedDate);
  validThrough.setDate(validThrough.getDate() + 90);
  const baseSalary = buildBaseSalarySchema(job.salary);

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: [job.summary, ...job.overview].join(" "),
    datePosted: job.postedDate,
    validThrough: validThrough.toISOString().slice(0, 10),
    employmentType: "FULL_TIME",
    directApply: true,
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.legalName,
      sameAs: siteConfig.url,
      logo: `${siteConfig.url}${siteConfig.logo}`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressRegion: job.region,
        addressCountry: "GB",
      },
    },
    ...(baseSalary ? { baseSalary } : {}),
    applicantLocationRequirements: {
      "@type": "Country",
      name: "United Kingdom",
    },
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
    itemListElement: jobList.map((job, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/jobs/${job.slug}`,
      name: `${job.title} — ${job.location}`,
    })),
  };
}
