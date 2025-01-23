import { useState, useEffect } from "react";
import Brand from "@/components/brand";
import usePostQuery from "@/hooks/api/usePostQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import storage from "@/services/storage";
import { useRouter } from "next/router";
const Index = () => {
  const router = useRouter();
  const [code, setCode] = useState(new Array(5).fill(""));
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

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

  const { mutate: recieveCode } = usePostQuery({
    listKeyId: KEYS.recieveCode,
  });
  console.log(code);

  const onSubmit = () => {
    recieveCode({
      url: URLS.recieveCode,
      attributes: {
        phone: storage.get("phone"),
        sms_code: code.join(""),
      },
      onSuccess: (data) => {
        router.push("/");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && code[index] === "") {
      // Focus the previous input
      if (index > 0) {
        document.getElementById(`input-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = () => {
    alert(`Verification Code: ${code.join("")}`);
  };
  return (
    <div
      className={
        "flex items-center justify-center min-h-screen bg-center bg-cover bg-no-repeat"
      }
      style={{ backgroundImage: `url(/images/bg-auth.png)` }}
    >
      <div className="w-[436px] bg-white mx-auto rounded-[8px] p-[30px] ">
        <div className="translate-x-1/4 mb-[30px]">
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
                <span className="text-gray-600 text-sm">
                  {`00:${timer < 10 ? `0${timer}` : timer}`}
                </span>
                <hr className="border-t border-gray-300 flex-grow mx-2" />
              </div>
              <button
                onClick={onSubmit}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                disabled={code.includes("") || timer === 0}
              >
                TASDIQLASH
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
