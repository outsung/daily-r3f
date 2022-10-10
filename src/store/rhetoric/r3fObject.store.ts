import { R3fObject, R3fObjectId } from "@/types/r3fObject";
import { Vector3 } from "three";
import create from "zustand";

interface R3fObjectStore {
  // property
  r3fObjectList: R3fObject[];

  // method
  add: (payload: { r3fObject: R3fObject }) => void;
  deleteById: (payload: { r3fObjectId: R3fObjectId }) => void;
  // TODO: changed transform
  moveById: (payload: { r3fObjectId: R3fObjectId; position: Vector3 }) => void;
}

export const useR3fObjectStore = create<R3fObjectStore>((set) => ({
  r3fObjectList: [],

  add: ({ r3fObject }) =>
    set((prev) => ({ r3fObjectList: prev.r3fObjectList.concat(r3fObject) })),
  deleteById: ({ r3fObjectId }) =>
    set((prev) => ({
      r3fObjectList: prev.r3fObjectList.filter(
        (r3fObject) => r3fObject.id !== r3fObjectId
      ),
    })),
  moveById: ({ r3fObjectId, position }) =>
    set((prev) => ({
      r3fObjectList: prev.r3fObjectList.map((r3fObject) =>
        r3fObject.id === r3fObjectId ? { ...r3fObject, position } : r3fObject
      ),
    })),
}));
