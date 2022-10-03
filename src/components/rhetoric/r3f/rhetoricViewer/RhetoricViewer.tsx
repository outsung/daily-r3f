import useRhetoricStore from "@/store/rhetoricStore";
import { RhetoricViewerItem } from "./RhetoricViewerItem";
import { TransformContainer } from "../transformContainer";
import { TransformControls } from "@react-three/drei";
import { useMemo } from "react";

export function RhetoricViewer() {
  const tree = useRhetoricStore((state) => state.tree);

  return (
    <>
      {useMemo(
        () =>
          tree.map((rhetoric) => (
            <RhetoricViewerItem key={rhetoric.id} rhetoric={rhetoric} />
          )),
        [tree.length]
      )}
    </>
  );
}
