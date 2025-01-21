import MainContentHead from "@/components/main-content-head";

const MainContent = ({ children }) => {
  return (
    <div className={"col-span-9 p-[30px]"}>
      <MainContentHead />
      {children}
    </div>
  );
};

export default MainContent;
