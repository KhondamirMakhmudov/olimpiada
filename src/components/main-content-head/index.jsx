import Image from "next/image";
import { useState } from "react";
import ThemeChanger from "../theme-switcher";

import useGetQuery from "../../hooks/api/useGetQuery";
import { KEYS } from "../../constants/key";
import { URLS } from "../../constants/url";
import storage from "../../services/storage";
import { get } from "lodash";
import { useRouter } from "next/router";
import LanguageDropdown from "../language";
import { signOut, useSession } from "next-auth/react";
const MainContentHead = () => {
  const { data: session } = useSession();
  const [openProfile, setOpenProfile] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const {
    data: studentProfile,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    headers: {
      Authorization: session?.accessToken
        ? `Bearer ${session.accessToken}`
        : "",
    },
  });

  const handleProfile = () => {
    setOpenProfile(!openProfile);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });

    localStorage.clear();
    sessionStorage.clear();
  };

  // Function to handle showing the modal
  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsExiting(false);
    }, 300); // Delay for the animation to complete
  };

  // Function to handle logout confirmation
  const confirmLogout = () => {
    // Your logout logic here
    console.log("Logging out...");
    setIsModalOpen(false);
  };
  return (
    <div className={"flex justify-between"}>
      <div className={"flex items-center gap-x-[24px]"}>
        <button>
          <Image
            src={"/icons/sidebar.svg"}
            alt={"sidebar"}
            width={24}
            height={24}
          />
        </button>

        <button>
          <Image
            src={"/icons/search.svg"}
            alt={"sidebar"}
            width={24}
            height={24}
          />
        </button>
      </div>

      <div className={"relative flex items-center gap-x-[24px]"}>
        <LanguageDropdown />
        <ThemeChanger />

        <button onClick={handleProfile}>
          <Image src={"/images/user.png"} alt={"user"} width={42} height={42} />
        </button>

        {openProfile && (
          <div className="absolute bg-white dark:bg-[#26334A] border rounded-md  min-w-[300px] -bottom-[300px] shadow-lg -left-[130px] p-[30px] z-50">
            <div className="flex gap-x-[12px]">
              <Image
                src={"/icons/user.svg"}
                alt={"user"}
                width={70}
                height={70}
              />

              <div className="space-y-[4px] text-black dark:text-white">
                <h4 className="">{get(studentProfile, "data.full_name")}</h4>
                <p className="text-sm">
                  {get(studentProfile, "data.class_name")}
                </p>
                <div className="flex gap-x-[4px]">
                  <Image
                    src={"/icons/mail.svg"}
                    alt={"mail"}
                    width={18}
                    height={18}
                  />
                  <p className="text-xs text-[#7C8FAC]">
                    {get(studentProfile, "data.email")}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#EAEFF4] rounded-[4px] my-[15px]"></div>

            <button
              onClick={() => router.push("/student-profile")}
              className="flex gap-x-[12px] text-start cursor-pointer"
            >
              <div className="bg-[#ECF2FF] p-[12px] rounded-md inline-block">
                <Image
                  src={"/icons/user-settings.svg"}
                  alt={"user-settings"}
                  width={20}
                  height={20}
                />
              </div>
              <div>
                <p className="text-black dark:text-white font-semibold">
                  Mening sahifam
                </p>
                <p className="text-[#7C8FAC] text-sm">Sozlamalar</p>
              </div>
            </button>

            <div className="w-full h-[1px] bg-[#EAEFF4] rounded-[4px] my-[15px]"></div>

            <button
              onClick={handleLogoutClick}
              className=" text-[#FA896B] py-[8px] w-full border border-[#FA896B] rounded-md hover:bg-[#FA896B] hover:text-white transform duration-200"
            >
              Chiqish
            </button>
          </div>
        )}

        {isModalOpen && (
          <>
            <div
              className={`fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity duration-300 ${
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
                  Web sahifadan chiqish
                </h2>
                <p className="text-lg font-medium text-[#7C8FAC] mb-4">
                  Haqiqatan ham sahifani tark etmoqchimisiz?
                </p>
                <div className="flex justify-end gap-x-[10px]">
                  <button
                    onClick={handleLogout}
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
    </div>
  );
};

export default MainContentHead;
