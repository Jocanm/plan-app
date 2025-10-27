import { Button } from "@/shared/components/ui";
import { Link } from "../../../i18n/navigation";

const DashboardPage = async () => {
  return (
    <form
      action={async () => {
        "use server";
      }}
    >
      <Button>Refresh</Button>
      <Link locale="en" href="/dashboard">
        change language
      </Link>
    </form>
  );
};

export default DashboardPage;
