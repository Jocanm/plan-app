export const generateId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers
  // Generates a pseudo-UUID using timestamp and random values
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};
