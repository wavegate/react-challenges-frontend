import { useEffect, useState } from "react";
import Challenge from "../components/Challenge";
import useFetch from "../hooks/useFetch";
import { Dialog, Listbox } from "@headlessui/react";
import { Controller, useController, useForm } from "react-hook-form";
import { convertToRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { BACKEND_URL } from "../constants";

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
    useFetch(`${BACKEND_URL}challenges`);

  useEffect(() => {
    challengesFetch("GET");
  }, []);

  const deleteChallenge = (_id: string) => {
    challengesFetch("DELETE", { _id: _id });
  };

  let [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Simple Form",
      rank: "Bronze",
      index: "0",
      requirements: EditorState.createEmpty(),
    },
  });

  const ranks = [
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Master",
    "Grandmaster",
  ];

  const onSubmit = (data: any) => {
    const currentContent = data.requirements.getCurrentContent();
    data.requirements = convertToRaw(currentContent).blocks[0].text;
    challengesFetch("POST", data);
  };

  return (
    <div className={`container mx-auto mt-4`}>
      <div className="flex flex-col mt-6">
        <div className={`flex flex-col gap-4`}>
          {challengesLoaded ? (
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
        {/* <button
          className="border border-black p-2 rounded w-fit hover:bg-black hover:cursor-pointer hover:text-white"
          onClick={() => setIsOpen(true)}
        >
          Add new challenge
        </button> */}
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-4">
            <Dialog.Title className={`font-medium text-lg mb-4`}>
              Create challenge
            </Dialog.Title>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className={`flex flex-col gap-4`}
            >
              <label htmlFor="index">Index</label>
              <input
                type="text"
                {...register("index")}
                className={`px-4 py-2 border border-black-500 rounded-md focus:outline-none focus:ring focus:border-blue-500`}
              />
              <label htmlFor="name">Name</label>
              <input
                type="text"
                {...register("name")}
                className={`px-4 py-2 border border-black-500 rounded-md focus:outline-none focus:ring focus:border-blue-500`}
              />
              <Controller
                control={control}
                name="rank"
                defaultValue={ranks[0]}
                render={({ field: { value, onChange } }) => {
                  return (
                    <Listbox value={value} onChange={onChange}>
                      <Listbox.Label>Rank:</Listbox.Label>
                      <Listbox.Button>{value}</Listbox.Button>
                      <Listbox.Options>
                        {ranks.map((rank, rankIndex) => (
                          <Listbox.Option key={rankIndex} value={rank}>
                            {rank}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Listbox>
                  );
                }}
              />
              <Controller
                control={control}
                name="requirements"
                render={({ field: { value, onChange } }) => {
                  return <Editor editorState={value} onChange={onChange} />;
                }}
              />
              <button type="submit">Submit</button>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Challenges;
