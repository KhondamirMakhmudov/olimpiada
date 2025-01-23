import Image from "next/image";

import ThemeChanger from "../theme-switcher";
const MainContentHead = () => {
  return (
    <div className={"flex justify-between"}>
      <div className={"flex items-center gap-x-[24px]"}>
        <button>
          <Image
            src={"/icons/sidebar.svg"}
            alt={"sidebar"}
            width={24}
            height={24}
          />
        </button>

        <button>
          <Image
            src={"/icons/search.svg"}
            alt={"sidebar"}
            width={24}
            height={24}
          />
        </button>
      </div>

      <div className={"flex items-center gap-x-[24px]"}>
        <ThemeChanger />
        <button>
          <Image
            src={"/icons/lang.svg"}
            alt={"sidebar"}
            width={24}
            height={24}
          />
        </button>

        <button>
          <Image
            src={"/images/user.png"}
            alt={"sidebar"}
            width={32}
            height={32}
          />
        </button>
      </div>
    </div>
  );
};

export default MainContentHead;
