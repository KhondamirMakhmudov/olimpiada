import Dashboard from "@/components/dashboard";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import Image from "next/image";
import { get } from "lodash";
import dayjs from "dayjs";
import { useRouter } from "next/router";
const Index = () => {
  const router = useRouter();
  const { data, isLoading, isFetching } = useGetQuery({
    key: KEYS.olimpiadaQuizList,
    url: URLS.olimpiadaQuizList,
  });

  console.log(data);

  return (
    <Dashboard>
      <div className="grid grid-cols-12 my-[30px]">
        {get(data, "data", []).map((item) => (
          <div className="col-span-3 p-[30px] shadow-lg rounded-[8px]  ">
            <div>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={"/images/math.png"}
                  alt={"maths"}
                  width={90}
                  height={90}
                />

                <p className="text-xl font-semibold mt-[30px]">
                  {get(item, "name", "")}
                </p>
              </div>

              <div className="grid grid-cols-3 my-[15px]">
                <div className="col-span-1 flex items-baseline gap-x-[12px]">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#539BFF]"></div>
                  <div>
                    <h3 className="text-[#868EAB] text-sm">Bajarish vaqti</h3>
                    <p className="font-semibold text-lg ">
                      {get(item, "duration_in_minutes", "")} minut
                    </p>
                  </div>
                </div>

                <div className="col-span-1 flex items-baseline gap-x-[12px]">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#12DEB9]"></div>
                  <div>
                    <h3 className="text-[#868EAB] text-sm">
                      Boshlangan sanasi
                    </h3>
                    <p className="font-semibold text-lg ">
                      {dayjs(get(item, "start_date", "")).format("DD.MM.YYYY")}{" "}
                    </p>
                  </div>
                </div>

                <div className="col-span-1 flex items-baseline gap-x-[12px]">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#EB0000]"></div>
                  <div>
                    <h3 className="text-[#868EAB] text-sm">
                      Tugaydigan sanasi
                    </h3>
                    <p className="font-semibold text-lg ">
                      {dayjs(get(item, "end_date", "")).format("DD.MM.YYYY")}{" "}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  router.push(`olimpiada/start-quiz/${get(item, "id", [])}`)
                }
                className="py-[8px] w-full bg-[#5D87FF] rounded-[4px] text-white"
              >
                Testni boshlash
              </button>
            </div>
          </div>
        ))}
      </div>
    </Dashboard>
  );
};

export default Index;
