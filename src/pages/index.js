import Brand from "@/components/brand";
import SynchronizedAreaChart from "@/components/charts/area-chart";
import PieChartComponent from "@/components/charts/pie-chart";
import Dashboard from "@/components/dashboard";
import { useTheme } from "next-themes";
import Image from "next/image";
import { UserProfileContext } from "@/context/responseProvider";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "@/components/theme-provider";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import storage from "@/services/storage";
import { get } from "lodash";
import DiagramChart from "@/components/charts/diagram";
import SameDataComposedChart from "@/components/charts/SameDataComposedChart";
import { useTranslation } from "react-i18next";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Example: Check authentication status from localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      router.replace("/dashboard"); // Redirect to dashboard if logged in
    } else {
      router.replace("/auth/login"); // Redirect to login if not authenticated
    }
  }, []);

  return null;
}
