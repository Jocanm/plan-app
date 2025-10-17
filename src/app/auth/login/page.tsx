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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient and patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-success/5" />
      <div className="absolute inset-0 bg-gradient-to-tr from-warning/3 via-transparent to-primary/8" />

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <svg
          className="absolute top-20 left-20 w-32 h-32 text-primary/20"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="2" fill="currentColor">
            <animate
              attributeName="r"
              values="2;8;2"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <svg
          className="absolute top-40 right-32 w-24 h-24 text-success/20"
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,15 85,85 15,85"
            fill="currentColor"
            opacity="0.6"
          />
        </svg>
        <svg
          className="absolute bottom-32 left-32 w-20 h-20 text-warning/20"
          viewBox="0 0 100 100"
        >
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen justify-center relative z-10">
        <div className="lg:flex-1 flex items-center justify-center px-6 md:px-12 py-8 md:py-16">
          <div className="max-w-lg">
            <div className="mb-8 lg:mb-12">
              <div className="flex flex-col sm:flex-row items-center sm:gap-4 mb-6 lg:mb-8 text-center sm:text-left">
                <PlanLogo
                  size="lg"
                  className="animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100 mb-4 sm:mb-0"
                />
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-2">
                    {t("title")}{" "}
                    <span className="font-semibold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                      {t("app_name")}
                    </span>
                  </h1>
                  <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary to-success rounded-full mx-auto sm:mx-0 animate-in zoom-in duration-500 delay-[400ms]" />
                </div>
              </div>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed text-center sm:text-left animate-in fade-in slide-in-from-bottom-1 duration-700 delay-300">
                {t("description")}
              </p>
            </div>

            {/* Mobile feature showcase */}
            <div className="grid grid-cols-1 gap-4 md:hidden mb-8">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-success/5 to-success/3 border border-success/10 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-600 animate-in fade-in slide-in-from-left-2 delay-[400ms]">
                <TaskOrganizationIcon />
                <div>
                  <h3 className="font-medium text-foreground">
                    {t("beautiful_task_organization")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t("organize_with_drag_and_drop")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/3 border border-primary/10 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-left-2 delay-500">
                <CalendarIntegrationIcon />
                <div>
                  <h3 className="font-medium text-foreground">
                    {t("calendar_integration")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t("schedule_seamlessly")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-warning/5 to-warning/3 border border-warning/10 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-left-2 delay-600">
                <CollaborationIcon />
                <div>
                  <h3 className="font-medium text-foreground">
                    {t("team_collaboration")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t("work_together")}
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop feature showcase */}
            <div className="space-y-8 hidden md:block">
              <div className="flex items-center gap-6 group hover:translate-x-1 transition-all duration-300 animate-in fade-in slide-in-from-left-3 delay-[400ms]">
                <div className="p-3 rounded-xl bg-gradient-to-br from-success/10 to-success/5 group-hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <TaskOrganizationIcon />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">
                    {t("beautiful_task_organization")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t("organize_with_drag_and_drop")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 group hover:translate-x-1 transition-all duration-300 animate-in fade-in slide-in-from-left-3 delay-500">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 group-hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <CalendarIntegrationIcon />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">
                    {t("calendar_integration")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t("schedule_seamlessly")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 group hover:translate-x-1 transition-all duration-300 animate-in fade-in slide-in-from-left-3 delay-600">
                <div className="p-3 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 group-hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <CollaborationIcon />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">
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
