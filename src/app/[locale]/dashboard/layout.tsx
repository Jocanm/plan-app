import { SideCalendar } from "@/features/calendar/components/sideCalendar/SideCalendar";
import { SideCalendarDesktopWrapper } from "@/features/calendar/components/wrappers/SideCalendarDesktopWrapper";
import { SideCalendarMobileWrapper } from "@/features/calendar/components/wrappers/SideCalendarMobileWrapper";
import { MobileHeader } from "@/shared/components/layout/header/MobileHeader";
import { Main } from "@/shared/components/layout/main/Main";
import { Sidebar } from "@/shared/components/layout/sidebar/Sidebar";
import { SidebarDesktopWrapper } from "@/shared/components/layout/sidebar/wrappers/SidebarDesktopWrapper";
import { SidebarMobileWrapper } from "@/shared/components/layout/sidebar/wrappers/SidebarMobileWrapper";
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
    <div className="flex flex-col h-screen">
      <MobileHeader />
      <div className="flex flex-1 overflow-hidden">
        <SidebarDesktopWrapper>
          <Sidebar />
        </SidebarDesktopWrapper>
        <Main className="flex-1 p-6">{children}</Main>
        <SideCalendarDesktopWrapper>
          <SideCalendar />
        </SideCalendarDesktopWrapper>
      </div>
      <SidebarMobileWrapper>
        <Sidebar />
      </SidebarMobileWrapper>
      <SideCalendarMobileWrapper>
        <SideCalendar />
      </SideCalendarMobileWrapper>
    </div>
  );
};

export default DashboardLayout;
