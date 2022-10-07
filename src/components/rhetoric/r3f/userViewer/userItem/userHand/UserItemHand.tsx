import { GroupProps } from "@react-three/fiber";

import { SwordModel } from "./SwordModel";

export const userItemHandModels = { SwordModel };
export type UserItemHandModelType = keyof typeof userItemHandModels;

interface UserItemHandProps extends GroupProps {
  modelType: UserItemHandModelType;
}
export function UserItemHand({ modelType, ...props }: UserItemHandProps) {
  return userItemHandModels[modelType](props);
}
