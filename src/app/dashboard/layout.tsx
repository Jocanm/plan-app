import { Sidebar } from "../../shared/components/ui/sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
