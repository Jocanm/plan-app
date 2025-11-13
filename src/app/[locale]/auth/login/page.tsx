import { LoginForm } from "@/features/auth/components/login/LoginForm";
import {
  CalendarIntegrationIcon,
  CollaborationIcon,
  TaskOrganizationIcon,
} from "@/shared/components/icons/FeatureIcons";
import { PlanLogo } from "@/shared/components/icons/PlanLogo";
import { Main } from "@/shared/components/ui/main/Main";
import { getBaseUrl } from "@/shared/utils/getBaseUrl";
import { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

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

const Login = async ({ params }: PageProps<"/[locale]/auth/login">) => {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "login",
  });

  return (
    <Main className="min-h-screen relative overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* Primary gradient orb - top right */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        {/* Secondary gradient orb - bottom left */}
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-success/5 blur-3xl" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(221, 69%, 90%) 1px, transparent 1px),
              linear-gradient(90deg, hsl(221, 69%, 90%) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Mobile Layout - Hero + Login */}
      <div className="lg:hidden">
        {/* Hero Section */}
        <section
          aria-labelledby="hero-heading-mobile"
          className="px-4 py-12 text-center relative overflow-hidden"
        >
          {/* Gradient background - mobile only */}
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent"
            aria-hidden="true"
          />
          <PlanLogo size="lg" className="mx-auto mb-6 drop-shadow-sm" />
          <h1
            id="hero-heading-mobile"
            className="text-4xl font-bold text-foreground mb-3"
          >
            {t("title")} <span className="text-primary">{t("app_name")}</span>
          </h1>
          <p className="text-muted-foreground text-lg">{t("description")}</p>
        </section>

        <section aria-label={t("signin_form_label")} className="px-2 pb-12">
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
                  className="h-0.5 w-24 bg-gradient-to-r from-primary via-primary/80 to-transparent rounded-full mb-6 shadow-sm shadow-primary/30"
                  aria-hidden="true"
                />
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t("description")}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-6">
                <li className="flex items-center gap-4 group animate-fade-in-up animation-delay-100">
                  <div className="w-12 h-12 rounded-xl bg-success/15 shadow-md shadow-success/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-success/20 transition-all duration-300">
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

                <li className="flex items-center gap-4 group animate-fade-in-up animation-delay-200">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 shadow-md shadow-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
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

                <li className="flex items-center gap-4 group animate-fade-in-up animation-delay-300">
                  <div className="w-12 h-12 rounded-xl bg-warning/15 shadow-md shadow-warning/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-warning/20 transition-all duration-300">
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
            aria-label={t("signin_form_label")}
            className="flex-1 flex items-center justify-center"
          >
            <LoginForm />
          </section>
        </div>
      </div>
    </Main>
  );
};

export default Login;
