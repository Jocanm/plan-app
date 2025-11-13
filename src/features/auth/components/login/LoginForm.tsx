import { Card, CardContent } from "@/shared/components/ui/Card";
import { getTranslations } from "next-intl/server";
import { OauthForm } from "./oauth/OauthForm";

export const LoginForm = async () => {
  const t = await getTranslations("login");

  return (
    <div className="flex items-center justify-center px-6 md:px-12 py-6 lg:py-16">
      <div className="w-full max-w-md">
        <Card className="border border-white/20 bg-white/90 dark:bg-card/95 backdrop-blur-2xl shadow-2xl shadow-black/10 ring-1 ring-white/10 hover:shadow-black/15 transition-all duration-300">
          <CardContent className="p-6 lg:p-8">
            <div className="text-center mb-8 lg:mb-10">
              <div className="mb-6">
                {/* Lock icon with subtle glow */}
                <div className="relative w-16 h-16 mx-auto mb-4">
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"
                    aria-hidden="true"
                  />
                  {/* Icon */}
                  <svg
                    className="relative w-16 h-16 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-2">
                  {t("subtitle")}
                </h2>
                <div className="h-0.5 w-16 bg-primary rounded-full mx-auto" />
              </div>
              <p className="text-muted-foreground text-sm lg:text-base">
                {t("choose_signin_method")}
              </p>
            </div>

            <OauthForm />

            {/* Security indicator */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full text-xs text-success-foreground/80 font-medium shadow-sm">
                <svg
                  className="w-4 h-4 text-success"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{t("security_message")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
