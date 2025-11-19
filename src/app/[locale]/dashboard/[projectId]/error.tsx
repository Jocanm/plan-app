"use client";

import { logger } from "@/lib/logger";
import { ErrorBoundaryContent } from "@/shared/components/errors/ErrorBoundaryContent";
import { Main } from "@/shared/components/layout/main/Main";
import { GlobalEvents } from "@/shared/domain/events/catalog";
import { FolderX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");
  const params = useParams();
  const projectId = params.projectId as string;

  useEffect(() => {
    logger.error(
      {
        event: GlobalEvents.error_page_viewed,
        errorMessage: error.message,
        errorDigest: error.digest,
        errorStack: error.stack,
        page: window.location.pathname,
        projectId,
      },
      GlobalEvents.error_page_viewed
    );
  }, [error, projectId]);

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
