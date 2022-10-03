import Spatula from "./spatula";
import Sword from "./Sword";

export type userFingerType = "Spatula" | "Sword";
export function UserFinger({ type }: { type: userFingerType }) {
  const FingerComponent = { Spatula, Sword }[type];

  return (
    <>
      <FingerComponent />
    </>
  );
}
