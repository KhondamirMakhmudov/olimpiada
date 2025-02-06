import Dashboard from "@/components/dashboard";
import Image from "next/image";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import storage from "@/services/storage";
import { get } from "lodash";
import Link from "next/link";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import EditIcon from "@/components/icons/edit";

const Index = () => {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [hide, setHide] = useState(false);

  const {
    data: studentProfile,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    enabled: !!session?.accessToken, // Only fetch if accessToken is available
  });

  return (
    <Dashboard>
      <div
        className={` p-[30px] bg-[#EBF3FE] dark:bg-[#26334AFF]  my-[30px] rounded-[12px]   relative h-[125px] `}
      >
        <div className={"space-y-[15px]"}>
          <p className={"text-[18px] dark:text-white text-black font-semibold"}>
            {t("userProfile")}
          </p>

          <div className="flex gap-x-[12px] items-center">
            <Link href={"/"} className="text-[#5A6A85BF]">
              {t("homePage")}
            </Link>
            <div className="bg-black w-[6px] h-[6px] rounded-full  dark:bg-white"></div>
            <p className="text-black dark:text-white">{t("myPage")}</p>
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

      <div className="my-[30px]  grid grid-cols-12 gap-x-[30px]">
        <div className="col-span-7 bg-white dark:bg-[#26334AFF]  border border-[#EAEFF4] dark:border-[#2A3447FF] rounded-md">
          <div className="flex justify-between items-center p-[30px]">
            <h3 className="capitalize text-lg font-semibold text-black dark:text-white">
              {t("details")}
            </h3>
            <ul className="flex gap-x-[15px]">
              <li>
                {" "}
                <Image
                  src={"/icons/Edit.svg"}
                  alt={"edit"}
                  width={24}
                  height={24}
                />
              </li>

              <li>
                {" "}
                <Image
                  src={"/icons/View.svg"}
                  alt={"edit"}
                  width={24}
                  height={24}
                />
              </li>

              <li>
                {" "}
                <Image
                  src={"/icons/Share.svg"}
                  alt={"Share"}
                  width={24}
                  height={24}
                />
              </li>
            </ul>
          </div>

          <div className="w-full h-[1px] bg-[#EAEFF4] mb-[30px]"></div>

          <div className="p-[30px]">
            <div className="flex gap-x-[12px]">
              <Image
                src={"/icons/user.svg"}
                alt={"user"}
                width={70}
                height={70}
              />

              <div className="space-y-[4px] text-black dark:text-white">
                <h4 className="">{get(studentProfile, "data.full_name")}</h4>
                <p className="text-sm text-[#7C8FAC]">
                  {t("educationalInstitution")}
                  <span className="capitalize">
                    {get(studentProfile, "data.academy_or_school")}
                  </span>
                </p>
                <p className="text-sm text-[#7C8FAC]">
                  {get(studentProfile, "data.class_name")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-[20px] my-[30px] text-black dark:text-white">
              <div className="col-span-1">
                <p className="text-sm text-[#7C8FAC]">{t("phone number")}</p>
                <p>+{get(studentProfile, "data.phone")}</p>
              </div>

              <div className="col-span-1">
                <p className="text-sm text-[#7C8FAC]">{t("email")}</p>
                <p>{get(studentProfile, "data.email")}</p>
              </div>

              <div className="col-span-1">
                <p className="text-sm text-[#7C8FAC]">{t("birthday")}</p>
                <p>
                  {dayjs(get(studentProfile, "data.brithday")).format(
                    "DD.MM.YYYY"
                  )}
                </p>
              </div>

              <div className="col-span-1">
                <p className="text-sm text-[#7C8FAC]">{t("region")}</p>
                <p>{get(studentProfile, "data.region")}</p>
              </div>

              <div className="col-span-1">
                <p className="text-sm text-[#7C8FAC]">{t("district")}</p>
                <p>{get(studentProfile, "data.districts")}</p>
              </div>

              <div className="col-span-3">
                <p className="text-sm text-[#7C8FAC]">{t("address")}</p>

                <p>{get(studentProfile, "data.address")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-5 bg-white dark:bg-[#26334AFF]  border border-[#EAEFF4] dark:border-[#2A3447FF] rounded-md">
          <div className="flex  justify-between items-center p-[30px]">
            <h3 className=" text-lg font-semibold text-black dark:text-white">
              Login va parol
            </h3>{" "}
            <button
              className="scale-100 active:scale-90 transition-all duration-200"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <Image
                  src={"/icons/eye.svg"}
                  alt={"edit"}
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src={"/icons/eye-closed.svg"}
                  alt={"edit"}
                  width={24}
                  height={24}
                />
              )}
            </button>
          </div>

          <div className="w-full h-[1px] bg-[#EAEFF4] ">
            <div className="p-[30px]">
              <div className="flex flex-col  py-[15px] space-y-[4px] text-black dark:text-white">
                <label>Login</label>
                <input
                  type={showPassword ? "text" : "password"}
                  disabled
                  value={session?.login}
                  className="w-1/3 py-[10px] px-[8px] dark:text-white rounded-md border bg-transparent"
                />
              </div>

              <div className="flex flex-col  space-y-[4px] text-black dark:text-white">
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  disabled
                  value={session?.password}
                  className="w-1/3 py-[10px] px-[8px] rounded-md border bg-transparent"
                />
              </div>

              <div className="mt-[80px]">
                <p className="text-sm mb-[10px] text-[#7C8FAC]">
                  Agarda biz taqdim etgan parol sizga noqulaylik
                  tug&apos;dirayotgan bo'lsa uni o&apos;zgartirishingiz mumkin
                </p>
                <Link href={"/auth/forget-password"}>
                  <button className="flex items-center gap-x-[10px]  bg-[#539BFF] scale-100 active:scale-95 hover:bg-[#5197F9] transition-all duration-200 text-white py-[8px] px-[16px] rounded-md">
                    Parolni o&apos;zgartirish
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Index;
