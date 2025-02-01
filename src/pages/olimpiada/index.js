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
      <div className="grid grid-cols-12 gap-[30px] my-[30px]">
        <div className="col-span-12 bg-white dark:bg-[#26334AFF] self-start border  border-[#EAEFF4] dark:border-[#2A3447FF] rounded-md ">
          <div className="p-[30px]">
            <h3 className="capitalize text-lg font-semibold text-black dark:text-white">
              {t("reminder")}
            </h3>
          </div>
          <div className="w-full h-[1px] bg-[#EAEFF4] dark:bg-[#2A3447FF]"></div>
          <ul className="space-y-[10px] p-[30px]">
            <li className="flex items-start gap-x-[10px]">
              <Image
                src={"/icons/remind.svg"}
                alt={"remind"}
                width={24}
                height={24}
                className="w-[24px] h-[24px]"
              />
              <p className="text-sm text-[#5A6A85] dark:text-white">
                {t("first_reminder")}
              </p>
            </li>
            <li className="flex items-start gap-x-[10px]">
              <Image
                src={"/icons/remind.svg"}
                alt={"remind"}
                width={24}
                height={24}
              />
              <p className="text-sm text-[#5A6A85] dark:text-white">
                {t("second_reminder")}
              </p>
            </li>

            {/* <li className="flex items-start gap-x-[10px]">
              <Image
                src={"/icons/remind.svg"}
                alt={"remind"}
                width={24}
                height={24}
              />
              <p className="text-sm text-[#5A6A85] dark:text-white">
                {t("third_reminder")}
              </p>
            </li> */}

            <li className="flex items-start gap-x-[10px]">
              <Image
                src={"/icons/remind.svg"}
                alt={"remind"}
                width={24}
                height={24}
                className="w-[24px] h-[24px]"
              />
              <p className="text-sm text-[#5A6A85] dark:text-white">
                {t("fourth_reminder")}
              </p>
            </li>

            <li className="flex items-start gap-x-[10px]">
              <Image
                src={"/icons/remind.svg"}
                alt={"remind"}
                width={24}
                height={24}
                className="w-[24px] h-[24px]"
              />
              <p className="text-sm text-[#5A6A85] dark:text-white">
                {t("fifth_reminder")}
              </p>
            </li>

            <li className="flex items-start gap-x-[10px]">
              <Image
                src={"/icons/remind.svg"}
                alt={"remind"}
                width={24}
                height={24}
                className="w-[24px] h-[24px]"
              />
              <p className="text-sm text-[#5A6A85] dark:text-white">
                {t("sixth_reminder")}
              </p>
            </li>
          </ul>

          {get(data, "data", []).map((item) => (
            <div
              key={get(item, "id")}
              className={`  px-[30px] mb-[30px] rounded-[8px]  `}
            >
              <div>
                <div className="grid grid-cols-3 place-items-center gap-x-[15px]  my-[15px]">
                  <div className="col-span-1  flex items-baseline gap-x-[12px]">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#539BFF]"></div>
                    <div>
                      <h3 className="text-[#868EAB] text-sm">
                        {t("leadTime")}
                      </h3>
                      <p className="font-semibold text-lg dark:text-white text-black ">
                        {get(item, "duration_in_minutes", "")} {t("minut")}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-1  flex items-baseline gap-x-[12px]">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#12DEB9]"></div>
                    <div>
                      <h3 className="text-[#868EAB] text-sm ">
                        {t("startDate")}
                      </h3>
                      <p className="font-semibold text-lg dark:text-white text-black">
                        {dayjs(get(item, "start_date", "")).format(
                          "DD.MM.YYYY"
                        )}{" "}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-1  flex items-baseline gap-x-[12px]">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#EB0000]"></div>
                    <div>
                      <h3 className="text-[#868EAB] text-sm">{t("endDate")}</h3>
                      <p className="font-semibold text-lg dark:text-white text-black">
                        {dayjs(get(item, "end_date", "")).format("DD.MM.YYYY")}{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    router.push(`olimpiada/start-quiz/${get(item, "id", [])}`)
                  }
                  className="py-[8px] w-full px-[10px] bg-[#5D87FF] rounded-[4px] text-white"
                >
                  {t("startTheTest")}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-10 self-start grid grid-cols-10  "></div>
      </div>
    </Dashboard>
  );
};

export default Index;
