import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

export const OauthFormSkeleton = () => {
  const t = useTranslations("login");

  return (
    <div className="space-y-4">
      {/* Google button skeleton */}
      <Skeleton className="w-full h-14 rounded-md" />

      {/* Separator */}
      <div
        className="relative my-6"
        role="separator"
        aria-label={t("separator_or")}
      >
        <div className="absolute inset-0 flex items-center">
          <div
            className="w-full h-[2px] bg-gradient-to-r from-transparent via-border to-transparent"
            aria-hidden="true"
          />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="bg-card px-6 py-1 text-muted-foreground font-semibold rounded-full">
            {t("separator_or")}
          </span>
        </div>
      </div>

      {/* GitHub button skeleton */}
      <Skeleton className="w-full h-14 rounded-md" />
    </div>
  );
};
