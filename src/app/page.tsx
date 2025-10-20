import { auth } from "@/lib/auth";
import { Button } from "@/shared/components/ui/Button";
import { getTranslations } from "next-intl/server";
import { signOutAction } from "../features/auth/app/actions/signOut";

const HomePage = async () => {
  const session = await auth();
  const t = await getTranslations("home");

  return (
    <main id="main-content" className="p-6">
      <h1 className="text-2xl font-bold mb-4">Session Debug</h1>
      <section aria-label="Session data">
        <pre className="bg-muted p-4 rounded overflow-auto">
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
      </section>

      <section aria-label="Authentication controls" className="mt-6">
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
      </section>
    </main>
  );
};

export default HomePage;
