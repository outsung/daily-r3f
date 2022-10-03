import { UserFinger } from "./userFinger";
import { UserCameraShape } from "./UserCameraShape";
import { User } from "@/store/rhetoricStore";
import { useEffect, useRef } from "react";
import { GroupProps } from "@react-three/fiber";
import { Vector3 } from "three";

interface UserItemProps {
  user: User;
}
export function UserItem({ user }: UserItemProps) {
  return (
    <group
      key={user.id}
      position={new Vector3(user.position.x, user.position.y, user.position.z)}
    >
      <UserCameraShape color={user.color} />
      <UserFinger type={user.finger} />
    </group>
  );
}
