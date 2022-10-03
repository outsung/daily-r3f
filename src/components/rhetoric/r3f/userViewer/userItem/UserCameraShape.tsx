import { User } from "@/store/rhetoricStore";
import { Sphere } from "@react-three/drei";

interface UserCameraShapeProps {
  color: string;
}
export function UserCameraShape({ color }: UserCameraShapeProps) {
  return (
    <Sphere>
      <meshBasicMaterial color={color} />
    </Sphere>
  );
}
