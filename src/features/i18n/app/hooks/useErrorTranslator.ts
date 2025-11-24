import { useTranslations } from "next-intl";

export const useFormErrorTranslator = (
  namespace: string,
  params?: Record<string, unknown>
) => {
  //@ts-expect-error - key comes dynamically, but we validate existence with has()
  const t = useTranslations(namespace);

  return (errorKey?: string): string | undefined => {
    if (!errorKey) return undefined;
    //@ts-expect-error - key comes dynamically, but we validate existence with has()
    if (!t.has(errorKey)) return errorKey;
    //@ts-expect-error - key comes dynamically, but we validate existence with has()
    return t(errorKey, params) || undefined;
  };
};
