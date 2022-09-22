import { GizmoHelper, GizmoViewport } from "@react-three/drei";

export default function DefaultGizmoHelper() {
  return (
    <GizmoHelper alignment="bottom-right" margin={[80, 80]} renderPriority={2}>
      <GizmoViewport
        axisColors={["hotpink", "aquamarine", "#3498DB"]}
        labelColor="black"
      />
    </GizmoHelper>
  );
}
