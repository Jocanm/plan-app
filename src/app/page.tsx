import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { auth, signOut } from "@/lib/auth";
import React from "react";

const HomePage = async () => {
  const session = await auth();

  return (
    <pre>
      {JSON.stringify(session, null, 2)}
      <form
        action={async () => {
          "use server";
          await signOut({
            redirectTo: ROUTES.LOGIN,
          });
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
