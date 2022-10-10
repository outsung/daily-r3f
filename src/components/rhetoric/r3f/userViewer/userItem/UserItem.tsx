import { User } from "@/types/user";
import { stringToColor } from "@/helpers/stringToColor";
import {
  UserItemBody,
  userItemBodyModels,
  UserItemBodyModelType,
} from "./userBody";
import { UserItemHand } from "./userHand";
import {
  getUserInfoByName,
  PredefinedUserName,
} from "@/helpers/rhetoric/getUserInfoByName";

interface UserItemProps {
  user: User;
  index: number;
}
export function UserItem({ user, index }: UserItemProps) {
  const { bodyModel, handModel } = getUserInfoByName(
    user.name as PredefinedUserName
  );

  return (
    <>
      <group key={user.id} position={user.position} rotation={user.rotation}>
        <UserItemBody modelType={bodyModel} />
      </group>
      <UserItemHand modelType={handModel} position={user.handPosition} />
    </>
  );
}
