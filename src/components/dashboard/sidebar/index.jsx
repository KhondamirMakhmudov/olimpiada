const Sidebar = ({ children, isSidebarOpen }) => {
  return (
    <div>
      <div
        className={`fixed  left-0 top-0 h-full bg-white dark:bg-[#202936] border-r border-[#EAEFF4] dark:border-[#2A3447FF] w-[350px] transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
