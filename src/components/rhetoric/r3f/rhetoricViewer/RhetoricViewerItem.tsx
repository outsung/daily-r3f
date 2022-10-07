import { useMyUser } from "@/hooks/store/user";
import { useUserStore } from "@/store/rhetoric";
import { R3fObject } from "@/types/r3fObject";
import { Box } from "@react-three/drei";
import { TransformContainer } from "../transformContainer";

export function RhetoricViewerItem({ r3fObject }: { r3fObject: R3fObject }) {
  const focusR3fObjectById = useUserStore((state) => state.focusR3fObjectById);

  const myUser = useMyUser();
  const isSelected = myUser.focusedR3fObjectIds.includes(r3fObject.id);

  const onClick = (event) => {
    event.stopPropagation();
    focusR3fObjectById({ r3fObjectId: r3fObject.id, userId: myUser.id });
  };

  return (
    <TransformContainer enabled={isSelected} r3fObject={r3fObject}>
      <Box onClick={onClick}>
        <meshBasicMaterial color={"#72A8A5"} />
      </Box>
    </TransformContainer>
  );
}
