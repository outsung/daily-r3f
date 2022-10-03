import useRhetoricStore from "@/store/rhetoricStore";
import { Vector3 } from "three";

export function RhetoricToolbar() {
  const addBox = useRhetoricStore((state) => state.addBox);
  const addBoxByPosition = useRhetoricStore((state) => state.addBoxByPosition);

  return (
    <div className="absolute flex w-full bottom-4 justify-center">
      <div>
        <div
          className="border-2 border-black rounded p-1 cursor-pointer"
          onClick={() => addBox()}
        >
          addBox 1
        </div>
        <div
          className="border-2 border-black rounded p-1 cursor-pointer"
          onClick={() => addBoxByPosition(new Vector3(1, 1, 1))}
        >
          addBoxByPosition
        </div>
      </div>
    </div>
  );
}
