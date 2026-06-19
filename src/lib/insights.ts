export type InsightArticle = {
  slug: string;
  title: string;
  description: string;
  category: "Salary Guide" | "Recruitment Insight";
  planned: boolean;
};

export const insightArticles: InsightArticle[] = [
  {
    slug: "lift-engineer-salary-guide-2026",
    title: "Lift Engineer Salary Guide 2026",
    description:
      "Planned guide to lift engineer salaries across the UK — service, installation and modernisation roles.",
    category: "Salary Guide",
    planned: true,
  },
  {
    slug: "fire-security-engineer-salary-guide-2026",
    title: "Fire & Security Engineer Salary Guide 2026",
    description:
      "Planned guide to fire alarm, CCTV, access control and security engineer salaries UK-wide.",
    category: "Salary Guide",
    planned: true,
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
      "Planned guide to vehicle technician, MOT tester and diagnostic technician salaries.",
    category: "Salary Guide",
    planned: true,
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
