import Image from "next/image";
import Link from "next/link";

const Brand = () => {
  return (
    <div className={"  "}>
      <Link href={"/"}>
        <h1
          className={
            " font-semibold text-[34px] dark:text-white text-black uppercase"
          }
        >
          iqmath
        </h1>
      </Link>
    </div>
  );
};

export default Brand;
