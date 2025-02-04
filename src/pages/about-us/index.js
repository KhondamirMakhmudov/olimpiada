import NavbarTitle from "@/components/title/navbar-title";
import Header from "@/components/header";
import { motion } from "framer-motion";
import TitleLittleContent from "@/components/title/titleLittleContent";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header color="black" />

      <main className=" ">
        <section
          className=" bg-center bg-cover bg-no-repeat bg-[#FFF3E4]"
          // style={{ backgroundImage: `url(/images/about-us-bg.png)` }}
        >
          <div className="grid grid-cols-12 gap-[30px] items-center  container">
            <div className="col-span-6">
              <h1 className="text-[#F48C06] text-[68px]">
                IQ <span className="text-[#2F327D]">math</span>
              </h1>

              <p className="text-[#F48C06] text-[38px]">{t("aboutusTitle")}</p>

              <motion.p
                initial={{ opacity: 0, translateY: "30px" }}
                animate={{ opacity: 1, translateY: "0px" }}
                transition={{ duration: 0.3 }}
                className="my-[30px] text-lg text-[#696984]"
              >
                {t("aboutusContent1")}
              </motion.p>
            </div>
            <div className="col-span-6">
              <Image
                src={"/images/main-img-about-us.png"}
                alt="about-us-img"
                width={544}
                height={314}
              />
            </div>
          </div>
        </section>

        <section>
          <div className="my-[70px] container">
            <div>
              <TitleLittleContent>
                <p className="text-[#2F327D]">{t("aboutusTitle1")}</p>
              </TitleLittleContent>
              <div className="border flex items-start gap-x-[10px] p-[30px] rounded-md mt-[30px]">
                <Image
                  src={"/icons/about-us.svg"}
                  alt="about-us-icon"
                  width={16}
                  height={16}
                />

                <motion.p
                  initial={{ opacity: 0, translateY: "30px" }}
                  animate={{ opacity: 1, translateY: "0px" }}
                  transition={{ duration: 0.5 }}
                  className=" text-lg"
                >
                  {t("aboutusContent2")}
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="grid grid-cols-12 gap-[30px] items-center">
            <div className="col-span-6">
              <TitleLittleContent>
                {" "}
                <p className="text-[#F48C06]">{t("aboutusTitle2")}</p>
              </TitleLittleContent>

              <motion.p
                initial={{ opacity: 0, translateY: "30px" }}
                animate={{ opacity: 1, translateY: "0px" }}
                transition={{ duration: 0.5 }}
                className="my-[10px] text-lg text-[#696984]"
              >
                {t("aboutusContent3")}
              </motion.p>
            </div>

            <div className="col-span-6">
              <Image
                src={"/images/about-us-img1.png"}
                alt="about-us-img"
                width={611}
                height={382}
              />
            </div>
          </div>
        </section>

        <section className=" bg-[#FAFAFA] py-[30px]">
          <div className="grid grid-cols-12 container items-center gap-x-[15px]">
            <div className="col-span-6">
              <Image
                src={"/images/about-us-img2.png"}
                alt="about-us-img"
                width={508}
                height={414}
              />
            </div>
            <div className="col-span-6">
              <TitleLittleContent>
                <p className="text-[#F48C06]">{t("aboutusTitle3")}</p>
              </TitleLittleContent>

              <motion.p
                initial={{ opacity: 0, translateY: "30px" }}
                animate={{ opacity: 1, translateY: "0px" }}
                transition={{ duration: 0.5 }}
                className="my-[10px] text-lg"
              >
                {t("aboutusContent4")}
              </motion.p>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="my-[30px]">
            <TitleLittleContent>
              {" "}
              <p className="text-[#2F327D]">{t("aboutusTitle4")}</p>
            </TitleLittleContent>
            <motion.p
              initial={{ opacity: 0, translateY: "30px" }}
              animate={{ opacity: 1, translateY: "0px" }}
              transition={{ duration: 0.5 }}
              className="my-[10px] text-lg"
            >
              {t("aboutusContent5")}
            </motion.p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
