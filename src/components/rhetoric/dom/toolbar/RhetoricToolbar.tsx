import { useR3fObjectStore } from "@/store/rhetoric";
import * as uuid from "uuid";
import { Vector3 } from "three";
import { useWebRTCStore } from "@/store/webRTC";

export function RhetoricToolbar() {
  const add = useR3fObjectStore((state) => state.add);
  const send = useWebRTCStore((state) => state.send);

  return (
    <div className="absolute flex w-full bottom-4 justify-center">
      <div>
        <div
          className="border-2 border-black rounded p-1 cursor-pointer"
          onClick={() => {
            const id = uuid.v4();
            send({
              eventName: "r3fObjectCreate",
              payload: { r3fObjectId: id },
            });
            add({
              r3fObject: { id, name: "box", position: new Vector3(0, 0, 0) },
            });
          }}
        >
          Box
        </div>
      </div>
    </div>
  );
}
