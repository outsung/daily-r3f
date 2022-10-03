import { userFingerType } from "@/components/rhetoric/r3f/userViewer/userItem/userFinger";
import { RhetoricObjectBox } from "@/core/rhetoric/object/box/RhetoricObjectBox";
import { Rhetoric, rhetoricId } from "@/core/rhetoric/Rhetoric";
import { Vector3 } from "three";
import create from "zustand";
import * as uuid from "uuid";

type UserId = string;
export interface User {
  id: UserId;
  color: string;
  position: Vector3;
  rotation: Vector3;
  finger: userFingerType;
  far: 1000;
  filmGauge: 35;
  filmOffset: 0;
  focus: 10;
  fov: 75;
}

interface RhetoricStore {
  setMyUserSend: (setter: (position: [number, number, number]) => void) => void;
  myUserSend: ((position: [number, number, number]) => void) | null;
  users: User[];
  setUsers: (users: User[]) => void;
  setUser: (id: UserId, setter: (tree: User) => User) => void;
  tree: Rhetoric[];
  setTree: (setter: (tree: Rhetoric[]) => Rhetoric[]) => void;
  selectedRhetoricIds: rhetoricId[];
  setSelectedRhetoricIds: (s: rhetoricId[]) => void;
  addBox: () => void;
  addBoxByPosition: (position: Vector3) => void;
  select: (id: rhetoricId) => void;
  changedPosition: (id: rhetoricId, position: Vector3) => void;
}
const useRhetoricStore = create<RhetoricStore>((set) => ({
  setMyUserSend: (setter) => set((state) => (state.myUserSend = setter)),
  myUserSend: null,
  users: [
    // {
    //   finger: "Spatula",
    //   id: "my-user",
    //   color: "#7790D9",
    //   position: new Vector3(
    //     -2.745729861125711,
    //     0.5503359317133887,
    //     4.142233442478578
    //   ),
    //   rotation: new Vector3(
    //     -0.13208654522778093,
    //     -0.5813423481275655,
    //     -0.07283058750225786
    //   ),
    //   far: 1000,
    //   filmGauge: 35,
    //   filmOffset: 0,
    //   focus: 10,
    //   fov: 75,
    // },
    // {
    //   finger: "Spatula",
    //   id: "other-user",
    //   color: "#77D9AA",
    //   position: new Vector3(
    //     2.0358400315863694,
    //     1.9533743591837909,
    //     -4.127915209724441
    //   ),
    //   rotation: new Vector3(
    //     -2.699605100177332,
    //     0.4193512589317756,
    //     2.951248902082444
    //   ),
    //   far: 1000,
    //   filmGauge: 35,
    //   filmOffset: 0,
    //   focus: 10,
    //   fov: 75,
    // },
  ],
  setUsers: (users) => set((state) => ({ ...state, users })),
  setUser: (id, setter) =>
    set((state) => ({
      ...state,
      users: state.users.map((user) => (user.id === id ? setter(user) : user)),
    })),
  tree: [],
  setTree: (setter) => set((state) => ({ ...state, tree: setter(state.tree) })),
  selectedRhetoricIds: [],
  setSelectedRhetoricIds: (s: rhetoricId[]) =>
    set((state) => ({ ...state, selectedRhetoricIds: s })),
  addBoxByPosition: (position: Vector3) =>
    set((state) => ({
      ...state,
      tree: [...state.tree, new RhetoricObjectBox(position)],
    })),
  addBox: () =>
    set((state) => ({
      ...state,
      tree: [...state.tree, new RhetoricObjectBox()],
    })),
  select: (id) =>
    set((state) => ({
      ...state,
      selectedRhetoricIds: [...state.selectedRhetoricIds, id],
    })),
  changedPosition: (id, position) =>
    set((state) => ({
      ...state,
      tree: state.tree.map((t) =>
        t.id === id ? { ...t, position: position } : t
      ),
    })),
}));

export default useRhetoricStore;
