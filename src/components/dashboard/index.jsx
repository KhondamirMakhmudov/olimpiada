import Brand from "../brand";
import DashboardNav from "../dashboard-nav";
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import Sidebar from "./sidebar";
import MainContent from "./main";

const Dashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <div className="relative flex min-h-screen dark:bg-[#202936] bg-white transition-all">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        >
          <div className="p-[30px] border-b border-b-[#EAEFF4] dark:border-b-[#2A3447FF] flex items-center justify-center">
            <Brand />
          </div>
          <DashboardNav />
        </Sidebar>

        <MainContent
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        >
          {children}
        </MainContent>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
