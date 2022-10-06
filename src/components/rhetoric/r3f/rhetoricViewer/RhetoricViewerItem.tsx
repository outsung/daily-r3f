import { Rhetoric } from "@/core/rhetoric/Rhetoric";
import useRhetoricStore from "@/store/rhetoricStore";
import { Box } from "@react-three/drei";
import { TransformContainer } from "../transformContainer";

export function RhetoricViewerItem({ rhetoric }: { rhetoric: Rhetoric }) {
  const setSelectedRhetoricIds = useRhetoricStore(
    (state) => state.setSelectedRhetoricIds
  );
  const selectedRhetoricIds = useRhetoricStore(
    (state) => state.selectedRhetoricIds
  );
  const isSelected = selectedRhetoricIds.includes(rhetoric.id);

  const onClick = (event) => {
    event.stopPropagation();
    setSelectedRhetoricIds([rhetoric.id]);
  };

  return (
    <TransformContainer enabled={isSelected} rhetoric={rhetoric}>
      <Box onClick={onClick}>
        <meshBasicMaterial color={"#72A8A5"} />
      </Box>
    </TransformContainer>
  );
}
