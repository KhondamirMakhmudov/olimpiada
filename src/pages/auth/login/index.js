import Brand from "@/components/brand";
import InternationalPhoneInput from "@/components/phone-number";
import Link from "next/link";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const Login = () => {
  const [tab, setTab] = useState("login");
  const [phone, setPhone] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleTab = (tab) => {
    setTab(tab);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <div
        className={" h-screen bg-center bg-cover"}
        style={{ backgroundImage: `url(/images/bg-auth.png)` }}
      >
        <div
          className={
            "w-[436px] h-[506px] bg-white mx-auto translate-y-1/2 rounded-[8px] p-[30px]"
          }
        >
          <div className="translate-x-1/4 mb-[30px]">
            <Brand />
          </div>

          <div className="w-full">
            <div className="flex">
              <button
                onClick={() => handleTab("login")}
                className={`py-[8px] px-[16px]  w-1/3  ${
                  tab === "login"
                    ? "bg-[#5D87FF] text-white"
                    : "text-[#5A6A85] bg-transparent"
                } rounded-[4px] active:scale-90 scale-100 transition-all duration-300`}
              >
                Kirish
              </button>

              <button
                onClick={() => handleTab("register")}
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
              <form className="space-y-[20px] border p-[16px] rounded-[4px]">
                <div>
                  <p className="mb-[8px] text-sm text-[#2A3547] font-semibold">
                    Telefon raqam
                  </p>
                  <PhoneInput
                    defaultCountry="uz"
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                  />
                </div>

                <div className="">
                  <p className="mb-[8px] text-sm text-[#2A3547] font-semibold">
                    Parol
                  </p>

                  <input
                    type="password"
                    className="border border-[#EAEFF4] rounded-[8px] w-full px-[8px] py-[8px]"
                  />
                </div>

                <div className="mt-[20px] flex justify-between">
                  <label class="custom-checkbox flex gap-x-[10px] items-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />{" "}
                    <span className="checkmark"></span>
                    <p className="text-sm text-dark">Eslab qolsin</p>
                  </label>

                  <Link
                    href={"/auth/forget-password"}
                    className="text-[#5D87FF] font-medium"
                  >
                    Parolni unitdingizmi ?
                  </Link>
                </div>

                <button className="bg-[#5D87FF] text-white py-[8px] px-[16px] w-full rounded-[4px]">
                  Kirish
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
