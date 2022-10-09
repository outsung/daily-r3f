import { R3fObject, R3fObjectModel } from "@/types/r3fObject";
import { Box } from "@react-three/drei";

import { TransformContainer } from "../transformContainer";

export function RhetoricViewerItem({ r3fObject }: { r3fObject: R3fObject }) {
  return (
    <TransformContainer r3fObject={r3fObject}>
      {r3fObject.type === "model" ? (
        <primitive object={(r3fObject as R3fObjectModel).group} />
      ) : (
        <Box>
          <meshBasicMaterial color={"#72A8A5"} />
        </Box>
      )}
    </TransformContainer>
  );
}
