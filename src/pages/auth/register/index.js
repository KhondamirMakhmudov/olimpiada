import { useRouter } from "next/router";
import Brand from "@/components/brand";
import Image from "next/image";
import { useState } from "react";
import usePostQuery from "@/hooks/api/usePostQuery";
import toast from "react-hot-toast";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { set, useForm } from "react-hook-form";

import "react-international-phone/style.css";

import { data } from "@/data/region";
import storage from "@/services/storage";

const Register = () => {
  const router = useRouter();
  const [tab, setTab] = useState("register");
  const [phone, setPhone] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const regions = data.regions;
  const districts = data.districts;
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);
  // Talim turi
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    "Ta'lim dargohi tanlang"
  );

  //   Kurs turi
  const [dropdownOpenCourse, setDropdownOpenCourse] = useState(false);
  const [selectedOptionCourse, setSelectedOptionCourse] =
    useState("Kurs turi tanlang");

  const options = ["Litsey", "Maktab"];

  const optionsCourse = [
    { id: 1, name: "1-kurs" },
    { id: 2, name: "2-kurs" },
    // { id: 3, name: "3-kurs" },
    { id: 4, name: "10-sinf" },
    { id: 5, name: "11-sinf" },
  ];

  const filteredCourses =
    selectedOption === "Litsey"
      ? optionsCourse.slice(0, 2) // First three objects
      : selectedOption === "Maktab"
      ? optionsCourse.slice(2, 4) // Last two objects
      : [];

  const handleCourseSelect = (course) => {
    setSelectedOptionCourse(course.name);
    setDropdownOpenCourse(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const handleRegionSelect = (regionId) => {
    setSelectedRegion(regionId);
    setSelectedDistrict(null);
    const filterDistricts = districts.filter(
      (district) => district.region_id === regionId
    );
    setFilteredDistricts(filterDistricts);
    setRegionDropdownOpen(false);
  };

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

  const onSubmit = ({ full_name, email, phone, address, brithday }) => {
    let formData = new FormData();
    const formattedPhone = `998${String(phone).replace(/[^0-9]/g, "")}`;
    storage.set("phone", formattedPhone);
    formData.append("full_name", "Khondamir");
    formData.append("email", "xondamir.maxmudov.01@mail.ru");
    formData.append("phone", "998915812109");
    formData.append("region", "9");
    formData.append("districts", "126");
    formData.append("address", "Uyim o'zimni");
    formData.append("brithday", "2010-10-01");
    formData.append("academy_or_school", "Litsey");
    formData.append("class_name", "2-kurs");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
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
          console.log("Error response:", error?.response?.data || error);

          // Xatolikni stringga o'tkazish
          let errorMessage = "Xatolik yuz berdi";

          if (error?.response?.data?.errors) {
            errorMessage = Object.values(error.response.data.errors)
              .flat()
              .join(", ");
          }

          toast.error(errorMessage);
        },
      }
    );
  };

  const storedPhone = storage.get("phone");
  console.log("Stored phone:", storedPhone, typeof storedPhone);

  return (
    <div className="">
      <div
        className={
          "bg-center flex items-center justify-center min-h-screen bg-cover bg-no-repeat"
        }
        style={{ backgroundImage: `url(/images/bg-auth.png)` }}
      >
        <div className="w-[436px] h-auto bg-white  mx-auto rounded-[8px] p-[20px] ">
          <div className="mb-[30px]  text-center">
            <Brand />
          </div>

          <div className="flex">
            <button
              onClick={() => {
                handleTab("login");
                router.push("/");
              }}
              className={`py-[8px] px-[16px]  w-1/3  ${
                tab === "login"
                  ? "bg-[#5D87FF] text-white"
                  : "text-[#5A6A85] bg-transparent"
              } rounded-[4px] text-lg active:scale-90 scale-100 transition-all duration-300`}
            >
              Kirish
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
              Ro&apos;yhatdan o&apos;tish
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
                  placeholder="F.I.SH"
                />
              </div>
              {/* Email */}
              <div className="">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-full px-[8px] py-[8px]"
                  placeholder="Email"
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
                {/* <PhoneInput
                    defaultCountry="uz"
                    value={phone}
                    {...register("phone", { required: true })}
                    onChange={(phone) => setPhone(phone)}
                  /> */}
              </div>
              {/* Birthday */}
              <div className="">
                <input
                  type="date"
                  max="2010-12-31"
                  min="2005-12-31"
                  {...register("brithday", { required: true })}
                  placeholder="Tug'ilgan kun"
                  className="border border-[#EAEFF4] bg-white text-black rounded-[8px] w-full px-[8px] py-[8px]"
                />
              </div>

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

                <div className="relative text-[#2A3547]">
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
                </div>
              </div>

              <div className="">
                <input
                  type="text"
                  {...register("address", { required: true })}
                  className="border border-[#EAEFF4] bg-white text-[#2A3547] rounded-[8px] w-full px-[8px] py-[8px]"
                  placeholder=" Manzil"
                />
              </div>

              <div className="relative text-[#2A3547]">
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

              <div className="relative text-[#2A3547]">
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
              </div>

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
