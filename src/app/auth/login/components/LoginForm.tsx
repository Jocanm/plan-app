import { Card, CardContent } from "@/components/ui/Card";
import { GoogleButton } from "./GoogleButton";
import { GithubButton } from "./GithubButton";

export const LoginForm = () => {
  return (
    <div className="md:flex-1 flex items-center justify-center px-12 py-8 md:py-16 bg-surface/30">
      <div className="w-full max-w-md">
        <Card className="border-surface-border shadow-xl bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Sign in to your account
              </h2>
              <p className="text-muted-foreground">
                Choose your preferred sign in method
              </p>
            </div>

            <div className="space-y-4">
              <GoogleButton />
              <GithubButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
