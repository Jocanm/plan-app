import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/config/constants";
import { Main } from "@/shared/components/layout/main/Main";
import { Button } from "@/shared/components/ui";
import { FolderX } from "lucide-react";
import { useTranslations } from "next-intl";

const ProjectNotFound = () => {
  const t = useTranslations("project.not_found");

  return (
    <Main>
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center py-12 sm:py-20 lg:py-24 px-4 text-center"
      >
        {/* Icon with better dark mode support */}
        <div className="mb-6 p-6 rounded-full bg-muted/30 border border-border">
          <FolderX
            size={64}
            className="text-foreground/60"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
          {t("title")}
        </h1>

        {/* Description */}
        <p className="text-muted-foreground max-w-lg mb-8 text-base sm:text-lg leading-relaxed">
          {t("description")}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg">
            <Link href={ROUTES.DASHBOARD}>{t("go_to_dashboard")}</Link>
          </Button>
        </div>
      </div>
    </Main>
  );
};

export default ProjectNotFound;
