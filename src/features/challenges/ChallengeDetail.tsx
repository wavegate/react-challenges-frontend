import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ChallengeType } from ".";
import { deleteChallenge } from "../../api/challenges";
import { BACKEND_URL } from "../../constants";
import EditChallengeForm from "./EditChallengeForm";

export default function ChallengeDetail({
  challenge,
}: {
  challenge: ChallengeType;
}) {
  const queryClient = useQueryClient();

  const imageUrl = new URL(
    `../../assets/${challenge.rank}Medium.png`,
    import.meta.url
  ).href;

  const mutation = useMutation({
    mutationFn: () => deleteChallenge(challenge._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
    },
  });

  let [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div>
      <div
        className={`flex justify-between items-center bg-blue-50 rounded-t-md p-4 text-blue-900`}
      >
        <h3 className="text-lg font-medium">{challenge.name}</h3>

        <div className={`flex items-center gap-4`}>
          <div>Rank: {challenge.rank}</div>
          <img src={imageUrl}></img>
        </div>
      </div>
      <div className={`rounded-b-md bg-gray-50 text-gray-900 p-4`}>
        <div className={`font-medium`}>Requirements:</div>
        <ul>
          {challenge.requirements.map((requirement, index) => {
            return <li key={index}>- {requirement}</li>;
          })}
        </ul>
      </div>
      {/* <div>{challenge.submissions}</div> */}
      {/* <div>{JSON.stringify(challenge.comments)}</div> */}
      <button
        className="border border-black p-2 rounded hover:bg-black hover:cursor-pointer hover:text-white"
        onClick={() => mutation.mutate()}
      >
        Delete challenge
      </button>
      <button
        className="border border-black p-2 rounded w-fit hover:bg-black hover:cursor-pointer hover:text-white"
        onClick={() => setIsEditOpen(true)}
      >
        Edit challenge
      </button>
      {isEditOpen && (
        <EditChallengeForm
          challenge={challenge}
          setIsEditOpen={setIsEditOpen}
        />
      )}
    </div>
  );
}
