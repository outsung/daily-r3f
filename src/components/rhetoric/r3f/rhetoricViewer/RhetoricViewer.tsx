import { RhetoricViewerItem } from "./RhetoricViewerItem";
import { useMemo } from "react";
import { useR3fObjectStore } from "@/store/rhetoric";

export function RhetoricViewer() {
  const r3fObjectList = useR3fObjectStore((state) => state.r3fObjectList);

  return (
    <>
      {r3fObjectList.map((r3fObject) => (
        <RhetoricViewerItem key={r3fObject.id} r3fObject={r3fObject} />
      ))}
    </>
  );
}
