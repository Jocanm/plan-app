import { ROUTES } from "@/lib/config/constants";
import {
  CalendarIntegrationIcon,
  CollaborationIcon,
  TaskOrganizationIcon,
} from "@/shared/components/icons/FeatureIcons";
import { PlanLogo } from "@/shared/components/icons/PlanLogo";
import { NextPagePromiseProps } from "@/shared/types";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { LoginForm } from "./components/LoginForm";

export const generateMetadata = async () => {
  const t = await getTranslations("login");
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
};

const Login = async ({ searchParams }: NextPagePromiseProps) => {
  const t = await getTranslations("login");
  const error = (await searchParams)?.error;

  if (error) {
    redirect(`${ROUTES.ERROR}?error=${error}`);
  }

  return (
    <div className="min-h-screen">
      {/* Mobile Layout - Hero + Login */}
      <div className="lg:hidden">
        {/* Hero Section */}
        <div className="px-6 py-12 text-center">
          <PlanLogo size="lg" className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-3">
            {t("title")} <span className="text-primary">{t("app_name")}</span>
          </h1>
          <p className="text-muted-foreground text-lg">{t("description")}</p>
        </div>

        <div className="px-6 pb-12">
          <LoginForm />
        </div>
      </div>

      {/* Desktop Layout - Features + Login */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Column - Features */}
        <div className="flex-1 flex items-center justify-center px-12 py-16">
          <div className="max-w-lg">
            {/* Logo + Title */}
            <div className="mb-12">
              <PlanLogo size="lg" className="mb-6" />
              <h1 className="text-5xl font-light text-foreground mb-2">
                {t("title")}{" "}
                <span className="font-semibold text-primary">
                  {t("app_name")}
                </span>
              </h1>
              <div className="h-1 w-32 bg-primary rounded-full mb-6" />
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t("description")}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                  <TaskOrganizationIcon />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    {t("beautiful_task_organization")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t("organize_with_drag_and_drop")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CalendarIntegrationIcon />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    {t("calendar_integration")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t("schedule_seamlessly")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <CollaborationIcon />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    {t("team_collaboration")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t("work_together")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
