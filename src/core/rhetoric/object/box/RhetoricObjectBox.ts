import { Vector3 } from "three";
import { RhetoricObject, rhetoricObjectType } from "../RhetoricObject";

export class RhetoricObjectBox extends RhetoricObject {
  constructor(position: Vector3 = new Vector3(0, 0, 0)) {
    super(rhetoricObjectType.box, position);
  }
}
