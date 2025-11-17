"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/shared/components/ui";
import { Loader2, LucideIcon, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface ErrorBoundaryContentProps {
  error: Error & { digest?: string };
  onReset: () => void;
  icon?: LucideIcon;
  title: string;
  description: string;
  primaryActionLabel: string;
  primaryActionLoadingLabel: string;
  secondaryAction?: {
    label: string;
    href: string;
  };
  errorCodeLabel?: string;
}

export const ErrorBoundaryContent = ({
  error,
  onReset,
  icon: Icon = XCircle,
  title,
  description,
  primaryActionLabel,
  primaryActionLoadingLabel,
  secondaryAction,
  errorCodeLabel = "Error Code",
}: ErrorBoundaryContentProps) => {
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    console.error("Error caught by error boundary:", error);
  }, [error]);

  const handleReset = () => {
    setIsResetting(true);
    onReset();
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex flex-col items-center justify-center py-12 sm:py-20 lg:py-24 px-4 text-center"
    >
      {isResetting && "isResetting"}
      {/* Icon */}
      <div className="mb-6 p-6 rounded-full bg-muted/30 border border-border">
        <Icon
          size={64}
          className="text-foreground/60"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
        {title}
      </h1>

      {/* Description */}
      <p className="text-muted-foreground max-w-lg mb-8 text-base sm:text-lg leading-relaxed">
        {description}
      </p>

      {/* Error digest in development */}
      {process.env.NODE_ENV === "development" && error.digest && (
        <p className="text-xs text-muted-foreground mb-6 font-mono">
          {errorCodeLabel}: {error.digest}
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleReset}
          disabled={isResetting}
          size="lg"
          autoFocus
          className="min-w-36"
        >
          {isResetting && (
            <Loader2 className="animate-spin" aria-hidden="true" />
          )}
          {isResetting ? primaryActionLoadingLabel : primaryActionLabel}
        </Button>

        {secondaryAction && (
          <Button asChild variant="secondary" size="lg">
            <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
