import { useTheme } from "next-themes";

const Sidebar = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`col-span-3  min-h-screen border ${
        theme === "light" ? "border-[#EAEFF4]" : "border-[#2A3447FF]"
      }`}
    >
      {children}
    </div>
  );
};

export default Sidebar;
