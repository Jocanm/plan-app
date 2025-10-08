import { Button } from "@/components/ui/Button";
import { auth } from "@/lib/auth";
import { signOutAction } from "../features/auth/actions";

const HomePage = async () => {
  const session = await auth();

  return (
    <pre>
      {JSON.stringify(session, null, 2)}
      <form
        action={async () => {
          "use server";
          await signOutAction();
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
