import { UserCameraShape } from "./UserCameraShape";
import { User } from "@/types/user";
import { stringToColor } from "@/helpers/stringToColor";
import { UserFinger } from "./userFinger";

interface UserItemProps {
  user: User;
}
export function UserItem({ user }: UserItemProps) {
  const color = stringToColor(user.id);

  return (
    <>
      <group key={user.id} position={user.position}>
        <UserCameraShape color={color} />
      </group>
      <UserFinger type={"Sword"} position={user.handPosition} />
    </>
  );
}
