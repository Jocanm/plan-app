import { Button } from "@/components/ui/Button";
import { auth } from "@/lib/auth";
import { signOutAction } from "../features/auth/actions";
import { ROUTES } from "../lib/constants/routes";

const HomePage = async () => {
  const session = await auth();

  return (
    <pre>
      {JSON.stringify(session, null, 2)}
      <form
        action={async () => {
          "use server";
          await signOutAction({ redirectTo: ROUTES.LOGIN });
        }}
      >
        <Button type="submit" className="mt-4">
          Sign Out
        </Button>
      </form>
    </pre>
  );
};

export default HomePage;
