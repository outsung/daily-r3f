import create from "zustand";

const useStore = create(() => {
  return {
    handPositions: { l: null, r: null },
    router: null,
    dom: null,
  };
});

export default useStore;
