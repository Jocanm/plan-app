import { redirect } from "next/navigation";
import { ROUTES } from "../lib/config/constants";

const HomePage = () => {
  redirect(ROUTES.DASHBOARD);

  return null;
};

export default HomePage;
