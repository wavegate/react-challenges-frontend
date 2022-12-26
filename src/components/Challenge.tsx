import useFetch from "../hooks/useFetch";
import { ChallengeType } from "../pages/Challenges";

const Challenge = ({
  challenge,
  deleteChallenge,
}: {
  challenge: ChallengeType;
  deleteChallenge: Function;
}) => {
  const imageUrl = new URL(
    `../assets/${challenge.rank}Medium.png`,
    import.meta.url
  ).href;

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
      {/* <button
        className="border border-black p-2 rounded hover:bg-black hover:cursor-pointer hover:text-white"
        onClick={() => deleteChallenge(challenge._id)}
      >
        Delete Challenge
      </button> */}
    </div>
  );
};

export default Challenge;
