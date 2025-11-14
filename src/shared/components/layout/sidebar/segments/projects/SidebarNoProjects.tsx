"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "../../../../ui/Button";
import { SidebarInlineProjectForm } from "./SidebarInlineProjectForm";

export const SidebarNoProjects = () => {
  const t = useTranslations("sidebar");
  const [showInlineForm, setShowInlineForm] = useState(false);

  if (showInlineForm) {
    return <SidebarInlineProjectForm />;
  }

  return (
    <section
      role="status"
      className="flex justify-center"
      data-testid="sidebar-projects-segment-empty"
    >
      <Button
        variant="link"
        className="underline h-fit"
        onClick={() => setShowInlineForm(true)}
        data-testid="sidebar-create-first-project-cta"
      >
        {t("projects.create_first_project")}
      </Button>
    </section>
  );
};
