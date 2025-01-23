import DashboardNav from "@/components/dashboard-nav";
import Sidebar from "@/components/dashboard/sidebar";
import Brand from "@/components/brand";
import MainContent from "@/components/dashboard/main";
import { useTheme } from "next-themes";

const Dashboard = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div className={"grid grid-cols-12"}>
      <Sidebar>
        <div
          className={`p-[30px] border-b  ${
            theme === "light" ? "border-b-[#EAEFF4]" : "border-b-[#2A3447FF]"
          }`}
        >
          <Brand />
        </div>

        <DashboardNav />
      </Sidebar>

      <MainContent>{children}</MainContent>
    </div>
  );
};

export default Dashboard;
