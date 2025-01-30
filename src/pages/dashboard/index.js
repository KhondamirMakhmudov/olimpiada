import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { get } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Dashboard from "@/components/dashboard";
import PieChartComponent from "@/components/charts/pie-chart";
import DiagramChart from "@/components/charts/diagram";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { t } = useTranslation();

  const [isExiting, setIsExiting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Read localStorage data on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("dataRegister");
    const hasModalBeenShown = localStorage.getItem("modalShown");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log("Parsed data from localStorage:", parsedData); // Debugging
        setUserData(parsedData);

        // Set accessToken from dataRegister
        const tokenFromDataRegister = get(parsedData, "data.access_token");
        if (tokenFromDataRegister) {
          setAccessToken(tokenFromDataRegister);
        }

        // Show modal if it hasn't been shown before
        if (!hasModalBeenShown) {
          setShowModal(true);
          localStorage.setItem("modalShown", "true");
        }
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
  }, []); // Empty dependency array to run only on mount

  // Handle session-based accessToken
  useEffect(() => {
    if (session?.accessToken) {
      setAccessToken(session.accessToken);
      localStorage.removeItem("dataRegister"); // Remove dataRegister if session exists
    }
  }, [session]);

  // Fetch student profile using accessToken
  const {
    data: studentProfile,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    enabled: !!accessToken, // Only fetch if accessToken is available
  });

  // Copy login/password to clipboard
  const handleCopy = () => {
    const textToCopy = `Login: ${get(userData, "data.login")}\nPassword: ${get(
      userData,
      "data.password"
    )}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => console.error("Failed to copy text:", err));
  };

  // Close the modal
  const closeModal = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      setShowModal(false); // Close the modal
    }, 300);
  };

  return (
    <Dashboard>
      {/* Modal for showing login/password */}
      {showModal && userData && (
        <div>
          <div
            className={`fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity duration-300 ${
              !isExiting ? "opacity-90" : "opacity-40"
            }`}
          ></div>
          <div
            className={`fixed top-7 w-full left-0 flex items-center justify-center z-50 transition-all duration-300 ${
              isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <div className="flex items-center gap-x-[5px]">
                <h2 className="text-xl font-semibold mb-1 text-[#13DEB9]">
                  {get(userData, "data.message")}
                </h2>
                <Image
                  src={"/icons/success.svg"}
                  alt="success"
                  width={26}
                  height={26}
                />
              </div>
              <h2 className="text-xl font-semibold mb-1">
                Sizning login parolingiz
              </h2>
              <p className="text-lg font-medium text-[#7C8FAC] mb-2">
                Login: {get(userData, "data.login")}
              </p>
              <p className="text-lg font-medium text-[#7C8FAC] mb-4">
                Parolingiz: {get(userData, "data.password")}
              </p>
              <p className="text-sm font-medium text-[#7C8FAC]">
                Login va parolni o'zgartirmoqchi bo'lsangiz, bu jarayonni mening
                sahifamda bajarasiz
              </p>
              <div className="flex justify-end gap-x-[10px] mt-4">
                <button
                  onClick={handleCopy}
                  className="bg-green-500 text-white py-2 px-4 rounded"
                >
                  {copied ? "Nusxa Olindi!" : "Nusxa olish"}
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-black py-2 px-4 rounded"
                >
                  Tushunarli
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rest of the dashboard content */}
      <div
        className={`p-[30px] bg-[#EBF3FE] dark:bg-[#26334AFF] my-[30px] rounded-[12px] relative h-[200px]`}
      >
        <div className={"space-y-[60px]"}>
          <div className={"flex gap-x-[12px] items-center"}>
            <Image
              src={"/images/user-welcome.png"}
              alt={"welcome"}
              width={40}
              height={40}
            />
            <p
              className={"text-[18px] dark:text-white text-black font-semibold"}
            >
              {t("welcome")}, {get(studentProfile, "data.full_name")}
            </p>
          </div>
          <Link href={"https://t.me/iq_mathbot"} className="mt-[60px] block">
            <button
              className={
                "py-[8px] px-[16px] text-white bg-[#5D87FF] rounded-[4px]"
              }
            >
              {t("telegram_bot")}
            </button>
          </Link>
        </div>
        <div className={"absolute right-0 bottom-0"}>
          <Image
            src={"/icons/welcome-bg.svg"}
            alt={"welcome"}
            width={326}
            height={96}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[30px]">
        <div
          className={`col-span-4 shadow-lg bg-white dark:bg-[#26334AFF] rounded-[12px] p-[30px]`}
        >
          <div>
            <h1 className={"text-lg dark:text-white text-black font-semibold"}>
              {t("questions")}
            </h1>
          </div>
          <PieChartComponent />
          <div className={"flex items-end gap-x-[12px]"}>
            <div className={"bg-[#ECF2FF] p-[10px] rounded-[8px] inline-block"}>
              <Image
                src={"/icons/grid.svg"}
                alt={"grid"}
                width={24}
                height={24}
              />
            </div>
            <div>
              <h4
                className={
                  "text-[21px] dark:text-white text-black font-semibold"
                }
              >
                $63,489.50
              </h4>
              <p className={"text-sm text-[#7C8FAC]"}>Total Earnings</p>
            </div>
          </div>
        </div>
        <div
          className={
            "col-span-4 p-[30px] bg-white dark:bg-[#26334AFF] shadow-lg rounded-md"
          }
        >
          <DiagramChart />
        </div>
        <div
          className={
            "col-span-4 p-[30px] bg-white dark:bg-[#26334AFF] shadow-lg rounded-md"
          }
        >
          {/* <ReactApexChart /> */}
        </div>
      </div>
    </Dashboard>
  );
}
