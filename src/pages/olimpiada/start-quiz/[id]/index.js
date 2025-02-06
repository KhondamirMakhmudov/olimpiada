import Dashboard from "@/components/dashboard";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import { useContext, useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { useTheme } from "next-themes";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import usePostQuery from "@/hooks/api/usePostQuery";
import storage from "@/services/storage";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { UserProfileContext } from "@/context/responseProvider";
import Link from "next/link";
import Image from "next/image";
const Index = () => {
  const { setResult } = useContext(UserProfileContext);
  const { data: session } = useSession();
  const { theme } = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const [timeLeft, setTimeLeft] = useState(3600);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [openProfile, setOpenProfile] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [accessToken, setAccessToken] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  const handleProfile = () => {
    setOpenProfile(!openProfile);
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsExiting(false);
    }, 300);
  };

  const { t } = useTranslation();

  const { data, isLoading, isFetching, isError, error } = useGetQuery({
    key: KEYS.quizTest,
    url: `${URLS.quizTest}${id}/`,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    enabled: !!id,
  });

  const errorMessage = error?.response?.data?.message;

  const totalQuizzes = get(data, "data", []).length;

  const handleNext = () => {
    setCurrentQuizIndex((prevIndex) =>
      Math.min(prevIndex + 1, totalQuizzes - 1)
    );
  };

  // Function to handle the "Previous" button click
  const handlePrevious = () => {
    setCurrentQuizIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // Add event listener for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && currentQuizIndex < totalQuizzes - 1) {
        // Enter key for "Next"
        handleNext();
      } else if (
        event.key === "ArrowRight" &&
        currentQuizIndex < totalQuizzes - 1
      ) {
        // Right Arrow key for "Next"
        handleNext();
      } else if (event.key === "ArrowLeft" && currentQuizIndex > 0) {
        // Left Arrow key for "Previous"
        handlePrevious();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentQuizIndex, totalQuizzes]);

  const { mutate: submitAnswers } = usePostQuery({
    listKeyId: KEYS.submitAnswers,
  });

  const onSubmit = () => {
    // Ensure accessToken is available
    if (!session?.accessToken) {
      console.error("Access token is missing.");
      return;
    }

    const answers = Object.entries(selectedAnswers).map(
      ([questionIndex, answer]) => ({
        quiz_id: parseInt(questionIndex),
        answer,
      })
    );

    const payload = {
      answers,
      test_time: String(3600 - timeLeft),
    };

    setIsSubmitting(true);

    submitAnswers(
      {
        url: URLS.submitAnswers,
        attributes: payload,
        config: {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      },
      {
        onSuccess: (data) => {
          setIsSubmitting(false);
          router.push("/results");
          setResult(data);
          localStorage.removeItem("timeLeft");
          localStorage.removeItem("selectedAnswers");
          localStorage.removeItem("answeredQuestions");
          console.log("Answers submitted successfully!");
        },
        onError: (error) => {
          setIsSubmitting(false);
          console.error("Error submitting answers:", error);

          // Log the full error response from the server
          if (error.response) {
            console.error("Server error response:", error.response.data);
          }
        },
      }
    );
  };

  useEffect(() => {
    if (
      get(data, "data.message", "") === "Siz allaqachon test topshirgansiz !!!"
    ) {
      setTimeLeft(0);
    }
  }, [data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTime = localStorage.getItem("timeLeft");
      if (savedTime) {
        setTimeLeft(parseInt(savedTime, 10)); // Brauzerdan qiymatni o'qib, holatni yangilash
      }
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const updatedTime = prev - 1;
        if (typeof window !== "undefined") {
          localStorage.setItem("timeLeft", updatedTime); // Vaqtni localStorage'ga saqlash
        }
        return updatedTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const handleUnload = () => {
      if (typeof window !== "undefined") {
        localStorage.setItem("timeLeft", timeLeft);
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [timeLeft]);

  // Vaqtni "MM:SS" formatiga aylantirish
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  // LocalStorage'dan javoblarni o'qish
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAnswers = localStorage.getItem("selectedAnswers");
      const savedAnsweredQuestions = localStorage.getItem("answeredQuestions");
      if (savedAnswers) {
        setSelectedAnswers(JSON.parse(savedAnswers)); // Javoblarni holatga tiklash
      }
      if (savedAnsweredQuestions) {
        setAnsweredQuestions(JSON.parse(savedAnsweredQuestions)); // Javob berilgan savollarni tiklash
      }
    }
  }, []);

  // Javob tanlanganda, uni localStorage'da saqlash
  const handleAnswer = (questionIndex, answer) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = {
        ...prev,
        [questionIndex]: answer,
      };

      // Javoblarni localStorage'ga saqlash
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedAnswers", JSON.stringify(updatedAnswers));
      }
      return updatedAnswers;
    });

    if (!answeredQuestions.includes(questionIndex)) {
      setAnsweredQuestions((prev) => {
        const updatedQuestions = [...prev, questionIndex];

        // Javob berilgan savollarni localStorage'ga saqlash
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "answeredQuestions",
            JSON.stringify(updatedQuestions)
          );
        }
        return updatedQuestions;
      });
    }
  };

  const percentage = (timeLeft / 3600) * 100;

  return (
    <Dashboard>
      {isError ? (
        <div>
          <div
            className={` p-[30px] bg-[#EBF3FE] dark:bg-[#26334AFF]  my-[30px] rounded-[12px]   relative h-[125px] `}
          >
            <div className={"space-y-[15px]"}>
              <p
                className={
                  "text-[18px] dark:text-white text-black font-semibold"
                }
              >
                {t("testStart")}
              </p>

              <div className="flex gap-x-[12px] items-center">
                <Link href={"/"} className="text-[#5A6A85BF]">
                  {t("homePage")}
                </Link>
                <div className="bg-black w-[6px] h-[6px] rounded-full  dark:bg-white"></div>
                <p className="text-black dark:text-white">{t("testStart")}</p>
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

          <div className="text-white bg-[#FA896B] flex gap-x-[10px] py-[20px] px-[10px] rounded-[10px]">
            <Image
              src={"/icons/Error.svg"}
              alt={"error"}
              width={24}
              height={24}
            />
            <p>{errorMessage}</p>
          </div>
        </div>
      ) : (
        <div>
          <div className="my-[30px] ">
            {isEmpty(get(data, "data.message", "")) ? (
              <div className="grid grid-cols-12 gap-x-[30px]">
                <div className="col-span-8 space-y-[30px]">
                  {get(data, "data", []).length > 0 && (
                    <div
                      className={`border p-[30px] shadow-md rounded-[8px] bg-white border-[#EAEFF4] dark:bg-[#26334AFF] dark:border-[#2A3447FF] `}
                      key={currentQuizIndex}
                    >
                      <div className="text-xl mb-[8px]">
                        <p className="mb-[15px] dark:text-white text-black">
                          {currentQuizIndex + 1} - savol :
                        </p>
                        <div className="text-xl font-semibold mt-[30px] dark:text-white text-black">
                          {parse(
                            get(data, "data", [])[currentQuizIndex]?.question,
                            ""
                          )}
                        </div>
                        {/* Quizzes */}
                        <ul className="mt-[30px] space-y-[10px]">
                          {["A", "B", "C", "D"].map((option, index) => (
                            <li
                              key={index}
                              className={`border cursor-pointer transform duration-200 p-[16px] rounded-md dark:text-white text-black  ${
                                selectedAnswers[
                                  get(data, "data", [])[currentQuizIndex]?.id
                                ] === option
                                  ? "bg-blue-500 text-white"
                                  : "bg-transparent border-[#EAEFF4] hover:bg-[#f3f4f6] dark:border-transparent dark:bg-[#232f42] dark:hover:bg-[#20335DFF]"
                              }`}
                              onClick={() =>
                                handleAnswer(
                                  get(data, "data", [])[currentQuizIndex]?.id,
                                  option
                                )
                              }
                            >
                              <div>
                                {parse(
                                  get(data, "data", [])[currentQuizIndex][
                                    option
                                  ],
                                  ""
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-[20px]">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuizIndex === 0}
                      className={` text-white px-4 py-2 rounded-md  ${
                        currentQuizIndex === 0 ? "bg-gray-400" : "bg-blue-500"
                      }`}
                    >
                      Oldingisi
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentQuizIndex === totalQuizzes - 1}
                      className={` text-white px-4 py-2 rounded-md  ${
                        currentQuizIndex === totalQuizzes - 1
                          ? "bg-gray-400"
                          : "bg-blue-500"
                      }`}
                    >
                      Keyingisi
                    </button>
                  </div>
                </div>

                <div
                  className={`col-span-4 rounded-md self-start p-[30px] bg-white border-[#EAEFF4] border dark:bg-[#26334AFF] dark:border-[#2A3447FF] `}
                >
                  <div className="flex items-center flex-col justify-center mt-[30px]">
                    <div className="relative">
                      <CircularProgressbar
                        value={percentage}
                        styles={buildStyles({
                          pathColor: "#6366F1",
                          textColor: `${theme === "light" ? "#000" : "#fff"}`,
                          trailColor: "#E5E7EB",
                          textSize: "14px",
                        })}
                        className="w-[200px] h-[200px] text-center"
                      />
                      <p className="absolute top-[90px] right-0 left-[75px] text-xl dark:text-white text-black">{`${String(
                        Math.floor((timeLeft % 3600) / 60)
                      ).padStart(2, "0")}:${String(timeLeft % 60).padStart(
                        2,
                        "0"
                      )}`}</p>
                    </div>

                    <div className="grid grid-cols-8 mt-[40px] gap-[10px] ">
                      {get(data, "data", []).map((item, index) => (
                        <div
                          key={index}
                          className={`w-[40px] col-span-1 h-[40px] flex items-center justify-center rounded-full border cursor-pointer         ${
                            currentQuizIndex === index
                              ? "bg-green-500 text-white border-green-500" // Highlight the current question
                              : answeredQuestions.includes(item.id)
                              ? "bg-blue-500 text-white border-blue-500" // Highlight answered questions
                              : "bg-transparent border-gray-300 text-gray-500"
                          }`}
                          onClick={() => setCurrentQuizIndex(index)}
                        >
                          {index + 1}
                        </div>
                      ))}
                    </div>

                    <div className="mt-[40px] flex justify-center">
                      <button
                        className="bg-red-500 text-white px-[20px] py-[10px] rounded-md hover:bg-red-600"
                        onClick={handleLogoutClick}
                      >
                        Yakunlash
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <div
                    className={` p-[30px] bg-[#EBF3FE] dark:bg-[#26334AFF]  my-[30px] rounded-[12px]   relative h-[125px] `}
                  >
                    <div className={"space-y-[15px]"}>
                      <p
                        className={
                          "text-[18px] dark:text-white text-black font-semibold"
                        }
                      >
                        {t("testStart")}
                      </p>

                      <div className="flex gap-x-[12px] items-center">
                        <Link href={"/"} className="text-[#5A6A85BF]">
                          {t("homePage")}
                        </Link>
                        <div className="bg-black w-[6px] h-[6px] rounded-full  dark:bg-white"></div>
                        <p className="text-black dark:text-white">
                          {t("testStart")}
                        </p>
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

                  <div className="flex gap-x-[20px] items-center">
                    <div className="text-white bg-[#FFAE1F] flex gap-x-[10px] py-[20px] px-[10px] rounded-[10px]">
                      <Image
                        src={"/icons/Error.svg"}
                        alt={"error"}
                        width={24}
                        height={24}
                      />
                      <p>{get(data, "data.message", "")}</p>
                    </div>

                    <Link href={"/results"} className="h-full">
                      <button className="h-full py-[20px] px-[20px] bg-[#12DEB9] hover:bg-[#10C7A6] transition-all duration-300 rounded-[10px] text-white flex items-center">
                        Test natijasini bilish
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          {isModalOpen && (
            <>
              <div
                className={`fixed inset-0 bg-black bg-opacity-90 z-50 transition-opacity duration-300 ${
                  isExiting ? "opacity-0" : "opacity-40"
                }`}
              ></div>
              <div
                className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
                  isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
                }`}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                  <h2 className="text-xl font-semibold mb-1">
                    Testni yakunlash
                  </h2>
                  <p className="text-lg font-medium text-[#7C8FAC] mb-4">
                    Testni yakunlashga aminmisiz? "Ha" tugmasini bosganingizdan
                    so&apos;ng siz test jarayoniga qayta olmaysiz.
                  </p>
                  <div className="flex justify-end gap-x-[10px]">
                    <button
                      onClick={onSubmit}
                      className="bg-green-500  text-white py-2 px-4 rounded"
                    >
                      Ha
                    </button>
                    <button
                      onClick={closeModal}
                      className="bg-gray-300 text-black py-2 px-4 rounded"
                    >
                      Yo&apos;q
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </Dashboard>
  );
};

export default Index;
