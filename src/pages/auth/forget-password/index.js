import Brand from "@/components/brand";

const Index = () => {
  return (
    <div>
      <div
        className={
          "flex items-center justify-center h-screen bg-center bg-cover"
        }
        style={{ backgroundImage: `url(/images/main-bg.jpg)` }}
      >
        <div className="w-[436px] bg-white mx-auto rounded-[8px] p-[30px] ">
          <div className="flex justify-center items-center mb-[30px]">
            <Brand />
          </div>{" "}
        </div>
      </div>{" "}
    </div>
  );
};

export default Index;
