"use client";

import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Button, ButtonProps } from "@/components/ui/Button";
import { signInAction } from "@/features/auth/actions";
import { ROUTES } from "@/lib/constants/routes";
import clsx from "clsx";
import { Github } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

const BASE_OPTIONS = {
  redirectTo: ROUTES.HOME,
};

export const OauthForm = () => {
  const t = useTranslations("login");

  return (
    <div className="animate-in fade-in duration-500 delay-500 space-y-5">
      <form action={() => signInAction("google", BASE_OPTIONS)}>
        <div className="animate-in zoom-in duration-500 delay-600">
          <OauthButton>
            <GoogleIcon />
            {t("continue_with_google")}
          </OauthButton>
        </div>
      </form>
      <Separator />
      <form action={() => signInAction("github", BASE_OPTIONS)}>
        <div className="animate-in zoom-in duration-500 delay-[750ms]">
          <OauthButton>
            <Github />
            {t("continue_with_github")}
          </OauthButton>
        </div>
      </form>
    </div>
  );
};

const OauthButton = ({
  className,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      type="submit"
      variant="outline"
      disabled={disabled || pending}
      className={clsx(
        `w-full h-14 lg:h-16 text-sm lg:text-base font-medium relative overflow-hidden group
        bg-white/5 backdrop-blur-sm border border-white/20 
        hover:-translate-y-0.5 hover:shadow-lg
        focus:ring-2 focus:ring-primary/50 focus:border-primary/50
        transition-all duration-200 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`,
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-success/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-center justify-center gap-2">{children}</div>
    </Button>
  );
};

const Separator = () => {
  const t = useTranslations("login");

  return (
    <div className="relative animate-in fade-in duration-400 delay-700">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-white/20" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-transparent px-4 text-muted-foreground font-medium">
          {t("separator_or")}
        </span>
      </div>
    </div>
  );
};
