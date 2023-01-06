import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { UserType } from ".";
import { deleteUser } from "../../api/users";

export default function UserDetail({ user }: { user: UserType }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteUser(user._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  let [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div>
      <h3 className="text-lg font-medium">{user.email}</h3>
      <button
        className="border border-black p-2 rounded hover:bg-black hover:cursor-pointer hover:text-white"
        onClick={() => mutation.mutate()}
      >
        Delete user
      </button>
      {/* <button
        className="border border-black p-2 rounded w-fit hover:bg-black hover:cursor-pointer hover:text-white"
        onClick={() => setIsEditOpen(true)}
      >
        Edit user
      </button>
      {isEditOpen && (
        <EditUserForm
          challenge={challenge}
          setIsEditOpen={setIsEditOpen}
        />
      )} */}
    </div>
  );
}
