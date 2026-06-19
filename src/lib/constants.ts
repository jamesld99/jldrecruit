export const siteConfig = {
  name: "JLD Recruit Ltd",
  legalName: "JLD Recruit Ltd",
  tagline:
    "Specialist Recruitment for Lift Engineering, Fire & Security, Gate & Door, Refrigeration, Automotive & HGV Businesses",
  heroHeadline:
    "Specialist Recruitment for Lift Engineering, Fire & Security, Gate & Door, Refrigeration, Automotive & HGV Businesses",
  heroSubheadline:
    "UK-wide recruitment for lift engineers, fire & security engineers, gate & door engineers, refrigeration engineers, vehicle technicians and HGV mechanics. We support employers across England, Scotland, Wales and Northern Ireland.",
  description:
    "JLD Recruit Ltd provides specialist recruitment services across England, Scotland, Wales and Northern Ireland. UK-wide recruitment for lift engineering, fire & security, gate & door, refrigeration, automotive and HGV businesses. Permanent recruitment with direct access to James.",
  url: "https://www.jldrecruit.co.uk",
  phone: "07535961452",
  phoneDisplay: "07535 961 452",
  email: "james@jldrecruit.co.uk",
  linkedIn:
    "https://www.linkedin.com/company/jld-recruit-ltd/?viewAsMember=true",
  facebook: "https://www.facebook.com/JLDRecruitLtd/",
  googleReviewsUrl:
    process.env.GOOGLE_REVIEWS_URL ??
    "https://www.google.com/maps/search/?api=1&query=JLD+Recruit+Ltd&kgmid=/g/11z75b470s",
  googleWriteReviewUrl:
    process.env.GOOGLE_WRITE_REVIEW_URL ??
    "https://g.page/r/CVT44aBTp0JgEAI/review",
  googlePlaceId: "ChIJX8nVHMP_3EcRVPjhoFOnQmA",
  googleKnowledgeGraphId: "/g/11z75b470s",
  founder: "James Lloyd-Davies",
  areaServed: "United Kingdom",
  logo: "/images/logo.png",
  companiesHouseNumber: "17049874",
  companiesHouseUrl:
    "https://find-and-update.company-information.service.gov.uk/company/17049874",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/employers", label: "Employers" },
  { href: "/job-seekers", label: "Job Seekers" },
  { href: "/jobs", label: "Jobs" },
  { href: "/uk-coverage", label: "UK Coverage" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/sectors", label: "Sectors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const permanentOnlyMessage =
  "We specialise exclusively in permanent placements — no temp cover and no contract staffing.";

export const ukWideMessage =
  "We support employers across England, Scotland, Wales and Northern Ireland.";

export const ukWideServicesSeo =
  "JLD Recruit Ltd provides specialist recruitment services across England, Scotland, Wales and Northern Ireland.";

export const ukWideRecruitmentSeo =
  "UK-wide recruitment for lift engineering, fire & security, gate & door, refrigeration, automotive and HGV businesses.";

export const seoKeywords = [
  "lift engineer recruitment",
  "lift recruitment agency",
  "fire and security recruitment",
  "gate engineer recruitment",
  "automatic door engineer recruitment",
  "industrial door engineer recruitment",
  "refrigeration engineer recruitment",
  "HVAC recruitment",
  "vehicle technician recruitment",
  "HGV technician recruitment",
  "UK-wide engineering recruitment",
];

export const footerLinks = [
  { href: "/uk-coverage", label: "UK Coverage & Locations" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/recruitment/lift-engineer-recruitment", label: "Lift Engineer Recruitment" },
  { href: "/recruitment/fire-security-recruitment", label: "Fire & Security Recruitment" },
  { href: "/recruitment/gate-door-recruitment", label: "Gate & Door Recruitment" },
  { href: "/recruitment/refrigeration-recruitment", label: "Refrigeration Recruitment" },
  { href: "/recruitment/automotive-recruitment", label: "Automotive Recruitment" },
  { href: "/recruitment/vehicle-technician-recruitment", label: "Vehicle Technician Recruitment" },
  { href: "/recruitment/hgv-recruitment", label: "HGV Recruitment" },
  { href: "/insights", label: "Recruitment Insights" },
];

export const trustSignals = [
  {
    title: "Specialist engineering recruitment",
    description:
      "Focused on lift, fire & security, gate & door, refrigeration, automotive and technical roles — not generic staffing.",
  },
  {
    title: "Direct access to James",
    description: "No call centres. You speak directly with your recruiter throughout.",
  },
  {
    title: "Proactive weekly outreach",
    description: "We actively contact candidates — we do not wait for applications.",
  },
  {
    title: "No call centres",
    description: "Personal, family-run service with honest communication at every stage.",
  },
  {
    title: "Fixed fee recruitment available",
    description: "Transparent fees agreed upfront — no corporate markups.",
  },
  {
    title: "Headhunting included",
    description: "Targeted talent search and direct outreach for hard-to-fill roles.",
  },
];

export const sectorRecruitmentLinks: Record<string, string> = {
  "lift-engineering": "/recruitment/lift-engineer-recruitment",
  "fire-security": "/recruitment/fire-security-recruitment",
  "gate-door-engineering": "/recruitment/gate-door-recruitment",
  "refrigeration-hvac": "/recruitment/refrigeration-recruitment",
  "automotive-hgv": "/recruitment/automotive-recruitment",
};

export const PRIMARY_SECTOR_SLUGS = [
  "lift-engineering",
  "fire-security",
  "gate-door-engineering",
  "refrigeration-hvac",
  "automotive-hgv",
] as const;

export const ADDITIONAL_SECTOR_SLUGS = [] as const;

export const employerWhyChoose = [
  "Family-run recruitment business",
  "Direct access to James",
  "UK-wide candidate search",
  "Specialist engineering and automotive recruitment",
  "Headhunting approach",
  "Permanent recruitment support",
  "Clear communication from start to finish",
];

export const employerFaqs = [
  {
    question: "How much does recruitment cost?",
    answer:
      "Fees depend on the role, sector and service level. We offer transparent, fixed fee recruitment where agreed upfront — without corporate markups. Contact James for a straightforward quote based on your vacancy.",
  },
  {
    question: "What recruitment options do you offer?",
    answer:
      "We offer permanent recruitment including fixed-fee, exclusive and retained campaigns. Headhunting and targeted talent search are included in our proactive approach.",
  },
  {
    question: "Do you work nationwide?",
    answer:
      "Yes. JLD Recruit Ltd supports employers across England, Scotland, Wales and Northern Ireland, with strong recruitment activity in London, the Midlands, major cities and the South West.",
  },
  {
    question: "How long does it take to find engineers?",
    answer:
      "Timelines vary by role, location and market conditions. We provide honest timelines upfront and keep you updated throughout. Hard-to-fill engineering roles often benefit from our headhunting approach rather than waiting for applications.",
  },
  {
    question: "Do you headhunt candidates?",
    answer:
      "Yes. Headhunting and proactive sourcing are core to how we work. We reach out directly to employed candidates who match your requirements — particularly important for lift engineers, fire & security engineers and skilled technicians.",
  },
  {
    question: "Do you offer exclusive recruitment?",
    answer:
      "Yes. Exclusive recruitment can be arranged for the right vacancy, giving you dedicated focus on your role. Speak with James to discuss the best approach for your hiring needs.",
  },
  {
    question: "Do you provide temp or contract cover?",
    answer:
      "No. JLD Recruit Ltd specialises exclusively in permanent placements. We do not supply temporary staff or contract cover — if you need a permanent hire, we would be happy to help.",
  },
];

export const sectors = [
  {
    slug: "lift-engineering",
    title: "Lift Engineering",
    description:
      "Lift engineers for service, repair, installation, maintenance and modernisation roles with lift companies and building services providers.",
    roles: [
      "Lift Service Engineers",
      "Lift Repair Engineers",
      "Lift Installation Engineers",
      "Lift Modernisation Engineers",
      "NVQ Level 3 Lift Engineers",
      "NVQ Level 4 Lift Engineers",
    ],
    icon: "elevator",
  },
  {
    slug: "fire-security",
    title: "Fire & Security",
    description:
      "Fire and security engineer recruitment for installation, commissioning, service and maintenance across commercial and industrial sectors.",
    roles: [
      "Fire Alarm Engineers",
      "Security Engineers",
      "Installation Engineers",
      "Service Engineers",
      "Commissioning Engineers",
      "Small Works Engineers",
      "CCTV, Access Control and Intruder Alarm Engineers",
    ],
    icon: "shield",
  },
  {
    slug: "gate-door-engineering",
    title: "Gate & Door Engineering",
    description:
      "Gate, automatic door and industrial entrance system engineers for installation, service, repair and maintenance roles.",
    roles: [
      "Gate Engineers",
      "Automatic Door Engineers",
      "Industrial Door Engineers",
      "Roller Shutter Engineers",
      "Barrier Engineers",
    ],
    icon: "door",
  },
  {
    slug: "refrigeration-hvac",
    title: "Refrigeration & HVAC",
    description:
      "Refrigeration, air conditioning, chiller and HVAC engineer recruitment for commercial, industrial and domestic environments.",
    roles: [
      "Refrigeration Engineers",
      "HVAC Engineers",
      "Chiller Engineers",
      "Air Conditioning Engineers",
      "Commercial Refrigeration Engineers",
    ],
    icon: "snowflake",
  },
  {
    slug: "automotive-hgv",
    title: "Automotive & HGV",
    description:
      "Vehicle technicians, MOT testers, diagnostic technicians, master technicians and HGV mechanics for garages, dealerships, fleet operators and workshops.",
    roles: [
      "Vehicle Technicians",
      "MOT Testers",
      "Diagnostic Technicians",
      "Master Technicians",
      "HGV Technicians",
      "Mobile Vehicle Technicians",
    ],
    icon: "car",
  },
  {
    slug: "field-service-maintenance",
    title: "Field Service & Maintenance",
    description:
      "Field service and maintenance engineers for mobile, site-based and multi-site engineering roles across the UK.",
    roles: [
      "Field Service Engineers",
      "Maintenance Engineers",
      "Mobile Engineers",
      "Service Engineers",
    ],
    icon: "wrench",
  },
  {
    slug: "renewable-energy",
    title: "Renewable Energy & Solar",
    description:
      "Solar and renewable energy engineer recruitment for installation, commissioning and maintenance of green energy systems.",
    roles: [
      "Solar Installers",
      "Renewable Energy Engineers",
      "PV Technicians",
      "Battery Storage Engineers",
    ],
    icon: "sun",
  },
  {
    slug: "general-engineering",
    title: "General Engineering",
    description:
      "Mechanical, electrical and technical engineering roles for manufacturing, production and specialist engineering businesses.",
    roles: [
      "Mechanical Engineers",
      "Electrical Engineers",
      "Production Engineers",
      "Technical Specialists",
    ],
    icon: "cog",
  },
];

export const primarySectors = PRIMARY_SECTOR_SLUGS.map((slug) =>
  sectors.find((s) => s.slug === slug)
).filter((s): s is (typeof sectors)[number] => Boolean(s));

export const additionalSectors = sectors.filter((s) =>
  (ADDITIONAL_SECTOR_SLUGS as readonly string[]).includes(s.slug)
);

export const otherSectors = sectors.filter(
  (s) =>
    !(PRIMARY_SECTOR_SLUGS as readonly string[]).includes(s.slug) &&
    !(ADDITIONAL_SECTOR_SLUGS as readonly string[]).includes(s.slug)
);

export const services = [
  "Permanent recruitment",
  "Fixed-fee recruitment",
  "Exclusive recruitment campaigns",
  "Retained recruitment",
  "Headhunting & talent search",
  "Candidate sourcing",
  "Shortlisting",
  "Targeted outreach",
  "LinkedIn sourcing",
  "Job board advertising",
  "CV Library searches",
  "Interview coordination",
  "Recruitment support for hard-to-fill roles",
  "Long-term workforce growth",
];

export const whyChooseUs = [
  {
    title: "Direct access to James",
    description:
      "No account managers or corporate layers. You deal directly with James throughout the entire recruitment process.",
  },
  {
    title: "Proactive sourcing",
    description:
      "We do not wait for applications. We actively headhunt, source and approach candidates who match your requirements.",
  },
  {
    title: "Sector expertise",
    description:
      "Deep understanding of automotive, engineering and technical roles means better screening and stronger shortlists.",
  },
  {
    title: "Honest communication",
    description:
      "Clear updates at every stage. If a role is challenging, we tell you upfront and adjust our approach accordingly.",
  },
  {
    title: "Flexible and responsive",
    description:
      "A family-run business that moves quickly. We respond promptly and adapt to your hiring timeline and priorities.",
  },
  {
    title: "Fair, transparent fees",
    description:
      "Straightforward pricing without inflated corporate agency costs. You know what you are paying for and why.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Tell us what you need",
    description:
      "A quick call or email to understand your vacancy, ideal candidate profile, salary expectations and timeline.",
  },
  {
    step: "02",
    title: "We source and shortlist",
    description:
      "Proactive candidate sourcing, headhunting, job board advertising and screening to build a quality shortlist.",
  },
  {
    step: "03",
    title: "Interviews and feedback",
    description:
      "We coordinate interviews, gather feedback and keep both parties informed throughout the process.",
  },
  {
    step: "04",
    title: "Offer and placement",
    description:
      "Support through offer negotiation and start date confirmation, with follow-up to ensure a smooth placement.",
  },
];

export const placementStories = [
  {
    title: "Industrial door engineer — Colchester",
    summary:
      "Helped a Colchester door company fill a hard-to-source service engineer role within three weeks through targeted headhunting.",
  },
  {
    title: "Intruder alarm engineer — Yorkshire & Lancashire",
    summary:
      "Sourced experienced security engineers for a growing installer expanding across Yorkshire and Lancashire, with a shortlist delivered inside two weeks.",
  },
  {
    title: "Lift service engineer — South East",
    summary:
      "Placed a lift service engineer with a family-run lift company that needed route cover and strong customer-facing skills — matched on culture as well as technical ability.",
  },
];

export const whoWeHelp = [
  {
    title: "CEOs & Business Owners",
    description:
      "Business leaders who need reliable recruitment support without the overhead of a large corporate agency.",
  },
  {
    title: "Managing Directors",
    description:
      "Senior leaders looking for a trusted partner to fill critical technical and engineering roles quickly.",
  },
  {
    title: "Workshop & Operations Managers",
    description:
      "Managers who need skilled technicians and engineers to keep operations running smoothly.",
  },
  {
    title: "Hiring Managers",
    description:
      "HR and hiring managers who want a responsive recruiter who understands technical roles and sector requirements.",
  },
];

export const faqs = [
  {
    question: "What sectors does JLD Recruit Ltd recruit for?",
    answer:
      "Our core specialisms are lift engineering, fire & security, gate & door engineering, refrigeration & HVAC, and automotive & HGV permanent recruitment. We also support field service, renewable energy and general engineering roles.",
  },
  {
    question: "Do you specialise in lift and fire & security recruitment?",
    answer:
      "Yes. Lift engineering and fire & security recruitment are key growth areas for JLD Recruit Ltd. We recruit service, installation, commissioning and maintenance engineers across the UK through proactive headhunting and targeted sourcing.",
  },
  {
    question: "Do you recruit gate and door engineers?",
    answer:
      "Yes. We recruit gate engineers, automatic door engineers, industrial door engineers and roller shutter engineers for installation, service and maintenance roles UK-wide.",
  },
  {
    question: "Can you help with hard-to-fill engineering roles?",
    answer:
      "Absolutely. Hard-to-fill roles are where our proactive approach makes the biggest difference. We use headhunting, targeted outreach, LinkedIn sourcing, job board advertising and CV Library searches to reach candidates who are not actively applying.",
  },
  {
    question: "Do you work with small businesses and independent garages?",
    answer:
      "Yes. We work with businesses of all sizes, from independent garages and small engineering firms to larger operators. Our personal, direct service is particularly well suited to owner-managed businesses.",
  },
  {
    question: "Do candidates pay for your service?",
    answer:
      "No. Our recruitment service is free for candidates. Employers pay a fee when a successful placement is made.",
  },
  {
    question: "How do I send a vacancy?",
    answer:
      "You can send us your vacancy details by phone on 07535 961 452, email at james@jldrecruit.co.uk, or through the contact form on our website. We will respond promptly to discuss your requirements.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "JLD Recruit Ltd covers the United Kingdom. We support employers and candidates across England, Wales and Scotland for both local and national recruitment requirements.",
  },
  {
    question: "Do you offer fixed-fee or retained recruitment?",
    answer:
      "Yes. We offer transparent fixed-fee recruitment, exclusive recruitment campaigns and retained search for the right vacancy. Contact James to discuss the best approach for your permanent hiring needs.",
  },
  {
    question: "Do you provide temporary or contract staff?",
    answer:
      "No. JLD Recruit Ltd specialises exclusively in permanent placements. We do not supply temporary or contract cover.",
  },
];

export const employerBenefits = [
  {
    title: "Hard-to-fill role expertise",
    description:
      "When standard job boards are not enough, we use headhunting and targeted outreach to find candidates others miss.",
  },
  {
    title: "Full recruitment support",
    description:
      "From writing job adverts to coordinating interviews, we handle the heavy lifting so you can focus on running your business.",
  },
  {
    title: "Quality over quantity",
    description:
      "We present carefully screened shortlists rather than flooding you with unsuitable CVs.",
  },
  {
    title: "Sector-specific screening",
    description:
      "We understand the qualifications, certifications and experience that matter in automotive and engineering roles.",
  },
];

export const candidateBenefits = [
  {
    title: "Access to relevant roles",
    description:
      "We connect skilled candidates with suitable permanent roles in automotive, engineering and technical sectors.",
  },
  {
    title: "Personal guidance",
    description:
      "You speak directly with James, who understands your skills and helps match you with the right opportunity.",
  },
  {
    title: "No cost to you",
    description:
      "Our service is completely free for candidates. We are paid by employers when a successful placement is made.",
  },
  {
    title: "Honest advice",
    description:
      "We give straightforward feedback on your CV, interview preparation and whether a role is genuinely right for you.",
  },
];
