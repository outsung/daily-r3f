import { useR3fObjectStore } from "@/store/rhetoric";
import { useMyUser } from "../user";

export function useMyUserFocusedR3fObjectList() {
  const r3fObjectList = useR3fObjectStore((state) => state.r3fObjectList);
  const myUser = useMyUser();

  return r3fObjectList.filter((r3fObject) =>
    myUser.focusedR3fObjectIds.includes(r3fObject.id)
  );
}
