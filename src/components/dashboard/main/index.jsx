import MainContentHead from "@/components/main-content-head";

const MainContent = ({ children, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div className={`${isSidebarOpen ? "col-span-9" : "col-span-12"} p-[30px]`}>
      <MainContentHead toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      {children}
    </div>
  );
};

export default MainContent;
