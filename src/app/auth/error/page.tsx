import { getLoginError } from "@/features/auth/domain/utils";
import { ROUTES } from "@/lib/config/constants";
import { NextPagePromiseProps } from "@/shared/types";
import { AlertTriangleIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const generateMetadata = async () => {
  const t = await getTranslations("error.meta");
  return {
    title: t("title"),
    description: t("description"),
    robots: "noindex, nofollow",
  };
};

export default async function AuthErrorPage({
  searchParams,
}: NextPagePromiseProps) {
  const t = await getTranslations("error");
  const error = (await searchParams)?.error;
  const { titleKey, messageKey } = getLoginError(error as string);

  return (
    <main
      id="main-content"
      className="flex min-h-screen w-full items-center justify-center bg-background p-4"
    >
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="w-full max-w-md rounded-xl border bg-card p-8 text-center shadow-lg"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
          <AlertTriangleIcon
            aria-hidden="true"
            className="h-8 w-8 text-danger"
          />
        </div>

        <h1
          id="error-title"
          className="mt-6 text-2xl font-bold text-foreground"
        >
          {t(`errors.${titleKey}`)}
        </h1>

        <p id="error-message" className="mt-4 text-muted-foreground">
          {t(`errors.${messageKey}`)}
        </p>

        <div className="mt-8">
          <Link
            replace
            href={ROUTES.LOGIN}
            aria-describedby="error-title error-message"
            className="inline-block w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {t("go_to_login")}
          </Link>
        </div>
      </div>
    </main>
  );
}
