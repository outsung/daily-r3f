import { Vector3 } from "three";
import Sword from "./Sword";

export type userFingerType = "Sword";
export function UserFinger({
  type,
  position,
}: {
  type: userFingerType;
  position: Vector3;
}) {
  const FingerComponent = { Sword }[type];

  return (
    <>
      <FingerComponent position={position} />
    </>
  );
}
