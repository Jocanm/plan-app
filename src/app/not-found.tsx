import { ROUTES } from "@/lib/constants/routes";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const generateMetadata = async () => {
  const t = await getTranslations("not_found.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
};

const NotFound = async () => {
  const t = await getTranslations("not_found");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-black">{t("title")}</h1>
        <p className="text-xl text-gray-600 mb-4">{t("message")}</p>
        <Link
          href={ROUTES.HOME}
          className="text-blue-500 hover:text-blue-700 underline"
        >
          {t("return_home")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
