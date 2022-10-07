import { GroupProps } from "@react-three/fiber";

import { WitchModel } from "./WitchModel";
import { BearModel } from "./BearModel";
import { DuckModel } from "./DuckModel";
import { DogModel } from "./DogModel";

export const userItemBodyModels = {
  WitchModel,
  BearModel,
  DuckModel,
  DogModel,
};
export type UserItemBodyModelType = keyof typeof userItemBodyModels;

interface UserItemBodyProps extends GroupProps {
  modelType: UserItemBodyModelType;
}
export function UserItemBody({ modelType, ...props }: UserItemBodyProps) {
  return userItemBodyModels[modelType](props);
}
