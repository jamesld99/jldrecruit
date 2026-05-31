import { faqs, siteConfig } from "./constants";

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
    sameAs: [siteConfig.linkedIn, siteConfig.facebook],
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
      "Construction staffing",
      "Healthcare staffing",
      "Automotive recruitment",
      "Engineering recruitment",
      "Technical recruitment",
      "Headhunting",
      "Temporary staffing solutions",
      "Candidate sourcing",
    ],
    sameAs: [siteConfig.linkedIn, siteConfig.facebook],
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
    sameAs: [siteConfig.linkedIn, siteConfig.facebook],
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
