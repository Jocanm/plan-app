import { auth } from "@/lib/auth";
import { Button } from "@/shared/components/ui/Button";
import { getTranslations } from "next-intl/server";
import { signOutAction } from "../features/auth/app/actions";

const HomePage = async () => {
  const session = await auth();
  const t = await getTranslations("home");

  return (
    <pre>
      {JSON.stringify(session, null, 2)}
      <form
        action={async () => {
          "use server";
          await signOutAction();
        }}
      >
        <Button type="submit" className="mt-4" data-testid="sign-out-button">
          {t("sign_out")}
        </Button>
      </form>
    </pre>
  );
};

export default HomePage;
