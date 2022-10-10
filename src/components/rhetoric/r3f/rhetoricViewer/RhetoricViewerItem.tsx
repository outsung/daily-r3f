import { R3fObject, R3fObjectModel } from "@/types/r3fObject";
import { Box } from "@react-three/drei";

import { TransformContainer } from "../transformContainer";

import { IceCreamModel } from "./model";

export const r3fObjectModels = { IceCreamModel };
export function RhetoricViewerItem({ r3fObject }: { r3fObject: R3fObject }) {
  return (
    <TransformContainer r3fObject={r3fObject}>
      {r3fObject.type === "model" ? (
        <IceCreamModel />
      ) : (
        <Box>
          <meshBasicMaterial color={"#72A8A5"} />
        </Box>
      )}
    </TransformContainer>
  );
}
