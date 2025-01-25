import Dashboard from "@/components/dashboard";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import { useEffect, useState } from "react";
import { get } from "lodash";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { useTheme } from "next-themes";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import usePostQuery from "@/hooks/api/usePostQuery";
import storage from "@/services/storage";

const Index = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [timeLeft, setTimeLeft] = useState(3600);
  const { data, isLoading, isFetching } = useGetQuery({
    key: KEYS.quizTest,
    url: `${URLS.quizTest}/${id}`,
    enabled: !!id,
    headers: {
      Authorization: `Bearer ${storage.get("authToken")}`,
    },
  });

  const { mutate: submitAnswers } = usePostQuery({
    listKeyId: KEYS.submitAnswers,
  });

  const onSubmit = () => {
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
            Authorization: `Bearer ${storage.get("authToken")}`,
          },
        },
      },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          router.push("/results");
          console.log("Answers submitted successfully!");
        },
        onError: (error) => {
          setIsSubmitting(false);
          console.error("Error submitting answers:", error);
        },
      }
    );
  };

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
      <div className="my-[30px] ">
        <div className="grid grid-cols-12 gap-x-[30px]">
          <div className="col-span-8 space-y-[30px]">
            {get(data, "data", []).map((item, index) => (
              <div
                className={`border p-[30px] shadow-md  rounded-[8px] bg-white border-[#EAEFF4] dark:bg-[#26334AFF] dark:border-[#2A3447FF] `}
                key={index}
              >
                <div className="text-xl mb-[8px]">
                  <p className="mb-[15px] dark:text-white text-black">
                    Savol {index + 1}:
                  </p>
                  <div className="text-xl font-semibold mt-[30px] dark:text-white text-black">
                    {parse(get(item, "question", ""))}
                  </div>
                  {/* Quizzes */}
                  <ul className="mt-[30px] space-y-[10px]">
                    {["A", "B", "C", "D"].map((option) => (
                      <li
                        key={option}
                        className={`border cursor-pointer transform duration-200 p-[16px] rounded-md dark:text-white text-black  ${
                          selectedAnswers[get(item, "id")] === option
                            ? "bg-blue-500 text-white"
                            : "bg-transparent border-[#EAEFF4] hover:bg-[#f3f4f6] dark:border-transparent dark:bg-[#232f42] dark:hover:bg-[#20335DFF]"
                        }
`}
                        onClick={() => handleAnswer(get(item, "id"), option)}
                      >
                        <div>{parse(get(item, option, ""))}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`col-span-4 rounded-md self-start h-[450px] p-[30px] bg-white border-[#EAEFF4] border dark:bg-[#26334AFF] dark:border-[#2A3447FF] `}
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

              <div className="flex justify-center mt-[40px] space-x-[10px]">
                {get(data, "data", []).map((_, index) => (
                  <div
                    key={index}
                    className={`w-[40px] h-[40px] flex items-center justify-center rounded-full border cursor-pointer ${
                      answeredQuestions.includes(index)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-transparent border-gray-300 text-gray-500"
                    }`}
                    onClick={() =>
                      console.log(`Navigate to question ${index + 1}`)
                    }
                  >
                    {index + 1}
                  </div>
                ))}
              </div>

              <div className="mt-[40px] flex justify-center">
                <button
                  className="bg-red-500 text-white px-[20px] py-[10px] rounded-md hover:bg-red-600"
                  onClick={onSubmit}
                >
                  Yakunlash
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Index;
