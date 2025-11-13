import { LoginForm } from "@/features/auth/components/login/LoginForm";
import { FeatureList } from "@/features/auth/components/login/hero/FeatureList";
import { LoginHero } from "@/features/auth/components/login/hero/LoginHero";
import { GradientMesh } from "@/shared/components/ui/backgrounds/GradientMesh";
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
      <GradientMesh />

      {/* Responsive Layout - Grid on desktop, Stack on mobile */}
      <div className="min-h-screen lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-6">
        {/* Left Column (desktop) / Top (mobile) - Hero + Features */}
        <section
          aria-labelledby="hero-heading"
          className="lg:flex lg:items-center lg:justify-center lg:px-12 lg:py-16"
        >
          <div className="lg:max-w-lg">
            <LoginHero />
            <div className="hidden lg:block mt-12">
              <FeatureList />
            </div>
          </div>
        </section>

        {/* Right Column (desktop) / Bottom (mobile) - Login Form */}
        <section
          aria-label={t("signin_form_label")}
          className="px-2 pb-12 lg:px-0 lg:pb-0 lg:flex lg:items-center lg:justify-center"
        >
          <LoginForm />
        </section>
      </div>
    </Main>
  );
};

export default Login;
