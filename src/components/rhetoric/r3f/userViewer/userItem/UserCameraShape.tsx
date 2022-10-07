import { Sphere } from "@react-three/drei";

interface UserCameraShapeProps {
  color: string;
}
export function UserCameraShape({ color }: UserCameraShapeProps) {
  return (
    <Sphere args={[0.5]}>
      <meshBasicMaterial color={color} />
    </Sphere>
  );
}
