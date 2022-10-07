import { useR3fObjectStore } from "@/store/rhetoric";
import * as uuid from "uuid";
import { Vector3 } from "three";

export function RhetoricToolbar() {
  const add = useR3fObjectStore((state) => state.add);

  return (
    <div className="absolute flex w-full bottom-4 justify-center">
      <div>
        <div
          className="border-2 border-black rounded p-1 cursor-pointer"
          onClick={() =>
            add({
              r3fObject: {
                id: uuid.v4(),
                name: "box",
                position: new Vector3(0, 0, 0),
              },
            })
          }
        >
          Box
        </div>
      </div>
    </div>
  );
}
