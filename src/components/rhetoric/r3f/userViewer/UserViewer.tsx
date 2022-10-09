import { useMyUserHandMove, useMyUserMove } from "@/hooks/rhetoric";
import { useMyUser } from "@/hooks/store/user";
import { useUserStore } from "@/store/rhetoric";
import { UserItem } from "./userItem";

export function UserViewer() {
  useMyUserMove();
  // useMyUserHandMove();

  const myUser = useMyUser();
  const userList = useUserStore((state) => state.userList);

  return (
    <>
      {userList
        .filter((user) => user.id !== myUser.id)
        .map((user, index) => (
          <UserItem index={index} key={user.id} user={user} />
        ))}
    </>
  );
}
