"use client";

import { ErrorBoundaryContent } from "@/shared/components/errors/ErrorBoundaryContent";
import { Main } from "@/shared/components/layout/main/Main";
import { useTranslations } from "next-intl";
import { XCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

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
