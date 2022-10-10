import { useUserStore } from "@/store/rhetoric";
import { useSocketStore } from "@/store/socket";

export function useMyUser() {
  const userList = useUserStore((state) => state.userList);
  const mySocketId = useSocketStore((state) => state.mySocketId);

  return (
    userList.find((user) => user.id === mySocketId) || {
      id: null,
      focusedR3fObjectIds: [],
    }
  );
}
