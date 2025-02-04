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
            <NavbarTitle>IQMath-2025 Fan olimpiadasi</NavbarTitle>{" "}
            <p className=" my-[50px]">
              {t("aboutOlympicsContent1")}
              <strong>{t("aboutOlympicsContent2")}</strong>
            </p>
          </div>
        </section>

        <section className="container my-[50px] ">
          <TitleLittleContent>Olimpiada shartlari</TitleLittleContent>

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
            <TitleLittleContent>
              Olimpiada ikki bosqichda o'tkaziladi:
            </TitleLittleContent>

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
                  Birinchi bosqich 2025 yilning 21-martdan 28-martgacha bo‘lgan
                  oraliqda "iqmath.uz" saytida onlayn shaklida o‘tkaziladi. Har
                  bir ishtirokchiga <strong>30 ta test</strong> savoli beriladi,
                  ishlash uchun <strong>60 daqiqa</strong> vaqt beriladi. Eng
                  yuqori ball to‘plagan <strong>300 nafar</strong> ishtirokchi
                  ikkinchi bosqichga yo'llanmani qo'lga kiritadi.
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
                  Birinchi bosqich 2025 yilning 21-martdan 28-martgacha bo‘lgan
                  oraliqda "iqmath.uz" saytida onlayn shaklida o‘tkaziladi. Har
                  bir ishtirokchiga <strong>30 ta test</strong> savoli beriladi,
                  ishlash uchun <strong>60 daqiqa</strong> vaqt beriladi. Eng
                  yuqori ball to‘plagan <strong>300 nafar</strong> ishtirokchi
                  ikkinchi bosqichga yo'llanmani qo'lga kiritadi.
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
            <TitleLittleContent>Sovrinlar</TitleLittleContent>

            <motion.p
              initial={{ opacity: 0, translateY: "30px" }}
              animate={{ opacity: 1, translateY: "0px" }}
              transition={{ duration: 0.5 }}
              className="my-[10px] text-lg text-[#696984]"
            >
              Olimpiada va sovrinlar UDEA universiteti (www.udea.uz) va AGROBANK
              (agrobank.uz) homiyligida tashkillashtiriladi. Ikkinchi bosqichda
              eng yuqori ball to‘plagan 10 nafar ishtirokchi (IELTS
              sertifikatiga ega bo‘lsa) UDEA dagi Buyuk Britaniya yirik
              universitetlardan biri bo'lgan "Coventry university" dasturlari
              uchun tavsiya etiladi. Ushbu dasturlarga 100% shartnoma to‘lovini
              to‘lab talabalikka qabul qilingan ishtirokchilar Koventri
              shahridagi "Summer School" dasturida ishtirok etish imkoniga ega
              bo‘ladilar.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, translateY: "30px" }}
              animate={{ opacity: 1, translateY: "0px" }}
              transition={{ duration: 0.5 }}
              className="my-[10px] text-lg text-[#696984]"
            >
              Ikkinchi bosqichda ishtirok etgan va UDEA universitetiga kirib,
              100% shartnoma to‘lovini amalga oshirgan talabalar 3 million
              so‘mlik "Vaucher" bilan taqdirlanadi.
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
                    BYD E2 elektromobili.
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
                    13 dyuymli Apple iPad Pro M4.
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
                    Apple iPhone 16 Pro Max.
                  </motion.p>
                </li>
              </ul>
              <p className="my-[20px]">
                Olimpiadada qatnashing va qimmatbaho sovg&apos;alardan birini
                yutib oling. <br /> Sizga omad tilab, g&apos;oliblarimiz
                qatorida bo'lishingizni tilab qolamiz!
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
