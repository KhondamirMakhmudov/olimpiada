import { useState, useEffect } from "react";

const Quiz = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

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

  return (
    <div>
      <h1>Quiz</h1>
      {/* Misol uchun savollar */}
      <div>
        <p>1. What is the capital of France?</p>
        <button
          onClick={() => handleAnswer(1, "Paris")}
          className={selectedAnswers[1] === "Paris" ? "bg-green-500" : ""}
        >
          Paris
        </button>
        <button
          onClick={() => handleAnswer(1, "London")}
          className={selectedAnswers[1] === "London" ? "bg-green-500" : ""}
        >
          London
        </button>
      </div>
      <div>
        <p>2. What is 2 + 2?</p>
        <button
          onClick={() => handleAnswer(2, "4")}
          className={selectedAnswers[2] === "4" ? "bg-green-500" : ""}
        >
          4
        </button>
        <button
          onClick={() => handleAnswer(2, "5")}
          className={selectedAnswers[2] === "5" ? "bg-green-500" : ""}
        >
          5
        </button>
      </div>
    </div>
  );
};

export default Quiz;
