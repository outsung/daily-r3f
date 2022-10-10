import { useR3fObjectStore, useUserStore } from "@/store/rhetoric";
import { R3fObjectBox, R3fObjectModel } from "@/types/r3fObject";
import { WebRTCEvent, WebRTCEventUnion } from "@/types/webRTC";
import { Euler, Vector3 } from "three";

// data -> json.parse -> check 이후 호출 될 webRTC 리스너
export function useOnMessage() {
  const onUserEnter = useOnUserEnter();
  const onUserLeave = useOnUserLeave();
  const onUserCameraMove = useOnUserCameraMove();
  const onUserMouseMove = useOnUserMouseMove();
  const onUserR3fObjectFocus = useOnUserR3fObjectFocus();
  const onR3fObjectCreate = useOnR3fObjectCreate();
  const onR3fObjectDelete = useOnR3fObjectDelete();
  const onR3fObjectTransformPosition = useOnR3fObjectTransformPosition();

  return (data: string) => {
    try {
      const {
        eventName,
        payload,
      }: { eventName: WebRTCEventUnion; payload: any } = JSON.parse(data);

      switch (eventName) {
        case "userEnter":
          onUserEnter(payload);
          break;
        case "userLeave":
          onUserLeave(payload);
          break;
        case "userCameraMove":
          onUserCameraMove(payload);
          break;
        case "userMouseMove":
          onUserMouseMove(payload);
          break;
        case "userR3fObjectFocus":
          onUserR3fObjectFocus(payload);
          break;
        case "r3fObjectCreate":
          onR3fObjectCreate(payload);
          break;
        case "r3fObjectDelete":
          onR3fObjectDelete(payload);
          break;
        case "r3fObjectTransformPosition":
          onR3fObjectTransformPosition(payload);
          break;

        default:
          console.log("error", "Wrong event of webRTC: ", eventName);
      }
    } catch (error) {
      console.log("error", "Wrong event of webRTC!");
    }
  };
}

function useOnUserEnter() {
  const add = useUserStore((state) => state.add);

  return ({ name, userId }: WebRTCEvent["userEnter"]) => {
    add({
      user: {
        id: userId,
        name,
        rotation: new Euler(0, 0, 0),
        position: new Vector3(0, 0, 5),
        handPosition: new Vector3(0.3, 0.1, 4),
        focusedR3fObjectIds: [],
      },
    });
  };
}

function useOnUserLeave() {
  const deleteById = useUserStore((state) => state.deleteById);

  return ({ userId }: WebRTCEvent["userLeave"]) => {
    deleteById({ userId });
  };
}

function useOnUserCameraMove() {
  const moveById = useUserStore((state) => state.moveById);

  return ({ userId, position, rotation }: WebRTCEvent["userCameraMove"]) => {
    moveById({
      userId,
      position: new Vector3(...position),
      rotation: new Euler(...rotation),
    });
  };
}

function useOnUserMouseMove() {
  const handMoveById = useUserStore((state) => state.handMoveById);

  return ({ userId, handPosition }: WebRTCEvent["userMouseMove"]) => {
    handMoveById({ userId, handPosition: new Vector3(...handPosition) });
  };
}

function useOnUserR3fObjectFocus() {
  const focusR3fObjectById = useUserStore((state) => state.focusR3fObjectById);

  return ({ userId, r3fObjectId }: WebRTCEvent["userR3fObjectFocus"]) => {
    focusR3fObjectById({ userId, r3fObjectId });
  };
}

function useOnR3fObjectCreate() {
  const add = useR3fObjectStore((state) => state.add);

  return ({
    r3fObjectId,
    type,
    groupString,
  }: WebRTCEvent["r3fObjectCreate"]) => {
    console.log("onmessage ! , ", { r3fObjectId, type, groupString });
    add({
      r3fObject:
        type === "box"
          ? new R3fObjectBox({
              id: r3fObjectId,
              position: new Vector3(0, 0, 0),
            })
          : new R3fObjectModel({
              id: r3fObjectId,
              position: new Vector3(0, 0, 0),
              group: groupString,
            }),
    });
  };
}

function useOnR3fObjectDelete() {
  const deleteById = useR3fObjectStore((state) => state.deleteById);

  return ({ r3fObjectId }: WebRTCEvent["r3fObjectDelete"]) => {
    deleteById({ r3fObjectId });
  };
}

function useOnR3fObjectTransformPosition() {
  const moveById = useR3fObjectStore((state) => state.moveById);

  return ({
    r3fObjectId,
    position,
  }: WebRTCEvent["r3fObjectTransformPosition"]) => {
    moveById({ r3fObjectId, position: new Vector3(...position) });
  };
}
