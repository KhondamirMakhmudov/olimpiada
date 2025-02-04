import { useState, useEffect, useContext } from "react";
import Brand from "@/components/brand";
import usePostQuery from "@/hooks/api/usePostQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import storage from "@/services/storage";
import { useRouter } from "next/router";
import { UserProfileContext } from "@/context/responseProvider";
import { get } from "lodash";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const Index = () => {
  const router = useRouter();
  const { phone } = router.query;
  const { setResult } = useContext(UserProfileContext);
  const [code, setCode] = useState(new Array(5).fill(""));
  const [timer, setTimer] = useState(120);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const savedTimer = localStorage.getItem("timer");
    if (savedTimer) {
      setTimer(parseInt(savedTimer, 10));
    }
  }, []);

  useEffect(() => {
    if (!isMounted || timer <= 0) return;

    localStorage.setItem("timer", timer);

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isMounted]);

  const handleChange = (value, index) => {
    if (value.match(/^[0-9]$/)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Focus the next input
      if (index < code.length - 1) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };

  const onSubmit = async () => {
    const formattedPhone = `998${phone.replace(/[^0-9]/g, "")}`;
    const result = await signIn("credentials", {
      phone: formattedPhone,
      sms_code: code.join(""),
      redirect: false, // Prevent automatic redirect
    });

    if (result?.error) {
      toast.error("Invalid credentials");
    } else {
      toast.success("Logged in successfully");
      await router.push(`/dashboard?phone=${phone}`);
    }
  };

  const { mutate: resendSMSCode, isLoading } = usePostQuery({
    listKeyId: KEYS.resendSMSCode,
  });

  const onSubmitResendedCode = () => {
    setTimer(120);
    resendSMSCode(
      {
        url: URLS.resendSMSCode,
        attributes: {
          phone: parseInt(`998${phone.replace(/[^0-9]/g, "")}`),
        },
      },

      {
        onSuccess: (data) => {
          console.log(data);
          toast.success("Logged in successfully");
          router.push(`/auth/recieve-code/${phone}`);
        },
      }
    );
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && code[index] === "") {
      // Focus the previous input
      if (index > 0) {
        document.getElementById(`input-${index - 1}`).focus();
      }
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;

  return (
    <div
      className={
        "flex items-center justify-center min-h-screen bg-center bg-cover bg-no-repeat"
      }
      style={{ backgroundImage: `url(/images/main-bg.jpg)` }}
    >
      <div className="w-[436px] bg-white mx-auto rounded-[8px] p-[30px] ">
        <div className="flex justify-center items-center mb-[30px]">
          <Brand />
        </div>

        <p className="text-sm text-center mt-[30px] mb-[8px]">
          SMS Kodni Kiriting
        </p>

        <div className="border p-[16px]">
          <div className="flex flex-col items-center justify-center ">
            <div className="bg-white p-6 rounded-lg ">
              <div className="flex justify-center space-x-2 mb-6">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ))}
              </div>
              <div className="flex justify-center items-center mb-6">
                <hr className="border-t border-gray-300 flex-grow mx-2" />
                <span className="text-gray-600 text-sm">{formattedTime}</span>
                <hr className="border-t border-gray-300 flex-grow mx-2" />
              </div>
              <button
                onClick={
                  isCodeComplete
                    ? onSubmit
                    : timer === 0
                    ? onSubmitResendedCode
                    : onSubmit
                }
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                {isCodeComplete
                  ? "Tasdiqlash"
                  : timer === 0
                  ? "Sms kodni qayta yuborish"
                  : "TASDIQLASH"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
