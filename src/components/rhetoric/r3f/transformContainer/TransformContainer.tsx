import Socket from "@/core/socket";
import { useMyUser } from "@/hooks/store/user";
import { useR3fObjectStore, useUserStore } from "@/store/rhetoric";
import { useSocketStore } from "@/store/socket";
import { useWebRTCStore } from "@/store/webRTC";
import { R3fObject, R3fObjectId } from "@/types/r3fObject";
import { TransformControls } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import { notification } from "antd";
import {
  MutableRefObject,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Camera, Group, Object3D, Vector3 } from "three";

interface TransformContainerProps {
  children: ReactElement<Object3D<Event>, string>;
  r3fObject: R3fObject;
}
export function TransformContainer({
  children,
  r3fObject,
}: TransformContainerProps) {
  const mesh = useRef<any>();
  const mySocketId = useSocketStore((state) => state.mySocketId);
  const isSelected = useIsFocusedR3fObject(r3fObject.id);

  const moveById = useR3fObjectStore((state) => state.moveById);
  const send = useWebRTCStore((state) => state.send);

  const isOtherUserFocusedR3fObject = useIsOtherUserFocusedR3fObject(
    r3fObject.id
  );
  const focusR3fObjectById = useUserStore((state) => state.focusR3fObjectById);
  const onClick = useCallback(
    (event) => {
      event.stopPropagation();

      if (!isOtherUserFocusedR3fObject) {
        Socket.emit("r3fObjectFocus", { r3fObjectId: r3fObject.id });
        send({
          eventName: "userR3fObjectFocus",
          payload: { userId: mySocketId, r3fObjectId: r3fObject.id },
        });
        focusR3fObjectById({ r3fObjectId: r3fObject.id, userId: mySocketId });
      } else {
        notification.error({ message: "다른 유저가 선택하고 있습니다." });
      }
    },
    [mySocketId, r3fObject.id, isOtherUserFocusedR3fObject]
  );

  useEffect(() => {
    if (!isSelected) {
      mesh.current.position.set(
        r3fObject.position.x,
        r3fObject.position.y,
        r3fObject.position.z
      );
    }
  }, [r3fObject, isSelected]);

  return useMemo(
    () =>
      isSelected ? (
        <TransformControls
          mode="translate"
          showZ={isSelected}
          showX={isSelected}
          showY={isSelected}
          enabled={isSelected}
          position={r3fObject.position}
          onObjectChange={(e) => {
            const newPosition = new Vector3(
              e.target.positionStart.x + e.target.offset.x,
              e.target.positionStart.y + e.target.offset.y,
              e.target.positionStart.z + e.target.offset.z
            );

            send({
              eventName: "r3fObjectTransformPosition",
              payload: {
                position: [newPosition.x, newPosition.y, newPosition.z],
                r3fObjectId: r3fObject.id,
              },
            });
            moveById({ position: newPosition, r3fObjectId: r3fObject.id });
          }}
        >
          <Select enabled={isSelected}>
            <group onClick={onClick}>{children}</group>
          </Select>
        </TransformControls>
      ) : (
        <group ref={mesh} onClick={onClick}>
          {children}
        </group>
      ),
    [isSelected, onClick, send, moveById]
  );
}

function useIsFocusedR3fObject(r3fObjectId: R3fObjectId) {
  const myUser = useMyUser();
  const isSelected = myUser.focusedR3fObjectIds.includes(r3fObjectId);
  return useMemo(() => isSelected, [isSelected]);
}

function useIsOtherUserFocusedR3fObject(r3fObjectId: R3fObjectId) {
  const myUser = useMyUser();
  const userList = useUserStore((state) => state.userList);

  const isOtherUserFocusedR3fObject = useMemo(() => {
    return Boolean(
      userList
        .filter((user) => user.id !== myUser.id)
        .find((user) => user.focusedR3fObjectIds.includes(r3fObjectId))
    );
  }, [userList, myUser.id, r3fObjectId]);

  return isOtherUserFocusedR3fObject;
}
