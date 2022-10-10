import { GroupProps } from "@react-three/fiber";

import { CauldronModel } from "./CauldronModel";
import { CornModel } from "./CornModel";
import { WholerHamModel } from "./WholerHamModel";
import { HoneyModel } from "./HoneyModel";
import { SwordModel } from "./SwordModel";

export const userItemHandModels = {
  SwordModel,
  HoneyModel,
  WholerHamModel,
  CornModel,
  CauldronModel,
};
export type UserItemHandModelType = keyof typeof userItemHandModels;

interface UserItemHandProps extends GroupProps {
  modelType: UserItemHandModelType;
}
export function UserItemHand({ modelType, ...props }: UserItemHandProps) {
  return userItemHandModels[modelType](props);
}
