import { Button } from "@/shared/components/ui";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface InlineErrorProps {
  showDescription?: boolean;
}

export const InlineError = ({ showDescription }: InlineErrorProps) => {
  const t = useTranslations("error.inline");

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-8 px-4 text-center"
    >
      <div className="mb-4 p-3 rounded-full bg-muted/20 border border-border">
        <AlertCircle
          size={24}
          className="text-foreground/50"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      <h3 className="text-base font-semibold mb-2">{t("title")}</h3>

      {showDescription && (
        <p className="text-sm text-muted-foreground mb-4 max-w-xs">
          {t("description")}
        </p>
      )}

      <Button size="sm" variant="link" className="min-w-24">
        {t("retry")}
      </Button>
    </div>
  );
};
