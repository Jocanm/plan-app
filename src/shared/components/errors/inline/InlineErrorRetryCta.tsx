"use client";

import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";
import { BaseLoader } from "../../custom/BaseLoader";

export const InlineErrorRetryCta = () => {
  const { pending } = useFormStatus();
  const t = useTranslations("error.inline");

  return (
    <Button
      size="sm"
      type="submit"
      variant="link"
      className="min-w-24"
      disabled={pending}
    >
      {t("retry")}
      {pending && <BaseLoader className="ml-2" key="loader" />}
    </Button>
  );
};
