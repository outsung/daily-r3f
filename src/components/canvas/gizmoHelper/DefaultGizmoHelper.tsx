import { GizmoHelper, GizmoViewport } from "@react-three/drei";

// TODO: 기즈모 헬퍼 위치 및 디자인 기획
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
