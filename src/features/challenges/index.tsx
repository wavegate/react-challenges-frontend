import { useQuery } from "@tanstack/react-query";
import { getChallenges } from "../../api/challenges";
import { BACKEND_URL } from "../../constants";
import AddChallengeForm from "./AddChallengeForm";
import ChallengeDetail from "./ChallengeDetail";

export type ChallengeType = {
  name: string;
  rank: string;
  requirements: string[];
  submissions: string[];
  comments: object[];
  index: string;
  source: string;
  _id: string;
};

export default function ChallengesIndex() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["challenges"],
    queryFn: getChallenges,
  });

  function download() {
    const blob = new Blob([JSON.stringify(data)], {
      type: "text/json",
    });
    const a = document.createElement("a");
    a.download = "challenges.json";
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  }

  return (
    <div className={`flex flex-col gap-4`}>
      {isLoading && <div>"Loading..."</div>}

      {error instanceof Error && (
        <div>`An error has occurred: ${error.message}`</div>
      )}

      <div className={`flex flex-col gap-4`}>
        {data &&
          data.challenges.map((challenge: ChallengeType) => {
            return (
              <ChallengeDetail challenge={challenge} key={challenge._id} />
            );
          })}
      </div>
      <button
        onClick={download}
        className={`px-4 py-2 text-white bg-blue-500 rounded-md w-fit`}
      >
        Download all as JSON
      </button>
      <AddChallengeForm />
    </div>
  );
}
