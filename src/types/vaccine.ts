export const VACCINE_STATUS_LABELS = {
  A: "All",
  C: "Completed",
  E: "Expired",
  D: "Due",
} as const;

export type VaccineStatus = keyof typeof VACCINE_STATUS_LABELS;

export const VACCINE_STATUS_OPTIONS = (
  Object.keys(VACCINE_STATUS_LABELS) as VaccineStatus[]
).map((value) => ({ value, label: VACCINE_STATUS_LABELS[value] }));
