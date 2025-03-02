import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Brand = () => {
  const router = useRouter();
  return (
    <div className={"  "}>
      <Link href={"/"}>
        <h1
          className={` font-semibold text-[34px]  text-[#3965c6] font-myriad   ${
            router.pathname === "/" ? "dark:text-[#3965c6]" : "dark:text-white"
          }`}
        >
          IQ math
        </h1>
      </Link>
    </div>
  );
};

export default Brand;
