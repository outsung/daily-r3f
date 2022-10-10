import { r3fObjectModels } from "@/components/rhetoric/r3f/rhetoricViewer/RhetoricViewerItem";
import { Group, Vector3 } from "three";
import * as uuid from "uuid";

export type R3fObjectId = string;
export class R3fObject {
  id: R3fObjectId;
  name: string;
  position: Vector3;
  type: "box" | "model";

  constructor({
    id,
    name,
    position,
  }: {
    id?: R3fObjectId;
    position: Vector3;
    name: string;
  }) {
    this.id = id || uuid.v4();
    this.name = name;
    this.position = position;
  }
}

export class R3fObjectBox extends R3fObject {
  type: "box";
  constructor({ position, id }: { id?: R3fObjectId; position: Vector3 }) {
    super({ id, position, name: "box" });
    this.type = "box";
  }
}

export class R3fObjectModel extends R3fObject {
  type: "model";
  group: keyof typeof r3fObjectModels;

  constructor({
    id,
    group,
    position,
  }: {
    id?: R3fObjectId;
    position: Vector3;
    group: keyof typeof r3fObjectModels;
  }) {
    super({ id, position, name: "model" });
    this.group = group;
    this.type = "model";
  }
}
