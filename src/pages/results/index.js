import Dashboard from "@/components/dashboard";
import Image from "next/image";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";

import { get, isEmpty } from "lodash";
import Link from "next/link";

import { useState, useEffect, useContext } from "react";
import GridIcon from "@/components/icons/grid";
import AnswerIcon from "@/components/icons/answer";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import { UserProfileContext } from "@/context/responseProvider";
const Index = () => {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const [tab, setTab] = useState("results");
  const { result } = useContext(UserProfileContext);
  console.log(result);

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
      Authorization: `Bearer ${accessToken}`,
    },
    enabled: !!accessToken,
  });

  const scores2_1 = get(result, "data.answer_more", []).filter(
    (item) => item.score === 2.1
  );
  const scores3_1 = get(result, "data.answer_more", []).filter(
    (item) => item.score === 3.1
  );
  const scores5_1 = get(result, "data.answer_more", []).filter(
    (item) => item.score === 5.1
  );

  console.log("Scores 2.1:", scores2_1);
  console.log("Scores 3.1:", scores3_1);
  console.log("Scores 5.1:", scores5_1);

  return (
    <Dashboard>
      <div
        className={` p-[30px] bg-[#EBF3FE] dark:bg-[#26334AFF]  my-[30px] rounded-[12px]   relative h-[125px] `}
      >
        <div className={"space-y-[15px]"}>
          <p className={"text-[18px] dark:text-white text-black font-semibold"}>
            {t("resultsPage")}
          </p>

          <div className="flex gap-x-[12px] items-center">
            <Link href={"/"} className="text-[#5A6A85BF]">
              {t("homePage")}
            </Link>
            <div className="bg-black w-[6px] h-[6px] rounded-full  dark:bg-white"></div>
            <p className="text-black dark:text-white">{t("results")}</p>
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
                : "bg-white text-black dark:bg-transparent dark:text-white"
            }`}
          >
            <GridIcon color={tab === "results" ? "white " : "black"} />

            <p>{t("testResults")}</p>
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

            <p>{t("myAnswers")}</p>
          </button>
        </div>
      </div>

      {tab === "results" && (
        <div className="grid grid-cols-12 gap-[30px]">
          <div className="py-[16px] shadow-lg my-[50px] col-span-4 rounded-md">
            <div className="flex gap-x-[30px] items-center">
              <div className="w-[3px] h-[50px] bg-orange-400"></div>

              <div>
                <p className="text-sm text-[#5A6A85]">{t("totalScore")}</p>

                <p className="font-medium text-lg text-[#2A3547] dark:text-white">
                  {parseFloat(get(quizResult, "data.score")).toFixed(2)}{" "}
                  {t("score")}
                </p>
              </div>
            </div>

            <p className="px-[30px] text-sm mt-[30px] text-[#2A3547] dark:text-white">
              {t("resultsDesc")}
            </p>
          </div>
        </div>
      )}

      {tab === "my-answers" && (
        <div className="grid grid-cols-12 gap-[30px] mt-[30px] ">
          {/* <div className="col-span-6 space-y-[10px]">
            {get(quizResult, "data.correct_questions", []).map(
              (item, index) => (
                <div
                  className="border border-[#13DEB9] flex justify-between px-[10px] py-[12px] rounded-[4px]"
                  key={index}
                >
                  <div className="flex gap-x-[10px]">
                    <p className="text-[#13DEB9]">{index + 1}. </p>
                    <p className="text-[#13DEB9]">{item} - savol</p>
                  </div>

                  <div>
                    <Image
                      src={"/icons/success.svg"}
                      alt="success"
                      width={26}
                      height={26}
                    />
                  </div>
                </div>
              )
            )}
          </div> */}

          {isEmpty(scores2_1) ? (
            ""
          ) : (
            <div className="col-span-4 space-y-[10px]">
              <p className="text-lg font-medium text-gray-600">
                {scores2_1[0]["score"]} ballik
              </p>
              {scores2_1.map((item, index) => (
                <div
                  className={`border ${
                    get(item, "is_correct") === true
                      ? "border-[#13DEB9]"
                      : "border-[#FA896B]"
                  } flex justify-between px-[10px] py-[12px] rounded-[4px]`}
                  key={index}
                >
                  <div className="flex gap-x-[10px]">
                    <p
                      className={` ${
                        get(item, "is_correct") === true
                          ? "text-[#13DEB9]"
                          : "text-[#FA896B]"
                      } `}
                    >
                      {get(item, "order")}.{" "}
                    </p>
                    {/* <p className="text-[#FA896B]">{get(item, "order")} - savol</p> */}
                  </div>

                  <div>
                    <Image
                      src={`/icons/${
                        get(item, "is_correct") === true ? "success" : "fail"
                      }.svg`}
                      alt="fail"
                      width={26}
                      height={26}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {isEmpty(scores3_1) ? (
            ""
          ) : (
            <div className="col-span-4 space-y-[10px]">
              <p className="text-lg font-medium text-gray-600">
                {scores3_1[0]["score"]} ballik
              </p>
              {scores3_1.map((item, index) => (
                <div
                  className={`border ${
                    get(item, "is_correct") === true
                      ? "border-[#13DEB9]"
                      : "border-[#FA896B]"
                  } flex justify-between px-[10px] py-[12px] rounded-[4px]`}
                  key={index}
                >
                  <div className="flex gap-x-[10px]">
                    <p
                      className={` ${
                        get(item, "is_correct") === true
                          ? "text-[#13DEB9]"
                          : "text-[#FA896B]"
                      } `}
                    >
                      {get(item, "order")}.{" "}
                    </p>
                    {/* <p className="text-[#FA896B]">{get(item, "order")} - savol</p> */}
                  </div>

                  <div>
                    <Image
                      src={`/icons/${
                        get(item, "is_correct") === true ? "success" : "fail"
                      }.svg`}
                      alt="fail"
                      width={26}
                      height={26}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {isEmpty(scores3_1) ? (
            ""
          ) : (
            <div className="col-span-4 space-y-[10px]">
              <p className="text-lg font-medium text-gray-600">
                {scores5_1[0]["score"]} ballik
              </p>
              {scores5_1.map((item, index) => (
                <div
                  className={`border ${
                    get(item, "is_correct") === true
                      ? "border-[#13DEB9]"
                      : "border-[#FA896B]"
                  } flex justify-between px-[10px] py-[12px] rounded-[4px]`}
                  key={index}
                >
                  <div className="flex gap-x-[10px]">
                    <p
                      className={` ${
                        get(item, "is_correct") === true
                          ? "text-[#13DEB9]"
                          : "text-[#FA896B]"
                      } `}
                    >
                      {get(item, "order")}.{" "}
                    </p>
                    {/* <p className="text-[#FA896B]">{get(item, "order")} - savol</p> */}
                  </div>

                  <div>
                    <Image
                      src={`/icons/${
                        get(item, "is_correct") === true ? "success" : "fail"
                      }.svg`}
                      alt="fail"
                      width={26}
                      height={26}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Dashboard>
  );
};

export default Index;
