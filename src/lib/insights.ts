export type InsightSection = {
  heading: string;
  body: string;
};

export type InsightArticle = {
  slug: string;
  title: string;
  description: string;
  category: "Salary Guide" | "Recruitment Insight";
  planned: boolean;
  sections?: InsightSection[];
};

const liftEngineerSalaryGuide: InsightSection[] = [
  {
    heading: "Typical lift engineer salaries in the UK (2026)",
    body:
      "Lift engineer pay in the UK varies by discipline — service and maintenance, repair, installation and modernisation — and by experience level. Based on permanent roles JLD Recruit Ltd handles UK-wide, the following ranges are a practical guide for employers benchmarking packages and candidates assessing offers.\n\nJunior lift engineers (typically NVQ Level 3, up to around three years' post-qualification experience) commonly sit in the £32,000 – £40,000 band for service routes. Experienced service and repair engineers with a solid safety record, strong customer-facing skills and the ability to work independently on varied equipment usually command £40,000 – £50,000. Senior engineers, installation specialists and those covering complex modernisation work often reach £45,000 – £58,000, particularly where on-call participation, overtime or manufacturer-specific training is expected.",
  },
  {
    heading: "What drives pay differences",
    body:
      "Several factors consistently move lift engineer salaries above or below the mid-range. Qualification level matters: NVQ Level 4 engineers and those with manufacturer training (for example Otis, KONE, Schindler or ThyssenKrupp product experience) are typically paid more because they can work on a wider portfolio with less supervision.\n\nGeography is significant. London and the South East generally sit at the top of UK lift engineering pay, with premiums of roughly 5–10% over comparable roles in the Midlands, North and South West for the same experience level. On-call rotas, out-of-hours cover and overtime availability also push total earnings higher — many live job listings advertise a base salary plus structured overtime rather than a single flat figure.\n\nCompany size and contract type influence packages too. Independent lift companies and family-run businesses may offer slightly lower base salaries but stronger route stability and local working patterns, while national contractors and major building services groups often pay more for engineers willing to travel or cover larger territories.",
  },
  {
    heading: "Service vs installation vs modernisation",
    body:
      "Service engineers — maintaining planned routes, carrying out LOLER-related inspections and handling reactive breakdowns — form the largest part of the lift recruitment market. Pay is usually steady, with clear progression from trainee through to senior route engineer.\n\nInstallation engineers tend to earn more when projects are complex or travel-heavy, because the role demands tighter programme management, greater technical risk and longer hours during commissioning phases. Modernisation engineers, who upgrade ageing lift systems to current standards, often sit at the upper end of experienced pay bands because the work combines diagnostics, electrical knowledge and client-facing project delivery.\n\nEmployers struggling to fill lift roles should be realistic about where their vacancy sits on this spectrum. A hard-to-fill installation engineer in a high-cost area will need a package at the top of the market — not a service-engineer salary with installation responsibilities attached.",
  },
  {
    heading: "How to use this guide",
    body:
      "These figures reflect permanent packages for employed lift engineers in 2026, based on market activity across roles JLD Recruit Ltd recruits for UK-wide. They are guides, not guarantees — individual offers depend on the employer, location, equipment mix and candidate profile.\n\nIf you are hiring a lift engineer and need help sourcing NVQ-qualified candidates who are not actively applying online, JLD Recruit Ltd provides permanent recruitment with proactive headhunting and direct access to James throughout the process. Submit your vacancy details via our contact page or browse current lift engineering opportunities on our jobs board.",
  },
];

const fireSecuritySalaryGuide: InsightSection[] = [
  {
    heading: "Typical fire & security engineer salaries in the UK (2026)",
    body:
      "Fire and security engineering covers fire alarm installation and commissioning, intruder alarms, CCTV, access control and integrated security systems. Salaries vary by specialism and whether the role is maintenance-led or project-based.\n\nEntry-level and junior engineers with basic installation experience and a willingness to learn system programming typically earn £28,000 – £34,000. Experienced installation and commissioning engineers — those confident working from drawings, programming panels, fault finding on IP and traditional systems, and handing over to clients — commonly sit in the £34,000 – £42,000 range. This aligns with live permanent roles JLD Recruit Ltd has recruited for in 2026, including fire and security commissioning positions in the South West advertised at £34,000 – £42,000.\n\nSenior engineers, lead installers and those with strong manufacturer experience (Hikvision, Paxton, Texecom, Gent, Morley or Advanced panels, for example) can reach £40,000 – £48,000, particularly in areas with strong commercial and industrial demand.",
  },
  {
    heading: "What affects fire & security pay",
    body:
      "Certifications and standards knowledge have a direct impact on salary. Engineers who understand relevant British Standards (including BS 5839 for fire detection and alarm systems) and who hold beneficial qualifications such as FIA units, ECS cards or CSCS where site access requires them, are easier to place and command stronger packages.\n\nRegion matters. London, the South East and major city conurbations typically pay more than rural or coastal markets, though skilled engineers in Devon, Cornwall and smaller counties are still in demand where local installers are growing and cannot rely on applicants alone.\n\nThe split between maintenance and installation also affects pay. Maintenance engineers on structured routes may trade slightly lower base salaries for predictable hours, while installation and commissioning roles often include travel, project bonuses or overtime that increases total earnings. Security-cleared or vetted roles — common on commercial, education and public-sector sites — can also carry a premium because the candidate pool is narrower.",
  },
  {
    heading: "CCTV, access control and intruder alarms",
    body:
      "Multi-discipline engineers who can work across intruder alarm, CCTV and access control systems are particularly valuable to growing installers expanding their service offering. Employers often pay a premium for engineers who can programme, test and commission without constant senior supervision.\n\nPure CCTV-only or access-control-only roles exist, but many permanent vacancies JLD Recruit Ltd handles ask for breadth — especially in regional companies where engineers cover varied sites rather than specialising on a single product line. Candidates with IP networking knowledge and experience integrating systems are increasingly sought after as more sites move away from purely standalone equipment.\n\nFor employers, being clear about the actual day-to-day mix (installation vs maintenance, commercial vs domestic, travel expectations) helps set a realistic salary and reduces time-to-hire.",
  },
  {
    heading: "Next steps for employers and candidates",
    body:
      "If you are benchmarking a fire and security engineer salary for a new permanent hire, use the experienced band (£34,000 – £42,000) as a starting point for a competent installation or commissioning engineer outside London, adjusting upward for seniority, travel or specialist systems experience.\n\nJLD Recruit Ltd recruits fire alarm engineers, security engineers, CCTV installers and access control engineers UK-wide on a permanent-only basis. View current vacancies on our jobs page or submit a vacancy enquiry to speak directly with James about sourcing engineers through proactive headhunting rather than waiting for applications.",
  },
];

const vehicleTechnicianSalaryGuide: InsightSection[] = [
  {
    heading: "Typical vehicle technician salaries in the UK (2026)",
    body:
      "Vehicle technician and MOT tester pay varies by workshop type, brand specialist vs independent, diagnostic capability and location. Based on permanent roles JLD Recruit Ltd actively recruits for, the following ranges reflect real market packages in 2026.\n\nGeneral vehicle technicians at independent garages and motor groups commonly earn £30,000 – £40,000. Live examples include a motor vehicle technician role in Bournemouth at £33,000 – £40,000 for an established independent garage, and multiple MOT tester / technician opportunities in Devon and Cornwall advertised at £30,000 – £50,000 depending on experience and MOT licence status.\n\nPrestige and specialist workshops pay more for strong diagnostic ability and brand experience. A prestige vehicle technician role in Macclesfield was recently recruited at £32,000 – £44,000, reflecting the premium for quality workmanship on higher-value vehicles. Senior technicians, master technicians and diagnostic specialists at main dealers or large groups can exceed £45,000, particularly where productivity bonuses or manufacturer training pathways are included.",
  },
  {
    heading: "MOT testers, diagnostics and workshop seniority",
    body:
      "MOT licence status remains one of the clearest pay differentiators in automotive recruitment. Technicians who can MOT test as well as service and repair are more valuable to busy workshops — many employers advertise £30,000 – £50,000 bands with MOT licence listed as beneficial rather than essential, because they will support the right candidate through testing qualifications.\n\nDiagnostic capability is the other major factor separating mid-range from upper-range pay. Technicians comfortable with fault finding, scan tools, electrical diagnostics and complex repairs on modern vehicles command stronger packages than those limited to basic servicing. Prestige, EV-ready and main-dealer environments pay a premium for this skill set.\n\nWorkshop seniority and responsibility also move salaries. Master technicians, team leaders and those who can mentor apprentices sit above standard technician pay, even within the same employer group.",
  },
  {
    heading: "Regional and employer differences",
    body:
      "Geography still influences automotive pay, though the gap is narrower than in some engineering sectors because technicians are often recruited locally. South West motor groups — including Devon, Cornwall and Somerset — compete for the same pool of MOT-qualified technicians, which is why multiple group vacancies cluster around £30,000 – £50,000 with similar benefits packages (training, staff discounts, cycle-to-work schemes and Saturday rotas).\n\nIndependent garages may offer slightly lower top-end salaries than large motor groups but can provide stable Monday-to-Friday patterns without weekend rotas — an example being the Bournemouth independent role at £33,000 – £40,000 with no weekend work.\n\nEmployer type matters: national motor groups, franchise dealerships, prestige independents and commercial vehicle workshops each have different pay structures. Being transparent about hours (including Saturday rotas), overtime and MOT requirements helps attract the right candidates faster.",
  },
  {
    heading: "Using this guide to hire or job hunt",
    body:
      "These salary ranges are based on permanent packages for employed vehicle technicians and MOT testers in 2026, cross-referenced against live and recent roles handled by JLD Recruit Ltd. Total earnings may be higher where overtime, productivity bonuses or shift allowances apply.\n\nEmployers looking for vehicle technicians, MOT testers or diagnostic specialists can submit a vacancy via our contact page. Candidates should browse our current automotive jobs or register interest with a CV — our service is free for job seekers and focuses on permanent placements UK-wide.",
  },
];

export const insightArticles: InsightArticle[] = [
  {
    slug: "lift-engineer-salary-guide-2026",
    title: "Lift Engineer Salary Guide 2026",
    description:
      "UK lift engineer salary ranges for 2026 — service, repair, installation and modernisation roles by experience level, region and qualification.",
    category: "Salary Guide",
    planned: false,
    sections: liftEngineerSalaryGuide,
  },
  {
    slug: "fire-security-engineer-salary-guide-2026",
    title: "Fire & Security Engineer Salary Guide 2026",
    description:
      "Fire alarm, CCTV, access control and security engineer salaries UK-wide for 2026 — typical ranges and what drives pay.",
    category: "Salary Guide",
    planned: false,
    sections: fireSecuritySalaryGuide,
  },
  {
    slug: "refrigeration-engineer-salary-guide-2026",
    title: "Refrigeration Engineer Salary Guide 2026",
    description:
      "Planned guide to refrigeration, HVAC and air conditioning engineer salaries across the UK.",
    category: "Salary Guide",
    planned: true,
  },
  {
    slug: "gate-engineer-salary-guide-2026",
    title: "Gate Engineer Salary Guide 2026",
    description:
      "Planned guide to gate, automatic door and industrial door engineer salaries.",
    category: "Salary Guide",
    planned: true,
  },
  {
    slug: "vehicle-technician-salary-guide-2026",
    title: "Vehicle Technician Salary Guide 2026",
    description:
      "Vehicle technician, MOT tester and diagnostic technician salaries in the UK for 2026 — independent garages, motor groups and prestige workshops.",
    category: "Salary Guide",
    planned: false,
    sections: vehicleTechnicianSalaryGuide,
  },
  {
    slug: "why-lift-engineers-are-difficult-to-recruit",
    title: "Why Lift Engineers Are Difficult To Recruit",
    description:
      "Insight into the lift engineering talent market and what employers can do to improve hiring outcomes.",
    category: "Recruitment Insight",
    planned: true,
  },
  {
    slug: "how-to-recruit-fire-security-engineers",
    title: "How To Recruit Fire & Security Engineers",
    description:
      "Practical guidance for employers hiring fire alarm, CCTV and access control engineers.",
    category: "Recruitment Insight",
    planned: true,
  },
  {
    slug: "why-refrigeration-engineers-are-in-short-supply",
    title: "Why Refrigeration Engineers Are In Short Supply",
    description:
      "Overview of refrigeration and HVAC recruitment challenges and proactive hiring approaches.",
    category: "Recruitment Insight",
    planned: true,
  },
];

export function getInsightArticle(slug: string) {
  return insightArticles.find((article) => article.slug === slug);
}

export function getPublishedInsightArticles() {
  return insightArticles.filter((article) => !article.planned);
}
