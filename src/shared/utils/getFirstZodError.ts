import z from "zod";

export const getFirstZodError = (
  error: z.ZodError<Record<string, unknown>>
): string | undefined => {
  const { errors, properties = {} } = z.treeifyError(error);
  if (errors.length > 0) return errors.at(0);

  const key = Object.keys(properties).at(0);
  if (key) {
    return properties[key]?.errors?.at(0);
  }
};
