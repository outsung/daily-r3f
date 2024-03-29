import { Euler, Vector3 } from "three";
import { R3fObjectId } from "../r3fObject";

export type UserId = string;
export interface User {
  id: UserId;
  name: string;
  position: Vector3;
  rotation: Euler;
  handPosition: Vector3;
  focusedR3fObjectIds: R3fObjectId[];
}
