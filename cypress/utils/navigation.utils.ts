export const withLocale = (route: string) => {
  if (!route.startsWith("/")) {
    route = `/${route}`;
  }
  return `/en${route}`;
};
