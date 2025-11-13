import { ClipboardList } from "lucide-react";
import { useTranslations } from "next-intl";

export const NoTasks = () => {
  const t = useTranslations("project");

  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <ClipboardList
        size={48}
        className="text-muted-foreground mb-4"
        aria-hidden="true"
      />
      <h2 className="text-xl font-semibold mb-2">{t("no_tasks_title")}</h2>
      <p className="text-muted-foreground max-w-md">{t("no_tasks_message")}</p>
    </div>
  );
};
