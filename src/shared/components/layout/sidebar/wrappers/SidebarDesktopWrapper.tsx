interface SidebarDesktopWrapperProps {
  children: React.ReactNode;
}

export const SidebarDesktopWrapper = ({
  children,
}: SidebarDesktopWrapperProps) => {
  return <div className="hidden xl:block w-70 border-r">{children}</div>;
};
