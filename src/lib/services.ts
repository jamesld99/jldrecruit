export const recruitmentSolutions = [
  {
    slug: "permanent-recruitment",
    href: "/services/permanent-recruitment",
    title: "Permanent Recruitment",
    description:
      "Helping businesses secure skilled, long-term employees through targeted sourcing, headhunting and candidate screening.",
    icon: "permanent",
    featured: true,
  },
  {
    slug: "fixed-fee-recruitment",
    href: "/services/permanent-recruitment",
    title: "Fixed-Fee Recruitment",
    description:
      "Transparent, agreed upfront fees for permanent hires — clear pricing without corporate markups.",
    icon: "fixedFee",
    featured: false,
  },
  {
    slug: "exclusive-recruitment",
    href: "/services/permanent-recruitment",
    title: "Exclusive Recruitment Campaigns",
    description:
      "Dedicated focus on your vacancy with proactive sourcing and headhunting for hard-to-fill roles.",
    icon: "exclusive",
    featured: false,
  },
  {
    slug: "retained-recruitment",
    href: "/services/permanent-recruitment",
    title: "Retained Recruitment",
    description:
      "Structured retained search for senior, specialist and business-critical permanent hires.",
    icon: "retained",
    featured: false,
  },
  {
    slug: "engineering-recruitment",
    href: "/sectors",
    title: "Engineering Recruitment",
    description:
      "Permanent recruitment for lift, fire & security, gate & door, refrigeration and technical engineering roles UK-wide.",
    icon: "engineering",
    featured: false,
  },
  {
    slug: "automotive-recruitment",
    href: "/recruitment/automotive-recruitment",
    title: "Automotive Recruitment",
    description:
      "Permanent vehicle technician, MOT tester, diagnostic and HGV recruitment for garages, dealerships and fleet operators.",
    icon: "automotive",
    featured: false,
  },
  {
    slug: "fire-security-recruitment",
    href: "/recruitment/fire-security-recruitment",
    title: "Fire & Security Recruitment",
    description:
      "Permanent fire alarm, CCTV, access control and security engineer recruitment for installation and service businesses.",
    icon: "fireSecurity",
    featured: false,
  },
  {
    slug: "lift-recruitment",
    href: "/recruitment/lift-engineer-recruitment",
    title: "Lift Engineering Recruitment",
    description:
      "Permanent lift service, repair, installation and modernisation engineer recruitment across the UK.",
    icon: "lift",
    featured: false,
  },
];

export const permanentRoles = [
  "Vehicle Technicians",
  "MOT Testers",
  "Diagnostic Technicians",
  "Master Technicians",
  "HGV Technicians",
  "Fire & Security Engineers",
  "Lift Engineers",
  "Gate & Door Engineers",
  "Refrigeration & HVAC Engineers",
  "Field Service Engineers",
  "Maintenance Engineers",
  "Skilled Permanent Hires",
];

export type ServicePageContent = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  overview: string[];
  benefits: { title: string; description: string }[];
  rolesTitle: string;
  roles: string[];
  faqs: { question: string; answer: string }[];
  ctaTitle: string;
  ctaDescription: string;
  primaryCta: string;
  secondaryCta: string;
};

export const servicePages: Record<string, ServicePageContent> = {
  "permanent-recruitment": {
    slug: "permanent-recruitment",
    title: "Permanent Recruitment",
    metaTitle: "Permanent Recruitment Agency UK",
    metaDescription:
      "JLD Recruit Ltd is a permanent recruitment agency for lift engineering, fire & security, automotive and technical roles UK-wide. Fixed-fee, exclusive and retained recruitment with direct access to James.",
    keywords: [
      "permanent recruitment agency",
      "fixed fee recruitment",
      "exclusive recruitment",
      "retained recruitment",
      "engineering recruitment agency",
      "automotive recruitment agency",
      "lift engineer recruitment",
      "fire and security recruitment",
    ],
    heroEyebrow: "Permanent Recruitment",
    heroTitle: "Permanent recruitment for skilled engineering and automotive roles",
    heroDescription:
      "JLD Recruit Ltd is a permanent recruitment agency helping UK businesses secure skilled, long-term employees through targeted sourcing, headhunting and thorough candidate screening.",
    overview: [
      "Finding the right permanent hire is one of the most important decisions a business can make. A poor hire costs time, money and momentum. We take the time to understand your business, your team and the role you need to fill.",
      "As a specialist engineering and automotive recruitment agency, we use proactive sourcing methods — including headhunting, LinkedIn outreach and targeted campaigns — to reach candidates who are not always visible on job boards.",
      "We offer fixed-fee recruitment, exclusive recruitment campaigns and retained search for the right vacancy — giving you clear pricing, dedicated focus and a recruiter who takes ownership of the process.",
      "You deal directly with James throughout. No account managers, no hand-offs — just honest communication and a focus on long-term workforce growth.",
    ],
    benefits: [
      {
        title: "Skilled permanent hires",
        description:
          "We focus on finding candidates who are the right long-term fit for your business culture and requirements.",
      },
      {
        title: "Fixed-fee recruitment",
        description:
          "Transparent fees agreed upfront — no corporate markups or hidden costs.",
      },
      {
        title: "Exclusive & retained campaigns",
        description:
          "Dedicated recruitment focus for hard-to-fill and business-critical permanent roles.",
      },
      {
        title: "Proactive headhunting",
        description:
          "We actively approach skilled candidates rather than waiting for applications.",
      },
    ],
    rolesTitle: "Permanent roles we recruit for",
    roles: [
      "Lift Engineers",
      "Fire & Security Engineers",
      "Gate & Door Engineers",
      "Refrigeration & HVAC Engineers",
      "Vehicle Technicians & MOT Testers",
      "HGV Technicians",
      "Field Service Engineers",
      "Maintenance Engineers",
      "Engineering Professionals",
    ],
    faqs: [
      {
        question: "What is permanent recruitment?",
        answer:
          "Permanent recruitment is the process of finding and placing skilled candidates into long-term, employed roles within your business. JLD Recruit Ltd specialises in permanent recruitment for lift engineering, fire & security, automotive and technical positions across the UK.",
      },
      {
        question: "Do you offer fixed-fee recruitment?",
        answer:
          "Yes. We offer transparent fixed-fee recruitment where fees are agreed upfront based on the role, sector and service level — without corporate markups.",
      },
      {
        question: "Do you offer exclusive or retained recruitment?",
        answer:
          "Yes. Exclusive recruitment campaigns and retained search can be arranged for the right vacancy, giving you dedicated focus and proactive headhunting for hard-to-fill roles.",
      },
      {
        question: "What sectors do you recruit permanently for?",
        answer:
          "We recruit permanently across lift engineering, fire & security, gate & door, refrigeration & HVAC, automotive & HGV, field service and general engineering sectors throughout the UK.",
      },
    ],
    ctaTitle: "Ready to make your next permanent hire?",
    ctaDescription:
      "Speak directly with James about your vacancy. We will discuss your requirements and explain how we can help you find the right long-term candidate.",
    primaryCta: "Submit Vacancy",
    secondaryCta: "Speak to James",
  },
};

export const flexibleRecruitmentContent = {
  eyebrow: "Recruitment Solutions",
  title: "Permanent Recruitment Solutions for Growing Businesses",
  paragraphs: [
    "JLD Recruit Ltd is a permanent recruitment agency helping businesses build long-term teams through targeted sourcing, headhunting and skilled permanent hires.",
    "We work closely with employers to understand their requirements and identify candidates who will add long-term value — supporting workforce growth across lift engineering, fire & security, automotive and technical sectors UK-wide.",
  ],
  primaryCta: "Submit Vacancy",
  secondaryCta: "Speak to James",
};
