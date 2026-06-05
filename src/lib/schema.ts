import { faqs, siteConfig } from "./constants";
import type { JobListing } from "./jobs";

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
    ],
    areaServed: {
      "@type": "Country",
      name: siteConfig.areaServed,
    },
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
    areaServed: {
      "@type": "Country",
      name: siteConfig.areaServed,
    },
    serviceType: [
      "Permanent recruitment",
      "Temporary recruitment",
      "Contract recruitment",
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
      "Temporary staffing solutions",
      "Candidate sourcing",
    ],
    sameAs: [
      siteConfig.companiesHouseUrl,
      siteConfig.linkedIn,
      siteConfig.facebook,
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
    areaServed: {
      "@type": "Country",
      name: siteConfig.areaServed,
    },
    sameAs: [
      siteConfig.companiesHouseUrl,
      siteConfig.linkedIn,
      siteConfig.facebook,
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
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: [job.summary, ...job.overview].join(" "),
    datePosted: job.postedDate,
    employmentType: job.type === "Permanent" ? "FULL_TIME" : "TEMPORARY",
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
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "GBP",
      value: {
        "@type": "QuantitativeValue",
        value: job.salary,
        unitText: "YEAR",
      },
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "United Kingdom",
    },
    url: `${siteConfig.url}/jobs/${job.slug}`,
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
