import { useRouter } from "next/router";
import Brand from "@/components/brand";
import Image from "next/image";
import { useState } from "react";
import usePostQuery from "@/hooks/api/usePostQuery";
import toast from "react-hot-toast";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { useForm } from "react-hook-form";
import { data } from "@/data/region";
import storage from "@/services/storage";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "@/components/language";
import { motion } from "framer-motion";

const Register = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [tab, setTab] = useState("register");
  const [isChecked, setIsChecked] = useState(false);
  const regions = data.regions;
  const districts = data.districts;
  const [submitError, setSubmitError] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    "Ta'lim dargohi tanlang"
  );

  const [dropdownOpenCourse, setDropdownOpenCourse] = useState(false);
  const [selectedOptionCourse, setSelectedOptionCourse] =
    useState("Kurs/Sinf/Bitirgan");
  const [dropdownselectedDocument, setDropdownSelectedDocument] =
    useState(false);
  const [selectedDocument, setSelectedDocument] = useState(
    `${t("selectTypeOfPassport")}`
  );

  const optionDocument = [t("certificate"), "Passport"];
  const options = ["Litsey", "Maktab", "Bitirgan"];
  const optionsCourse = [
    { id: 1, name: "1-kurs" },
    { id: 2, name: "2-kurs" },
    { id: 3, name: "10-sinf" },
    { id: 4, name: "11-sinf" },
    { id: 5, name: "Bitirgan" },
  ];

  const filteredCourses =
    selectedOption === "Litsey"
      ? optionsCourse.slice(0, 2)
      : selectedOption === "Maktab"
      ? optionsCourse.slice(2, 4)
      : selectedOption === "Bitirgan"
      ? optionsCourse.slice(4, 6)
      : [];

  // litsey yoki maktabni tanlash
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };
  // kursni tanlash
  const handleCourseSelect = (course) => {
    setSelectedOptionCourse(course.name);
    setDropdownOpenCourse(false);
  };
  // passport
  const handleSelectedDocument = (document) => {
    setSelectedDocument(document);
    setDropdownSelectedDocument(false);
  };
  // viloyatni tanlash
  const handleRegionSelect = (regionId) => {
    setSelectedRegion(regionId);
    setSelectedDistrict(null);
    const filterDistricts = districts.filter(
      (district) => district.region_id === regionId
    );
    setFilteredDistricts(filterDistricts);
    setRegionDropdownOpen(false);
  };
  // hududni tanlash
  const handleDistrictSelect = (districtId) => {
    setSelectedDistrict(districtId);
    setDistrictDropdownOpen(false);
  };

  const toggleDistrictDropdown = () => {
    if (filteredDistricts.length) {
      setDistrictDropdownOpen((prev) => !prev);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleTab = (tab) => {
    setTab(tab);
  };

  const selectedRegionName =
    regions.find((r) => r.id === selectedRegion)?.name || "Viloyatni tanlang";
  const selectedDistrictName =
    filteredDistricts.find((d) => d.id === selectedDistrict)?.name ||
    (filteredDistricts.length ? "Hududni tanlang" : "Hudud mavjud emas");

  const { mutate: registerRequest, isLoading } = usePostQuery({
    listKeyId: KEYS.register,
  });

  const onSubmit = ({
    full_name,
    email,
    phone,
    address,
    brithday,
    document,
  }) => {
    let formData = new FormData();
    storage.set("phone", `${String(998) + String(phone)}`);
    formData.append("full_name", full_name);
    formData.append("email", email);
    formData.append("phone", `${String(998) + String(phone)}`);
    formData.append("region", selectedRegion);
    formData.append("districts", selectedDistrict);
    formData.append("address", address);
    formData.append("brithday", brithday);
    formData.append("academy_or_school", selectedOption);
    formData.append("class_name", selectedOptionCourse);
    formData.append("document_type", selectedDocument),
      formData.append("document", document),
      registerRequest(
        {
          url: URLS.register,
          attributes: formData,
        },
        {
          onSuccess: (data) => {
            console.log(data);
            toast.success("Logged in successfully");
            router.push("/auth/recieve-code");
          },
          onError: (error) => {
            console.log(error);
            const errorMessage =
              error.response?.data?.errors?.phone?.[0] || "An error occurred";
            setSubmitError(errorMessage);
          },
        }
      );
  };

  return (
    <div className="">
      <div className="absolute right-4 top-4">
        <LanguageDropdown />
      </div>
      <div
        className={
          "bg-center flex items-center justify-center min-h-screen bg-cover bg-no-repeat"
        }
        style={{ backgroundImage: `url(/images/main-bg.jpg)` }}
      >
        <div className="w-[436px] h-auto bg-white  mx-auto rounded-[8px] p-[20px] ">
          <div className="mb-[30px]  text-center">
            <Brand />
          </div>

          <div className="flex">
            {submitError}
            <button
              onClick={() => {
                handleTab("login");
                router.push("/");
              }}
              className={`py-[8px] px-[16px]  w-1/3  ${
                tab === "login"
                  ? "bg-[#5D87FF] text-white"
                  : "text-[#5A6A85] bg-transparent"
              } rounded-[4px] capitalize text-lg active:scale-90 scale-100 transition-all duration-300`}
            >
              {t("login")}
            </button>

            <button
              onClick={() => {
                handleTab("register");
                router.push("/auth/register");
              }}
              className={`py-[8px] px-[16px]  w-2/3  ${
                tab === "register"
                  ? "bg-[#5D87FF] text-white"
                  : "text-[#5A6A85] bg-transparent"
              } rounded-[4px] active:scale-90 scale-100 transition-all duration-300`}
            >
              {t("sign in")}
            </button>
          </div>

          <div className="w-full mt-[30px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-[10px] border p-[16px] rounded-[4px]"
            >
              {/* Ism */}
              <div className="">
                <input
                  type="text"
                  {...register("full_name", { required: true })}
                  className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-full px-[8px] py-[8px]"
                  placeholder={`${t("full name")}`}
                />
              </div>
              {/* Email */}
              <div className="">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-full px-[8px] py-[8px]"
                  placeholder={`${t("email")}`}
                />
              </div>
              {/* Telefon raqam */}
              <div>
                <div className="border border-[#EAEFF4] flex gap-x-[10px] items-center rounded-[8px] px-[8px] ">
                  <Image
                    src={"/icons/uzb-flag.svg"}
                    alt="flag"
                    width={30}
                    height={30}
                  />

                  <div className="w-[1px] h-[40px] bg-[#EAEFF4]  "></div>
                  <span className="text-[#2A3547] text-sm">+998</span>
                  <input
                    type="tel"
                    maxLength="9"
                    {...register("phone", { required: true })}
                    className="  w-full text-sm bg-white text-[#2A3547] py-[9px] pl-[5px]"
                    placeholder="331234678"
                  />
                </div>
              </div>
              {/* Birthday */}
              <div className="">
                <p className="text-sm text-gray-400 mb-1">
                  Tug&apos;ilgan sanasi
                </p>
                <input
                  type="date"
                  max="2010-12-31"
                  min="2005-12-31"
                  {...register("brithday", { required: true })}
                  placeholder="Tug'ilgan kun"
                  className="border border-[#EAEFF4] bg-white text-black rounded-[8px] w-full px-[8px] py-[8px]"
                />
              </div>

              {/* Passport yoki guvohnoma */}

              <div className="relative text-[#2A3547] cursor-pointer">
                <div
                  onClick={() => setDropdownSelectedDocument((prev) => !prev)}
                  className="w-full  px-4 py-2 border border-[#EAEFF4] text-[#2A3547] rounded-md bg-white focus:outline-none flex items-center justify-between"
                >
                  <span>{selectedDocument}</span>
                  <svg
                    className={`w-5 h-5 transform ${
                      dropdownselectedDocument ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {dropdownselectedDocument && (
                  <ul className="absolute w-full mt-1 bg-white text-[#2A3547] border border-gray-300 rounded-md shadow-md z-10">
                    {optionDocument.map((option, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelectedDocument(option)}
                      >
                        {t(option)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {selectedDocument === `${t("selectTypeOfPassport")}` ? (
                ""
              ) : (
                <motion.div
                  initial={{ opacity: 0, translateY: "30px" }}
                  animate={{ opacity: 1, translateY: "0px" }}
                  transition={{ duration: 0.2 }}
                  className=""
                >
                  <input
                    type="text"
                    {...register("document", { required: true })}
                    className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-full px-[8px] py-[8px]"
                    placeholder={`${t("enter details of passport")}`}
                  />
                </motion.div>
              )}

              <div className="space-y-4 text-[#2A3547]">
                <div className="relative">
                  <div
                    onClick={() => setRegionDropdownOpen((prev) => !prev)}
                    className="w-full  border border-[#EAEFF4] px-4 py-2 rounded-md bg-white cursor-pointer flex justify-between items-center"
                  >
                    <p className="text-[#2A3547]">
                      {selectedRegionName || "Viloyat"}
                    </p>
                    <svg
                      className={`w-5 h-5 transform duration-200 ${
                        regionDropdownOpen ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  {regionDropdownOpen && (
                    <div className="absolute z-50 -top-[370px] mt-1 w-full bg-white border h-[400px] overflow-y-scroll rounded-md shadow-md">
                      {regions.map((region) => (
                        <div
                          key={region.id}
                          className="px-4 py-2 hover:bg-gray-100 text-[#2A3547] cursor-pointer"
                          onClick={() => handleRegionSelect(region.id)}
                        >
                          {region.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {selectedRegion === null ? (
                  ""
                ) : (
                  <motion.div
                    initial={{ opacity: 0, translateY: "30px" }}
                    animate={{ opacity: 1, translateY: "0px" }}
                    transition={{ duration: 0.3 }}
                    className="relative text-[#2A3547]"
                  >
                    <div
                      onClick={toggleDistrictDropdown}
                      className={`w-full  border border-[#EAEFF4] px-4 py-2 rounded-md bg-white flex justify-between items-center ${
                        !filteredDistricts.length ? "cursor-not-allowed" : ""
                      }`}
                      disabled={!filteredDistricts.length}
                    >
                      <p className="text-[text-[#2A3547]]">
                        {selectedDistrictName}
                      </p>
                      <svg
                        className={`w-5 h-5 transform duration-200 ${
                          districtDropdownOpen ? "rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    {districtDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-md max-h-60 overflow-y-auto">
                        {filteredDistricts.map((district) => (
                          <div
                            key={district.id}
                            className="px-4 py-2 hover:bg-gray-100 text-[#2A3547] cursor-pointer"
                            onClick={() => handleDistrictSelect(district.id)}
                          >
                            {district.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
              {/* Manzil */}
              <div className="">
                <input
                  type="text"
                  {...register("address", { required: true })}
                  className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-full px-[8px] py-[8px]"
                  placeholder={`${t("address")}`}
                />
              </div>
              {/* Ta'lim dargohi */}
              <div className="relative text-[#2A3547] cursor-pointer">
                <div
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="w-full  px-4 py-2 border border-[#EAEFF4] text-[#2A3547] rounded-md bg-white focus:outline-none flex items-center justify-between"
                >
                  <span>{selectedOption}</span>
                  <svg
                    className={`w-5 h-5 transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {dropdownOpen && (
                  <ul className="absolute w-full mt-1 bg-white text-[#2A3547] border border-gray-300 rounded-md shadow-md z-10">
                    {options.map((option, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {selectedOption === "Ta'lim dargohi tanlang" ? (
                ""
              ) : (
                <motion.div
                  initial={{ opacity: 0, translateY: "30px" }}
                  animate={{ opacity: 1, translateY: "0px" }}
                  transition={{ duration: 0.3 }}
                  className="relative text-[#2A3547] cursor-pointer"
                >
                  <div
                    onClick={() => setDropdownOpenCourse((prev) => !prev)}
                    className="w-full text-left px-4 py-2 border border-[#EAEFF4] rounded-md bg-white focus:outline-none flex items-center justify-between"
                  >
                    <span>{selectedOptionCourse}</span>
                    <svg
                      className={`w-5 h-5 transform ${
                        dropdownOpenCourse ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {/* Dropdown options */}
                  {dropdownOpenCourse && (
                    <ul className="absolute w-full -top-[90px] bg-white border border-gray-300 rounded-md shadow-md z-50">
                      {filteredCourses.map((option, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleCourseSelect(option)}
                        >
                          {option.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}

              <button className="bg-[#5D87FF] text-white py-[8px] px-[16px] w-full rounded-[4px]">
                Kirish
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
