import { forwardRef, Suspense } from "react";
import {
  EffectComposer,
  Outline,
  Selection,
  SMAA,
  SSAO,
} from "@react-three/postprocessing";

import { DefaultGizmoHelper } from "./gizmoHelper";
import { RhetoricViewer } from "./rhetoricViewer";
import { UserViewer } from "./userViewer";

interface RhetoricR3fProps {}
export interface RhetoricR3fRef {}
const RhetoricR3f = forwardRef<RhetoricR3fRef, RhetoricR3fProps>(
  (props, ref) => {
    return (
      <>
        <Suspense fallback={null}>
          <Selection>
            <UserViewer />
            <RhetoricViewer />

            <EffectComposer multisampling={0} autoClear={false}>
              <SSAO
                radius={0.05}
                intensity={150}
                luminanceInfluence={0.5}
                color="black"
              />
              <Outline
                visibleEdgeColor={0xffffff}
                hiddenEdgeColor={0xffffff}
                blur
                edgeStrength={100}
              />
              {/* <SMAA /> */}
            </EffectComposer>
          </Selection>
        </Suspense>
        <DefaultGizmoHelper />
      </>
    );
  }
);
export default RhetoricR3f;
