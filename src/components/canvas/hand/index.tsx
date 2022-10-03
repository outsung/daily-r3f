import useStore from "@/store/store";
import { useControlDisable } from "@/hooks/useControlDisable";
import Hand from "./hand.circle.model";

/**
 * @summary Hand 카메라로 측정 이후 같이 움직이는 손 제작
 */
const HandComponent = () => {
  useControlDisable();

  const x = 5;

  const hand = useStore((s) => {
    // console.log(handPositions);
    let l, r;
    r = s.handPositions.r
      ? s.handPositions.r.map((p) => [p.x * x, p.y * x, p.z * x * 1.5])
      : undefined;

    l = s.handPositions.l
      ? s.handPositions.l.map((p) => [p.x * x, p.y * x, p.z * x * 1.5])
      : undefined;
    return { r, l };
  });

  return (
    <>
      {hand.r && <Hand position={hand.r} />}
      {hand.l && <Hand position={hand.l} />}

      <directionalLight position={[5, 5, 5]} />
      <ambientLight />
    </>
  );
};

export default HandComponent;
