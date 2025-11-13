import { getTranslations } from "next-intl/server";

/**
 * SecurityBadge - Pill-shaped security indicator badge
 *
 * Features:
 * - Success-themed styling (green)
 * - Lock icon
 * - Localized security message
 * - Rounded pill shape
 */

export const SecurityBadge = async () => {
  const t = await getTranslations("login");

  return (
    <div className="mt-8 flex justify-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full text-xs font-medium shadow-sm">
        <svg
          className="w-4 h-4 text-success"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-foreground dark:text-success-foreground?">
          {t("security_message")}
        </span>
      </div>
    </div>
  );
};
