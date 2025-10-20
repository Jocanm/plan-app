import { Card, CardContent } from "@/shared/components/ui/Card";
import { getTranslations } from "next-intl/server";
import { OauthForm } from "./oauth/OauthForm";

export const LoginForm = async () => {
  const t = await getTranslations("login");

  return (
    <div className="lg:flex-1 flex items-center justify-center px-6 md:px-12 py-6 lg:py-16">
      <div className="w-full max-w-md">
        <Card className="border shadow-lg">
          <CardContent className="p-6 lg:p-8">
            <div className="text-center mb-8 lg:mb-10">
              <div className="mb-6">
                <div className="w-14 lg:w-16 h-14 lg:h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center border">
                  <svg
                    className="w-7 lg:w-8 h-7 lg:h-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
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
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <svg
                  className="w-3 h-3 text-success"
                  fill="currentColor"
                  viewBox="0 0 20 20"
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
