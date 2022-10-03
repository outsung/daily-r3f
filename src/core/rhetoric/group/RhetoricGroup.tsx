import { Vector3 } from "three";
import { Rhetoric, rhetoricType } from "../Rhetoric";

export class RhetoricGroup extends Rhetoric {
  children: Rhetoric[];

  constructor() {
    super(rhetoricType.group, new Vector3(0, 0, 0), "group");
  }
}
