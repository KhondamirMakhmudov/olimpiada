import LanguageDropdown from "../language";
import Brand from "../brand";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const Header = ({ color = "white" }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <header className="relative z-10 py-3 bg-gray-100 bg-opacity-40">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
        <Brand />

        <nav className="hidden md:flex gap-4 items-center">
          {[
            { href: "/about-us", label: "aboutus" },
            { href: "/faq", label: "faq" },
            { href: "/about-olympics", label: "aboutOlympics" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`py-2 px-3 rounded-md text-sm transition ${
                router.pathname === href
                  ? "bg-[#3965c6] text-white"
                  : "text-black hover:underline"
              }`}
            >
              {t(label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center">
          <LanguageDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
