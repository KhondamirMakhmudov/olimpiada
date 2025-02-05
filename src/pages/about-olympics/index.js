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
      <main>
        <section>
          <div className="container mt-[50px] ">
            <NavbarTitle>{t("olympicsTitle  ")}</NavbarTitle>{" "}
            <p className=" my-[50px]">
              {t("aboutOlympicsContent1")}
              <strong>{t("aboutOlympicsContent2")}</strong>
            </p>
          </div>
        </section>

        <section className="container my-[50px] ">
          <TitleLittleContent>{t("aboutOlympicsTitle")}</TitleLittleContent>

          <div className="grid grid-cols-12 self-baseline gap-[30px] mt-[30px]">
            <div className="col-span-4 shadow-2xl rounded-md flex items-start gap-x-[10px]">
              <div className="bg-[#5B72EE] p-[10px] inline-block  text-xl w-[20px] h-full text-white "></div>

              <p className="p-[10px] text-sm">{t("aboutOlympicsContent3")}</p>
            </div>
            <div className="col-span-4 shadow-xl rounded-md flex items-start gap-x-[10px]">
              <div className="bg-[#12DEB9] p-[10px] inline-block  text-xl w-[20px] h-full text-white "></div>

              <p className="p-[10px] text-sm">{t("aboutOlympicsContent4")}</p>
            </div>
            <div className="col-span-4 shadow-xl rounded-md flex items-start gap-x-[10px]">
              <div className="bg-[#FFAE1F] p-[10px] inline-block  text-xl w-[20px] h-full text-white "></div>

              <p className="p-[10px] text-sm">{t("aboutOlympicsContent5")}</p>
            </div>
            <div className="col-span-4 shadow-xl rounded-md flex items-start gap-x-[10px]">
              <div className="bg-[#49BEFF] p-[10px] inline-block  text-xl w-[20px] h-full text-white "></div>

              <p className="p-[10px] text-sm">{t("aboutOlympicsContent6")}</p>
            </div>
            <div className="col-span-4 shadow-xl rounded-md flex items-start gap-x-[10px]">
              <div className="bg-[#FFACC6] p-[10px] inline-block  text-xl w-[20px] h-full text-white "></div>

              <p className="p-[10px] text-sm">{t("aboutOlympicsContent7")}</p>
            </div>
            <div className="col-span-4 shadow-xl rounded-md flex items-start gap-x-[10px]">
              <div className="bg-[#8D7DE8] p-[10px] inline-block  text-xl w-[20px] h-full text-white "></div>

              <p className="p-[10px] text-sm">{t("aboutOlympicsContent8")}</p>
            </div>

            <div className="col-span-4 shadow-xl rounded-md flex items-start gap-x-[10px]">
              <div className="bg-[#8BD7E8] p-[10px] inline-block  text-xl w-[20px] h-full text-white "></div>

              <p className="p-[10px] text-sm">{t("aboutOlympicsContent9")}</p>
            </div>
          </div>
        </section>

        <section className="">
          <div className="container">
            <TitleLittleContent>{t("aboutOlympicsTitle1")}</TitleLittleContent>

            <div className="grid grid-cols-12 items-center gap-x-[30px]">
              <div className="col-span-4">
                <Image
                  src={"/images/first-step.png"}
                  alt="about-us-img"
                  width={470}
                  height={416}
                />
              </div>

              <div className="col-span-8">
                <motion.p
                  initial={{ opacity: 0, translateY: "30px" }}
                  animate={{ opacity: 1, translateY: "0px" }}
                  transition={{ duration: 0.5 }}
                  className="my-[10px] text-lg text-[#696984]"
                >
                  {t("aboutOlympics10")}
                </motion.p>
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-x-[30px]">
              <div className="col-span-8">
                <motion.p
                  initial={{ opacity: 0, translateY: "30px" }}
                  animate={{ opacity: 1, translateY: "0px" }}
                  transition={{ duration: 0.5 }}
                  className="my-[10px] text-lg text-[#696984]"
                >
                  {t("aboutOlympics11")}
                </motion.p>
              </div>

              <div className="col-span-4">
                <Image
                  src={"/images/second-step.png"}
                  alt="about-us-img"
                  width={470}
                  height={416}
                />
              </div>
            </div>
          </div>
        </section>

        <section className=" my-[50px]">
          <div className="container">
            <TitleLittleContent>{t("aboutOlympicsTitle2")}</TitleLittleContent>

            <motion.p
              initial={{ opacity: 0, translateY: "30px" }}
              animate={{ opacity: 1, translateY: "0px" }}
              transition={{ duration: 0.5 }}
              className="my-[10px] text-lg text-[#696984]"
            >
              {t("aboutOlympics12")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, translateY: "30px" }}
              animate={{ opacity: 1, translateY: "0px" }}
              transition={{ duration: 0.5 }}
              className="my-[10px] text-lg text-[#696984]"
            >
              {t("aboutOlympics13")}
            </motion.p>
          </div>

          <div className="grid container grid-cols-12 gap-[30px] items-center">
            <div className="col-span-6">
              <Image
                src={"/images/prices.png"}
                alt="prices"
                width={568}
                height={651}
              />
            </div>

            <div className="col-span-6">
              <ul>
                <li className="flex items-start gap-x-[10px]">
                  <Image
                    src={"/images/winner-1.png"}
                    alt="prices"
                    width={50}
                    height={50}
                  />

                  <motion.p
                    initial={{ opacity: 0, translateY: "30px" }}
                    animate={{ opacity: 1, translateY: "0px" }}
                    transition={{ duration: 0.5 }}
                    className="my-[10px] text-lg text-[#696984]"
                  >
                    {t("winner1")}
                  </motion.p>
                </li>

                <li className="flex items-start gap-x-[10px]">
                  <Image
                    src={"/images/winner-2.png"}
                    alt="prices"
                    width={50}
                    height={50}
                  />

                  <motion.p
                    initial={{ opacity: 0, translateY: "30px" }}
                    animate={{ opacity: 1, translateY: "0px" }}
                    transition={{ duration: 0.5 }}
                    className="my-[10px] text-lg text-[#696984]"
                  >
                    {t("winner2")}
                  </motion.p>
                </li>

                <li className="flex items-start gap-x-[10px]">
                  <Image
                    src={"/images/winner-3.png"}
                    alt="prices"
                    width={50}
                    height={50}
                  />

                  <motion.p
                    initial={{ opacity: 0, translateY: "30px" }}
                    animate={{ opacity: 1, translateY: "0px" }}
                    transition={{ duration: 0.5 }}
                    className="my-[10px] text-lg text-[#696984]"
                  >
                    {t("winner3")}
                  </motion.p>
                </li>
              </ul>
              <p className="my-[20px] text-[#696984] max-w-[500px]">
                {t("winnerDesc")}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
