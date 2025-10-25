import { LoginForm } from "@/features/auth/components/login/LoginForm";
import { ROUTES } from "@/lib/config/constants";
import {
  CalendarIntegrationIcon,
  CollaborationIcon,
  TaskOrganizationIcon,
} from "@/shared/components/icons/FeatureIcons";
import { PlanLogo } from "@/shared/components/icons/PlanLogo";
import { getBaseUrl } from "@/shared/utils/getBaseUrl";
import { Locale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { use } from "react";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "login" });
  const baseUrl = getBaseUrl();
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${baseUrl}/${locale}/auth/login`,
    },
  };
};

const Login = ({ params, searchParams }: PageProps<"/[locale]/auth/login">) => {
  const { locale } = use(params);
  const { error } = use(searchParams);
  setRequestLocale(locale as Locale);

  const t = useTranslations("login");

  if (error) {
    redirect(`/${locale}${ROUTES.ERROR}?error=${error}`);
  }

  return (
    <main id="main-content" className="min-h-screen">
      {/* Mobile Layout - Hero + Login */}
      <div className="lg:hidden">
        {/* Hero Section */}
        <section
          aria-labelledby="hero-heading-mobile"
          className="px-4 py-12 text-center"
        >
          <PlanLogo size="lg" className="mx-auto mb-6" />
          <h1
            id="hero-heading-mobile"
            className="text-4xl font-bold text-foreground mb-3"
          >
            {t("title")} <span className="text-primary">{t("app_name")}</span>
          </h1>
          <p className="text-muted-foreground text-lg">{t("description")}</p>
        </section>

        <section aria-label="Sign in form" className="px-2 pb-12">
          <LoginForm />
        </section>
      </div>

      {/* Desktop Layout - Features + Login */}
      <div className="hidden lg:flex min-h-screen justify-center items-center px-6">
        <div className="w-full max-w-7xl flex">
          {/* Left Column - Features */}
          <section
            aria-labelledby="features-heading"
            className="flex-1 flex items-center justify-center px-12 py-16"
          >
            <div className="max-w-lg">
              {/* Logo + Title */}
              <div className="mb-12">
                <PlanLogo size="lg" className="mb-6" />
                <h1
                  id="features-heading"
                  className="text-5xl font-light text-foreground mb-2"
                >
                  {t("title")}{" "}
                  <span className="font-semibold text-primary">
                    {t("app_name")}
                  </span>
                </h1>
                <div
                  className="h-1 w-32 bg-primary rounded-full mb-6"
                  aria-hidden="true"
                />
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t("description")}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-6" role="list">
                <li className="flex items-center gap-4">
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
                </li>

                <li className="flex items-center gap-4">
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
                </li>

                <li className="flex items-center gap-4">
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
                </li>
              </ul>
            </div>
          </section>

          {/* Right Column - Login Card */}
          <section
            aria-label="Sign in form"
            className="flex-1 flex items-center justify-center"
          >
            <LoginForm />
          </section>
        </div>
      </div>
    </main>
  );
};

export default Login;
