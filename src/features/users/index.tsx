import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/users";
import UserDetail from "./UserDetail";

export type UserType = {
  email: string;
  _id: string;
};

export default function UsersIndex() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <div className={`flex flex-col gap-4`}>
      {isLoading && <div>"Loading..."</div>}

      {error instanceof Error && (
        <div>`An error has occurred: ${error.message}`</div>
      )}

      <div className={`flex flex-col gap-4`}>
        {data &&
          data.users.map((user: UserType) => {
            return <UserDetail user={user} key={user._id} />;
          })}
      </div>
    </div>
  );
}
