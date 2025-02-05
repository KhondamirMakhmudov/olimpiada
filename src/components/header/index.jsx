import LanguageDropdown from "../language";
import Brand from "../brand";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
const Header = ({ color = "white" }) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className=" relative z-10 py-[10px]">
      <div
        className={`absolute top-0 bottom-0 left-0 right-0 bg-gray-100 bg-opacity-40 -z-10`}
      ></div>
      <div className="container flex justify-between items-center z-20">
        <Brand />

        <ul className={`flex gap-x-[16px] items-center  ${color}`}>
          <li
            className={`hover:underline cursor-pointer py-[8px] px-[10px] rounded-md ${
              router.pathname === "/about-us"
                ? "bg-[#3965c6] text-white"
                : "bg-transparent text-black"
            }`}
          >
            <Link href={"/about-us"}>{t("aboutus")}</Link>{" "}
          </li>
          <li
            className={`hover:underline cursor-pointer py-[8px] px-[10px] rounded-md ${
              router.pathname === "/faq"
                ? "bg-[#3965c6] text-white"
                : "bg-transparent text-black"
            }`}
          >
            <Link href={"/faq"}>{t("faq")}</Link>{" "}
          </li>
          <li
            className={`hover:underline cursor-pointer py-[8px] px-[10px] rounded-md ${
              router.pathname === "/about-olympics"
                ? "bg-[#3965c6] text-white"
                : "bg-transparent text-black"
            }`}
          >
            <Link href={"/about-olympics"}>{t("aboutOlympics")}</Link>{" "}
          </li>
        </ul>

        <LanguageDropdown />
      </div>
    </div>
  );
};

export default Header;
