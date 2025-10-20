import { ROUTES } from "@/lib/config/constants";
import { NextPagePromiseProps } from "@/shared/types";
import { AlertTriangleIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getLoginError } from "../helpers/getLoginError";

export default async function AuthErrorPage({
  searchParams,
}: NextPagePromiseProps) {
  const error = (await searchParams)?.error;
  const { title, message } = await getLoginError(error as string);
  const t = await getTranslations("error");

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
          <AlertTriangleIcon className="h-8 w-8 text-danger" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-foreground">{title}</h1>

        <p className="mt-4 text-muted-foreground">{message}</p>

        <div className="mt-8">
          <Link
            replace
            href={ROUTES.LOGIN}
            className="inline-block w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {t("go_to_login")}
          </Link>
        </div>
      </div>
    </div>
  );
}
