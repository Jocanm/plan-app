"use client";

import { ErrorBoundaryContent } from "@/shared/components/errors/ErrorBoundaryContent";
import { Main } from "@/shared/components/layout/main/Main";
import { FolderX } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  return (
    <Main>
      <ErrorBoundaryContent
        error={error}
        onReset={reset}
        icon={FolderX}
        title={t("project.title")}
        description={t("project.description")}
        primaryActionLabel={t("try_again")}
        primaryActionLoadingLabel={t("trying")}
        errorCodeLabel={t("error_code")}
      />
    </Main>
  );
}
