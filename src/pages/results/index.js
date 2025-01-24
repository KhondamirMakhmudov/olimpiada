import Dashboard from "@/components/dashboard";
import Image from "next/image";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import storage from "@/services/storage";
import { get } from "lodash";
import Link from "next/link";
import dayjs from "dayjs";
import { useState } from "react";
import GridIcon from "@/components/icons/grid";
import AnswerIcon from "@/components/icons/answer";
const Index = () => {
  const [tab, setTab] = useState("results");

  const handleTab = (tab) => {
    setTab(tab);
  };
  const {
    data: quizResult,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.resultQuiz,
    url: URLS.resultQuiz,
    headers: {
      Authorization: `Bearer ${storage.get("authToken")}`,
    },
  });
  return (
    <Dashboard>
      <div
        className={` p-[30px] bg-[#EBF3FE] dark:bg-[#26334AFF]  my-[30px] rounded-[12px]   relative h-[125px] `}
      >
        <div className={"space-y-[15px]"}>
          <p className={"text-[18px] dark:text-white text-black font-semibold"}>
            Foydalanuvchining olimpiada testlaridagi natijalari
          </p>

          <div className="flex gap-x-[12px] items-center">
            <Link href={"/"} className="text-[#5A6A85BF]">
              Bosh sahifa
            </Link>
            <div className="bg-black w-[6px] h-[6px] rounded-full  dark:bg-white"></div>
            <p className="text-black dark:text-white">Natijalar</p>
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

      {/* <div className="border border-[#EAEFF4] rounded-md dark:border-[#2A3447FF]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#EAEFF4] dark:border-[#2A3447FF]">
              <th className="text-left p-[15px] dark:text-white text-black">
                Fan Nomi
              </th>
              <th className="text-left p-[15px] dark:text-white text-black">
                Test natijasi
              </th>
              <th className="text-left p-[15px] dark:text-white text-black">
                Umumiy savollar
              </th>

              <th className="text-left p-[15px] dark:text-white text-black">
                2.1
              </th>
              <th className="text-left p-[15px] dark:text-white text-black">
                3.1
              </th>
              <th className="text-left p-[15px] dark:text-white text-black">
                5.1
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#EAEFF4] dark:border-[#2A3447FF]">
              <td className="text-left p-[15px] dark:text-white text-black">
                {get(quizResult, "data.science_name", "")}
              </td>
              <td className="text-left p-[15px] dark:text-white text-black">
                {+get(quizResult, "data.score", "")}
              </td>
              <td className="text-left p-[15px] dark:text-white text-black">
                {get(quizResult, "data.total_questions", "")} ta
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}

      <div className="shadow-lg p-[16px] rounded-md">
        <div className="flex">
          <button
            onClick={() => handleTab("results")}
            className={`flex gap-x-[8px] py-[8px] px-[16px] rounded-md transform duration-200 ${
              tab === "results"
                ? "bg-[#5D87FFFF] text-white"
                : "bg-white text-black"
            }`}
          >
            <GridIcon color={tab === "results" ? "white" : "black"} />

            <p>Sinov natijalari</p>
          </button>

          <button
            onClick={() => handleTab("my-answers")}
            className={`flex gap-x-[8px] py-[8px] px-[16px] rounded-md transform duration-200 ${
              tab === "my-answers"
                ? "bg-[#5D87FFFF] text-white"
                : "bg-white text-black"
            }`}
          >
            <AnswerIcon color={tab === "my-answers" ? "white" : "black"} />

            <p>Mening javoblarim</p>
          </button>
        </div>
      </div>

      {tab === "results" && (
        <div className="grid grid-cols-12 gap-[30px]">
          <div className="py-[16px] shadow-lg my-[50px] col-span-4 rounded-md">
            <div className="flex gap-x-[30px] items-center">
              <div className="w-[3px] h-[50px] bg-orange-400"></div>

              <div>
                <p className="text-sm text-[#5A6A85]">
                  Sizning to'plagan balingiz
                </p>

                <p className="font-medium text-lg">
                  {get(quizResult, "data.score")} ball
                </p>
              </div>
            </div>

            <p className="px-[30px] text-sm mt-[30px]">
              300 ta eng yuqori ball to'plagan ishtirokchi ikkinchi bosqichga
              o'tadi. Agar siz ulardan biri bo'lsangiz, yaqinda ushbu sahifada
              "Siz ikkinchi bosqichga o'tdingiz!" degan xabarni ko'rishingiz
              mumkin. Xabar shuningdek, sizning telefoningizga SMS tarzida
              yuboriladi.
            </p>
          </div>
        </div>
      )}
    </Dashboard>
  );
};

export default Index;
