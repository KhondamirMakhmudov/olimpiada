"use client";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { get } from "lodash";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

const PieChartComponent = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const {
    data: quizResult,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.resultQuiz,
    url: URLS.resultQuiz,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    enabled: !!session?.accessToken,
  });

  const [chartData, setChartData] = useState({
    series: [0, 0], // Default values
    options: {
      chart: {
        type: "pie",
      },
      labels: ["To'g'ri javoblar", "Noto'g'ri javoblar"],
      colors: ["#28a745", "#dc3545"],
    },
  });

  useEffect(() => {
    if (quizResult) {
      const correctCount = get(quizResult, "data.correct_questions", []).length;
      const incorrectCount = get(
        quizResult,
        "data.incorrect_questions",
        []
      ).length;

      setChartData({
        series: [correctCount, incorrectCount], // Wrap numbers in an array
        options: {
          chart: { type: "pie" },
          labels: ["To'g'ri javoblar", "Noto'g'ri javoblar"],
          colors: ["#28a745", "#dc3545"],
        },
      });
    }
  }, [quizResult]);

  if (isLoading || isFetching) return <p>Yuklanmoqda</p>;

  return (
    <div>
      <div className="w-full max-w-md mx-auto">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          height={350}
        />
      </div>
      <div className="flex items-end gap-x-3 md:gap-x-[12px]">
        <div className="bg-[#ECF2FF] p-2 md:p-[10px] rounded-[8px] inline-block">
          <Image src="/icons/grid.svg" alt="grid" width={24} height={24} />
        </div>
        <div>
          <h4 className="text-lg md:text-[21px] dark:text-white text-black font-semibold">
            {parseFloat(get(quizResult, "data.score")).toFixed(2)} {t("score")}
          </h4>
          <p className="text-sm text-[#7C8FAC]">Umumiy ball</p>
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
