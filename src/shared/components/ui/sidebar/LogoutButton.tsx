"use client";

import { signOutAction } from "@/features/auth/app/actions/signOut";
import { Button } from "@/shared/components/ui/Button";
import { Loader2, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

export const LogoutButton = () => {
  const t = useTranslations("sidebar.logout");

  const handleLogout = async () => {
    await signOutAction();
  };

  return (
    <form action={handleLogout}>
      <LogoutButtonContent label={t("title")} loadingLabel={t("loading")} />
    </form>
  );
};

interface LogoutButtonContentProps {
  label: string;
  loadingLabel: string;
}

const LogoutButtonContent = ({
  label,
  loadingLabel,
}: LogoutButtonContentProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="ghost"
      disabled={pending}
      aria-busy={pending}
      aria-disabled={pending}
      data-testid="signout-button"
      aria-label={pending ? loadingLabel : label}
      className="w-full justify-start hover:bg-danger/10 hover:text-danger focus-visible:ring-danger"
    >
      {pending ? (
        <Loader2 className="animate-spin" aria-hidden="true" />
      ) : (
        <LogOut aria-hidden="true" />
      )}

      <span className="font-medium">{pending ? loadingLabel : label}</span>

      {pending && <span className="sr-only">Logging out, please wait</span>}
    </Button>
  );
};
