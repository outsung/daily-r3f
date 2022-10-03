import { Vector3 } from "three";
import { Rhetoric, rhetoricType } from "../Rhetoric";

export enum rhetoricObjectType {
  box = "box",
}
export class RhetoricObject extends Rhetoric {
  objectType: rhetoricObjectType;

  constructor(objectType: rhetoricObjectType, position: Vector3) {
    super(rhetoricType.object, position, objectType);

    this.objectType = objectType;
  }
}
