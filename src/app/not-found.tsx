import { ROUTES } from "@/lib/config/constants";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const generateMetadata = async () => {
  const t = await getTranslations("not_found.meta");
  return {
    title: t("title"),
    description: t("description"),
    robots: "noindex, nofollow",
  };
};

const NotFound = async () => {
  const t = await getTranslations("not_found");

  return (
    <main
      id="main-content"
      className="min-h-screen flex items-center justify-center bg-background"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          {t("title")}
        </h1>
        <p className="text-xl text-muted-foreground mb-4">{t("message")}</p>
        <Link
          replace
          href={ROUTES.HOME}
          className="text-primary hover:text-primary/80 underline"
        >
          {t("return_home")}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
