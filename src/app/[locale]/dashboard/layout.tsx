import { SideCalendar } from "@/shared/components/layout/calendar/sideCalendar/SideCalendar";
import { Main } from "@/shared/components/layout/main/Main";
import { Sidebar } from "@/shared/components/layout/sidebar/Sidebar";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

const DashboardLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Main className="flex-1 p-6">{children}</Main>
      <SideCalendar />
    </div>
  );
};

export default DashboardLayout;
