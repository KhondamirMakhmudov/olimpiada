import LanguageDropdown from "../language";
import Brand from "../brand";
const Header = () => {
  return (
    <div>
      <div className="container flex justify-between items-center ">
        <Brand />

        <ul className="flex gap-x-[16px]">
          <li>Biz haqimizda</li>
          <li>Savollarga javoblar</li>
          <li>Olimpiada haqida</li>
        </ul>

        <LanguageDropdown />
      </div>
    </div>
  );
};

export default Header;
