import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/utils/cn";
import { Suspense } from "react";

type CustomLinkProps = Parameters<typeof Link>[0];

export const SidebarLink = ({
  className,
  children,
  ...props
}: CustomLinkProps) => {
  return (
    <Suspense>
      <Link
        {...props}
        className={cn(
          "px-4 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md flex hover:bg-accent/50 transition-colors items-center text-foreground",
          className
        )}
      >
        <div className="flex items-center gap-2 flex-1">{children}</div>
      </Link>
    </Suspense>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-medium">{children}</span>;
};

const Icon = ({ children }: { children: React.ReactNode }) => {
  return <span aria-hidden>{children}</span>;
};

const Color = ({ dot }: { dot: string }) => {
  return (
    <span
      className="h-3 w-3 rounded-sm"
      aria-hidden="true"
      style={{
        backgroundColor: dot,
      }}
    />
  );
};

const Badge = ({
  children,
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) => {
  return (
    <div>
      <span
        className={cn(
          "border rounded-full px-2 py-0.5 text-xs ml-auto",
          className
        )}
      >
        {children}
      </span>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
};

SidebarLink.Icon = Icon;
SidebarLink.Label = Label;
SidebarLink.Color = Color;
SidebarLink.Badge = Badge;
