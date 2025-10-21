"use client";

import { signInAction } from "@/features/auth/app/actions/signIn";
import { ROUTES } from "@/lib/config/constants";
import { GoogleIcon } from "@/shared/components/icons/GoogleIcon";
import { Button, ButtonProps } from "@/shared/components/ui/Button";
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
    <div className="space-y-4">
      <form
        action={() => signInAction("google", BASE_OPTIONS)}
        aria-label={t("continue_with_google")}
      >
        <OauthButton aria-label={t("continue_with_google")}>
          <GoogleIcon />
          <span>{t("continue_with_google")}</span>
        </OauthButton>
      </form>

      <Separator />

      <form
        action={() => signInAction("github", BASE_OPTIONS)}
        aria-label={t("continue_with_github")}
      >
        <OauthButton aria-label={t("continue_with_github")}>
          <Github aria-hidden="true" />
          <span>{t("continue_with_github")}</span>
        </OauthButton>
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
  const t = useTranslations("login");

  return (
    <>
      <Button
        {...props}
        type="submit"
        variant="outline"
        disabled={disabled || pending}
        aria-busy={pending}
        className={clsx(
          "w-full h-12 lg:h-14 hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
      >
        {children}
      </Button>
      {pending && (
        <span className="sr-only" role="status" aria-live="assertive">
          {t("signing_in_wait")}
        </span>
      )}
    </>
  );
};

const Separator = () => {
  const t = useTranslations("login");

  return (
    <div className="relative" role="separator" aria-label={t("separator_or")}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t" aria-hidden="true" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-card px-4 text-muted-foreground font-medium">
          {t("separator_or")}
        </span>
      </div>
    </div>
  );
};
