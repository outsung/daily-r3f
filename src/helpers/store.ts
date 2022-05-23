import create from "zustand";

const useStore = create(() => {
  return {
    handPositions: null,
    router: null,
    dom: null,
  };
});

export default useStore;
