import Dashboard from "@/components/dashboard";
import Image from "next/image";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import storage from "@/services/storage";
import { get } from "lodash";
import Link from "next/link";
import dayjs from "dayjs";
const Index = () => {
  const {
    data: studentProfile,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    headers: {
      Authorization: `Bearer ${storage.get("authToken")}`,
    },
  });
  return (
    <Dashboard>
      <div
        className={` p-[30px] bg-[#EBF3FE] dark:bg-[#26334AFF]  my-[30px] rounded-[12px]   relative h-[125px] `}
      >
        <div className={"space-y-[15px]"}>
          <p className={"text-[18px] dark:text-white text-black font-semibold"}>
            Foydalanuvchi profili
          </p>

          <div className="flex gap-x-[12px] items-center">
            <Link href={"/"} className="text-[#5A6A85BF]">
              Bosh sahifa
            </Link>
            <div className="bg-black w-[6px] h-[6px] rounded-full  dark:bg-white"></div>
            <p className="text-black dark:text-white">Mening sahifam</p>
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
        <div className="col-span-9 bg-white dark:bg-[#26334AFF]  border border-[#EAEFF4] dark:border-[#2A3447FF] rounded-md">
          <div className="flex justify-between items-center p-[30px]">
            <h3 className="capitalize text-lg font-semibold text-black dark:text-white">
              tafsilotlar
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
                  Ta'lim dargohi:{" "}
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
                <p className="text-sm text-[#7C8FAC]">Telefon raqam</p>
                <p>+{get(studentProfile, "data.phone")}</p>
              </div>

              <div className="col-span-1">
                <p className="text-sm text-[#7C8FAC]">Elektron pochta</p>
                <p>{get(studentProfile, "data.email")}</p>
              </div>

              <div className="col-span-1">
                <p className="text-sm text-[#7C8FAC]">Tug&apos;ilgan sanasi</p>
                <p>
                  {dayjs(get(studentProfile, "data.brithday")).format(
                    "DD.MM.YYYY"
                  )}
                </p>
              </div>

              <div className="col-span-1">
                <p className="text-sm text-[#7C8FAC]">Viloyati</p>
                <p>{get(studentProfile, "data.region")}</p>
              </div>

              <div className="col-span-1">
                <p className="text-sm text-[#7C8FAC]">Tuman/shahar</p>
                <p>{get(studentProfile, "data.districts")}</p>
              </div>

              <div className="col-span-3">
                <p className="text-sm text-[#7C8FAC]">Manzil</p>

                <p>{get(studentProfile, "data.address")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Index;
