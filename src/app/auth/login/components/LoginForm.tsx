import { Card, CardContent } from "@/components/ui/Card";
import { OauthForm } from "./oauth/OauthForm";

export const LoginForm = () => {
  return (
    <div className="lg:flex-1 flex items-center justify-center px-6 md:px-12 py-6 lg:py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-bl from-primary/3 via-transparent to-background/50" />

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
        <Card className="border border-white/20 shadow-xl lg:shadow-2xl bg-white/10 backdrop-blur-xl relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl transition-all duration-500">
          {/* Glass-morphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-success/5" />

          {/* Subtle border gradient */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-success/10 to-warning/20 p-[1px]">
            <div className="h-full w-full rounded-lg bg-white/10 backdrop-blur-xl" />
          </div>

          <CardContent className="p-6 lg:p-8 relative z-10">
            <div className="text-center mb-8 lg:mb-10">
              <div className="mb-6">
                <div className="w-14 lg:w-16 h-14 lg:h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-success/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 animate-in zoom-in delay-[400ms] hover:scale-105 transition-transform duration-200">
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
                <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-2 animate-in fade-in slide-in-from-bottom-1 duration-600 delay-500">
                  Sign in to your account
                </h2>
                <div className="h-0.5 w-16 bg-gradient-to-r from-primary to-success rounded-full mx-auto animate-in zoom-in duration-400 delay-600" />
              </div>
              <p className="text-muted-foreground text-sm lg:text-base animate-in fade-in slide-in-from-bottom-1 duration-500 delay-700">
                Choose your preferred sign in method
              </p>
            </div>

            <OauthForm />

            {/* Security indicator */}
            <div className="mt-8 text-center animate-in fade-in duration-500 delay-[800ms]">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:scale-105 transition-transform duration-200">
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
                <span>Secured with enterprise-grade encryption</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
