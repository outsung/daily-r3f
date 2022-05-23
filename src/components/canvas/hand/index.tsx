import useStore from "@/helpers/store";
import Hand from "./hand.model";

/**
 * @summary Hand 카메라로 측정 이후 같이 움직이는 손 제작
 */
const HandComponent = () => {
  const x = 0.5;
  const handPositions = useStore((s) => {
    console.log(handPositions);
    return s.handPositions
      ? s.handPositions.map((p) => [p.x * x, p.y * -x, p.z * x])
      : undefined;
  });

  return (
    <>
      <Hand position={handPositions} />
      <directionalLight position={[5, 5, 5]} />
      <ambientLight />
    </>
  );
};

export default HandComponent;
