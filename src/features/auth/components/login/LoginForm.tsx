import { Card, CardContent } from "@/components/ui/card";
import { LoginHeader } from "./LoginHeader";
import { OauthForm } from "./oauth/OauthForm";
import { SecurityBadge } from "./SecurityBadge";

export const LoginForm = async () => {
  return (
    <div className="flex items-center justify-center px-6 md:px-12 py-6 lg:py-16">
      <div className="w-full max-w-md">
        <Card className="border border-border/30 bg-card/90 backdrop-blur-2xl shadow-2xl ring-1 ring-primary/10 hover:ring-primary/15 transition-all duration-300">
          <CardContent className="p-6 lg:p-8">
            <LoginHeader />
            <OauthForm />
            <SecurityBadge />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
