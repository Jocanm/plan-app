import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/lib/config/constants";
import { useTranslations } from "next-intl";
import { Main } from "../../shared/components/ui/main/Main";

const NotFound = () => {
  const t = useTranslations("not_found");

  return (
    <Main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          {t("title")}
        </h1>
        <p className="text-xl text-muted-foreground mb-4">{t("message")}</p>
        <Link
          replace
          href={ROUTES.DASHBOARD}
          className="text-primary hover:text-primary/80 underline"
        >
          {t("return_home")}
        </Link>
      </div>
    </Main>
  );
};

export default NotFound;
