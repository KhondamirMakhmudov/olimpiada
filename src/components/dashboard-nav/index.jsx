import MainIcon from "../icons/main";
import OlimpiadaIcon from "../icons/olimpiada";
import SidebarTitle from "../title/sidebar-title";
import ResultsIcon from "../icons/results";
import { useState } from "react";

const DashboardNav = ({ children }) => {
  const [tab, setTab] = useState("main");

  const handleTab = (tab) => {
    setTab(tab);
  };
  return (
    <div className={"p-[30px] border-b border-b-[#EAEFF4]"}>
      <SidebarTitle>DASHBOARDS</SidebarTitle>
      <ul className={"mt-[12px]"}>
        <li onClick={() => handleTab("main")} className={"cursor-pointer"}>
          <div
            className={`flex gap-x-[10px] items-center py-[10px] px-[12px] rounded-[4px] active:scale-90 scale-100 transition-all duration-300 ${
              tab === "main"
                ? "bg-[#5D87FF] text-white"
                : "text-[#5A6A85] bg-transparent"
            } `}
          >
            <MainIcon color={tab === "main" ? "#fff" : "#5A6A85"} />
            <p className={"text-[14px] "}>Asosiy</p>
          </div>
        </li>

        <li onClick={() => handleTab("olimpiada")} className={"cursor-pointer"}>
          <div
            className={`flex gap-x-[10px] items-center py-[10px] px-[12px] rounded-[4px] active:scale-90 scale-100 transition-all duration-300 ${
              tab === "olimpiada"
                ? "bg-[#5D87FF] text-white"
                : "text-[#5A6A85] bg-transparent"
            } `}
          >
            <OlimpiadaIcon color={tab === "olimpiada" ? "#fff" : "#5A6A85"} />
            <p className={"text-[14px]"}>Olimpiada</p>
          </div>
        </li>

        <li onClick={() => handleTab("results")} className={"cursor-pointer"}>
          <div
            className={`flex gap-x-[10px] itmes-center py-[10px] px-[12px] rounded-[4px] active:scale-90 scale-100 transition-all duration-300 ${
              tab === "results"
                ? "bg-[#5D87FF] text-white"
                : "text-[#5A6A85] bg-transparent"
            }`}
          >
            <ResultsIcon color={tab === "results" ? "#fff" : "#5A6A85"} />
            <p className={"text-[14px] "}>Natijalar</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DashboardNav;
