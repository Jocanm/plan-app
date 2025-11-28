import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "../../../utils/cn";
import { InlineErrorRetryCta } from "./InlineErrorRetryCta";

interface InlineErrorProps extends React.ComponentProps<"div"> {
  showDescription?: boolean;
  retryAction?: () => Promise<void>;
}

export const InlineError = ({
  retryAction,
  showDescription,
  className,
  ...props
}: InlineErrorProps) => {
  const t = useTranslations("error.inline");

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center py-8 px-4 text-center",
        className
      )}
      {...props}
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

      {retryAction && (
        <form action={retryAction}>
          <InlineErrorRetryCta />
        </form>
      )}
    </div>
  );
};
