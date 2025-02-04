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
        <NavbarTitle>IQMath-2025 Fan olimpiadasi</NavbarTitle>{" "}
        <p className="text-center my-[50px]">
          Raqamli iqtisodiyot va agrotexnologiyalar universiteti (Keyingi
          o'rinlarda "UDEA" (www.udea.uz) deb yuritiladi) O‘zbekiston
          Respublikasidagi barcha davlat va nodavlat o‘rta va maxsus ta’lim
          muassasalari, akademik litseylar va kasb-hunar maktablari
          bitiruvchilari hamda 20 yoshgacha bo‘lgan yoshlar uchun matematika
          fani bo‘yicha olimpiada tashkil qiladi.{" "}
          <strong>
            Oliy ta'lim muassasalari talabalari ishtirok etishi mumkin emas!
          </strong>
        </p>
      </div>
    </>
  );
};

export default Index;
