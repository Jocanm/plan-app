export const parseHeadersList = (value?: string | null) => {
  if (!value) return [];
  return value
    .split(",")
    .map(v => v.trim().split(";")[0])
    .filter(Boolean);
};
