import useRhetoricStore from "@/store/rhetoricStore";

export function useSelectedRhetorics() {
  const selectedRhetoricIds = useRhetoricStore(
    (state) => state.selectedRhetoricIds
  );
  const rhetorics = useRhetoricStore((state) => state.tree);

  return rhetorics.filter((rhetoric) =>
    selectedRhetoricIds.includes(rhetoric.id)
  );
}
