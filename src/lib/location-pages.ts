import { ukWideMessage } from "./constants";

export type LocationPageContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  role: string;
  location: string;
  region: string;
  heroTitle: string;
  heroDescription: string;
  overview: string[];
  roles: string[];
  faqs: { question: string; answer: string }[];
  relatedLinks: { label: string; href: string }[];
};

function locationCoverageNote(location: string): string {
  return `${ukWideMessage} While this page focuses on ${location}, JLD Recruit works UK-wide — we are not a local-only agency.`;
}

function buildVehicleTechnicianLocation(
  location: string,
  region: string,
  slugSuffix: string,
  extraOverview?: string
): LocationPageContent {
  const slug = `vehicle-technician-recruitment-${slugSuffix}`;
  return {
    slug,
    role: "Vehicle Technician",
    location,
    region,
    metaTitle: `Vehicle Technician Recruitment ${location}`,
    metaDescription: `Vehicle technician and MOT tester recruitment in ${location}, ${region}. JLD Recruit Ltd finds skilled mechanics and workshop staff for garages and motor groups.`,
    keywords: [
      `vehicle technician jobs ${location}`,
      `MOT tester recruitment ${location}`,
      `mechanic jobs ${region}`,
      `garage recruitment ${location}`,
    ],
    heroTitle: `Vehicle Technician Recruitment ${location}`,
    heroDescription: `Specialist vehicle technician and MOT tester recruitment in ${location} and across ${region}. We help garages, dealerships and motor groups find skilled mechanics through proactive sourcing and headhunting.`,
    overview: [
      `Recruiting skilled vehicle technicians in ${location} is competitive. Good mechanics and MOT testers are in demand, and the best candidates are often already employed — which is why a proactive recruitment approach matters.`,
      `JLD Recruit Ltd supports employers in ${location} and across ${region} with permanent vehicle technician recruitment, MOT tester sourcing and workshop staff hiring. You deal directly with James — no call centres, no generic job board service.`,
      `We headhunt, screen and shortlist candidates who match your workshop requirements, salary expectations and team culture. Whether you need one technician or multiple MOT testers, we provide honest communication throughout.`,
      extraOverview ||
        `We also support motor groups and employers across ${region} and nationwide with automotive recruitment for prestige specialists, diagnostic technicians and workshop supervisors.`,
      locationCoverageNote(location),
    ],
    roles: [
      "Vehicle Technicians",
      "MOT Testers",
      "Diagnostic Technicians",
      "Master Technicians",
      "Mobile Vehicle Technicians",
    ],
    faqs: [
      {
        question: `Do you recruit vehicle technicians in ${location}?`,
        answer: `Yes. We actively recruit vehicle technicians, MOT testers and workshop mechanics in ${location} and across ${region}. View our current jobs page for live vacancies or contact us to discuss your hiring needs.`,
      },
      {
        question: "Is your service free for candidates?",
        answer:
          "Yes. Our recruitment service is free for candidates. We are paid by employers when a successful placement is made.",
      },
    ],
    relatedLinks: [
      { label: "View Current Jobs", href: "/jobs" },
      { label: "Vehicle Technician Recruitment", href: "/recruitment/vehicle-technician-recruitment" },
      { label: "Automotive Recruitment", href: "/recruitment/automotive-recruitment" },
    ],
  };
}

function buildHgvLocation(city: string, slugSuffix: string): LocationPageContent {
  return {
    slug: `hgv-recruitment-${slugSuffix}`,
    role: "HGV Technician",
    location: city,
    region: "UK",
    metaTitle: `HGV Technician Recruitment ${city}`,
    metaDescription: `HGV and commercial vehicle technician recruitment in ${city}. Fleet maintenance engineers, trailer technicians and workshop mechanics across the UK.`,
    keywords: [
      `HGV technician jobs ${city}`,
      `commercial vehicle mechanic ${city}`,
      `HGV recruitment ${city}`,
    ],
    heroTitle: `HGV Technician Recruitment ${city}`,
    heroDescription: `HGV and commercial vehicle technician recruitment in ${city} and surrounding areas. We find skilled fleet maintenance engineers and workshop mechanics for transport operators and commercial vehicle workshops.`,
    overview: [
      `HGV technician recruitment in ${city} requires understanding of heavy vehicle diagnostics, fleet maintenance and the certifications relevant to commercial workshops.`,
      `JLD Recruit Ltd recruits HGV technicians, commercial vehicle mechanics and fleet maintenance engineers for workshops and transport operators in ${city} and across the UK.`,
      `Our proactive headhunting approach reaches employed technicians who may be open to the right opportunity — particularly valuable for hard-to-fill fleet and workshop roles.`,
      `Permanent HGV recruitment for workshops and transport operators in ${city} and across the UK.`,
      locationCoverageNote(city),
    ],
    roles: [
      "HGV Technicians",
      "Commercial Vehicle Mechanics",
      "Fleet Maintenance Engineers",
      "Trailer Technicians",
    ],
    faqs: [
      {
        question: `Do you recruit HGV technicians in ${city}?`,
        answer: `Yes. We support HGV and commercial vehicle technician recruitment in ${city} and nationwide. Contact James to discuss your vacancy requirements.`,
      },
    ],
    relatedLinks: [
      { label: "HGV Recruitment", href: "/recruitment/hgv-recruitment" },
      { label: "Current Jobs", href: "/jobs" },
    ],
  };
}

function buildLiftLocation(city: string, slugSuffix: string): LocationPageContent {
  return {
    slug: `lift-engineer-recruitment-${slugSuffix}`,
    role: "Lift Engineer",
    location: city,
    region: "UK",
    metaTitle: `Lift Engineer Recruitment ${city}`,
    metaDescription: `Lift engineer recruitment in ${city}. Service, installation and maintenance engineers for lift companies and building services providers.`,
    keywords: [
      `lift engineer jobs ${city}`,
      `escalator engineer recruitment ${city}`,
      `lift engineer recruitment ${city}`,
    ],
    heroTitle: `Lift Engineer Recruitment ${city}`,
    heroDescription: `Specialist lift engineer recruitment in ${city}. We find service engineers, installation engineers and escalator engineers for lift companies and building services businesses.`,
    overview: [
      `Lift engineer recruitment in ${city} demands sector-specific knowledge. Employers need engineers with relevant safety training, product experience and the ability to work independently on service and installation projects.`,
      `JLD Recruit Ltd recruits lift engineers, escalator engineers and lift service engineers for companies in ${city} and across the UK through proactive sourcing and headhunting.`,
      `We understand the difference between service, repair and installation roles — and we screen candidates for the qualifications and experience your business requires.`,
      locationCoverageNote(city),
    ],
    roles: [
      "Lift Service Engineers",
      "Lift Repair Engineers",
      "Lift Installation Engineers",
      "Lift Modernisation Engineers",
    ],
    faqs: [
      {
        question: `Do you recruit lift engineers in ${city}?`,
        answer: `Yes. We provide lift engineer recruitment support in ${city} and nationwide for service, maintenance and installation roles.`,
      },
    ],
    relatedLinks: [
      { label: "Lift Engineer Recruitment", href: "/recruitment/lift-engineer-recruitment" },
      { label: "Gate & Door Recruitment", href: "/recruitment/gate-door-recruitment" },
    ],
  };
}

function buildFireSecurityLocation(
  location: string,
  slugSuffix: string,
  region = "UK"
): LocationPageContent {
  return {
    slug: `fire-security-recruitment-${slugSuffix}`,
    role: "Fire & Security Engineer",
    location,
    region,
    metaTitle: `Fire & Security Engineer Recruitment ${location}`,
    metaDescription: `Fire and security engineer recruitment in ${location}. Installation, commissioning and service engineers for fire alarm, CCTV and access control systems.`,
    keywords: [
      `fire and security engineer jobs ${location}`,
      `fire alarm engineer recruitment ${location}`,
      `CCTV engineer jobs ${location}`,
    ],
    heroTitle: `Fire & Security Engineer Recruitment ${location}`,
    heroDescription: `Fire and security engineer recruitment in ${location}. We recruit installation, commissioning and service engineers for fire detection, CCTV, access control and intruder alarm systems.`,
    overview: [
      `Fire and security recruitment in ${location} requires engineers who understand relevant British Standards, system programming, fault finding and the practical realities of commercial installations.`,
      `JLD Recruit Ltd recruits fire alarm engineers, security engineers, CCTV installers and access control engineers for growing companies in ${location} and across ${region}.`,
      `We use proactive sourcing to reach experienced engineers — including those not actively applying on job boards — for both installation and maintenance roles.`,
      locationCoverageNote(location),
    ],
    roles: [
      "Fire Alarm Engineers",
      "Security Engineers",
      "CCTV Installers",
      "Access Control Engineers",
      "Commissioning Engineers",
    ],
    faqs: [
      {
        question: `Do you recruit fire and security engineers in ${location}?`,
        answer: `Yes. We actively recruit fire and security engineers in ${location}. Check our jobs page for current vacancies or contact us about your hiring requirements.`,
      },
    ],
    relatedLinks: [
      { label: "Fire & Security Recruitment", href: "/recruitment/fire-security-recruitment" },
      { label: "Current Jobs", href: "/jobs" },
    ],
  };
}

function buildRefrigerationLocation(
  location: string,
  slugSuffix: string
): LocationPageContent {
  return {
    slug: `refrigeration-recruitment-${slugSuffix}`,
    role: "Refrigeration Engineer",
    location,
    region: slugSuffix === "south-west" ? "South West" : "UK",
    metaTitle: `Refrigeration Engineer Recruitment ${location}`,
    metaDescription: `Refrigeration, HVAC and air conditioning engineer recruitment in ${location}. Chiller, F-Gas and service engineers UK-wide.`,
    keywords: [
      `refrigeration engineer jobs ${location}`,
      `HVAC recruitment ${location}`,
      `air conditioning engineer ${location}`,
      `refrigeration recruitment ${location}`,
    ],
    heroTitle: `Refrigeration Engineer Recruitment ${location}`,
    heroDescription: `Refrigeration, HVAC and air conditioning engineer recruitment in ${location}. We find chiller engineers, F-Gas technicians and service engineers for commercial and industrial clients UK-wide.`,
    overview: [
      `Refrigeration and HVAC recruitment in ${location} requires engineers with relevant F-Gas qualifications, commercial system experience and strong service skills.`,
      `JLD Recruit Ltd recruits refrigeration engineers, chiller engineers, air conditioning engineers and HVAC technicians for service companies and contractors in ${location} and across the UK.`,
      `Our proactive headhunting approach helps employers reach experienced engineers who are not always visible on job boards.`,
      locationCoverageNote(location),
    ],
    roles: [
      "Refrigeration Engineers",
      "HVAC Engineers",
      "Chiller Engineers",
      "Air Conditioning Engineers",
      "Commercial Refrigeration Engineers",
    ],
    faqs: [
      {
        question: `Do you recruit refrigeration engineers in ${location}?`,
        answer: `Yes. We provide refrigeration and HVAC recruitment support in ${location} and nationwide. Contact James to discuss your vacancy.`,
      },
    ],
    relatedLinks: [
      { label: "Refrigeration Recruitment", href: "/recruitment/refrigeration-recruitment" },
      { label: "Current Jobs", href: "/jobs" },
    ],
  };
}

function buildGateLocation(
  location: string,
  slugSuffix: string,
  region = "UK"
): LocationPageContent {
  return {
    slug: `gate-engineer-recruitment-${slugSuffix}`,
    role: "Gate Engineer",
    location,
    region,
    metaTitle: `Gate Engineer Recruitment ${location}`,
    metaDescription: `Gate, automatic door and industrial door engineer recruitment in ${location}. Installation, service and maintenance engineers UK-wide.`,
    keywords: [
      `gate engineer jobs ${location}`,
      `automatic door engineer recruitment ${location}`,
      `industrial door engineer ${location}`,
    ],
    heroTitle: `Gate Engineer Recruitment ${location}`,
    heroDescription: `Gate, automatic door and industrial door engineer recruitment in ${location}. We recruit installation, service and maintenance engineers for door companies and building services providers UK-wide.`,
    overview: [
      `Gate and door engineering recruitment in ${location} requires engineers with product knowledge across automatic doors, industrial doors, roller shutters and entrance systems.`,
      `JLD Recruit Ltd recruits gate engineers, automatic door engineers, industrial door engineers and roller shutter engineers for companies in ${location} and across ${region}.`,
      `Our headhunting approach reaches experienced engineers who may not be actively applying online — particularly valuable for hard-to-fill service roles.`,
      locationCoverageNote(location),
    ],
    roles: [
      "Gate Engineers",
      "Automatic Door Engineers",
      "Industrial Door Engineers",
      "Roller Shutter Engineers",
      "Barrier Engineers",
    ],
    faqs: [
      {
        question: `Do you recruit gate engineers in ${location}?`,
        answer: `Yes. We provide gate and door engineer recruitment support in ${location} and nationwide. Contact James to discuss your hiring requirements.`,
      },
    ],
    relatedLinks: [
      { label: "Gate & Door Recruitment", href: "/recruitment/gate-door-recruitment" },
      { label: "Current Jobs", href: "/jobs" },
    ],
  };
}

export const locationPages: LocationPageContent[] = [
  buildVehicleTechnicianLocation("Devon", "the South West", "devon"),
  buildVehicleTechnicianLocation("Cornwall", "the South West", "cornwall"),
  buildVehicleTechnicianLocation("Plymouth", "Devon", "plymouth"),
  buildVehicleTechnicianLocation("Exeter", "Devon", "exeter"),
  buildVehicleTechnicianLocation("Torquay", "Devon", "torquay"),
  buildVehicleTechnicianLocation("Barnstaple", "Devon", "barnstaple"),
  buildVehicleTechnicianLocation("Bournemouth", "Dorset", "bournemouth"),
  buildVehicleTechnicianLocation("Macclesfield", "Cheshire", "macclesfield"),
  buildHgvLocation("Nottingham", "nottingham"),
  buildHgvLocation("Birmingham", "birmingham"),
  buildHgvLocation("Manchester", "manchester"),
  buildHgvLocation("Leeds", "leeds"),
  buildHgvLocation("London", "london"),
  buildHgvLocation("Devon", "devon"),
  buildLiftLocation("London", "london"),
  buildLiftLocation("Birmingham", "birmingham"),
  buildLiftLocation("Manchester", "manchester"),
  buildLiftLocation("Glasgow", "glasgow"),
  buildLiftLocation("Devon", "devon"),
  buildFireSecurityLocation("Birmingham", "birmingham"),
  buildFireSecurityLocation("Manchester", "manchester"),
  buildFireSecurityLocation("Devon", "devon", "the South West"),
  buildFireSecurityLocation("Cornwall", "cornwall", "the South West"),
  buildFireSecurityLocation("London", "london"),
  buildFireSecurityLocation("Essex", "essex", "East Anglia"),
  buildFireSecurityLocation("Yorkshire", "yorkshire", "Yorkshire & Lancashire"),
  buildFireSecurityLocation("Cheshire", "cheshire", "the North West"),
  buildFireSecurityLocation("Dorset", "dorset", "the South West"),
  buildFireSecurityLocation("Barnstaple", "barnstaple", "Devon"),
  buildFireSecurityLocation("Midlands", "midlands"),
  buildRefrigerationLocation("London", "london"),
  buildRefrigerationLocation("Birmingham", "birmingham"),
  buildRefrigerationLocation("Bristol", "bristol"),
  buildRefrigerationLocation("South West", "south-west"),
  buildGateLocation("London", "london"),
  buildGateLocation("Midlands", "midlands"),
  buildGateLocation("Colchester", "colchester", "Essex"),
  buildVehicleTechnicianLocation("Bristol", "Avon", "bristol"),
];

export const coverageAreas = [
  // Major cities — England
  "London",
  "Birmingham",
  "Manchester",
  "Leeds",
  "Liverpool",
  "Sheffield",
  "Bristol",
  "Newcastle",
  "Nottingham",
  "Leicester",
  "Coventry",
  "Southampton",
  "Portsmouth",
  "Brighton",
  "Reading",
  "Milton Keynes",
  "Oxford",
  "Cambridge",
  "Norwich",
  "Derby",
  "Stoke-on-Trent",
  "Wolverhampton",
  "Hull",
  "York",
  "Middlesbrough",
  "Sunderland",
  "Blackpool",
  "Preston",
  "Bolton",
  "Swindon",
  "Gloucester",
  "Cheltenham",
  "Bath",
  // Major cities — Scotland
  "Edinburgh",
  "Glasgow",
  "Aberdeen",
  "Dundee",
  // Major cities — Wales
  "Cardiff",
  "Swansea",
  // South West (core activity)
  "Devon",
  "Cornwall",
  "Plymouth",
  "Exeter",
  "Torquay",
  "Bournemouth",
  "Dorset",
  // Regions
  "Cheshire",
  "Lancashire",
  "Yorkshire",
  "Midlands",
  "North West",
  "North East",
  "South East",
  "East Anglia",
  "Wales",
  "Scotland",
];

export function getLocationPage(slug: string) {
  return locationPages.find((page) => page.slug === slug);
}
