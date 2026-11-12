export type VacancyStatus = "draft" | "open" | "paused" | "filled" | "closed";

export type PayFrequency = "hour" | "day" | "week" | "month" | "year";

export type Vacancy = {
  id: string;
  slug: string;
  title: string;
  sector: string;
  location: string;
  region?: string;
  salary?: string;
  payFrequency?: PayFrequency;
  workingHours?: string;
  employmentType?: string;
  summary: string;
  overview: string[];
  responsibilities: string[];
  requirements: string[];
  desirable: string[];
  benefits: string[];
  applicationMethod: "email";
  linkedInUrl?: string;
  publishedOn?: string;
  closingOn?: string;
  /** Manual listing order. Lower numbers appear first. It does not affect dates or indexing. */
  displayOrder: number;
  status: VacancyStatus;
  employerConfidential: boolean;
  seoTitle: string;
  metaDescription: string;
  publicationApproved: boolean;
  approvalNotes: string[];
};

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PLACEHOLDER_PATTERN =
  /\b(not confirmed|unconfirmed|to confirm|tbc|todo|lorem|contact us for details|placeholder)\b/i;

function isRealDate(value: string) {
  if (!DATE_PATTERN.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function publicStrings(vacancy: Vacancy) {
  return [
    vacancy.title,
    vacancy.sector,
    vacancy.location,
    vacancy.region ?? "",
    vacancy.salary ?? "",
    vacancy.workingHours ?? "",
    vacancy.employmentType ?? "",
    vacancy.linkedInUrl ?? "",
    vacancy.summary,
    vacancy.seoTitle,
    vacancy.metaDescription,
    ...vacancy.overview,
    ...vacancy.responsibilities,
    ...vacancy.requirements,
    ...(vacancy.desirable ?? []),
    ...(vacancy.benefits ?? []),
  ];
}

function openRecordProblems(vacancy: Vacancy) {
  if (vacancy.status !== "open") {
    return [];
  }

  const problems: string[] = [];

  if (!vacancy.publicationApproved) {
    problems.push("publication has not been approved");
  }
  if (!vacancy.title.trim()) problems.push("missing title");
  if (!vacancy.sector.trim()) problems.push("missing sector");
  if (!vacancy.location.trim()) problems.push("missing location");
  if (!vacancy.summary.trim()) problems.push("missing summary");
  if (!Number.isInteger(vacancy.displayOrder) || vacancy.displayOrder < 1) {
    problems.push("missing display order");
  }
  if (vacancy.overview.length === 0) problems.push("missing role description");
  if (vacancy.responsibilities.length === 0) problems.push("missing responsibilities");
  if (vacancy.requirements.length === 0) problems.push("missing requirements");
  if (vacancy.applicationMethod !== "email") {
    problems.push("application method must be email");
  }

  return problems;
}

export function assertVacancyDataset(records = vacancies) {
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const vacancy of records) {
    if (ids.has(vacancy.id)) {
      throw new Error(`Duplicate vacancy id: ${vacancy.id}`);
    }
    if (slugs.has(vacancy.slug)) {
      throw new Error(`Duplicate vacancy slug: ${vacancy.slug}`);
    }

    ids.add(vacancy.id);
    slugs.add(vacancy.slug);

    if (!SLUG_PATTERN.test(vacancy.slug)) {
      throw new Error(`Invalid vacancy slug: ${vacancy.slug}`);
    }

    for (const value of [vacancy.publishedOn, vacancy.closingOn]) {
      if (value && !isRealDate(value)) {
        throw new Error(`Invalid vacancy date on ${vacancy.id}: ${value}`);
      }
    }

    if (
      vacancy.publishedOn &&
      vacancy.closingOn &&
      vacancy.closingOn < vacancy.publishedOn
    ) {
      throw new Error(`Closing date is before publication date on ${vacancy.id}`);
    }

    for (const value of publicStrings(vacancy)) {
      if (PLACEHOLDER_PATTERN.test(value)) {
        throw new Error(
          `Vacancy ${vacancy.id} has unfinished wording in a public field.`
        );
      }
    }

    const problems = openRecordProblems(vacancy);
    if (problems.length > 0) {
      throw new Error(
        `Vacancy ${vacancy.id} is marked open but cannot be published: ${problems.join(", ")}.`
      );
    }
  }

  const orders = records
    .filter((vacancy) => vacancy.status === "open")
    .map((vacancy) => vacancy.displayOrder);
  const uniqueOrders = new Set(orders);
  if (uniqueOrders.size !== orders.length) {
    throw new Error("Open vacancies must have a unique display order.");
  }
}

export function getVacancies() {
  return vacancies;
}

export function getPublishableVacancies() {
  assertVacancyDataset();

  return vacancies
    .filter((vacancy) => vacancy.status === "open" && vacancy.publicationApproved)
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getVacancyBySlug(slug: string) {
  return vacancies.find((vacancy) => vacancy.slug === slug);
}

export function getPublicVacancySlugs() {
  return vacancies
    .filter((vacancy) => vacancy.status !== "draft")
    .map((vacancy) => vacancy.slug);
}

const legacyFillerNote =
  "Generic responsibilities, desirable points or working hours previously added by the website template have not been copied. This filled vacancy has no JobPosting data.";

const verifiedLinkedInDateNote =
  "The structured-data date is the verified LinkedIn publication date. It is fixed, it is not shown on the page, and it must not be replaced with a build date.";

const preservedOpenNote =
  "The existing public URL and salary are unchanged. The page uses the approved layout and the facts already published for this vacancy.";

/**
 * No earlier advertisement date was found for the newly approved vacancies.
 * Leave this unset until their first publication date is confirmed.
 * Do not fill it from the build clock.
 */
export const NEW_VACANCIES_FIRST_PUBLISHED_ON: string | undefined = undefined;

function openVacancy(
  vacancy: Omit<
    Vacancy,
    | "status"
    | "publicationApproved"
    | "applicationMethod"
    | "employerConfidential"
    | "desirable"
    | "benefits"
  > &
    Partial<Pick<Vacancy, "desirable" | "benefits">>
): Vacancy {
  return {
    ...vacancy,
    desirable: vacancy.desirable ?? [],
    benefits: vacancy.benefits ?? [],
    payFrequency:
      vacancy.payFrequency ??
      (vacancy.salary && /£/.test(vacancy.salary) && !/per hour/i.test(vacancy.salary)
        ? "year"
        : undefined),
    applicationMethod: "email",
    employerConfidential: true,
    employmentType: vacancy.employmentType ?? "Permanent",
    status: "open",
    publicationApproved: true,
    publishedOn: vacancy.publishedOn ?? NEW_VACANCIES_FIRST_PUBLISHED_ON,
  };
}

export const vacancies: Vacancy[] = [
  openVacancy({
    id: "jld-0017",
    displayOrder: 3,
    slug: "lift-service-call-out-engineer-london",
    title: "Lift Service & Call Out Engineer",
    sector: "Lifts",
    location: "London",
    salary: "£42,500 to £50,000",
    summary:
      "Lift Service & Call Out Engineer maintaining and responding to faults on passenger lift equipment across London.",
    overview: [
      "This Lift Service and Call Out Engineer role covers passenger lift equipment across London. The engineer carries out routine servicing and also attends reported faults, diagnosing the cause and completing the repair. Each visit is documented and discussed with the site contact so the lift can be returned to use.",
    ],
    responsibilities: [
      "Carry out routine servicing on passenger lifts across London.",
      "Attend reported lift faults.",
      "Diagnose faults and complete the repair.",
      "Document the work and communicate with the site contact.",
    ],
    requirements: [
      "Practical experience servicing passenger lifts is essential.",
      "Practical experience fault-finding on lifts is essential.",
    ],
    seoTitle: "Lift Service & Call Out Engineer in London",
    metaDescription:
      "Lift servicing and fault response role in London, advertised by JLD Recruit Ltd. Salary £42,500 to £50,000.",
    approvalNotes: [
      "Draft advert 1. Working hours and benefits were not confirmed and are omitted.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0018",
    displayOrder: 5,
    slug: "lift-service-call-out-engineer-north-wales-north-west",
    title: "Lift Service & Call Out Engineer",
    sector: "Lifts",
    location: "North Wales and North West England",
    salary: "£40,000 to £45,000",
    summary:
      "Lift Service & Call Out Engineer supporting servicing and breakdown response across North Wales and North West England.",
    overview: [
      "This Lift Service and Call Out Engineer role covers planned servicing and breakdown response across North Wales and North West England. The engineer services the equipment, identifies and resolves faults, and records the maintenance findings together with any repair recommendations. The territory is wider than a single city route.",
    ],
    responsibilities: [
      "Perform planned lift servicing across North Wales and North West England.",
      "Respond to lift breakdowns in that territory.",
      "Identify and resolve lift faults.",
      "Record maintenance findings and repair recommendations.",
    ],
    requirements: [
      "Relevant lift servicing experience is essential.",
      "Relevant lift fault-finding experience is essential.",
    ],
    seoTitle: "Lift Service & Call Out Engineer in North Wales and the North West",
    metaDescription:
      "Lift servicing and breakdown response role across North Wales and North West England, advertised by JLD Recruit Ltd.",
    approvalNotes: [
      "Draft advert 2. Working hours and benefits were not confirmed and are omitted.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0019",
    displayOrder: 1,
    slug: "lift-service-manager-midlands",
    title: "Lift Service Manager",
    sector: "Lifts",
    location: "Midlands and M6 corridor",
    salary: "Approximately £50,000, depending on experience",
    summary:
      "Lift Service Manager overseeing lift service operations across the Midlands and M6 corridor.",
    overview: [
      "This is a Lift Service Manager role for the Midlands and the M6 corridor, not a hands-on installation post. The manager oversees lift service operations, coordinates the service activity, supports engineers with technical problem-solving, and keeps service quality and customer communication consistent. The salary is approximately £50,000, depending on experience.",
    ],
    responsibilities: [
      "Oversee lift service operations across the Midlands and M6 corridor.",
      "Coordinate day-to-day service activity.",
      "Support engineers with technical problem-solving.",
      "Maintain service quality and communication with customers.",
    ],
    requirements: ["Experience managing or supervising lift service operations is essential."],
    seoTitle: "Lift Service Manager for the Midlands and M6 corridor",
    metaDescription:
      "Lift service management role across the Midlands and M6 corridor, advertised by JLD Recruit Ltd.",
    approvalNotes: [
      "Draft advert 3. Working hours and benefits were not confirmed and are omitted.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0003",
    displayOrder: 8,
    slug: "lift-installation-engineer-liverpool-manchester-stoke",
    title: "Lift Installation Engineer",
    sector: "Lifts",
    location: "Liverpool, Manchester and Stoke-on-Trent region",
    salary: "Up to £50,000",
    workingHours: "Monday to Friday, 8am to 5pm; occasional UK travel",
    summary:
      "Lift Installation Engineer installing lift equipment across Liverpool, Manchester and Stoke-on-Trent, with occasional UK travel.",
    overview: [
      "This Lift Installation Engineer role covers installation projects across Liverpool, Manchester and Stoke-on-Trent, with occasional travel elsewhere in the UK. The engineer installs the equipment, follows site and equipment safety procedures, and reports progress and issues. Hours are Monday to Friday, 8am to 5pm. An NVQ Level 3 in Lift Engineering and previous installation experience are both essential.",
    ],
    responsibilities: [
      "Install lift equipment across Liverpool, Manchester and Stoke-on-Trent.",
      "Travel elsewhere in the UK when a project requires it.",
      "Follow site and equipment safety procedures.",
      "Coordinate installation progress and report issues.",
    ],
    requirements: [
      "NVQ Level 3 in Lift Engineering is essential.",
      "Previous lift installation experience is essential.",
    ],
    seoTitle: "Lift Installation Engineer in Liverpool, Manchester and Stoke-on-Trent",
    metaDescription:
      "Lift installation role across Liverpool, Manchester and Stoke-on-Trent, advertised by JLD Recruit Ltd. Salary up to £50,000.",
    approvalNotes: [
      "Draft advert 4. Benefits were not confirmed and are omitted.",
      "Earlier extra requirements and benefits from a previous draft were not copied.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0012",
    displayOrder: 2,
    slug: "security-engineer-hale",
    title: "Security Engineer",
    sector: "Fire & Security",
    location: "Hale",
    region: "Cheshire",
    salary: "Up to £45,000",
    workingHours: "Monday to Friday, 7:30am to 4:30pm; no call-out rota",
    summary:
      "Security Engineer working on intruder alarm, CCTV and access control systems in Hale, Cheshire.",
    overview: [
      "This Security Engineer role in Hale, Cheshire covers intruder alarm, CCTV and access control systems. The work is installation, servicing and fault-finding, including diagnosing system issues and keeping accurate job records.",
    ],
    responsibilities: [
      "Install intruder alarm, CCTV and access control systems.",
      "Service those security systems.",
      "Fault-find and diagnose system issues.",
      "Maintain accurate job records.",
    ],
    requirements: [
      "Experience with intruder alarm systems is essential.",
      "Experience with CCTV systems is essential.",
      "Experience with access control systems is essential.",
    ],
    benefits: [
      "Company van and fuel card.",
      "Tools, PPE and uniform.",
      "28 days holiday including bank holidays.",
      "Additional holiday with service.",
    ],
    seoTitle: "Security Engineer in Hale, Cheshire",
    metaDescription:
      "Security systems role in Hale, Cheshire, advertised by JLD Recruit Ltd. Salary up to £45,000.",
    approvalNotes: [
      "Draft advert 5. Wording expanded for the local design review from the confirmed systems, duties, requirements and benefits only.",
      "Internal vacancy count 2. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0002",
    displayOrder: 7,
    slug: "air-conditioning-service-engineer-cambridge",
    title: "Air Conditioning Service Engineer",
    sector: "Air Conditioning",
    location: "Cambridge and surrounding area",
    salary: "£40,000 to £50,000",
    workingHours: "Monday to Friday, 8am to 4:30pm; no current on-call rota",
    summary:
      "Air Conditioning Service Engineer servicing and maintaining air conditioning systems in the Cambridge area.",
    overview: [
      "This Air Conditioning Service Engineer role covers planned servicing and fault investigation on air conditioning systems in Cambridge and the surrounding area. The work includes leak and pressure testing where the job requires it, and the service documentation is completed afterwards. Hours are Monday to Friday, 8am to 4:30pm, and there is no current on-call rota. An F-Gas qualification and relevant service experience are both required.",
    ],
    responsibilities: [
      "Carry out planned servicing of air conditioning systems in the Cambridge area.",
      "Investigate faults on those systems.",
      "Perform leak and pressure testing where required.",
      "Complete the service documentation.",
    ],
    requirements: [
      "An F-Gas qualification is required.",
      "Relevant air conditioning service experience is required.",
    ],
    benefits: [
      "Company van.",
      "Door-to-door pay.",
      "Overtime at 1.5x before 7am and after 6pm.",
    ],
    seoTitle: "Air Conditioning Service Engineer in Cambridge",
    metaDescription:
      "Air conditioning service role in Cambridge and the surrounding area, advertised by JLD Recruit Ltd.",
    approvalNotes: [
      "Draft advert 6.",
      "Internal vacancy count 2. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0001",
    displayOrder: 9,
    slug: "hgv-mechanic-technician-tipton",
    title: "HGV Mechanic / Technician",
    sector: "Automotive & HGV",
    location: "Tipton",
    salary: "£40,000 to £50,000",
    workingHours: "Monday to Friday, 9am to 6pm; occasional compulsory Saturdays",
    summary: "HGV Mechanic / Technician maintaining, diagnosing and repairing heavy goods vehicles in Tipton.",
    overview: [
      "This HGV Mechanic and Technician role in Tipton covers inspection, servicing, diagnosis and repair of heavy goods vehicles. Faults may be mechanical or electrical, and the completed work is recorded. Hours are Monday to Friday, 9am to 6pm, with occasional compulsory Saturdays. Hands-on HGV experience is essential. Formal qualifications are not essential.",
    ],
    responsibilities: [
      "Inspect and service heavy goods vehicles in Tipton.",
      "Identify mechanical faults.",
      "Identify electrical faults.",
      "Complete repairs and maintenance records.",
    ],
    requirements: [
      "Relevant hands-on HGV technician experience is essential.",
      "Formal qualifications are not essential.",
    ],
    seoTitle: "HGV Mechanic / Technician in Tipton",
    metaDescription:
      "HGV mechanic and technician role in Tipton, advertised by JLD Recruit Ltd. Salary £40,000 to £50,000.",
    approvalNotes: [
      "Draft advert 7. Overtime arrangements were not confirmed and are omitted.",
      "Internal vacancy count 2. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0020",
    displayOrder: 20,
    slug: "hgv-technician-preston",
    title: "HGV Technician",
    sector: "Automotive & HGV",
    location: "Preston",
    salary: "Approximately £24.60 per hour, depending on experience",
    payFrequency: "hour",
    workingHours: "Four-on, four-off rota. Night work is a separate vacancy and is not part of this rota.",
    summary: "HGV Technician diagnosing, servicing and repairing HGVs in a Preston workshop.",
    overview: [
      "This HGV Technician role is workshop-based in Preston and covers inspection, diagnostics, servicing and repair. The advertised pattern is a four-on, four-off rota. Night work is being recruited separately and is not an additional shift on this rota, so applicants for the four-on, four-off vacancies are not being asked to cover nights as part of the same pattern. Practical HGV experience is accepted, and formal qualifications are not essential.",
    ],
    responsibilities: [
      "Carry out HGV inspections in the Preston workshop.",
      "Carry out diagnostics.",
      "Complete servicing and repairs.",
      "Maintain safe and accurate workshop records.",
    ],
    requirements: [
      "Relevant practical HGV experience is essential.",
      "Formal qualifications are not essential.",
    ],
    benefits: [
      "Manufacturer training.",
      "Pension.",
      "Life insurance.",
      "Free parking.",
      "Christmas bonus/turkey.",
    ],
    seoTitle: "HGV Technician in Preston",
    metaDescription:
      "HGV workshop technician role in Preston, advertised by JLD Recruit Ltd. Pay is approximately £24.60 per hour.",
    approvalNotes: [
      "Draft advert 8. Exact day and night shift times were not confirmed and remain omitted.",
      "The public hours no longer describe night work as part of the four-on, four-off rota. Headcount is not displayed.",
      "Internal vacancy count 4. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0008",
    displayOrder: 14,
    slug: "industrial-door-roller-shutter-fitter-stockton-on-tees",
    title: "Industrial Door / Roller Shutter Fitter",
    sector: "Industrial Doors",
    location: "Stockton-on-Tees",
    salary: "£20 per hour",
    payFrequency: "hour",
    workingHours: "Monday to Friday, 8am to 5pm; no routine weekend work or call-outs",
    summary:
      "Industrial Door / Roller Shutter Fitter installing and fitting industrial doors and roller shutters in Stockton-on-Tees.",
    overview: [
      "This Industrial Door and Roller Shutter Fitter role in Stockton-on-Tees covers installation, fitting and adjustment of industrial doors and roller shutters. Site safety procedures apply throughout the work. Hours are Monday to Friday, 8am to 5pm, with no routine weekend work or call-outs. Previous industrial door or roller shutter fitting experience is essential.",
    ],
    responsibilities: [
      "Install industrial door equipment in Stockton-on-Tees.",
      "Fit and adjust roller shutters.",
      "Carry out associated fitting and adjustment work.",
      "Follow site safety procedures.",
    ],
    requirements: ["Previous industrial door or roller shutter fitting experience is essential."],
    benefits: ["Tools, PPE, uniform and training."],
    seoTitle: "Industrial Door / Roller Shutter Fitter in Stockton-on-Tees",
    metaDescription:
      "Industrial door and roller shutter fitting role in Stockton-on-Tees, advertised by JLD Recruit Ltd. Pay is £20 per hour.",
    approvalNotes: [
      "Draft advert 9. The overtime rate was not confirmed and is omitted.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0013",
    displayOrder: 4,
    slug: "security-systems-engineer-castleford",
    title: "Security Systems Engineer",
    sector: "Fire & Security",
    location: "Castleford",
    salary: "From £36,000",
    summary: "Security Systems Engineer working on security system installations and maintenance in Castleford.",
    overview: [
      "This Security Systems Engineer role in Castleford covers installation and maintenance of security systems, including fault diagnosis, testing and handover documentation. The published salary starts from £36,000. The confirmed package includes 23 days holiday plus bank holidays and a birthday day, training, and performance-based salary reviews.",
    ],
    responsibilities: [
      "Install security systems in Castleford.",
      "Maintain those systems.",
      "Diagnose faults.",
      "Complete testing and handover documentation.",
    ],
    requirements: ["Relevant security systems engineering experience is essential."],
    benefits: [
      "23 days holiday plus bank holidays and a birthday day.",
      "Training.",
      "Performance-based salary reviews.",
    ],
    seoTitle: "Security Systems Engineer in Castleford",
    metaDescription:
      "Security systems installation and maintenance role in Castleford, advertised by JLD Recruit Ltd. Salary from £36,000.",
    approvalNotes: [
      "Draft advert 10. Do not publish any confidential salary ceiling.",
      "Exact weekday hours and the weekend rota were not confirmed and are omitted.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0021",
    displayOrder: 21,
    slug: "automated-gate-barrier-engineer-castleford",
    title: "Automated Gate & Barrier Engineer",
    sector: "Gates & Automation",
    location: "Castleford",
    salary: "From £40,000",
    summary:
      "Automated Gate & Barrier Engineer installing and maintaining automated gates and barrier systems in Castleford.",
    overview: [
      "This Automated Gate and Barrier Engineer role in Castleford is separate from the security systems vacancy. It covers installation and maintenance of automated gates and barriers, including electrical and mechanical faults, testing and service records. The published salary starts from £40,000. The confirmed package includes 23 days holiday plus bank holidays and a birthday day, training, and performance-based salary reviews.",
    ],
    responsibilities: [
      "Install automated gates and barrier systems in Castleford.",
      "Maintain that equipment.",
      "Identify electrical and mechanical faults.",
      "Complete testing and service records.",
    ],
    requirements: ["Relevant automated gate or barrier engineering experience is essential."],
    benefits: [
      "23 days holiday plus bank holidays and a birthday day.",
      "Training.",
      "Performance-based salary reviews.",
    ],
    seoTitle: "Automated Gate & Barrier Engineer in Castleford",
    metaDescription:
      "Automated gate and barrier engineering role in Castleford, advertised by JLD Recruit Ltd. Salary from £40,000.",
    approvalNotes: [
      "Draft advert 11. Do not publish any confidential salary ceiling.",
      "Exact weekday hours and the weekend rota were not confirmed and are omitted.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0004",
    displayOrder: 10,
    slug: "gate-installer-groundworker-great-brickhill",
    title: "Gate Installer / Groundworker",
    sector: "Gates & Automation",
    location: "Great Brickhill",
    salary: "From £30,000",
    workingHours: "Monday to Friday, 7:30am to 5pm; occasional weekends",
    summary:
      "Gate Installer / Groundworker supporting gate installation, groundworks and fitting in Great Brickhill.",
    overview: [
      "This Gate Installer and Groundworker role is based in Great Brickhill, not Milton Keynes. The work supports gate installation through preparation of the area, groundworks, steelwork and fitting of the gates and associated equipment. Hours are Monday to Friday, 7:30am to 5pm, with occasional weekends. Relevant installation, groundworks or steelwork experience is required.",
    ],
    responsibilities: [
      "Prepare gate installation areas in Great Brickhill.",
      "Undertake groundworks.",
      "Undertake steelwork tasks.",
      "Assist with fitting gates and associated equipment.",
    ],
    requirements: [
      "Relevant installation, groundworks or steelwork experience is required.",
    ],
    benefits: [
      "28 days holiday including bank holidays, rising with service.",
      "PPE and uniform.",
      "Overtime at one and one-third of normal rate.",
    ],
    seoTitle: "Gate Installer / Groundworker in Great Brickhill",
    metaDescription:
      "Gate installation and groundworks role in Great Brickhill, advertised by JLD Recruit Ltd. Salary from £30,000.",
    approvalNotes: [
      "Draft advert 12. The unpublished slug was changed from Milton Keynes to Great Brickhill.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0005",
    displayOrder: 11,
    slug: "automated-gate-installation-engineer-milton-keynes",
    title: "Automated Gate Installation Engineer",
    sector: "Gates & Automation",
    location: "Milton Keynes area",
    salary: "From £40,000",
    workingHours: "Monday to Friday, 7:30am to 5pm; occasional weekends",
    summary: "Automated Gate Installation Engineer installing automated gates and access equipment in the Milton Keynes area.",
    overview: [
      "This Automated Gate Installation Engineer role covers the Milton Keynes area and is distinct from the Great Brickhill groundworker vacancy. The engineer installs and commissions automated gates and related access equipment, diagnoses installation issues, tests the finished work and completes the job records. Hours are Monday to Friday, 7:30am to 5pm, with occasional weekends. Relevant automated gate installation experience is required.",
    ],
    responsibilities: [
      "Install automated gates and related access equipment in the Milton Keynes area.",
      "Commission the installed equipment.",
      "Diagnose installation issues.",
      "Carry out testing and complete job records.",
    ],
    requirements: ["Relevant automated gate installation experience is essential."],
    benefits: [
      "28 days holiday including bank holidays, rising with service.",
      "Company van, PPE and uniform.",
      "Overtime at one and one-third of normal rate.",
    ],
    seoTitle: "Automated Gate Installation Engineer in Milton Keynes",
    metaDescription:
      "Automated gate installation role in the Milton Keynes area, advertised by JLD Recruit Ltd. Salary from £40,000.",
    approvalNotes: [
      "Draft advert 13.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0009",
    displayOrder: 15,
    slug: "senior-industrial-door-engineer-milton-keynes",
    title: "Senior Industrial Door Engineer",
    sector: "Industrial Doors",
    location: "Milton Keynes",
    salary: "£40,000 to £50,000",
    workingHours: "Monday to Friday, 8am to 5pm",
    summary: "Senior Industrial Door Engineer carrying out senior-level industrial door work in Milton Keynes.",
    overview: [
      "This Senior Industrial Door Engineer role is based in Milton Keynes. It is senior-level industrial door work: diagnosing and resolving faults, servicing and repairing the equipment, and supporting the safe completion of the site work. Hours are Monday to Friday, 8am to 5pm. Previous industrial door engineering experience is essential.",
    ],
    responsibilities: [
      "Diagnose industrial door faults in Milton Keynes.",
      "Resolve those faults.",
      "Carry out servicing and repairs.",
      "Support safe completion of the site work.",
    ],
    requirements: ["Previous industrial door engineering experience is essential."],
    seoTitle: "Senior Industrial Door Engineer in Milton Keynes",
    metaDescription:
      "Senior industrial door engineering role in Milton Keynes, advertised by JLD Recruit Ltd. Salary £40,000 to £50,000.",
    approvalNotes: [
      "Draft advert 14. The unpublished location was corrected to Milton Keynes.",
      "Call-out arrangements were not confirmed and are omitted.",
      "Benefits were not confirmed and are omitted.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0006",
    displayOrder: 12,
    slug: "classic-vehicle-technician-southampton",
    title: "Classic Vehicle Technician",
    sector: "Automotive",
    location: "Southampton area",
    salary: "£41,440",
    workingHours: "Monday to Friday, 6am to 2:30pm; occasional Saturdays",
    summary: "Classic Vehicle Technician maintaining and repairing classic Volkswagen vehicles in the Southampton area.",
    overview: [
      "This Classic Vehicle Technician role in the Southampton area is specifically for classic Volkswagen vehicles. The technician diagnoses mechanical faults, services and repairs those vehicles, and completes quality checks and workshop records. Hours are Monday to Friday, 6am to 2:30pm, with occasional Saturdays. Classic Volkswagen experience is essential.",
    ],
    responsibilities: [
      "Diagnose mechanical faults on classic Volkswagen vehicles.",
      "Service classic Volkswagen vehicles in the Southampton area.",
      "Repair those vehicles.",
      "Complete quality checks and workshop records.",
    ],
    requirements: ["Classic Volkswagen experience is essential."],
    seoTitle: "Classic Vehicle Technician in Southampton",
    metaDescription:
      "Classic Volkswagen technician role in the Southampton area, advertised by JLD Recruit Ltd. Salary £41,440.",
    approvalNotes: [
      "Draft advert 15. Benefits were not confirmed and are omitted.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0011",
    displayOrder: 17,
    slug: "automated-gate-service-engineer-royston",
    title: "Automated Gate Service / Breakdown Engineer",
    sector: "Gates & Automation",
    location: "Royston",
    salary: "£38,000 to £42,000",
    workingHours: "Monday to Friday, 40 hours per week; no weekends or call-outs",
    summary:
      "Automated Gate Service / Breakdown Engineer servicing and repairing automated gates in Royston.",
    overview: [
      "This Automated Gate Service and Breakdown Engineer role in Royston covers routine servicing and breakdown fault-finding on automated gates. The engineer diagnoses the breakdown, repairs the equipment and tests it before the job is closed. The week is 40 hours, Monday to Friday, with no weekends or call-outs. Automated gate servicing and breakdown experience is essential.",
    ],
    responsibilities: [
      "Carry out routine servicing of automated gates in Royston.",
      "Diagnose breakdowns.",
      "Repair automated gate equipment.",
      "Test the equipment after the repair.",
    ],
    requirements: ["Automated gate servicing and breakdown experience is essential."],
    seoTitle: "Automated Gate Service / Breakdown Engineer in Royston",
    metaDescription:
      "Automated gate servicing and breakdown role in Royston, advertised by JLD Recruit Ltd. Salary £38,000 to £42,000.",
    approvalNotes: [
      "Draft advert 16. Benefits were not confirmed and are omitted.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0007",
    displayOrder: 13,
    slug: "lettings-manager-ascot",
    title: "Lettings Manager",
    sector: "Property",
    location: "Ascot",
    salary: "£40,000 to £50,000 basic salary",
    workingHours: "Monday to Friday; no Saturdays",
    summary: "Lettings Manager managing lettings activity and supporting a local property portfolio in Ascot.",
    overview: [
      "This Lettings Manager role in Ascot covers the lettings process for a local property portfolio. The manager coordinates the process, liaises with landlords and tenants, arranges viewings and progresses agreed lets. The working pattern is Monday to Friday, with no Saturdays. The figure shown is the basic salary. Relevant lettings or property management experience is required.",
    ],
    responsibilities: [
      "Coordinate the lettings process in Ascot.",
      "Liaise with landlords.",
      "Liaise with tenants.",
      "Manage viewings and progress agreed lets.",
    ],
    requirements: ["Relevant lettings or property management experience."],
    seoTitle: "Lettings Manager in Ascot",
    metaDescription:
      "Lettings management role in Ascot, advertised by JLD Recruit Ltd. Basic salary £40,000 to £50,000.",
    approvalNotes: [
      "Draft advert 17. Employer identity was not confirmed and must not be guessed.",
      "Exact daily hours were not confirmed and are omitted. No Saturdays is stated.",
      "Benefits were not confirmed and are omitted.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0010",
    displayOrder: 16,
    slug: "vehicle-technician-poulton-le-fylde",
    title: "Vehicle Technician",
    sector: "Automotive",
    location: "Poulton-le-Fylde",
    salary: "£34,000 to £40,000",
    workingHours: "9am to 5pm; alternate Saturdays",
    summary: "Vehicle Technician carrying out workshop maintenance and repairs in Poulton-le-Fylde.",
    overview: [
      "This Vehicle Technician role in Poulton-le-Fylde is workshop maintenance and repair. The work includes servicing, inspections, fault diagnosis, and repairs such as clutches and cambelts where that work is appropriate. The confirmed hours are 9am to 5pm, with alternate Saturdays. Relevant vehicle technician experience is required.",
    ],
    responsibilities: [
      "Service and inspect vehicles.",
      "Diagnose faults.",
      "Carry out repairs including clutches and cambelts where appropriate.",
    ],
    requirements: ["Relevant vehicle technician experience."],
    seoTitle: "Vehicle Technician in Poulton-le-Fylde",
    metaDescription:
      "Vehicle technician role in Poulton-le-Fylde, advertised by JLD Recruit Ltd. Salary £34,000 to £40,000.",
    approvalNotes: [
      "Draft advert 18. The weekday pattern was not separately confirmed, so Monday to Friday is not stated.",
      "Benefits were not confirmed and are omitted.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0016",
    displayOrder: 19,
    slug: "commissioning-manager-north-west-england",
    title: "Commissioning Manager",
    sector: "Fire & Security",
    location: "North West England",
    salary: "£55,000 to £65,000",
    workingHours:
      "Monday to Friday; mixture of office and site visits; travel throughout the North West",
    summary:
      "Commissioning Manager coordinating fire and security commissioning across projects in North West England.",
    overview: [
      "This Commissioning Manager role coordinates fire and security commissioning across projects in North West England. The working week is Monday to Friday and mixes office time with site visits, including travel throughout the North West. The manager plans and oversees the commissioning work, supports the technical teams, and reviews testing and handover progress. Experienced senior commissioning engineers can be considered for progression into the role.",
    ],
    responsibilities: [
      "Plan fire and security commissioning across North West England.",
      "Oversee the commissioning work on site and from the office.",
      "Support the technical teams.",
      "Review testing and handover progress.",
      "Travel to projects throughout the North West.",
    ],
    requirements: [
      "Experienced senior commissioning engineers can be considered for progression into this role.",
    ],
    seoTitle: "Commissioning Manager in North West England",
    metaDescription:
      "Fire and security commissioning management role in North West England, advertised by JLD Recruit Ltd.",
    approvalNotes: [
      "Draft advert 19. Benefits were not confirmed and are omitted.",
      "The separate uncertain North West fire and security listing was not added.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0022",
    displayOrder: 22,
    slug: "fire-security-engineer-manchester",
    title: "Fire & Security Engineer",
    sector: "Fire & Security",
    location: "Manchester and surrounding areas",
    salary: "£40,000 to £50,000",
    workingHours: "Monday to Friday, 8am to 5pm",
    summary:
      "Fire & Security Engineer working on fire and security systems across Manchester and nearby areas.",
    overview: [
      "This Fire and Security Engineer role covers Manchester and the surrounding areas. Both fire and security experience are essential. The engineer services and maintains the equipment, diagnoses faults, carries out testing and records the completed work. Hours are Monday to Friday, 8am to 5pm.",
    ],
    responsibilities: [
      "Service fire systems across Manchester and the surrounding areas.",
      "Service security systems in the same area.",
      "Diagnose faults on both fire and security equipment.",
      "Carry out testing and record the completed work.",
    ],
    requirements: [
      "Fire systems experience is essential.",
      "Security systems experience is essential.",
    ],
    seoTitle: "Fire & Security Engineer in Manchester",
    metaDescription:
      "Fire and security engineering role in Manchester and surrounding areas, advertised by JLD Recruit Ltd.",
    approvalNotes: [
      "Draft advert 20. Call-out arrangements were not confirmed and are omitted.",
      "Benefits were not confirmed and are omitted.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0015",
    displayOrder: 6,
    slug: "fire-security-engineer-liverpool",
    title: "Fire & Security Engineer",
    sector: "Fire & Security",
    location: "Liverpool",
    salary: "£28,000 to £36,000",
    workingHours: "Monday to Friday, 8am to 5pm; on-call rota with standby payment",
    summary: "Fire & Security Engineer maintaining and fault-finding fire and security systems in Liverpool.",
    overview: [
      "This Fire and Security Engineer role is in Liverpool. Both fire and security experience are essential. The engineer carries out servicing and repairs, investigates system faults, and completes testing and service reports. Hours are Monday to Friday, 8am to 5pm, and the role includes an on-call rota. A standby payment of £250 is paid for each on-call week.",
    ],
    responsibilities: [
      "Service fire and security systems in Liverpool.",
      "Carry out repairs.",
      "Investigate system faults.",
      "Complete testing and service reports.",
      "Join the on-call rota.",
    ],
    requirements: [
      "Fire systems experience is essential.",
      "Security systems experience is essential.",
      "Willingness to join the on-call rota is essential.",
    ],
    benefits: ["£250 standby payment per on-call week."],
    seoTitle: "Fire & Security Engineer in Liverpool",
    metaDescription:
      "Fire and security engineering role in Liverpool, advertised by JLD Recruit Ltd. Salary £28,000 to £36,000.",
    approvalNotes: [
      "Draft advert 21. The public page does not state how many people are being hired.",
      "Internal note: multiple ongoing hires. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0023",
    displayOrder: 23,
    slug: "vehicle-technician-ilkeston",
    title: "Vehicle Technician",
    sector: "Automotive",
    location: "Ilkeston",
    salary: "£32,000 to £38,000",
    workingHours: "Monday to Friday, 8am to 5pm; occasional Saturdays",
    summary: "Vehicle Technician servicing, diagnosing and repairing vehicles in Ilkeston.",
    overview: [
      "This Vehicle Technician role in Ilkeston is workshop servicing, diagnosis and repair. The technician carries out inspections and scheduled servicing, diagnoses mechanical faults, completes the repairs and finishes with quality checks. Hours are Monday to Friday, 8am to 5pm, with occasional Saturdays. Relevant vehicle technician experience is required.",
    ],
    responsibilities: [
      "Carry out inspections and scheduled servicing.",
      "Diagnose mechanical faults.",
      "Complete repairs and quality checks.",
    ],
    requirements: ["Relevant vehicle technician experience."],
    seoTitle: "Vehicle Technician in Ilkeston",
    metaDescription:
      "Vehicle technician role in Ilkeston, advertised by JLD Recruit Ltd. Salary £32,000 to £38,000.",
    approvalNotes: [
      "Draft advert 22. Benefits were not confirmed and are omitted.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  openVacancy({
    id: "jld-0024",
    displayOrder: 24,
    slug: "property-manager-barnstaple",
    title: "Property Manager",
    sector: "Property",
    location: "Barnstaple",
    salary: "£30,000 to £36,000",
    workingHours: "Monday to Friday",
    summary:
      "Property Manager handling day-to-day residential property matters and client liaison in Barnstaple.",
    overview: [
      "This Property Manager role in Barnstaple looks after day-to-day residential property matters. The work includes coordinating maintenance and inspections, responding to property enquiries, keeping records and communicating with the people involved. Hours are Monday to Friday. Relevant property management experience is required.",
    ],
    responsibilities: [
      "Coordinate property maintenance and inspections.",
      "Respond to property enquiries.",
      "Keep records and communicate with stakeholders.",
    ],
    requirements: ["Relevant property management experience."],
    seoTitle: "Property Manager in Barnstaple",
    metaDescription:
      "Residential property management role in Barnstaple, advertised by JLD Recruit Ltd. Salary £30,000 to £36,000.",
    approvalNotes: [
      "Draft advert 23. Exact daily hours and benefits were not confirmed and are omitted.",
      "This is a separate role from the Barnstaple fire and security advert.",
      "Internal vacancy count 1. Do not display the count as a benefit.",
    ],
  }),
  {
    id: "jld-0901",
    displayOrder: 18,
    publishedOn: "2026-05-21",
    slug: "fire-security-engineer-barnstaple",
    title: "Fire & Security Engineer",
    sector: "Fire & Security",
    location: "Barnstaple",
    region: "Devon",
    salary: "£34,000 – £42,000",
    payFrequency: "year",
    employmentType: "Permanent",
    summary:
      "Fire & Security Engineer installing and commissioning fire detection, CCTV, access control and intruder alarms in Barnstaple.",
    overview: [
      "JLD Recruit Ltd is recruiting a Fire and Security Engineer for an established team in Barnstaple. The role covers installation, commissioning, testing and handover of fire detection, CCTV, access control and intruder alarm systems. Work is carried out from technical drawings and specifications, including programming, fault finding and system testing, and it must meet current regulations and British Standards.",
    ],
    responsibilities: [
      "Install fire detection, CCTV, access control and intruder alarm systems in Barnstaple.",
      "Commission, test and hand over those systems.",
      "Work from technical drawings and specifications, including programming and fault finding.",
      "Ensure the work meets current regulations and British Standards.",
    ],
    requirements: [
      "Experience installing and commissioning fire and security systems.",
      "Strong fault-finding skills.",
      "A good understanding of relevant British Standards.",
      "A full UK driving licence.",
    ],
    desirable: [],
    benefits: ["Competitive salary.", "Company vehicle.", "Ongoing training and development."],
    applicationMethod: "email",
    status: "open",
    employerConfidential: true,
    seoTitle: "Fire & Security Engineer Job in Barnstaple, Devon",
    metaDescription:
      "Fire & Security Engineer vacancy in Barnstaple. Installation and commissioning of fire detection, CCTV, access control and intruder alarms. Salary £34,000 – £42,000.",
    publicationApproved: true,
    approvalNotes: [
      "Existing URL /jobs/fire-security-engineer-barnstaple kept open. No second Barnstaple fire and security record was added.",
      preservedOpenNote,
      "The newer draft salary was £35,000 to £45,000 and its hours and benefits were not confirmed. That draft has not replaced this page.",
      verifiedLinkedInDateNote,
    ],
  },
  {
    id: "jld-0902",
    displayOrder: 28,
    slug: "vehicle-technician-prestige-macclesfield",
    title: "Vehicle Technician",
    sector: "Automotive",
    location: "Macclesfield",
    region: "Cheshire",
    salary: "£32,000 – £44,000",
    payFrequency: "year",
    employmentType: "Permanent",
    summary:
      "Vehicle Technician role in Macclesfield for servicing, diagnostics and repair of prestige German vehicles.",
    overview: [
      "We are recruiting a skilled Vehicle Technician to join a well-established independent workshop in Macclesfield, specialising in prestige German vehicles.",
      "The role involves servicing, diagnostics and repair of high-end vehicles using dealer-level tooling and equipment.",
    ],
    responsibilities: [],
    requirements: [
      "Proven experience working on prestige or high-end vehicles.",
      "Strong diagnostic ability.",
      "A methodical and quality-focused approach.",
      "A full UK driving licence.",
    ],
    desirable: [],
    benefits: [
      "Competitive salary.",
      "Modern workshop.",
      "Dealer-level tooling.",
      "Stable long-term position.",
    ],
    applicationMethod: "email",
    status: "filled",
    employerConfidential: true,
    seoTitle: "Vehicle Technician Job in Macclesfield, Cheshire",
    metaDescription:
      "This Macclesfield vehicle technician role has been filled. Current vacancies are listed by JLD Recruit Ltd.",
    publicationApproved: false,
    approvalNotes: [
      "Existing URL kept. Status is filled, so it is excluded from open listings and does not accept applications.",
      legacyFillerNote,
    ],
  },
  {
    id: "jld-0903",
    displayOrder: 25,
    publishedOn: "2026-05-14",
    slug: "motor-vehicle-technician-bournemouth",
    title: "Motor Vehicle Technician",
    sector: "Automotive",
    location: "Bournemouth",
    region: "Dorset",
    salary: "£33,000 – £40,000",
    payFrequency: "year",
    workingHours: "Monday to Friday — no weekend work",
    employmentType: "Permanent",
    summary:
      "Motor Vehicle Technician role in Bournemouth covering servicing, diagnostics and mechanical repairs.",
    overview: [
      "JLD Recruit Ltd is recruiting a Motor Vehicle Technician for a busy workshop in Bournemouth. The role covers servicing and repair across a wide range of vehicles, including routine maintenance, brakes, clutches, exhaust systems, timing belts, diagnostics and general mechanical repairs. It is a permanent position, Monday to Friday, with no weekend work.",
    ],
    responsibilities: [
      "Carry out routine maintenance in the Bournemouth workshop.",
      "Work on brakes, clutches, exhaust systems and timing belts.",
      "Carry out diagnostics.",
      "Complete general mechanical repairs.",
    ],
    requirements: [
      "Proven motor vehicle technician experience.",
      "Good diagnostic and fault-finding skills.",
      "A reliable and professional approach.",
      "A full UK driving licence.",
    ],
    desirable: [],
    benefits: [
      "Competitive salary.",
      "Monday to Friday working pattern.",
      "No weekend work.",
      "Supportive workshop environment.",
    ],
    applicationMethod: "email",
    status: "open",
    employerConfidential: true,
    seoTitle: "Motor Vehicle Technician Job in Bournemouth, Dorset",
    metaDescription:
      "Motor Vehicle Technician vacancy in Bournemouth. Servicing, diagnostics and repairs, Monday to Friday with no weekend work. Salary £33,000 – £40,000.",
    publicationApproved: true,
    approvalNotes: [
      "Existing URL /jobs/motor-vehicle-technician-bournemouth kept open.",
      preservedOpenNote,
      "The newer draft salary was £35,000 to £42,000. Its hours, Saturday requirements, headcount and employer were not confirmed. The public page keeps the previously published advert and does not state a headcount.",
      verifiedLinkedInDateNote,
    ],
  },
  {
    id: "jld-0904",
    displayOrder: 26,
    publishedOn: "2026-05-14",
    slug: "vehicle-technician-mot-barnstaple",
    title: "Vehicle Technician / MOT Tester",
    sector: "Automotive",
    location: "Barnstaple",
    region: "Devon",
    salary: "£30,000 – £50,000",
    payFrequency: "year",
    workingHours: "Monday to Friday with Saturdays on a rota basis",
    employmentType: "Permanent",
    summary:
      "Vehicle Technician / MOT Tester opportunities in Barnstaple covering servicing, diagnostics and repairs.",
    overview: [
      "JLD Recruit Ltd is recruiting Vehicle Technicians and MOT Testers for an established independent workshop in Barnstaple. The role covers servicing, diagnostics, repairs, fault finding and general maintenance across a variety of vehicles. MOT testing is available for technicians who already hold the relevant licence. An MOT licence is beneficial but not essential, and there is more than one opportunity in the workshop.",
    ],
    responsibilities: [
      "Carry out servicing, diagnostics and repairs in Barnstaple.",
      "Carry out fault finding and general maintenance across a variety of vehicles.",
      "MOT testing is available for technicians who hold the relevant licence.",
    ],
    requirements: [
      "Proven vehicle technician experience.",
      "Good diagnostic and fault-finding ability.",
      "A full UK driving licence.",
    ],
    desirable: ["An MOT licence is beneficial but not essential."],
    benefits: ["Competitive salary.", "Friendly independent workshop.", "Opportunities for progression."],
    applicationMethod: "email",
    status: "open",
    employerConfidential: true,
    seoTitle: "Vehicle Technician / MOT Tester Jobs in Barnstaple, Devon",
    metaDescription:
      "Vehicle Technician / MOT Tester vacancies in Barnstaple. Servicing, diagnostics and repairs. MOT licence beneficial but not essential. Salary £30,000 – £50,000.",
    publicationApproved: true,
    approvalNotes: [
      "Existing URL /jobs/vehicle-technician-mot-barnstaple kept open.",
      preservedOpenNote,
      "The newer draft salary was £40,000 to £50,000 and its hours were not confirmed. MOT testing authorisation is not stated as mandatory.",
      "Internal vacancy count on the newer draft was 2. The public page keeps the previously published wording.",
      verifiedLinkedInDateNote,
    ],
  },
  {
    id: "jld-0905",
    displayOrder: 27,
    publishedOn: "2026-05-14",
    slug: "vehicle-technician-mot-torquay",
    title: "Vehicle Technician / MOT Tester",
    sector: "Automotive",
    location: "Torquay",
    region: "Devon",
    salary: "£30,000 – £50,000",
    payFrequency: "year",
    workingHours: "Monday to Friday with Saturdays on a rota basis",
    employmentType: "Permanent",
    summary:
      "Vehicle Technician / MOT Tester role in Torquay covering servicing, diagnostics and repairs.",
    overview: [
      "JLD Recruit Ltd is recruiting a Vehicle Technician / MOT Tester for a busy independent workshop in Torquay. The role covers servicing, repairs, diagnostics, fault finding and general maintenance using the workshop's modern equipment. MOT testing is available for licensed testers. An MOT licence is beneficial but not essential.",
    ],
    responsibilities: [
      "Carry out servicing, repairs and diagnostics in Torquay.",
      "Carry out fault finding and general maintenance using modern workshop equipment.",
      "MOT testing is available for licensed testers.",
    ],
    requirements: [
      "Proven vehicle technician experience.",
      "Strong fault-finding skills.",
      "A full UK driving licence.",
    ],
    desirable: ["An MOT licence is beneficial but not essential."],
    benefits: [],
    applicationMethod: "email",
    status: "open",
    employerConfidential: true,
    seoTitle: "Vehicle Technician / MOT Tester Job in Torquay, Devon",
    metaDescription:
      "Vehicle Technician / MOT Tester vacancy in Torquay. Servicing, diagnostics and repairs. MOT licence beneficial but not essential. Salary £30,000 – £50,000.",
    publicationApproved: true,
    approvalNotes: [
      "Existing URL /jobs/vehicle-technician-mot-torquay kept open.",
      preservedOpenNote,
      "The newer draft salary was £40,000 to £50,000 and its hours were not confirmed. MOT testing authorisation is not stated as mandatory.",
      "Internal vacancy count on the newer draft was 2. The public page keeps the previously published wording.",
      verifiedLinkedInDateNote,
    ],
  },
];
