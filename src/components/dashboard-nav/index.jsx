import MainIcon from "../icons/main";
import OlimpiadaIcon from "../icons/olimpiada";
import SidebarTitle from "../title/sidebar-title";
import ResultsIcon from "../icons/results";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

const DashboardNav = ({ children }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [tab, setTab] = useState("main");

  const handleTab = (tab) => {
    setTab(tab);
  };
  return (
    <div className={`p-[30px]`}>
      <SidebarTitle>{t("dashboard")}</SidebarTitle>
      <ul className={"mt-[12px]"}>
        <li
          onClick={() => {
            handleTab("main");
            router.push("/dashboard");
          }}
          className={"cursor-pointer"}
        >
          <div
            className={`flex gap-x-[10px] items-center py-[10px] px-[12px] rounded-[4px]  active:scale-90 scale-100 transition-all duration-300 ${
              router.pathname === "/dashboard"
                ? "bg-[#5D87FF] text-white"
                : "text-[#5A6A85] dark:bg-[#202936] hover:bg-[#ECF2FF] dark:hover:bg-[#252B48]"
            } `}
          >
            <MainIcon
              color={router.pathname === "/dashboard" ? "#fff" : "#5A6A85"}
            />
            <p className={"text-[14px] "}>{t("main")}</p>
          </div>
        </li>

        <li
          onClick={() => {
            handleTab("olimpiada");
            router.push("/olimpiada");
          }}
          className={"cursor-pointer"}
        >
          <div
            className={`flex gap-x-[10px] items-center py-[10px] px-[12px] rounded-[4px] active:scale-90 scale-100 transition-all duration-300 ${
              router.pathname === "/olimpiada"
                ? "bg-[#5D87FF] text-white"
                : "text-[#5A6A85] dark:bg-[#202936] hover:bg-[#ECF2FF] dark:hover:bg-[#252B48] "
            } `}
          >
            <OlimpiadaIcon
              color={router.pathname === "/olimpiada" ? "#fff" : "#5A6A85"}
            />
            <p className={"text-[14px]"}>{t("olympics")}</p>
          </div>
        </li>

        <li
          onClick={() => {
            handleTab("results");
            router.push("/results");
          }}
          className={"cursor-pointer"}
        >
          <div
            className={`flex gap-x-[10px] itmes-center py-[10px] px-[12px] rounded-[4px] active:scale-90 scale-100 transition-all duration-300 ${
              router.pathname === "/results"
                ? "bg-[#5D87FF] text-white"
                : "text-[#5A6A85] dark:bg-[#202936] hover:bg-[#ECF2FF] dark:hover:bg-[#252B48]"
            }`}
          >
            <ResultsIcon
              color={router.pathname === "/results" ? "#fff" : "#5A6A85"}
            />
            <p className={"text-[14px] "}>{t("results")}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DashboardNav;
