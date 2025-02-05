import NavbarTitle from "@/components/title/navbar-title";
import Header from "@/components/header";
import { motion } from "framer-motion";
import TitleLittleContent from "@/components/title/titleLittleContent";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="container mt-[50px] ">
        <NavbarTitle></NavbarTitle>{" "}
      </div>

      <div className="container flex justify-center items-start flex-col mt-[50px]">
        <div className="flex gap-x-[30px] items-center">
          <Image src={"/images/ask-1.png"} alt="ask-1" width={50} height={50} />
          <TitleLittleContent> {t("question1")}</TitleLittleContent>
        </div>

        <div className="flex gap-x-[30px] items-start ml-[30px] mt-[15px]">
          <Image
            src={"/images/answer-human.png"}
            alt="ask-1"
            width={50}
            height={50}
          />
          <motion.p
            initial={{ opacity: 0, translateY: "30px" }}
            animate={{ opacity: 1, translateY: "0px" }}
            transition={{ duration: 0.5 }}
            className="my-[10px] text-lg"
          >
            {t("answer1")}{" "}
            <Link
              href={"https://iq-math.uz/about-olympics"}
              className="text-[#3965c6]"
            >
              https://iq-math.uz/about-olympic
            </Link>
          </motion.p>
        </div>
      </div>

      <div className="container w-full h-[1px] bg-[#EAEFF4] my-[50px]"></div>

      <div className="container flex justify-center items-start flex-col ">
        <div className="flex gap-x-[30px] items-center">
          <Image src={"/images/ask-2.png"} alt="ask-2" width={50} height={50} />
          <TitleLittleContent> {t("question2")}</TitleLittleContent>
        </div>

        <div className="flex gap-x-[30px] items-start ml-[30px] mt-[15px]">
          <Image
            src={"/images/answer-human.png"}
            alt="ask-1"
            width={50}
            height={50}
          />
          <motion.p
            initial={{ opacity: 0, translateY: "30px" }}
            animate={{ opacity: 1, translateY: "0px" }}
            transition={{ duration: 0.5 }}
            className="my-[10px] text-lg"
          >
            {t("answer2")}
          </motion.p>
        </div>
      </div>

      <div className="container w-full h-[1px] bg-[#EAEFF4] my-[50px]"></div>

      <div className="container flex justify-center items-start flex-col">
        <div className="flex gap-x-[30px] items-center">
          <Image src={"/images/ask-3.png"} alt="ask-3" width={50} height={50} />
          <TitleLittleContent> {t("question3")}</TitleLittleContent>
        </div>

        <div className="flex gap-x-[30px] items-start ml-[30px] mt-[15px]">
          <Image
            src={"/images/answer-human.png"}
            alt="ask-1"
            width={50}
            height={50}
          />
          <motion.p
            initial={{ opacity: 0, translateY: "30px" }}
            animate={{ opacity: 1, translateY: "0px" }}
            transition={{ duration: 0.5 }}
            className="my-[10px] text-lg"
          >
            {t("answer3")}
          </motion.p>
        </div>
      </div>

      <div className="container w-full h-[1px] bg-[#EAEFF4] my-[50px]"></div>

      <div className="container flex justify-center items-start flex-col">
        <div className="flex gap-x-[30px] items-center">
          <Image src={"/images/ask-4.png"} alt="ask-3" width={50} height={50} />
          <TitleLittleContent> {t("question4")}</TitleLittleContent>
        </div>

        <div className="flex gap-x-[30px] items-start ml-[30px] mt-[15px]">
          <Image
            src={"/images/answer-human.png"}
            alt="ask-1"
            width={50}
            height={50}
          />
          <motion.p
            initial={{ opacity: 0, translateY: "30px" }}
            animate={{ opacity: 1, translateY: "0px" }}
            transition={{ duration: 0.5 }}
            className="my-[10px] text-lg"
          >
            {t("answer4")}
          </motion.p>
        </div>
      </div>

      <div className="container w-full h-[1px] bg-[#EAEFF4] my-[50px]"></div>

      <div className="container flex justify-center items-start flex-col">
        <div className="flex gap-x-[30px] items-center">
          <Image src={"/images/ask-3.png"} alt="ask-3" width={50} height={50} />
          <TitleLittleContent> {t("question5")}</TitleLittleContent>
        </div>

        <div className="flex gap-x-[30px] items-start ml-[30px] mt-[15px]">
          <Image
            src={"/images/answer-human.png"}
            alt="ask-1"
            width={50}
            height={50}
          />
          <motion.p
            initial={{ opacity: 0, translateY: "30px" }}
            animate={{ opacity: 1, translateY: "0px" }}
            transition={{ duration: 0.5 }}
            className="my-[10px] text-lg"
          >
            {t("answer5")}
          </motion.p>
        </div>
      </div>

      <div className="container w-full h-[1px] bg-[#EAEFF4] my-[50px]"></div>

      <div className="container flex justify-center items-start flex-col mb-[50px]">
        <div className="flex gap-x-[30px] items-center">
          <Image src={"/images/ask-1.png"} alt="ask-3" width={50} height={50} />
          <TitleLittleContent> {t("question6")}</TitleLittleContent>
        </div>

        <div className="flex gap-x-[30px] items-start ml-[30px] mt-[15px]">
          <Image
            src={"/images/answer-human.png"}
            alt="ask-1"
            width={50}
            height={50}
          />
          <motion.p
            initial={{ opacity: 0, translateY: "30px" }}
            animate={{ opacity: 1, translateY: "0px" }}
            transition={{ duration: 0.5 }}
            className="my-[10px] text-lg"
          >
            {t("answer6")}
          </motion.p>
        </div>
      </div>
    </>
  );
};

export default Index;
