import NavbarTitle from "@/components/title/navbar-title";
import Header from "@/components/header";
import { motion } from "framer-motion";
import TitleLittleContent from "@/components/title/titleLittleContent";

const Index = () => {
  return (
    <>
      <Header color="black" />

      <div className="container mt-[50px] px-[300px]">
        <NavbarTitle>IQ smath</NavbarTitle>

        <motion.p
          initial={{ opacity: 0, translateY: "30px" }}
          animate={{ opacity: 1, translateY: "0px" }}
          transition={{ duration: 0.3 }}
          className="my-[30px] text-lg"
        >
          IQmath - bu matematikani samarali o‘rganish uchun maxsus ishlab
          chiqilgan innovatsion elektron platforma. Bu platforma zamonaviy
          texnologik yechimlar va ilg‘or o‘qitish usullarini o‘zida mujassam
          etib, turli yosh guruhlari va tayyorgarlik darajalariga
          moslashtirilgan noyob ta’lim makonini yaratadi. Platforma matematik
          bilimlarini chuqurlashtirishni yoki masalalar yechish bo‘yicha
          ko‘nikmalarini yaxshilashni istaganlar uchun mo‘ljallangan.
        </motion.p>

        <div className="grid grid-cols-12 gap-x-[15px]">
          <div className="col-span-6">
            <TitleLittleContent>Nimalarni taklif qilamiz</TitleLittleContent>

            <motion.p
              initial={{ opacity: 0, translateY: "30px" }}
              animate={{ opacity: 1, translateY: "0px" }}
              transition={{ duration: 0.5 }}
              className="my-[10px] text-lg"
            >
              IQmath algebra, geometriya, statistika, matematik analiz va boshqa
              muhim yo‘nalishlarda turli kurslarni taklif etadi. Har bir kurs
              nafaqat nazariy materiallarni, balki o‘rganilgan mavzularni
              mustahkamlash uchun amaliy topshiriqlarni ham o‘z ichiga oladi.
              Platforma moslashuvchan o‘qitish tizimini taklif etadi, bu esa
              o‘quvchilarga o‘z sur’ati va o‘rganish darajasini tanlash
              imkoniyatini beradi.
            </motion.p>
          </div>

          <div className="col-span-6">
            <TitleLittleContent>
              IQmath platformasining xususiyatlari
            </TitleLittleContent>

            <motion.p
              initial={{ opacity: 0, translateY: "30px" }}
              animate={{ opacity: 1, translateY: "0px" }}
              transition={{ duration: 0.5 }}
              className="my-[10px] text-lg"
            >
              Asosiy xususiyatlaridan biri bu video materiallarning mavjudligi.
              Platformada nazariy konsepsiyalar va tamoyillarni
              bosqichma-bosqich tushuntirib beruvchi batafsil video darsliklar
              taqdim etilgan. Bu hatto murakkab mavzularni ham o‘zlashtirishni
              osonlashtiradi. Shuningdek, darsliklardagi aniq misollarni yechish
              bo‘yicha video tushuntirishlar ham mavjud bo‘lib,
              foydalanuvchilarga masalalarni qanday yechishni o‘rganish va
              yechim mantiqini tushunish imkonini beradi.
            </motion.p>
          </div>
        </div>

        <div className="my-[30px]">
          <TitleLittleContent>IQmath haqida ko‘proq</TitleLittleContent>
          <motion.p
            initial={{ opacity: 0, translateY: "30px" }}
            animate={{ opacity: 1, translateY: "0px" }}
            transition={{ duration: 0.5 }}
            className="my-[10px] text-lg"
          >
            IQmath turli testlar va mashqlarni taqdim etadi, bu esa
            foydalanuvchilarga o‘z bilimlarini sinab ko‘rish va imtihonlarga
            yoki nazorat ishlariga tayyorlanish imkoniyatini beradi. O‘rnatilgan
            baholash tizimlari o‘sishni kuzatishga yordam beradi, moslashuvchan
            topshiriqlar esa o‘quvchining bilim darajasiga moslashadi va
            motivatsiyani yo‘qotmasdan oldinga siljishga yordam beradi.
          </motion.p>
        </div>

        <div className="my-[30px]">
          <TitleLittleContent>O‘qitish natijalari</TitleLittleContent>
          <motion.p
            initial={{ opacity: 0, translateY: "30px" }}
            animate={{ opacity: 1, translateY: "0px" }}
            transition={{ duration: 0.5 }}
            className="my-[10px] text-lg"
          >
            IQmath platformasida o‘qitish natijasida nafaqat akademik natijalar
            sezilarli darajada yaxshilanadi, balki mantiqiy va analitik fikrlash
            kabi muhim ko‘nikmalar ham rivojlanadi. Ushbu ko‘nikmalar nafaqat
            matematik masalalarni, balki hayotning boshqa sohalaridagi
            muammolarni hal qilishda ham asqotadi.
          </motion.p>
        </div>
      </div>
    </>
  );
};

export default Index;
