import { useState, useEffect } from "react";

const QuizTimer = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // Standart qiymat SSR vaqtida

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

  return (
    <div>
      <h1>Time Left: {formatTime(timeLeft)}</h1>
    </div>
  );
};

export default QuizTimer;
