import Brand from "@/components/brand";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Image from "next/image";
const Index = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <div
        className={
          "flex items-center justify-center h-screen bg-center bg-cover"
        }
        style={{ backgroundImage: `url(/images/main-bg.jpg)` }}
      >
        <div className="w-[436px] bg-white mx-auto rounded-[8px] p-[30px] ">
          <div className="flex justify-center items-center mb-[30px]">
            <Brand />
          </div>{" "}
          <p className="text-2xl font-medium text-center mb-[20px]">
            Parolni tiklash
          </p>
          <div className="w-full mt-[30px]">
            <form
              // onSubmit={handleSubmit(onSubmit)}
              className="space-y-[20px] border p-[16px] rounded-[4px]"
            >
              <div className="bg-white">
                <p className="mb-[8px] text-sm text-[#2A3547] font-semibold">
                  {t("phone number")}
                </p>

                <div className="border border-[#EAEFF4] flex gap-x-[10px] items-center rounded-[8px] px-[8px] ">
                  <Image
                    src={"/icons/uzb-flag.svg"}
                    alt="flag"
                    width={30}
                    height={30}
                  />

                  <div className="w-[1px] h-[40px] bg-[#EAEFF4]  "></div>
                  <span className="text-gray-700 text-sm">+998</span>
                  <input
                    type="tel"
                    maxLength="9"
                    {...register("phone", { required: true })}
                    className="  w-full bg-white text-sm text-black py-[9px] pl-[5px]"
                  />
                </div>
              </div>

              <button className="bg-[#5D87FF] hover:bg-[#4570EA]   text-white py-[8px] px-[16px] w-full rounded-[4px] transition-all duration-300">
                Tasdiqlash kodini yuborish
              </button>
            </form>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Index;
