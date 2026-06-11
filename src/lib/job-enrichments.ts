export type JobEnrichment = {
  slug: string;
  title: string;
  location: string;
  region: string;
  salary: string;
  sector: string;
  type: "Permanent" | "Temporary" | "Contract";
  summary: string;
  overview: string[];
  responsibilities?: string[];
  requirements: string[];
  desirable?: string[];
  benefits?: string[];
  workingHours?: string;
  linkedInActivityId?: string;
};

export const jobEnrichments: JobEnrichment[] = [
  {
    slug: "fire-security-engineer-barnstaple",
    linkedInActivityId: "7463273310991187968",
    title: "Fire & Security Engineer",
    location: "Barnstaple",
    region: "Devon",
    salary: "£34,000 – £42,000",
    sector: "Fire & Security",
    type: "Permanent",
    summary:
      "Installation and commissioning engineer for fire detection, CCTV, access control and intruder alarm systems.",
    overview: [
      "We are recruiting an experienced Fire & Security Installation and Commissioning Engineer for a growing company in Barnstaple.",
      "This is a long-term opportunity with varied commercial and industrial projects, career development and the chance to join a supportive, professional team with strong growth plans.",
      "The role involves installation, commissioning, testing and handover of Fire Detection, CCTV, Access Control and Intruder Alarm systems across a range of sites.",
      "You will work from technical drawings and specifications, carrying out programming, fault finding and system testing while ensuring all work meets current regulations and British Standards.",
    ],
    benefits: [
      "Long-term opportunity with career development",
      "Varied commercial and industrial projects",
      "Supportive, professional team with growth plans",
      "Industry qualifications beneficial (FIA Units, ECS, CSCS, IPAF, PASMA)",
    ],
    requirements: [
      "At least 2 years' experience within Fire & Security",
      "Strong fault finding ability and knowledge of traditional and IP based systems",
      "Understanding of BS 5839, BS EN 50132, BS EN 50133 and BS EN 50131 (beneficial)",
      "Experience with Hikvision, Paxton, Texecom, Gent, Morley or Advanced (advantageous)",
      "Full UK driving licence and ability to pass security vetting",
    ],
  },
  {
    slug: "vehicle-technician-prestige-macclesfield",
    linkedInActivityId: "7463271826434220032",
    title: "Vehicle Technician — Prestige Specialist",
    location: "Macclesfield",
    region: "Cheshire",
    salary: "£32,000 – £44,000",
    sector: "Automotive",
    type: "Permanent",
    summary:
      "Skilled vehicle technician for an independent prestige specialist workshop.",
    overview: [
      "We are working with an independent prestige specialist in Macclesfield looking for a skilled Vehicle Technician to join their professional workshop.",
      "The role involves diagnostics, servicing, repairs and maintenance across a range of prestige vehicles, including engine, suspension, braking and electrical systems.",
      "You will use diagnostic equipment, workshop tools and technical manuals daily in an environment focused on quality workmanship and attention to detail.",
    ],
    requirements: [
      "Strong all-round mechanical ability",
      "Experience with diagnostics and fault finding",
      "Confidence working independently when required",
      "Welding experience advantageous but not essential",
      "Reliable, motivated and able to maintain high standards in a busy workshop",
    ],
  },
  {
    slug: "motor-vehicle-technician-bournemouth",
    linkedInActivityId: "7460645478108635137",
    title: "Motor Vehicle Technician",
    location: "Bournemouth",
    region: "Dorset",
    salary: "£33,000 – £40,000",
    sector: "Automotive",
    type: "Permanent",
    summary:
      "Experienced motor vehicle technician for a well established independent garage.",
    overview: [
      "Join a well established independent garage in Bournemouth with over 20 years' trading experience and a solid local reputation.",
      "The role involves servicing and repairing a wide range of vehicles including routine maintenance, brakes, clutches, exhaust systems, timing belts, diagnostics and general mechanical repairs.",
      "Monday to Friday with no weekend work — a stable role within a friendly, close-knit team.",
    ],
    benefits: [
      "Monday to Friday — no weekend work",
      "Stable role within a friendly, close-knit team",
      "Over 20 years' established local reputation",
    ],
    requirements: [
      "Strong all-round mechanical ability",
      "Good diagnostic skills",
      "Confidence working independently and as part of a small team",
      "Positive attitude and good work ethic",
    ],
  },
  {
    slug: "vehicle-technician-mot-barnstaple",
    linkedInActivityId: "7460644685779283968",
    title: "Vehicle Technician / MOT Tester",
    location: "Barnstaple",
    region: "Devon",
    salary: "£30,000 – £50,000",
    sector: "Automotive",
    type: "Permanent",
    summary:
      "Multiple technician and MOT tester opportunities with an established motor group.",
    overview: [
      "Multiple opportunities for experienced Vehicle Technicians and MOT Testers in Barnstaple with a well established motor group.",
      "Secure, long-term positions within professional workshop environments offering ongoing support and career progression.",
      "Servicing, diagnostics, repairs, fault finding and general maintenance across a variety of vehicles in busy, well-equipped workshops.",
    ],
    benefits: [
      "Cycle to work scheme and staff discounts",
      "Sick pay and life insurance",
      "Referral schemes and additional leave",
      "Ongoing training and development opportunities",
    ],
    requirements: [
      "Strong mechanical knowledge and diagnostic ability",
      "MOT licence beneficial but not essential for the right person",
      "Monday to Friday with Saturdays on a rota basis",
    ],
  },
  {
    slug: "vehicle-technician-mot-torquay",
    linkedInActivityId: "7460644413111902208",
    title: "Vehicle Technician / MOT Tester",
    location: "Torquay",
    region: "Devon",
    salary: "£30,000 – £50,000",
    sector: "Automotive",
    type: "Permanent",
    summary:
      "Multiple technician roles with a motor group investing in workshops and staff.",
    overview: [
      "Multiple Vehicle Technician and MOT Tester positions in Torquay with a well established motor group.",
      "Long-term roles within busy but supportive workshop environments where good work is recognised and progression is available.",
      "Servicing, repairs, diagnostics, fault finding and general maintenance using modern workshop equipment.",
    ],
    requirements: [
      "Strong all-round mechanical ability and good work ethic",
      "Confidence in a fast-paced workshop setting",
      "MOT licence a bonus but not essential",
      "Monday to Friday with Saturdays on a rota basis",
    ],
  },
  {
    slug: "vehicle-technician-mot-exeter",
    title: "Vehicle Technician / MOT Tester",
    location: "Exeter",
    region: "Devon",
    salary: "£30,000 – £50,000",
    sector: "Automotive",
    type: "Permanent",
    summary:
      "Professional workshop roles with long-term stability and progression.",
    overview: [
      "Multiple opportunities in Exeter with a well established motor group offering professional workshop environments and genuine progression.",
      "Servicing, repairs, diagnostics, fault finding and general vehicle maintenance across a variety of makes and models.",
      "Busy workshops with strong team environments and consistent workflow.",
    ],
    benefits: [
      "Strong benefits package including training and development",
      "Cycle to work scheme and staff discounts",
      "Sick pay, life insurance and referral schemes",
    ],
    requirements: [
      "Solid mechanical experience and attention to detail",
      "Ability to work efficiently in a fast-paced environment",
      "MOT licence an advantage but not essential",
    ],
  },
  {
    slug: "vehicle-technician-mot-plymouth",
    title: "Vehicle Technician / MOT Tester",
    location: "Plymouth",
    region: "Devon",
    salary: "£30,000 – £50,000",
    sector: "Automotive",
    type: "Permanent",
    summary:
      "Stable technician roles with a growing motor group across the South West.",
    overview: [
      "Multiple Vehicle Technician and MOT Tester opportunities in Plymouth with a well established motor group continuing to grow across the South West.",
      "Day-to-day work includes servicing, diagnostics, repairs, fault finding and general maintenance in busy, well-equipped workshops.",
      "Stable, long-term roles within professional environments that value good staff.",
    ],
    requirements: [
      "Reliable technicians with strong all-round mechanical ability",
      "Good diagnostic skills and team working ability",
      "MOT licence beneficial but not essential",
      "Monday to Friday with Saturdays on a rota basis",
    ],
  },
  {
    slug: "vehicle-technician-mot-st-austell",
    title: "Vehicle Technician / MOT Tester",
    location: "St Austell",
    region: "Cornwall",
    salary: "£30,000 – £50,000",
    sector: "Automotive",
    type: "Permanent",
    summary:
      "Technician roles with an established motor group in Cornwall.",
    overview: [
      "Experienced Vehicle Technicians and MOT Testers needed for multiple opportunities in St Austell.",
      "Positions with a well established motor group offering stable, long-term career opportunities and excellent workshop support.",
      "Servicing, repairs, diagnostics and general maintenance across a wide range of vehicles in a professional, busy workshop.",
    ],
    requirements: [
      "Good all-round mechanical knowledge and diagnostic ability",
      "Positive attitude towards teamwork and customer service",
      "MOT licence an advantage but not essential",
      "Monday to Friday with Saturdays on a rota basis",
    ],
  },
  {
    slug: "vehicle-technician-mot-truro",
    title: "Vehicle Technician / MOT Tester",
    location: "Truro",
    region: "Cornwall",
    salary: "£30,000 – £50,000",
    sector: "Automotive",
    type: "Permanent",
    summary:
      "Multiple roles with a family run motor group in Cornwall.",
    overview: [
      "A family run motor group in Cornwall is looking for multiple Vehicle Technicians and MOT Testers for workshop teams in Truro.",
      "Long-term positions within a supportive business that values staff and offers strong career progression.",
      "Servicing, maintenance, repairs, diagnostics, fault finding, road testing and repair work in a professional environment.",
    ],
    requirements: [
      "Solid hands-on experience and strong work ethic",
      "Good diagnostic ability and attention to detail",
      "MOT testing experience a benefit but not essential",
      "Monday to Friday with Saturdays on a rota basis",
    ],
  },
];

const linkedInSlugAliases: Record<string, string> = {
  "fire-security-engineer-34000-42000": "fire-security-engineer-barnstaple",
  "vehicle-technician-prestige-specialist": "vehicle-technician-prestige-macclesfield",
  "motor-vehicle-technician-bournemouth-33000": "motor-vehicle-technician-bournemouth",
  "vehicle-technician-mot-tester-barnstaple": "vehicle-technician-mot-barnstaple",
  "vehicle-technician-mot-tester-torquay": "vehicle-technician-mot-torquay",
  "vehicle-technician-mot-tester-exeter": "vehicle-technician-mot-exeter",
  "vehicle-technician-mot-tester-plymouth": "vehicle-technician-mot-plymouth",
  "vehicle-technician-mot-tester-st-austell": "vehicle-technician-mot-st-austell",
  "vehicle-technician-mot-tester-truro": "vehicle-technician-mot-truro",
};

export function getSupplementalActivityIds(): string[] {
  const fromEnv =
    process.env.LINKEDIN_ACTIVITY_IDS?.split(",")
      .map((value) => value.trim())
      .filter(Boolean) ?? [];

  const fromEnrichments = jobEnrichments
    .map((job) => job.linkedInActivityId)
    .filter((value): value is string => Boolean(value));

  return [...new Set([...fromEnv, ...fromEnrichments])];
}

export function getEnrichmentByActivityId(activityId: string) {
  return jobEnrichments.find((job) => job.linkedInActivityId === activityId);
}

export function getEnrichmentByLinkedInSlug(linkedInSlug: string) {
  const normalized =
    linkedInSlugAliases[linkedInSlug] ??
    linkedInSlug.replace(/-\d+$/, "").replace(/-plus-overtime$/, "");

  return jobEnrichments.find(
    (job) =>
      job.slug === normalized ||
      job.slug.startsWith(`${normalized}-`) ||
      normalized.startsWith(job.slug)
  );
}

export function getEnrichmentBySlug(slug: string) {
  return jobEnrichments.find((job) => job.slug === slug);
}
