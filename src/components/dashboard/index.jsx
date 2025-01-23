import DashboardNav from "@/components/dashboard-nav";
import Sidebar from "@/components/dashboard/sidebar";
import Brand from "@/components/brand";
import MainContent from "@/components/dashboard/main";
import { useTheme } from "next-themes";
import { ThemeProvider } from "next-themes";

const Dashboard = ({ children }) => {
  const { theme } = useTheme();
  return (
    <ThemeProvider defaultTheme="light" attribute={"class"}>
      <div className={"grid grid-cols-12 dark:bg-[#202936] bg-white"}>
        <Sidebar>
          <div
            className={`p-[30px] border-b border-b-[#EAEFF4] dark:border-b-[#2A3447FF]`}
          >
            <Brand />
          </div>

          <DashboardNav />
        </Sidebar>

        <MainContent>{children}</MainContent>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
