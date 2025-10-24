import { revalidateTag } from "next/cache";
import { getCurrentUser } from "../../features/auth/app/actions/getCurrentUser";
import { Button } from "../../shared/components/ui";

const DashboardPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <form
      action={async () => {
        "use server";
        revalidateTag(`projects-${currentUser.id}`, "max");
      }}
    >
      <Button>Refresh</Button>
    </form>
  );
};

export default DashboardPage;
