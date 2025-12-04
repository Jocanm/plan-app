"use client";

import { PlanLogo } from "@/shared/components/icons/PlanLogo";
import { useTranslations } from "next-intl";

export const LoginHero = () => {
  const t = useTranslations("login");

  return (
    <section
      aria-labelledby="hero-heading"
      className="px-4 lg:px-0 py-12 lg:py-0 text-center lg:text-left relative overflow-hidden lg:overflow-visible"
    >
      {/* Gradient background - mobile only */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent lg:hidden"
        aria-hidden="true"
      />

      <PlanLogo size="lg" className="mx-auto lg:mx-0 mb-6 drop-shadow-sm" />

      <h1
        id="hero-heading"
        className="text-4xl lg:text-5xl font-bold lg:font-light text-foreground mb-3 lg:mb-2"
      >
        {t("title")}{" "}
        <span className="text-primary font-medium">{t("app_name")}</span>
      </h1>

      {/* Decorative line - desktop only */}
      <div
        className="hidden lg:block h-0.5 w-24 bg-gradient-to-r from-primary via-primary/80 to-transparent rounded-full mb-6 shadow-sm shadow-primary/30"
        aria-hidden="true"
      />

      <p className="text-lg lg:text-xl text-muted-foreground lg:leading-relaxed mx-auto max-w-xl lg:max-w-none">
        {t("description")}
      </p>
    </section>
  );
};
