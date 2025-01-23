import Brand from "@/components/brand";
import SynchronizedAreaChart from "@/components/charts/area-chart";
import PieChartComponent from "@/components/charts/pie-chart";
import Dashboard from "@/components/dashboard";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Home() {
  const { theme } = useTheme();
  return (
    <Dashboard>
      <div
        className={`${
          theme === "dark" ? "bg-[#26334AFF]" : "bg-[#EBF3FE]"
        } p-[30px] my-[30px] rounded-[12px]   relative h-[200px] `}
      >
        <div className={"space-y-[60px]"}>
          <div className={"flex gap-x-[12px] items-center"}>
            <Image
              src={"/images/user-welcome.png"}
              alt={"welcome"}
              width={40}
              height={40}
            />

            <p className={"text-[18px] font-semibold"}>Welcome back Natalia!</p>
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
          className={`col-span-3 shadow-lg ${
            theme === "dark" ? "bg-[#26334AFF]" : "bg-white"
          } rounded-[12px] p-[30px]`}
        >
          <div>
            <h1 className={"text-lg font-semibold"}>Savollar</h1>
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
              <h4 className={"text-[21px]  font-semibold"}>$63,489.50</h4>
              <p className={"text-sm text-[#7C8FAC]"}>Total Earnings</p>
            </div>
          </div>
        </div>

        <div className={"col-span-9"}>
          <div
            className={`shadow-lg ${
              theme === "dark" ? "bg-[#26334AFF]" : "bg-white"
            } p-[30px] text-sm rounded-[12px]`}
          >
            <SynchronizedAreaChart />
          </div>
        </div>
      </div>
    </Dashboard>
  );
}
