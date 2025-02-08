import MainContentHead from "@/components/main-content-head";

const MainContent = ({ children, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div
      className={`transition-all duration-300 ${
        isSidebarOpen ? "lg:ml-[350px]" : "ml-0"
      } flex-1 p-[30px] lg:ml-[350px]`}
    >
      <MainContentHead toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      {children}
    </div>
  );
};

export default MainContent;
