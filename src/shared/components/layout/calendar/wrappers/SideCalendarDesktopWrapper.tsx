interface SideCalendarDesktopWrapperProps {
  children: React.ReactNode;
}

export const SideCalendarDesktopWrapper = ({
  children,
}: SideCalendarDesktopWrapperProps) => {
  return (
    <div className="hidden md:block w-72 lg:w-96 h-full py-5 border-l">
      {children}
    </div>
  );
};
