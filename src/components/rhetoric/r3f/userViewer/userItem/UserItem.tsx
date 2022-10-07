import { User } from "@/types/user";
import { stringToColor } from "@/helpers/stringToColor";
import {
  UserItemBody,
  userItemBodyModels,
  UserItemBodyModelType,
} from "./userBody";
import { UserItemHand } from "./userHand";
import { UserCameraShape } from "./UserCameraShape";

interface UserItemProps {
  user: User;
  index: number;
}
export function UserItem({ user, index }: UserItemProps) {
  const color = stringToColor(user.id);

  return (
    <>
      <group key={user.id} position={user.position}>
        {/* <UserCameraShape color={color} /> */}
        <UserItemBody
          modelType={
            Object.keys(userItemBodyModels)[
              index % Object.keys(userItemBodyModels).length
            ] as UserItemBodyModelType
          }
        />
      </group>
      <UserItemHand modelType="SwordModel" position={user.handPosition} />
    </>
  );
}
