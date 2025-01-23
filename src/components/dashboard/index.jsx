import DashboardNav from "@/components/dashboard-nav";
import Sidebar from "@/components/dashboard/sidebar";
import Brand from "@/components/brand";
import MainContent from "@/components/dashboard/main";

const Dashboard = ({ children }) => {
  return (
    <div className={"grid grid-cols-12"}>
      <Sidebar>
        <div className="p-[30px] border-b">
          <Brand />
        </div>

        <DashboardNav />
      </Sidebar>

      <MainContent>{children}</MainContent>
    </div>
  );
};

export default Dashboard;
