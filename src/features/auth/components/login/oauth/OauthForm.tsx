"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { signInAction } from "@/features/auth/app/actions/signIn";
import { GoogleIcon } from "@/shared/components/icons/GoogleIcon";
import { QUERY_KEYS } from "@/shared/types/qs";
import clsx from "clsx";
import { Github } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";

export const OauthForm = () => {
  const locale = useLocale();
  const params = useSearchParams();
  const t = useTranslations("login");

  const from = params.get(QUERY_KEYS.from);

  return (
    <div className="space-y-4">
      <form
        action={() => signInAction("google", { redirectTo: from }, locale)}
        aria-label={t("continue_with_google")}
      >
        <OauthButton aria-label={t("continue_with_google")}>
          <GoogleIcon />
          <span>{t("continue_with_google")}</span>
        </OauthButton>
      </form>

      <Separator />

      <form
        action={() => signInAction("github", { redirectTo: from }, locale)}
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
          "w-full h-14 group relative overflow-hidden",
          "border-2 border-border/60 hover:border-primary/40",
          "bg-card hover:bg-gradient-to-br hover:from-card hover:to-primary/5",
          "shadow-sm hover:shadow-lg hover:shadow-primary/10",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-0.5",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
          className
        )}
      >
        {/* Gradient shimmer effect on hover */}
        <div
          className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700"
          aria-hidden="true"
        />
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
    <div
      className="relative my-6"
      role="separator"
      aria-label={t("separator_or")}
    >
      <div className="absolute inset-0 flex items-center">
        <div
          className="w-full h-[2px] bg-gradient-to-r from-transparent via-border to-transparent"
          aria-hidden="true"
        />
      </div>
      <div className="relative flex justify-center text-xs uppercase tracking-wider">
        <span className="bg-card px-6 py-1 text-muted-foreground font-semibold rounded-full">
          {t("separator_or")}
        </span>
      </div>
    </div>
  );
};
