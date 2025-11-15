"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSidebarStore } from "../../../../../stores/useSidebarStore";
import { Button } from "../../../../ui/Button";

export const SidebarCreateProjectCta = () => {
  const t = useTranslations("sidebar.projects");
  const setShowInlineForm = useSidebarStore(s => s.setShowInlineProjectForm);

  return (
    <Button
      size="xs"
      variant="ghost"
      aria-label={t("add_project")}
      className="text-muted-foreground"
      onClick={() => setShowInlineForm(true)}
      data-testid="sidebar-create-project-cta"
    >
      <Plus size={16} aria-hidden="true" />
    </Button>
  );
};
