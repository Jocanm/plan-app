import { cn } from "@/shared/utils/cn";
import Link, { LinkProps } from "next/link";

interface Props extends LinkProps {
  className?: string;
  children: React.ReactNode;
}

export const SidebarLink = ({ className, children, ...props }: Props) => {
  return (
    <Link
      {...props}
      className={cn(
        "px-4 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md flex hover:bg-accent/50 transition-colors items-center text-foreground",
        className
      )}
    >
      <div className="flex items-center gap-2 flex-1">{children}</div>
    </Link>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-medium">{children}</span>;
};

const Icon = ({ children }: { children: React.ReactNode }) => {
  return <span aria-hidden>{children}</span>;
};

const Color = ({ dot }: { dot: string }) => {
  return <span className={cn("h-3 w-3 rounded-sm", dot)} aria-hidden="true" />;
};

const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "border rounded-full px-2 py-0.5 text-xs ml-auto",
        className
      )}
    >
      {children}
    </span>
  );
};

SidebarLink.Icon = Icon;
SidebarLink.Label = Label;
SidebarLink.Color = Color;
SidebarLink.Badge = Badge;
