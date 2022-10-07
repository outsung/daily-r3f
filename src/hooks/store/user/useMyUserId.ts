import { useEffect, useMemo } from "react";
import { useMyUser } from "./useMyUser";

export function useMyUserId() {
  const myUser = useMyUser();

  return useMemo(() => myUser.id, [myUser.id]);
}
