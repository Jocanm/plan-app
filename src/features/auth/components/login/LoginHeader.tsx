import { getTranslations } from "next-intl/server";

/**
 * LoginHeader - Card header with lock icon, subtitle, and decorative line
 *
 * Features:
 * - Lock icon with subtle glow effect
 * - Localized subtitle (h2)
 * - Decorative horizontal line
 * - All decorative elements marked with aria-hidden
 */

export const LoginHeader = async () => {
  const t = await getTranslations("login");

  return (
    <div className="text-center mb-8 lg:mb-10">
      <div className="mb-6">
        {/* Lock icon with subtle glow */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          {/* Glow effect */}
          <div
            className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"
            aria-hidden="true"
          />
          {/* Icon */}
          <svg
            className="relative w-16 h-16 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-2">
          {t("subtitle")}
        </h2>
        <div className="h-0.5 w-16 bg-primary rounded-full mx-auto" />
      </div>
      <p className="text-muted-foreground text-sm lg:text-base">
        {t("choose_signin_method")}
      </p>
    </div>
  );
};
