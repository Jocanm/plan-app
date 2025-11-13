import { Main } from "@/shared/components/ui/main/Main";
import { Sidebar } from "@/shared/components/ui/sidebar/Sidebar";
import { SideCalendar } from "../../../shared/components/ui/calendar/sideCalendar/SideCalendar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Main className="flex-1 p-6">{children}</Main>
      <SideCalendar />
    </div>
  );
};

export default DashboardLayout;
