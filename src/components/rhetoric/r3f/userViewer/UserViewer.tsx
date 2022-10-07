import { useMyUserHandMove, useMyUserMove } from "@/hooks/rhetoric";
import { useUserStore } from "@/store/rhetoric";
import { UserItem } from "./userItem";

export function UserViewer() {
  useMyUserMove();
  useMyUserHandMove();

  const userList = useUserStore((state) => state.userList);

  return (
    <>
      {userList.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </>
  );
}
