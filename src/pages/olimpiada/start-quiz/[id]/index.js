import Dashboard from "@/components/dashboard";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import { get } from "lodash";
import { useRouter } from "next/router";
import parse from "html-react-parser";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isFetching } = useGetQuery({
    key: KEYS.quizTest,
    url: `${URLS.quizTest}/${id}`,
    enabled: !!id,
  });
  return (
    <Dashboard>
      <div className="my-[30px] space-y-[30px]">
        {get(data, "data", []).map((item, index) => (
          <div className="border p-[30px] shadow-md rounded-[8px]" key={index}>
            <div className="text-xl mb-[8px]">
              <p className="mb-[15px]">Savol {index + 1}:</p>
              <div className="text-xl font-semibold mt-[30px]">
                {parse(get(item, "question", ""))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Dashboard>
  );
};

export default Index;
