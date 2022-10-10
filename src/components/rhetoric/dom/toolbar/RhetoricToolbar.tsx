import { useR3fObjectStore } from "@/store/rhetoric";
import * as uuid from "uuid";
import { Vector3 } from "three";
import { useWebRTCStore } from "@/store/webRTC";
import { RhetoricToolbarItem } from "./RhetoricToolbarItem";
import { R3fObjectBox, R3fObjectModel } from "@/types/r3fObject";
import Socket from "@/core/socket";

export function RhetoricToolbar() {
  const add = useR3fObjectStore((state) => state.add);
  const send = useWebRTCStore((state) => state.send);

  const onAddBox = () => {
    const id = uuid.v4();
    Socket.emit("r3fObjectCreate", { r3fObjectId: id, type: "box" });
    send({
      eventName: "r3fObjectCreate",
      payload: { r3fObjectId: id, type: "box" },
    });
    add({
      r3fObject: new R3fObjectBox({ id, position: new Vector3(0, 0, 0) }),
    });
  };

  const onAddIceCream = () => {
    const id = uuid.v4();
    Socket.emit("r3fObjectCreate", {
      r3fObjectId: id,
      type: "model",
      groupString: "IceCreamModel",
    });
    send({
      eventName: "r3fObjectCreate",
      payload: { r3fObjectId: id, type: "model", groupString: "IceCreamModel" },
    });
    add({
      r3fObject: new R3fObjectModel({
        id,
        group: "IceCreamModel",
        position: new Vector3(0, 0, 0),
      }),
    });
  };

  return (
    <div className="absolute flex w-full bottom-4 justify-center">
      <div className="flex flex-row">
        <RhetoricToolbarItem onClick={onAddBox} title="박스 생성" />
        <RhetoricToolbarItem onClick={onAddIceCream} title="아이스크림 생성" />
      </div>
    </div>
  );
}
