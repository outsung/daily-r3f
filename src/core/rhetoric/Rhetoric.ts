import { Vector3 } from "@react-three/fiber";
import * as uuid from "uuid";

export enum rhetoricType {
  object = "object",
  group = "group",
}
export type rhetoricId = string;
export class Rhetoric {
  id: rhetoricId;
  type: rhetoricType;
  name: string;
  position: Vector3;

  constructor(type: rhetoricType, position: Vector3, name: string) {
    this.id = uuid.v4();
    this.name = name;
    this.position = position;
    this.type = type;
  }
}
