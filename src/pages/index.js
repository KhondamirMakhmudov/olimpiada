import Brand from "@/components/brand";
import SynchronizedAreaChart from "@/components/charts/area-chart";
import PieChartComponent from "@/components/charts/pie-chart";
import Dashboard from "@/components/dashboard";
import { useTheme } from "next-themes";
import Image from "next/image";
import { UserProfileContext } from "@/context/responseProvider";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "@/components/theme-provider";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import storage from "@/services/storage";
import { get } from "lodash";
import DiagramChart from "@/components/charts/diagram";

export default function Home() {
  const router = useRouter();
  const { theme } = useTheme();
  const [data, setData] = useState(null);
  const { result } = useContext(UserProfileContext);

  const {
    data: studentProfile,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    headers: {
      Authorization: `Bearer ${storage.get("authToken")}`,
    },
  });

  // console.log(result, "response state management");
  useEffect(() => {
    if (result) {
      // Assuming `result` is an object, directly set it as the data
      setData(result);
    }
  }, [result]);

  console.log(data, "data");

  return (
    <Dashboard>
      <div
        className={` p-[30px] bg-[#EBF3FE] dark:bg-[#26334AFF]  my-[30px] rounded-[12px]   relative h-[200px] `}
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
              Xush kelibsiz, {get(studentProfile, "data.full_name")}
            </p>
          </div>

          <button
            className={
              " py-[8px] px-[16px] text-white bg-[#5D87FF] rounded-[4px]"
            }
          >
            Telegram bot orqali ro&apos;yhatdan o&apos;ting
          </button>
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
              Savollar
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
                  "text-[21px] dark:text-white text-black  font-semibold"
                }
              >
                $63,489.50
              </h4>
              <p className={"text-sm text-[#7C8FAC]"}>Total Earnings</p>
            </div>
          </div>
        </div>

        <div className={"col-span-4 p-[30px] bg-white shadow-lg rounded-md"}>
          <DiagramChart />
        </div>
      </div>
    </Dashboard>
  );
}
