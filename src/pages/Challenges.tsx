import { useEffect, useState } from "react";
import Challenge from "../components/Challenge";
import useFetch from "../hooks/useFetch";
import { Dialog, Listbox } from "@headlessui/react";
import { Controller, useController, useForm } from "react-hook-form";
import { convertToRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { BACKEND_URL } from "../constants";
import CreateChallengeModal from "../components/CreateChallengeModal";

export type ChallengeType = {
  name: string;
  rank: string;
  requirements: string[];
  submissions: string[];
  comments: object[];
  index: string;
  _id: string;
};

const Challenges = () => {
  const [challengesResult, challengesError, challengesLoaded, challengesFetch] =
    useFetch(`${BACKEND_URL}/challenges`);

  useEffect(() => {
    challengesFetch("GET");
  }, []);

  const deleteChallenge = (_id: string) => {
    challengesFetch("DELETE", { _id: _id });
  };

  function download() {
    const blob = new Blob([JSON.stringify(challengesResult)], {
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
    <div className={`container mx-auto mt-4`}>
      <div className="flex flex-col mt-6">
        <div className={`flex flex-col gap-4`}>
          {challengesLoaded ? (
            challengesError ||
            challengesResult.challenges.map((challenge: ChallengeType) => {
              return (
                <Challenge
                  challenge={challenge}
                  deleteChallenge={deleteChallenge}
                  key={challenge._id}
                />
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="text-red-700">{challengesError}</div>
      </div>
      {/* <CreateChallengeModal /> */}
      {/* <button onClick={download}>Download</button> */}
    </div>
  );
};

export default Challenges;
