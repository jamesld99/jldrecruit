export type SeoPageContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  overview: string[];
  whyChoose: { title: string; description: string }[];
  roles: string[];
  faqs: { question: string; answer: string }[];
  relatedLinks: { label: string; href: string }[];
};

const sharedWhyChoose = [
  {
    title: "Specialist engineering recruitment",
    description:
      "We focus on lift, fire & security, gate & door, refrigeration and automotive engineering roles — not generic office recruitment.",
  },
  {
    title: "Direct access to James",
    description:
      "No call centres or hand-offs. You deal directly with your recruiter throughout the entire hiring process.",
  },
  {
    title: "Proactive headhunting",
    description:
      "We do not wait for applications. We use targeted outreach, LinkedIn sourcing and headhunting to reach the right candidates.",
  },
  {
    title: "Fixed fee recruitment available",
    description:
      "Transparent, fair fees without corporate markups. We agree terms upfront so there are no surprises.",
  },
];

export const recruitmentPages: SeoPageContent[] = [
  {
    slug: "automotive-recruitment",
    metaTitle: "Automotive & HGV Recruitment UK",
    metaDescription:
      "Automotive and HGV recruitment for vehicle technicians, MOT testers, diagnostic technicians, master technicians, HGV mechanics and mobile vehicle technicians UK-wide.",
    keywords: [
      "automotive recruitment agency",
      "vehicle technician recruitment",
      "HGV technician recruitment",
      "vehicle technician recruitment UK",
    ],
    heroEyebrow: "Automotive & HGV Recruitment",
    heroTitle: "Automotive & HGV Recruitment",
    heroDescription:
      "JLD Recruit Ltd is a specialist automotive recruitment agency helping garages, dealerships, fleet operators and motor groups find skilled vehicle technicians, mechanics, MOT testers and workshop staff across the UK.",
    overview: [
      "Automotive recruitment is one of our core specialisms. We understand the difference between a general mechanic and a diagnostic specialist, and we know what garages and dealerships need when hiring technical staff.",
      "Whether you need a single MOT tester for an independent garage or multiple vehicle technicians for a growing motor group, we provide proactive, personal recruitment support — not a generic job board service.",
      "We recruit permanently for garages, dealerships, fleet operators and motor groups across the UK.",
      "From the South West — Devon, Cornwall and Dorset — to the Midlands, London and nationwide, we support employers who need reliable, skilled automotive professionals.",
    ],
    whyChoose: sharedWhyChoose,
    roles: [
      "Vehicle Technicians",
      "MOT Testers",
      "Diagnostic Technicians",
      "Master Technicians",
      "HGV Technicians",
      "Mobile Vehicle Technicians",
    ],
    faqs: [
      {
        question: "What automotive roles do you recruit for?",
        answer:
          "We recruit vehicle technicians, mechanics, MOT testers, diagnostic technicians, workshop supervisors, prestige specialists and fleet maintenance staff for garages, dealerships and motor groups across the UK.",
      },
      {
        question: "Do you recruit for independent garages?",
        answer:
          "Yes. We work with independent garages, family-run motor businesses and larger motor groups. Our personal, direct service suits owner-managed businesses particularly well.",
      },
    ],
    relatedLinks: [
      { label: "Vehicle Technician Recruitment", href: "/recruitment/vehicle-technician-recruitment" },
      { label: "Current Jobs", href: "/jobs" },
      { label: "Devon Vehicle Technician Jobs", href: "/locations/vehicle-technician-recruitment-devon" },
    ],
  },
  {
    slug: "vehicle-technician-recruitment",
    metaTitle: "Vehicle Technician Recruitment UK",
    metaDescription:
      "Vehicle technician recruitment for garages, dealerships and motor groups. MOT testers, diagnostic technicians and workshop staff across Devon, Cornwall and the UK.",
    keywords: [
      "vehicle technician recruitment",
      "MOT tester recruitment",
      "garage technician jobs",
      "vehicle technician jobs Devon",
    ],
    heroEyebrow: "Vehicle Technician Recruitment",
    heroTitle: "Vehicle Technician & MOT Tester Recruitment",
    heroDescription:
      "Specialist vehicle technician recruitment for garages, dealerships and motor groups. We find skilled mechanics, MOT testers and diagnostic technicians through proactive sourcing and headhunting.",
    overview: [
      "Finding skilled vehicle technicians is one of the biggest challenges facing garages and motor groups today. Good technicians are rarely sitting on job boards waiting to apply — they are often employed and need to be approached directly.",
      "That is where our proactive approach makes the difference. We headhunt, source and screen vehicle technicians, MOT testers and diagnostic specialists who match your workshop requirements, culture and salary expectations.",
      "We are particularly active in the South West — recruiting vehicle technicians in Devon, Cornwall, Dorset and surrounding areas — while also supporting employers nationwide.",
      "Whether you need one technician for a stable long-term role or multiple MOT testers for a growing motor group, we provide honest timelines, clear communication and a recruiter you can speak to directly.",
    ],
    whyChoose: sharedWhyChoose,
    roles: [
      "Vehicle Technicians",
      "MOT Testers",
      "Diagnostic Technicians",
      "Light Vehicle Technicians",
      "Workshop Mechanics",
      "Master Technicians",
    ],
    faqs: [
      {
        question: "Do you recruit MOT testers?",
        answer:
          "Yes. MOT tester recruitment is a regular part of our automotive work. We recruit both qualified MOT testers and experienced technicians where MOT qualification is desirable but not essential.",
      },
      {
        question: "Which areas do you cover for vehicle technician recruitment?",
        answer:
          "We recruit vehicle technicians across the UK with strong activity in Devon, Cornwall, Dorset, the Midlands, London and major cities. View our location pages or current jobs for active vacancies.",
      },
    ],
    relatedLinks: [
      { label: "Devon", href: "/locations/vehicle-technician-recruitment-devon" },
      { label: "Cornwall", href: "/locations/vehicle-technician-recruitment-cornwall" },
      { label: "View Current Jobs", href: "/jobs" },
    ],
  },
  {
    slug: "hgv-recruitment",
    metaTitle: "HGV Technician Recruitment UK",
    metaDescription:
      "HGV and commercial vehicle technician recruitment for workshops, fleet operators and transport businesses across the UK.",
    keywords: [
      "HGV technician recruitment",
      "commercial vehicle mechanic recruitment",
      "HGV recruitment agency",
      "fleet maintenance recruitment",
    ],
    heroEyebrow: "HGV Recruitment",
    heroTitle: "HGV & Commercial Vehicle Technician Recruitment",
    heroDescription:
      "Recruitment for HGV technicians, commercial vehicle mechanics, fleet maintenance engineers and trailer technicians across workshops and transport operators UK-wide.",
    overview: [
      "HGV and commercial vehicle technician recruitment requires sector-specific knowledge. Employers need candidates who understand heavy vehicle diagnostics, fleet maintenance schedules, trailer systems and the certifications relevant to commercial workshops.",
      "JLD Recruit Ltd recruits HGV technicians and commercial vehicle mechanics for independent workshops, fleet maintenance teams and transport operators who need reliable, experienced technical staff.",
      "Our proactive sourcing approach reaches candidates who may not be actively searching — including employed technicians open to the right opportunity.",
      "We support permanent HGV recruitment UK-wide for workshops, fleet operators and transport businesses.",
    ],
    whyChoose: sharedWhyChoose,
    roles: [
      "HGV Technicians",
      "Commercial Vehicle Mechanics",
      "Fleet Maintenance Engineers",
      "Trailer Technicians",
      "PCV Technicians",
    ],
    faqs: [
      {
        question: "Do you recruit HGV technicians nationwide?",
        answer:
          "Yes. We cover HGV and commercial vehicle technician recruitment across the UK including the Midlands, London, Manchester, Leeds, Birmingham, Nottingham and the South West.",
      },
    ],
    relatedLinks: [
      { label: "HGV Recruitment Nottingham", href: "/locations/hgv-recruitment-nottingham" },
      { label: "HGV Recruitment Birmingham", href: "/locations/hgv-recruitment-birmingham" },
      { label: "Automotive Recruitment", href: "/recruitment/automotive-recruitment" },
    ],
  },
  {
    slug: "lift-engineer-recruitment",
    metaTitle: "Lift Engineer Recruitment UK | Lift Recruitment Agency",
    metaDescription:
      "Lift engineer recruitment agency for service, repair, installation and modernisation roles. NVQ Level 3 and Level 4 lift engineers UK-wide.",
    keywords: [
      "lift engineer recruitment",
      "lift recruitment agency",
      "lift service engineer jobs",
      "NVQ lift engineer recruitment",
    ],
    heroEyebrow: "Lift Engineer Recruitment",
    heroTitle: "Lift Engineer Recruitment",
    heroDescription:
      "Specialist lift engineer recruitment for service, repair, installation and maintenance roles with lift companies and building services providers across the UK.",
    overview: [
      "Lift engineering is a specialist sector where the right qualifications, safety awareness and hands-on experience are essential. Generic recruitment agencies often struggle to understand the difference between a service engineer and an installation specialist.",
      "We recruit lift engineers, escalator engineers, lift service engineers and installation engineers for lift companies, building services providers and maintenance contractors.",
      "Our headhunting approach reaches experienced lift engineers who may not be actively applying online — particularly important for hard-to-fill service and installation roles.",
      "Whether you need a lift service engineer in London, Birmingham, Manchester or the South West, we provide personal, proactive recruitment support with direct access to James throughout.",
    ],
    whyChoose: sharedWhyChoose,
    roles: [
      "Lift Service Engineers",
      "Lift Repair Engineers",
      "Lift Installation Engineers",
      "Lift Modernisation Engineers",
      "NVQ Level 3 Lift Engineers",
      "NVQ Level 4 Lift Engineers",
    ],
    faqs: [
      {
        question: "What lift engineering roles do you recruit for?",
        answer:
          "We recruit lift service engineers, lift repair engineers, lift installation engineers, lift modernisation engineers, and NVQ Level 3 and Level 4 lift engineers for lift companies and building services businesses across the UK.",
      },
    ],
    relatedLinks: [
      { label: "Lift Engineer Jobs London", href: "/locations/lift-engineer-recruitment-london" },
      { label: "Lift Engineer Jobs Birmingham", href: "/locations/lift-engineer-recruitment-birmingham" },
      { label: "Lift Engineer Jobs Glasgow", href: "/locations/lift-engineer-recruitment-glasgow" },
      { label: "Gate & Door Recruitment", href: "/recruitment/gate-door-recruitment" },
    ],
  },
  {
    slug: "fire-security-recruitment",
    metaTitle: "Fire & Security Recruitment UK",
    metaDescription:
      "Fire and security recruitment for fire alarm engineers, security engineers, CCTV, access control and intruder alarm engineers UK-wide.",
    keywords: [
      "fire and security recruitment",
      "fire alarm engineer recruitment",
      "CCTV engineer recruitment",
      "security engineer jobs",
    ],
    heroEyebrow: "Fire & Security Recruitment",
    heroTitle: "Fire & Security Engineer Recruitment",
    heroDescription:
      "Recruitment for fire alarm engineers, security engineers, CCTV installers and access control engineers for installation, commissioning and maintenance roles across the UK.",
    overview: [
      "Fire and security recruitment demands technical knowledge of systems, standards and certifications. Employers need engineers who understand BS 5839, access control platforms, IP-based CCTV and the practical realities of commercial and industrial installations.",
      "We recruit fire alarm engineers, security engineers, CCTV installers and access control engineers for growing fire and security companies, integrators and maintenance providers.",
      "From installation and commissioning engineers to service and maintenance specialists, we use proactive sourcing to reach candidates with the right mix of experience and qualifications.",
      "We are actively recruiting fire and security engineers in Devon, Cornwall, the Midlands, London and Birmingham — view our current jobs for live vacancies.",
    ],
    whyChoose: sharedWhyChoose,
    roles: [
      "Fire Alarm Engineers",
      "Security Engineers",
      "Installation Engineers",
      "Service Engineers",
      "Commissioning Engineers",
      "Small Works Engineers",
      "CCTV, Access Control and Intruder Alarm Engineers",
    ],
    faqs: [
      {
        question: "Do you recruit fire and security commissioning engineers?",
        answer:
          "Yes. We regularly recruit installation and commissioning engineers experienced with fire detection, CCTV, access control and intruder alarm systems for commercial and industrial projects.",
      },
    ],
    relatedLinks: [
      { label: "Fire & Security Jobs London", href: "/locations/fire-security-recruitment-london" },
      { label: "Fire & Security Jobs Birmingham", href: "/locations/fire-security-recruitment-birmingham" },
      { label: "Fire & Security Jobs Manchester", href: "/locations/fire-security-recruitment-manchester" },
      { label: "Current Jobs", href: "/jobs" },
    ],
  },
  {
    slug: "refrigeration-recruitment",
    metaTitle: "Refrigeration & HVAC Recruitment UK",
    metaDescription:
      "Refrigeration engineer recruitment and HVAC recruitment for chiller, air conditioning and commercial refrigeration engineers UK-wide.",
    keywords: [
      "refrigeration engineer recruitment",
      "HVAC recruitment",
      "air conditioning engineer jobs",
      "commercial refrigeration recruitment",
    ],
    heroEyebrow: "Refrigeration & HVAC Recruitment",
    heroTitle: "Refrigeration, Air Conditioning & HVAC Recruitment",
    heroDescription:
      "Recruitment for refrigeration engineers, air conditioning engineers, HVAC engineers and F-Gas qualified technicians across commercial, industrial and domestic sectors.",
    overview: [
      "Refrigeration and HVAC recruitment requires understanding of F-Gas qualifications, commercial refrigeration systems, split air conditioning and the varied environments engineers work in — from industrial plants to retail and domestic settings.",
      "We recruit refrigeration engineers, air conditioning engineers, HVAC engineers and F-Gas technicians for service companies, facilities management businesses and specialist contractors.",
      "Our proactive approach helps employers reach experienced engineers who are not always visible on job boards, particularly for hard-to-fill service and maintenance roles.",
      "Permanent recruitment for refrigeration and HVAC engineers, with proactive headhunting for hard-to-fill service and maintenance roles.",
    ],
    whyChoose: sharedWhyChoose,
    roles: [
      "Refrigeration Engineers",
      "HVAC Engineers",
      "Chiller Engineers",
      "Air Conditioning Engineers",
      "Commercial Refrigeration Engineers",
    ],
    faqs: [
      {
        question: "Do you recruit F-Gas qualified engineers?",
        answer:
          "Yes. F-Gas qualifications and relevant refrigeration or HVAC certifications are important criteria we assess when recruiting for technical roles in this sector.",
      },
    ],
    relatedLinks: [
      { label: "Refrigeration London", href: "/locations/refrigeration-recruitment-london" },
      { label: "Refrigeration Birmingham", href: "/locations/refrigeration-recruitment-birmingham" },
      { label: "Refrigeration Bristol", href: "/locations/refrigeration-recruitment-bristol" },
      { label: "Lift Engineer Recruitment", href: "/recruitment/lift-engineer-recruitment" },
    ],
  },
  {
    slug: "gate-door-recruitment",
    metaTitle: "Gate & Door Engineer Recruitment UK",
    metaDescription:
      "Gate engineer recruitment, automatic door engineer recruitment and industrial door engineer recruitment for installation, service and maintenance UK-wide.",
    keywords: [
      "gate engineer recruitment",
      "automatic door engineer recruitment",
      "industrial door engineer recruitment",
      "roller shutter engineer jobs",
    ],
    heroEyebrow: "Gate & Door Recruitment",
    heroTitle: "Gate & Door Engineer Recruitment",
    heroDescription:
      "Specialist recruitment for gate engineers, automatic door engineers, industrial door engineers and roller shutter engineers for installation, service and maintenance roles UK-wide.",
    overview: [
      "Gate and door engineering covers automatic doors, industrial doors, roller shutters, gates and entrance systems. Finding engineers with the right installation and service experience requires sector-focused recruitment.",
      "We recruit gate engineers, automatic door engineers, industrial door engineers and roller shutter engineers for door companies, building services providers and maintenance contractors.",
      "Like lift engineering, these roles require specific product knowledge and safety awareness that generic recruiters overlook. We source candidates with relevant hands-on experience through proactive headhunting.",
      "We provide permanent gate and door engineer recruitment with proactive sourcing and headhunting for installation and service roles.",
    ],
    whyChoose: sharedWhyChoose,
    roles: [
      "Gate Engineers",
      "Automatic Door Engineers",
      "Industrial Door Engineers",
      "Roller Shutter Engineers",
      "Barrier Engineers",
    ],
    faqs: [
      {
        question: "What gate and door engineering roles do you recruit for?",
        answer:
          "We recruit gate engineers, automatic door engineers, industrial door engineers and roller shutter engineers for installation, service and maintenance roles across the UK.",
      },
    ],
    relatedLinks: [
      { label: "Gate Engineer Jobs London", href: "/locations/gate-engineer-recruitment-london" },
      { label: "Gate Engineer Jobs Midlands", href: "/locations/gate-engineer-recruitment-midlands" },
      { label: "Lift Engineer Recruitment", href: "/recruitment/lift-engineer-recruitment" },
      { label: "Fire & Security Recruitment", href: "/recruitment/fire-security-recruitment" },
    ],
  },
];

export function getRecruitmentPage(slug: string) {
  return recruitmentPages.find((page) => page.slug === slug);
}
