import Image from "next/image";

const Brand = () => {
  return (
    <div className={"  "}>
      <Image
        src={"/images/logo-dark.png"}
        alt={"brand"}
        width={100}
        height={66}
      />
      {/* <h1 className={" font-bold text-[24px] dark:text-white text-black"}>
        Modernize
      </h1> */}
    </div>
  );
};

export default Brand;
