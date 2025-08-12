"use client";

import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Button, ButtonProps } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { Github } from "lucide-react";
import { type ProviderId } from "next-auth/providers";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

export const OauthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<ProviderId | null>(
    null
  );

  const onSignIn = async (provider: ProviderId) => {
    setIsLoading(true);
    setLoadingProvider(provider);
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
      });
    } finally {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  return (
    <form className="space-y-5">
      <OauthButton
        onClick={() => onSignIn("google")}
        disabled={isLoading}
        isLoading={loadingProvider === "google"}
        provider="google"
      >
        <GoogleIcon />
        Continue with Google
      </OauthButton>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-transparent px-4 text-muted-foreground font-medium">
            or
          </span>
        </div>
      </div>

      <OauthButton
        onClick={() => onSignIn("github")}
        disabled={isLoading}
        isLoading={loadingProvider === "github"}
        provider="github"
      >
        <Github />
        Continue with GitHub
      </OauthButton>
    </form>
  );
};

interface OauthButtonProps extends ButtonProps {
  isLoading?: boolean;
  provider?: "google" | "github";
}

const OauthButton = ({
  className,
  isLoading = false,
  provider,
  children,
  disabled,
  ...props
}: OauthButtonProps) => {
  const providerStyles = {
    google: "hover:shadow-[0_8px_30px_rgb(66,133,244,0.3)]",
    github: "hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]",
  };

  return (
    <Button
      {...props}
      type="button"
      variant="outline"
      disabled={disabled || isLoading}
      className={`
        w-full h-14 lg:h-16 text-sm lg:text-base font-medium relative overflow-hidden group
        bg-white/5 backdrop-blur-sm border border-white/20 
        hover:bg-white/10 hover:border-white/30 hover:scale-[1.02]
        focus:ring-2 focus:ring-primary/50 focus:border-primary/50
        transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${provider ? providerStyles[provider] : ""}
        ${className}
      `}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-success/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative flex items-center justify-center gap-2 lg:gap-3">
        {isLoading ? (
          <div className="w-5 lg:w-6 h-5 lg:h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <span className="w-5 lg:w-6 h-5 lg:h-6 flex items-center justify-center">
            {React.Children.toArray(children)[0]}
          </span>
        )}
        <span className="font-medium">
          {isLoading ? "Signing in..." : React.Children.toArray(children)[1]}
        </span>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </Button>
  );
};
