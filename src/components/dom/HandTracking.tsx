import useCheckSupportedDevices from "@/helpers/checkSupportedDevices";
import useStore from "@/helpers/store";
import { useEffect, useRef, useState } from "react";
import { SetState } from "zustand";

const HandTracking = () => {
  const handPositions = useStore((s) => s.handPositions);
  const ref = useRef();

  useCheckSupportedDevices();

  const onResults = (props) => {
    useStore.setState({ handPositions: props.multiHandLandmarks[0] });
  };

  // useEffect(() => {
  //   const hands = new Hands({
  //     locateFile: (file: string) => {
  //       return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${VERSION}/${file}`;
  //     },
  //   });
  //   hands.setOptions({
  //     maxNumHands: 2,
  //     modelComplexity: 1,
  //     minDetectionConfidence: 0.5,
  //     minTrackingConfidence: 0.5,
  //   });
  //   hands.onResults(onResults);

  //   const camera = new Camera(ref.current, {
  //     onFrame: async () => {
  //       console.log("frame");
  //       await hands.send({ image: ref.current });
  //     },
  //     width: 1280,
  //     height: 720,
  //   });
  //   camera.start();
  // }, []);

  return (
    <>
      <script
        src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"
        crossOrigin="anonymous"
      ></script>
      <video style={{ width: "300px" }} ref={ref} />
      <div>{JSON.stringify(handPositions)}</div>
    </>
  );
};

export default HandTracking;
