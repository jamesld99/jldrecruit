export const RELEVANT_EXPERIENCE_OPTIONS = [
  "Less than 1 year",
  "1 to 2 years",
  "3 to 5 years",
  "6 to 10 years",
  "Over 10 years",
] as const;

export type RelevantExperience = (typeof RELEVANT_EXPERIENCE_OPTIONS)[number];

export function isRelevantExperience(value: string): value is RelevantExperience {
  return (RELEVANT_EXPERIENCE_OPTIONS as readonly string[]).includes(value);
}

export function currentLocationIsValid(value: string) {
  const trimmed = value.trim();
  if (trimmed.length < 5 || trimmed.length > 120) return false;
  const normalised = trimmed.toLowerCase();
  if (normalised === "not applicable" || normalised === "to be confirmed") return false;
  const hasTown = trimmed.split(/\s+/).some((word) => /^[A-Za-z][A-Za-z.'-]{1,}$/.test(word));
  return hasTown && /\d/.test(trimmed);
}
