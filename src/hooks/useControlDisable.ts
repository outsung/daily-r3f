import { controlRef } from "@/components/layout/canvas";
import { useEffect } from "react";

export function useControlDisable() {
  useEffect(() => {
    controlRef.current.enabled = false;
    controlRef.current.reset();

    return () => {
      controlRef.current.enabled = true;
      controlRef.current.reset();
    };
  }, []);
}
