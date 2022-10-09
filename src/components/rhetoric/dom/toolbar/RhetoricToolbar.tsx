import { useR3fObjectStore } from "@/store/rhetoric";
import * as uuid from "uuid";
import { Group, LoaderUtils, Vector3 } from "three";
import { useWebRTCStore } from "@/store/webRTC";
import { RhetoricToolbarItem } from "./RhetoricToolbarItem";
import { useRef } from "react";
import { useR3fObjectUpload } from "@/hooks/rhetoric/useR3fObjectUpload";
import { R3fObjectBox, R3fObjectModel } from "@/types/r3fObject";

export function RhetoricToolbar() {
  const add = useR3fObjectStore((state) => state.add);
  const send = useWebRTCStore((state) => state.send);

  const onAddBox = () => {
    const id = uuid.v4();
    send({
      eventName: "r3fObjectCreate",
      payload: { r3fObjectId: id, type: "box" },
    });
    add({
      r3fObject: new R3fObjectBox({ id, position: new Vector3(0, 0, 0) }),
    });
  };

  const onAddModel = (group: Group) => {
    const id = uuid.v4();
    console.log("send", send, JSON.stringify(group));
    send({
      eventName: "r3fObjectCreate",
      payload: {
        r3fObjectId: id,
        type: "model",
        groupString: JSON.stringify(group),
      },
    });
    add({
      r3fObject: new R3fObjectModel({
        id,
        group,
        position: new Vector3(0, 0, 0),
      }),
    });
  };

  const { R3fObjectUploadInput, onClick } = useR3fObjectUpload(onAddModel);

  return (
    <div className="absolute flex w-full bottom-4 justify-center">
      <R3fObjectUploadInput />
      <div className="flex flex-row">
        <RhetoricToolbarItem onClick={onAddBox} title="박스 생성" />
        <RhetoricToolbarItem onClick={onClick} title="업로드" />
      </div>
    </div>
  );
}

{
  /* <group ref={ref} scale={0.005}>
<primitive object={model} />
</group> */
}
