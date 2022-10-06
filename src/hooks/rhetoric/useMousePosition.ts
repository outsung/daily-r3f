import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { Ray, Raycaster, Vector3 } from "three";

export function useMousePosition() {
  const { viewport, scene } = useThree();
  // direction

  const [origin, direction] = useMemo(
    () => [new Vector3(0, 0, 0), new Vector3(0, 0, 0)],
    []
  );

  useFrame(({ mouse, camera }) => {
    // console.log(group.current.quaternion);

    // const x = (mouse.x / window.innerWidth) * 2 - 1;
    // const y = -(mouse.y / window.innerHeight) * 2 + 1;
    console.log(mouse.x, mouse.y);

    // const ray = new Ray( );
    // 0,0,0 에서
    origin.setFromMatrixPosition(camera.matrixWorld);
    // this.ray.direction
    direction
      .set(mouse.x, mouse.y, 0.5)
      .unproject(camera)
      .sub(origin)
      .normalize();

    // this.ray.origin.setFromMatrixPosition(camera.matrixWorld);
    // this.ray.direction
    //   .set(coords.x, coords.y, 0.5)
    //   .unproject(camera)
    //   .sub(this.ray.origin)
    //   .normalize();

    // 내 카메라 위치 ->
    // x, y, z
    // console.log(direction);

    const handPosition = camera.position.clone().addScaledVector(direction, 1);
    const test = scene.children.find((c) => c.uuid === "test");
    if (test) {
      test.position.set(handPosition.x, handPosition.y, handPosition.z);
    }

    // rotationEuler.set(y, x, 0);
    // rotationQuaternion.setFromEuler(rotationEuler);
    // // group.current.quaternion.slerp
    // group.current.quaternion.slerp(rotationQuaternion, 0.05);
  });
}
