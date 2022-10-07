import { Vector3 } from "three";
import * as uuid from "uuid";

export type R3fObjectId = string;
export class R3fObject {
  id: R3fObjectId;
  name: string;
  position: Vector3;

  constructor(position: Vector3, name: string) {
    this.id = uuid.v4();
    this.name = name;
    this.position = position;
  }
}

export class R3fObjectBox extends R3fObject {
  constructor(position: Vector3) {
    super(position, "box");
  }
}
