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
    slug: "temporary-recruitment",
    href: "/services/temporary-recruitment",
    title: "Temporary Recruitment",
    description:
      "Providing flexible staffing solutions across automotive, engineering, technical, construction and healthcare — covering sickness, holidays, seasonal demand, project work and short-term business needs.",
    icon: "temporary",
    featured: false,
  },
  {
    slug: "contract-recruitment",
    href: "/services/contract-recruitment",
    title: "Contract Recruitment",
    description:
      "Connecting businesses with experienced contractors and specialists across automotive, engineering, technical, construction and healthcare for fixed-term projects and assignments.",
    icon: "contract",
    featured: false,
  },
  {
    slug: "headhunting",
    href: "/services/permanent-recruitment",
    title: "Headhunting & Talent Search",
    description:
      "Proactive candidate attraction through direct outreach, networking, LinkedIn sourcing and targeted recruitment campaigns.",
    icon: "headhunt",
    featured: false,
  },
];

export const temporaryContractRoles = [
  "Vehicle Technicians",
  "Mechanics",
  "MOT Testers",
  "HGV Technicians",
  "Fire & Security Engineers",
  "Lift Engineers",
  "Refrigeration Engineers",
  "HVAC Engineers",
  "Field Service Engineers",
  "Maintenance Engineers",
  "Technical and Engineering Professionals",
  "Construction Workers & Skilled Trades",
  "Site Operatives & Supervisors",
  "Healthcare Assistants & Support Workers",
  "Registered Nurses & Care Staff",
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
    metaTitle: "Permanent Recruitment",
    metaDescription:
      "JLD Recruit LTD provides permanent recruitment for automotive, engineering and technical roles across the UK. Targeted sourcing, headhunting and candidate screening from a family-run recruitment agency.",
    keywords: [
      "permanent recruitment",
      "automotive recruitment agency",
      "engineering recruitment agency",
      "technical recruitment",
      "recruitment solutions",
      "headhunting for engineers",
    ],
    heroEyebrow: "Permanent Recruitment",
    heroTitle: "Permanent recruitment for skilled automotive and engineering roles",
    heroDescription:
      "Permanent recruitment is at the heart of what we do. JLD Recruit LTD helps UK businesses secure skilled, long-term employees through targeted sourcing, headhunting and thorough candidate screening.",
    overview: [
      "Finding the right permanent hire is one of the most important decisions a business can make. A poor hire costs time, money and momentum. We take the time to understand your business, your team and the role you need to fill.",
      "As a specialist automotive and engineering recruitment agency, we use proactive sourcing methods — including headhunting, LinkedIn outreach and targeted campaigns — to reach candidates who are not always visible on job boards.",
      "You deal directly with James throughout the process. No account managers, no hand-offs — just honest communication and a focus on finding someone who will add long-term value to your business.",
    ],
    benefits: [
      {
        title: "Quality long-term hires",
        description:
          "We focus on finding candidates who are the right fit for your business culture and requirements, not just filling a vacancy quickly.",
      },
      {
        title: "Proactive headhunting",
        description:
          "We actively approach skilled candidates rather than waiting for applications, giving you access to talent others miss.",
      },
      {
        title: "Sector-specific screening",
        description:
          "We understand the qualifications, certifications and hands-on experience that matter in automotive and engineering roles.",
      },
      {
        title: "Direct, personal service",
        description:
          "You speak directly with James at every stage — clear updates, honest advice and a recruiter who takes ownership of the process.",
      },
    ],
    rolesTitle: "Typical permanent roles we recruit for",
    roles: [
      "Vehicle Technicians",
      "Mechanics & MOT Testers",
      "HGV & Commercial Vehicle Technicians",
      "Fire & Security Engineers",
      "Lift Engineers",
      "Refrigeration & HVAC Engineers",
      "Field Service Engineers",
      "Maintenance Engineers",
      "Solar & Renewable Energy Engineers",
      "General Engineering Professionals",
    ],
    faqs: [
      {
        question: "What is permanent recruitment?",
        answer:
          "Permanent recruitment is the process of finding and placing skilled candidates into long-term, employed roles within your business. JLD Recruit LTD specialises in permanent recruitment for automotive, engineering and technical positions across the UK.",
      },
      {
        question: "How long does permanent recruitment take?",
        answer:
          "Timelines vary depending on the role, location and market conditions. We provide honest timelines upfront and keep you updated throughout. For hard-to-fill roles, our proactive headhunting approach often delivers results faster than standard job board advertising alone.",
      },
      {
        question: "Do you offer headhunting for engineering roles?",
        answer:
          "Yes. Headhunting and targeted talent search are core parts of our permanent recruitment service. We use direct outreach, LinkedIn sourcing, networking and targeted campaigns to reach candidates who are not actively applying.",
      },
      {
        question: "What sectors do you recruit permanently for?",
        answer:
          "We recruit permanently across automotive, engineering and technical sectors including garages, dealerships, fleet operators, engineering firms and specialist technical businesses throughout the UK.",
      },
    ],
    ctaTitle: "Ready to make your next permanent hire?",
    ctaDescription:
      "Speak directly with James about your vacancy. We will discuss your requirements and explain how we can help you find the right long-term candidate.",
    primaryCta: "Discuss Your Hiring Needs",
    secondaryCta: "Send Us a Vacancy",
  },
  "temporary-recruitment": {
    slug: "temporary-recruitment",
    title: "Temporary Recruitment",
    metaTitle: "Temporary Recruitment",
    metaDescription:
      "Temporary recruitment and staffing solutions from JLD Recruit LTD. Temporary automotive, engineering, construction and healthcare staff for sickness cover, holidays and project work across the UK.",
    keywords: [
      "temporary recruitment agency",
      "temporary staffing solutions",
      "temporary engineering staff",
      "temporary automotive staff",
      "temporary vehicle technicians",
      "temporary mechanics",
      "temporary fire and security engineers",
      "temporary construction staff",
      "temporary healthcare staff",
      "recruitment solutions",
    ],
    heroEyebrow: "Temporary Recruitment",
    heroTitle: "Temporary staffing solutions when your business needs flexible cover",
    heroDescription:
      "When you need additional support quickly, JLD Recruit LTD provides temporary recruitment solutions across automotive, engineering, technical, construction and healthcare sectors — covering sickness, holidays, seasonal demand, project work and short-term staffing needs.",
    overview: [
      "Every business faces periods when additional staff are needed — whether due to sickness absence, holiday cover, seasonal peaks or a sudden increase in workload. Temporary recruitment gives you the flexibility to maintain operations without a long-term commitment.",
      "JLD Recruit LTD sources skilled temporary workers across automotive, engineering and technical sectors, as well as construction and healthcare for temporary staffing assignments. We understand the urgency of temporary cover and work quickly to identify candidates who can add value from day one.",
      "While permanent recruitment remains our core focus, temporary staffing is a valuable additional service for employers who need responsive, flexible recruitment support across a wider range of sectors.",
    ],
    benefits: [
      {
        title: "Fast, responsive cover",
        description:
          "We understand that temporary staffing needs are often urgent. We respond quickly and work proactively to source suitable candidates.",
      },
      {
        title: "Flexible staffing solutions",
        description:
          "Cover sickness, holidays, seasonal demand, project work and short-term business needs without disrupting your operations.",
      },
      {
        title: "Skilled temporary candidates",
        description:
          "We supply temporary vehicle technicians, mechanics, engineers, construction staff, healthcare workers and technical professionals with the skills and experience your business requires.",
      },
      {
        title: "Personal, accountable service",
        description:
          "You deal directly with James — the same personal service and sector expertise that defines our permanent recruitment offering.",
      },
    ],
    rolesTitle: "Typical temporary roles we supply",
    roles: [
      "Temporary Vehicle Technicians",
      "Temporary Mechanics",
      "Temporary MOT Testers",
      "Temporary HGV Technicians",
      "Temporary Fire & Security Engineers",
      "Temporary Lift Engineers",
      "Temporary Refrigeration Engineers",
      "Temporary HVAC Engineers",
      "Temporary Field Service Engineers",
      "Temporary Maintenance Engineers",
      "Temporary Construction Staff & Skilled Trades",
      "Temporary Site Operatives & Supervisors",
      "Temporary Healthcare Assistants",
      "Temporary Support Workers & Care Staff",
      "Temporary Registered Nurses",
    ],
    faqs: [
      {
        question: "What is temporary recruitment?",
        answer:
          "Temporary recruitment involves sourcing skilled workers to cover short-term staffing needs such as sickness absence, holiday cover, seasonal demand or project-based work. JLD Recruit LTD provides temporary staffing solutions across automotive, engineering, technical, construction and healthcare sectors.",
      },
      {
        question: "How quickly can you provide temporary cover?",
        answer:
          "We respond to temporary staffing requests as quickly as possible. Contact us by phone or email with your requirements and we will discuss availability and timelines directly.",
      },
      {
        question: "What temporary roles do you supply?",
        answer:
          "We supply temporary vehicle technicians, mechanics, MOT testers, HGV technicians, fire and security engineers, lift engineers, refrigeration and HVAC engineers, field service engineers, maintenance engineers, construction staff, skilled trades, healthcare assistants, support workers, care staff, registered nurses and other technical professionals.",
      },
      {
        question: "Is temporary recruitment your main service?",
        answer:
          "Permanent recruitment is our primary focus and core specialism. Temporary recruitment is an additional service we offer to employers who need flexible staffing support alongside their long-term hiring needs.",
      },
    ],
    ctaTitle: "Need temporary cover?",
    ctaDescription:
      "Tell us what you need and when. We will respond promptly to discuss temporary staffing options for your business.",
    primaryCta: "Request Staff",
    secondaryCta: "Discuss Your Hiring Needs",
  },
  "contract-recruitment": {
    slug: "contract-recruitment",
    title: "Contract Recruitment",
    metaTitle: "Contract Recruitment",
    metaDescription:
      "Contract recruitment agency services from JLD Recruit LTD. Experienced contract engineers, construction specialists and healthcare professionals for fixed-term projects across the UK.",
    keywords: [
      "contract recruitment agency",
      "contract engineers",
      "engineering recruitment agency",
      "automotive recruitment agency",
      "technical recruitment",
      "contract construction staff",
      "contract healthcare staff",
      "recruitment solutions",
      "temporary engineering staff",
    ],
    heroEyebrow: "Contract Recruitment",
    heroTitle: "Contract engineers and specialists for fixed-term projects",
    heroDescription:
      "For specialist projects and technical assignments, JLD Recruit LTD helps businesses secure experienced contractors across automotive, engineering, technical, construction and healthcare sectors — with the skills required to deliver results quickly.",
    overview: [
      "Some business needs call for experienced specialists on a fixed-term basis — whether for a technical project, a specialist installation, a construction assignment, a healthcare placement or a defined role with a clear end date.",
      "Our contract recruitment service connects businesses with experienced contractors and specialists across automotive, engineering and technical sectors, as well as construction and healthcare for contract assignments. We focus on finding professionals who can hit the ground running and deliver from day one.",
      "Contract recruitment complements our permanent recruitment service, giving employers access to flexible talent solutions when a long-term hire is not the right fit.",
    ],
    benefits: [
      {
        title: "Experienced contractors",
        description:
          "We source contract engineers and technical specialists with the skills and experience to deliver on specialist assignments and fixed-term projects.",
      },
      {
        title: "Project-ready talent",
        description:
          "Find contractors who can start quickly and contribute immediately — ideal for time-sensitive technical projects and specialist work.",
      },
      {
        title: "Sector expertise",
        description:
          "We understand the qualifications and certifications required across automotive, engineering, technical, construction and healthcare contract roles.",
      },
      {
        title: "Flexible recruitment solutions",
        description:
          "Contract recruitment gives you access to skilled talent for defined periods, alongside our permanent and temporary recruitment services.",
      },
    ],
    rolesTitle: "Typical contract roles we recruit for",
    roles: [
      "Contract Vehicle Technicians",
      "Contract Mechanics",
      "Contract HGV Technicians",
      "Contract Fire & Security Engineers",
      "Contract Lift Engineers",
      "Contract Refrigeration Engineers",
      "Contract HVAC Engineers",
      "Contract Field Service Engineers",
      "Contract Maintenance Engineers",
      "Contract Engineering Professionals",
      "Contract Construction Specialists",
      "Contract Skilled Trades",
      "Contract Healthcare Professionals",
      "Contract Support Workers & Care Staff",
    ],
    faqs: [
      {
        question: "What is contract recruitment?",
        answer:
          "Contract recruitment involves sourcing experienced professionals for fixed-term assignments and specialist projects. JLD Recruit LTD helps businesses find contract engineers, construction specialists and healthcare professionals across automotive, engineering, technical, construction and healthcare sectors.",
      },
      {
        question: "What types of contract roles do you cover?",
        answer:
          "We recruit contract vehicle technicians, mechanics, HGV technicians, fire and security engineers, lift engineers, refrigeration and HVAC engineers, field service engineers, maintenance engineers, construction specialists, skilled trades, healthcare professionals, support workers and care staff for fixed-term assignments.",
      },
      {
        question: "How is contract recruitment different from temporary recruitment?",
        answer:
          "Temporary recruitment typically covers short-term staffing needs such as sickness and holiday cover. Contract recruitment focuses on experienced specialists for defined projects and fixed-term technical assignments, often requiring specific skills and certifications.",
      },
      {
        question: "Do you still focus primarily on permanent recruitment?",
        answer:
          "Yes. Permanent recruitment is our core service and primary specialism. Contract recruitment is an additional solution for employers who need experienced specialists for fixed-term projects and assignments.",
      },
    ],
    ctaTitle: "Need a contract specialist?",
    ctaDescription:
      "Tell us about your project and the skills you require. We will discuss how we can help you find the right contract professional.",
    primaryCta: "Discuss Your Hiring Needs",
    secondaryCta: "Request Staff",
  },
};

export const flexibleRecruitmentContent = {
  eyebrow: "Recruitment Solutions",
  title: "Flexible Recruitment Solutions for Growing Businesses",
  paragraphs: [
    "Whether you need a permanent employee, temporary cover or a specialist contractor, JLD Recruit LTD provides flexible recruitment solutions tailored to your business needs.",
    "We work closely with employers to understand their requirements and identify skilled candidates who can add value from day one. From urgent temporary cover in construction and healthcare to long-term strategic hires in automotive and engineering, we deliver a straightforward and responsive recruitment service.",
  ],
  primaryCta: "Discuss Your Hiring Needs",
  secondaryCta: "Request Staff",
};

export const employerTemporaryContent = {
  title: "Temporary Recruitment",
  paragraphs: [
    "When businesses need additional support, JLD Recruit LTD can help source temporary workers to cover periods of increased demand, staff absences, holiday cover and project-based work.",
    "We supply temporary automotive staff, temporary engineering staff, construction workers, healthcare professionals and skilled technical staff who can step in quickly and keep your operations running smoothly.",
  ],
};

export const employerContractContent = {
  title: "Contract Recruitment",
  paragraphs: [
    "For specialist projects and technical assignments, JLD Recruit LTD can help businesses secure experienced contractors with the skills required to deliver results quickly.",
    "Whether you need a contract engineer, construction specialist or healthcare professional for a fixed-term project, we provide proactive contract recruitment support across automotive, engineering, technical, construction and healthcare sectors.",
  ],
};

export const employerConstructionHealthcareContent = {
  construction: {
    title: "Construction — Temporary & Contract Staffing",
    description:
      "We provide temporary and contract staffing for construction businesses, supplying skilled trades, site operatives, groundworkers and supervisors to cover project demand, absences and peak workloads.",
    roles: [
      "Skilled Trades",
      "Site Operatives",
      "Groundworkers",
      "Labourers",
      "Site Supervisors",
      "CSCS Card Holders",
    ],
  },
  healthcare: {
    title: "Healthcare — Temporary & Contract Staffing",
    description:
      "We provide temporary and contract recruitment for healthcare providers, supplying qualified staff and support workers to cover sickness, holidays, increased demand and specialist assignments.",
    roles: [
      "Healthcare Assistants",
      "Support Workers",
      "Registered Nurses",
      "Care Staff",
      "Allied Health Professionals",
    ],
  },
};
