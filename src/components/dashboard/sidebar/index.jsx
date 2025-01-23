import { useTheme } from "next-themes";

const Sidebar = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`col-span-3  min-h-screen border ${
        theme === "dark" ? "border-[#2A3447FF]" : "border-[#EAEFF4]"
      }`}
    >
      {children}
    </div>
  );
};

export default Sidebar;
