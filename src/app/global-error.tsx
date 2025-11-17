"use client";

import { Button } from "@/components/ui";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-background text-foreground"
        >
          {/* Icon */}
          <div className="mb-6 p-6 rounded-full bg-muted/30 border border-border">
            <AlertTriangle
              size={64}
              className="text-foreground/60"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
            Oops! Something went wrong
          </h1>

          {/* Description */}
          <p className="text-muted-foreground max-w-lg mb-8 text-base sm:text-lg leading-relaxed">
            We encountered a critical error. Please try reloading the page.
          </p>

          {/* Error digest in development */}
          {process.env.NODE_ENV === "development" && error.digest && (
            <p className="text-xs text-muted-foreground mb-6 font-mono">
              Error Code: {error.digest}
            </p>
          )}

          {/* Action */}
          <Button onClick={reset} autoFocus>
            Try Again
          </Button>
        </div>
      </body>
    </html>
  );
}
