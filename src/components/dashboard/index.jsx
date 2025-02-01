import DashboardNav from "@/components/dashboard-nav";
import Sidebar from "@/components/dashboard/sidebar";
import Brand from "@/components/brand";
import MainContent from "@/components/dashboard/main";
import { useTheme } from "next-themes";
import { ThemeProvider } from "next-themes";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import storage from "@/services/storage";
import { useSession } from "next-auth/react";
import { useState } from "react";
import MainContentHead from "../main-content-head";

const Dashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data: session } = useSession();

  // const {
  //   data: studentProfile,
  //   isLoading,
  //   isFetching,
  // } = useGetQuery({
  //   key: KEYS.studentProfile,
  //   url: URLS.studentProfile,
  //   headers: {
  //     Authorization: session?.accessToken
  //       ? `Bearer ${session.accessToken}`
  //       : "",
  //   },
  // });

  return (
    <ThemeProvider defaultTheme="light" attribute={"class"}>
      <div className="relative flex min-h-screen dark:bg-[#202936] bg-white transition-all">
        <Sidebar isSidebarOpen={isSidebarOpen}>
          <div className="p-[30px] border-b border-b-[#EAEFF4] dark:border-b-[#2A3447FF] flex items-center justify-center">
            <Brand />
          </div>
          <DashboardNav />
        </Sidebar>

        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-[350px]" : "ml-0"
          } p-[30px]`}
        >
          <MainContentHead
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
