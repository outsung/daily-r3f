import { rhetoricId } from "@/core/rhetoric/Rhetoric";
import useRhetoricStore from "@/store/rhetoricStore";

export function useRhetoricById(id: rhetoricId) {
  const rhetorics = useRhetoricStore((state) => state.tree);

  return rhetorics.find((rhetoric) => id === rhetoric.id);
}
