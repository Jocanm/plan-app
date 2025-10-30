export const buildPath = (
  path: string,
  params: Record<string, string> = {}
) => {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replaceAll(`:${key}`, value),
    path
  );
};
