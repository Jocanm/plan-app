import { useTranslations } from "next-intl";
import Image from "next/image";
import { cn } from "../../utils/cn";

const SIZES = {
  md: 48,
  lg: 64,
};

interface PlanLogoProps {
  priority?: boolean;
  className?: string;
  size?: keyof typeof SIZES;
}

export const PlanLogo = ({
  size = "md",
  priority,
  className,
}: PlanLogoProps) => {
  const sizeValue = SIZES[size];
  const t = useTranslations("common");

  return (
    <Image
      priority={priority}
      width={sizeValue}
      height={sizeValue}
      src="/favicon.svg"
      alt={t("logo_alt")}
      className={cn("object-contain", className)}
    />
  );
};
