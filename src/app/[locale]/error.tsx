"use client";

import { logger } from "@/lib/logger";
import { ErrorBoundaryContent } from "@/shared/components/errors/ErrorBoundaryContent";
import { Main } from "@/shared/components/layout/main/Main";
import { GlobalEvents } from "@/shared/domain/events/catalog";
import { XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    logger.error(
      {
        event: GlobalEvents.errorPageViewed,
        err: error,
        digest: error.digest,
        page: window.location.pathname,
      },
      "User encountered error page"
    );
  }, [error]);

  return (
    <Main className="h-screen">
      <ErrorBoundaryContent
        error={error}
        onReset={reset}
        icon={XCircle}
        title={t("title")}
        description={t("description")}
        primaryActionLabel={t("try_again")}
        primaryActionLoadingLabel={t("trying")}
        errorCodeLabel={t("error_code")}
        secondaryAction={{
          label: t("go_to_dashboard"),
          href: "/dashboard",
        }}
      />
    </Main>
  );
}
