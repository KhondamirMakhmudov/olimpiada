import Dashboard from "@/components/dashboard";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import Image from "next/image";
import { get } from "lodash";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useTranslation } from "react-i18next";
const Index = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const { data, isLoading, isFetching } = useGetQuery({
    key: KEYS.olimpiadaQuizList,
    url: URLS.olimpiadaQuizList,
  });

  console.log(data);

  return (
    <Dashboard>
      <div
        className={` p-[30px] bg-[#EBF3FE] dark:bg-[#26334AFF]  my-[30px] rounded-[12px]   relative h-[125px] `}
      >
        <div className={"space-y-[15px]"}>
          <p className={"text-[18px] dark:text-white text-black font-semibold"}>
            {t("olympics")}
          </p>

          <div className="flex gap-x-[12px] items-center">
            <Link href={"/"} className="text-[#5A6A85BF]">
              {t("homePage")}
            </Link>
            <div className="bg-black w-[6px] h-[6px] rounded-full  dark:bg-white"></div>
            <p className="text-black dark:text-white">{t("olympics")}</p>
          </div>
        </div>

        <div className={"absolute right-[40px] bottom-0"}>
          <Image
            src={"/icons/user-profile-bg.svg"}
            alt={"user-profile-bg"}
            width={168}
            height={165}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 my-6 md:gap-4 md:my-4 sm:gap-2 sm:my-2">
        <div className="col-span-12 bg-white dark:bg-[#26334AFF] self-start border border-[#EAEFF4] dark:border-[#2A3447FF] rounded-md ">
          <div className="p-6 md:p-4 sm:p-3">
            <h3 className="capitalize text-lg font-semibold text-black dark:text-white">
              {t("reminder")}
            </h3>
          </div>
          <div className="w-full h-[1px] bg-[#EAEFF4] dark:bg-[#2A3447FF]"></div>
          <ul className="space-y-4 p-6 md:p-4 sm:p-3">
            {[
              "first_reminder",
              "second_reminder",
              "fourth_reminder",
              "fifth_reminder",
              "sixth_reminder",
            ].map((reminder) => (
              <li
                key={reminder}
                className="flex items-start gap-x-4 md:gap-x-3 sm:gap-x-2"
              >
                <Image
                  src={"/icons/remind.svg"}
                  alt={"remind"}
                  width={24}
                  height={24}
                  className="w-6 h-6 sm:w-5 sm:h-5"
                />
                <p className="text-sm text-[#5A6A85] dark:text-white">
                  {t(reminder)}
                </p>
              </li>
            ))}
          </ul>

          {get(data, "data", []).map((item) => (
            <div
              key={get(item, "id")}
              className="px-6 mb-6 md:px-4 md:mb-4 sm:px-3 sm:mb-3 rounded-lg"
            >
              <div>
                <div className="grid grid-cols-3 place-items-center gap-4 md:gap-3 sm:gap-2 my-4 md:my-3 sm:my-2">
                  {[
                    {
                      label: "leadTime",
                      color: "#539BFF",
                      value: `${get(item, "duration_in_minutes", "")} ${t(
                        "minut"
                      )}`,
                    },
                    {
                      label: "startDate",
                      color: "#12DEB9",
                      value: dayjs(get(item, "start_date", "")).format(
                        "DD.MM.YYYY"
                      ),
                    },
                    {
                      label: "endDate",
                      color: "#EB0000",
                      value: dayjs(get(item, "end_date", "")).format(
                        "DD.MM.YYYY"
                      ),
                    },
                  ].map(({ label, color, value }) => (
                    <div
                      key={label}
                      className="col-span-1 flex items-baseline gap-x-3 md:gap-x-2 sm:gap-x-1"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: color }}
                      ></div>
                      <div>
                        <h3 className="text-[#868EAB] text-sm ">{t(label)}</h3>
                        <p className="font-semibold text-lg dark:text-white text-black text-sm md:text-base">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() =>
                    router.push(`olimpiada/start-quiz/${get(item, "id", [])}`)
                  }
                  className="py-2 w-full px-4 bg-[#5D87FF] rounded text-white text-sm md:text-base"
                >
                  {t("startTheTest")}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-10 self-start grid grid-cols-10"></div>
      </div>
    </Dashboard>
  );
};

export default Index;
