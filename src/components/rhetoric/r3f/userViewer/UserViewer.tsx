import useRhetoricStore from "@/store/rhetoricStore";
import { useEffect } from "react";
import { UserItem } from "./userItem";

export function UserViewer() {
  const users = useRhetoricStore((state) => state.users);

  return (
    <>
      {users
        .filter((user) => user.id !== "my-user")
        .map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
    </>
  );
}
