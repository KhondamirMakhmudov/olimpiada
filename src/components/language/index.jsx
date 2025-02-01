import React, { useState } from "react";
import Image from "next/image";
import { useSettingsStore } from "@/store";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import LangIcon from "../icons/lang";

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const setLang = useSettingsStore((state) => get(state, "setLang", () => {}));

  const languages = [
    { code: "uz", name: "Uzbek", flag: "uz.png" },
    { code: "ru", name: "Russian", flag: "ru.png" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    setLang(language.code);
    setLang(language.flag);
    i18n.changeLanguage(language.code);
  };

  return (
    <div className="relative inline-block">
      {/* Selected Language */}
      <button
        onClick={toggleDropdown}
        className="bg-white hover:bg-[#d8d9db] dark:bg-[#26334A] p-2 rounded-full transform duration-200 active:scale-90 scale-100 flex items-center gap-x-[5px]"
      >
        <LangIcon color={"#5A6A85"} />

        <p className="uppercase text-sm text-black dark:text-white">
          {selectedLanguage.code}
        </p>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1  z-50 bg-white dark:bg-[#26334A] border border-gray-300  shadow-md">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => selectLanguage(language)}
              className={`flex items-center  w-full px-4 py-2  hover:bg-gray-100 ${
                language.code === selectedLanguage.code
                  ? "bg-gray-200 dark:bg-[#4c5b75] text-black dark:text-white"
                  : "bg-white dark:bg-[#26334A] text-black dark:text-white"
              }`}
            >
              <span className="text-sm uppercase">{language.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
