import Image from "next/image";

const Brand = () => {
  return (
    <div className={"flex gap-x-[10px] items-center  "}>
      <Image src={"/images/brand.png"} alt={"brand"} width={34} height={26} />
      <h1 className={"text-[#2A3547] font-bold text-[24px]"}>Modernize</h1>
    </div>
  );
};

export default Brand;
