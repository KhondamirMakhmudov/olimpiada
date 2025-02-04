import NavbarTitle from "@/components/title/navbar-title";
import Header from "@/components/header";
import { motion } from "framer-motion";
import TitleLittleContent from "@/components/title/titleLittleContent";
import Image from "next/image";
import Link from "next/link";

const Index = () => {
  return (
    <>
      <Header />
      <div className="container mt-[50px] ">
        <NavbarTitle>Savollarga javoblar</NavbarTitle>{" "}
      </div>

      <div className="container flex justify-center items-start flex-col mt-[50px]">
        <div className="flex gap-x-[30px] items-center">
          <Image src={"/images/ask-1.png"} alt="ask-1" width={50} height={50} />
          <TitleLittleContent>
            {" "}
            Olimpiada haqida qayerdan ma'lumot olsam bo'ladi?
          </TitleLittleContent>
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
            Olimpiada haqida.{" "}
            <Link
              href={"https://iqmath.uz/info/about-olympic"}
              className="text-[#3965c6]"
            >
              https://iqmath.uz/info/about-olympic
            </Link>
          </motion.p>
        </div>
      </div>

      <div className="container w-full h-[1px] bg-[#EAEFF4] my-[50px]"></div>

      <div className="container flex justify-center items-start flex-col ">
        <div className="flex gap-x-[30px] items-center">
          <Image src={"/images/ask-2.png"} alt="ask-2" width={50} height={50} />
          <TitleLittleContent> IQMATH o'zi nima?</TitleLittleContent>
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
            IQmath - bu matematika fanini samarali o'qish uchun maxsus ishlab
            chiqilgan innovatsion elektron platforma bo'lib, unda maktab
            darsliklarini yaxshi o'zlashtirishga va oliy ta'lim dargohlariga
            kirish imtihonlarida yuqori natijalarni qo'lga kiritishda yordam
            beradi.
          </motion.p>
        </div>
      </div>

      <div className="container w-full h-[1px] bg-[#EAEFF4] my-[50px]"></div>

      <div className="container flex justify-center items-start flex-col">
        <div className="flex gap-x-[30px] items-center">
          <Image src={"/images/ask-3.png"} alt="ask-3" width={50} height={50} />
          <TitleLittleContent>
            {" "}
            IQMATH bo'yicha qiziqtirgan savollarimga qayerdan javob olsam
            bo'ladi?
          </TitleLittleContent>
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
            +998 (78) 888 08 00 raqamiga qo'ng'iroq qilib istalgan
            savollaringizga javob olishingiz mumkin.
          </motion.p>
        </div>
      </div>

      <div className="container w-full h-[1px] bg-[#EAEFF4] my-[50px]"></div>

      <div className="container flex justify-center items-start flex-col">
        <div className="flex gap-x-[30px] items-center">
          <Image src={"/images/ask-4.png"} alt="ask-3" width={50} height={50} />
          <TitleLittleContent>
            {" "}
            IQMATH platformasidan kimlar ro'yxatdan o'tishi mumkin?
          </TitleLittleContent>
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
            IQmath platformasidan foydalanish uchun yosh chegarasi
            belgilanmagan. Istalgan foydalanuchi saytdan foydlanishi mumkin.
            Saytdan foydalanish pullik.
          </motion.p>
        </div>
      </div>

      <div className="container w-full h-[1px] bg-[#EAEFF4] my-[50px]"></div>

      <div className="container flex justify-center items-start flex-col">
        <div className="flex gap-x-[30px] items-center">
          <Image src={"/images/ask-3.png"} alt="ask-3" width={50} height={50} />
          <TitleLittleContent>
            {" "}
            IQMATH platformasida a'lochi foydalanuvchilar uchun bonuslar
            beriladimi?
          </TitleLittleContent>
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
            IQmath platformasida berilgan topshiriqlarni o'z vaqtida
            muvaffaqiyatli bajargan foydalanuvchilar uchun bonuslar beriladi.
            Ushbu ballarni tez orada qimmatbaho sovg'alarga almashtirishingiz
            mumkin bo'ladi (Bu boraga ishlar boshlangan).
          </motion.p>
        </div>
      </div>

      <div className="container w-full h-[1px] bg-[#EAEFF4] my-[50px]"></div>

      <div className="container flex justify-center items-start flex-col mb-[50px]">
        <div className="flex gap-x-[30px] items-center">
          <Image src={"/images/ask-1.png"} alt="ask-3" width={50} height={50} />
          <TitleLittleContent>
            {" "}
            IQMATH tashkilotchilari bilan bog'lanish
          </TitleLittleContent>
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
            +998 (78) 888 08 00 raqamiga qo'ng'iroq qilib istalgan
            savollaringizga javob olishingiz mumkin.
          </motion.p>
        </div>
      </div>
    </>
  );
};

export default Index;
