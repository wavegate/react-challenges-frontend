import { Dialog, Listbox } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditorState, convertToRaw, Editor, ContentState } from "draft-js";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ChallengeType } from ".";
import { updateChallenge } from "../../api/challenges";
import MyCKEditor from "../../components/MyCKEditor";
import MyEditor from "../../components/MyEditor";

export default function EditChallengeForm({
  challenge,
  setIsEditOpen,
}: {
  challenge: ChallengeType;
  setIsEditOpen: Function;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => updateChallenge(challenge._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
      setIsEditOpen(false);
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: challenge.name,
      rank: challenge.rank,
      source: challenge.source,
      // requirements: EditorState.createWithContent(
      //   ContentState.createFromText(challenge.requirements.join(";"))
      // ),
      requirements: challenge.requirements.join(";"),
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
    mutation.mutate(data);
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={() => setIsEditOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-4">
            <Dialog.Title className={`font-medium text-lg mb-4`}>
              Edit challenge
            </Dialog.Title>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className={`flex flex-col gap-4`}
            >
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
                      <Listbox.Button
                        className={`px-4 py-2 border border-black-500 rounded-md focus:outline-none focus:ring focus:border-blue-500`}
                      >
                        {value}
                      </Listbox.Button>
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
              <label htmlFor="Requirements">Requirements</label>
              <textarea
                {...register("requirements")}
                className={`px-4 py-2 border border-black-500 rounded-md focus:outline-none focus:ring focus:border-blue-500`}
              />
              {/* <Controller
                control={control}
                name="requirements"
                render={({ field: { value, onChange } }) => {
                  return <Editor editorState={value} onChange={onChange} />;
                }}
              /> */}
              {/* <Controller
                control={control}
                name="requirements"
                render={({ field: { value, onChange } }) => {
                  return <MyCKEditor onChange={onChange} value={value} />;
                }}
              /> */}
              {/* <label htmlFor="source">Source</label>
              <input
                type="text"
                {...register("source")}
                className={`px-4 py-2 border border-black-500 rounded-md focus:outline-none focus:ring focus:border-blue-500`}
              /> */}
              <button
                type="submit"
                className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700`}
              >
                Submit
              </button>
              <button
                onClick={() => setIsEditOpen(false)}
                className={`px-4 py-2 text-blue-500 rounded-md border border-blue-500`}
              >
                Cancel
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
