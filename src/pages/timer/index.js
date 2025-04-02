import { config } from "@/config";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { URLS } from "@/constants/url";

const TestTimer = () => {
  const { data: session } = useSession();
  const [remainingTime, setRemainingTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session?.id || !session?.accessToken) return;

    const fetchRemainingTime = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${`http://95.46.96.179:8014`}${URLS.remainingTestTime}${
            session?.id
          }`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        if (!response.ok) throw new Error("API Error");

        const data = await response.json();
        console.log(data);

        setRemainingTime(data.remaining_time || 0);
      } catch (error) {
        console.error("Error fetching remaining time:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Dastlab bir marta chaqiramiz
    fetchRemainingTime();

    // Har soniyada API ga so‘rov jo‘natamiz
    const interval = setInterval(() => {
      fetchRemainingTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [session?.id, session?.accessToken]);

  console.log(remainingTime);

  // Timer ko‘rinishini formatlash (hh:mm:ss)
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <h1>Test Vaqti: {formatTime(remainingTime)}</h1>
      )}
    </div>
  );
};

export default TestTimer;
