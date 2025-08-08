"use client";

import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Button, ButtonProps } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { Github } from "lucide-react";
import { type ProviderId } from "next-auth/providers";
import { signIn } from "next-auth/react";
import { useState } from "react";

export const OauthForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSignIn = async (provider: ProviderId) => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4">
      <OauthButton onClick={() => onSignIn("google")} disabled={isLoading}>
        <GoogleIcon />
        Continue with Google
      </OauthButton>
      <OauthButton onClick={() => onSignIn("github")} disabled={isLoading}>
        <Github />
        Continue with GitHub
      </OauthButton>
    </form>
  );
};

const OauthButton = ({ className, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      type="button"
      variant="outline"
      className={`w-full h-14 text-base font-medium bg-background/80 hover:bg-surface border-surface-border hover:border-primary/30 transition-all duration-200 ${className}`}
    />
  );
};
