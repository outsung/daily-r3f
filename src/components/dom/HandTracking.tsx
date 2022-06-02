import useCheckSupportedDevices from "@/helpers/checkSupportedDevices";
import useStore from "@/helpers/store";
import { useEffect, useRef, useState } from "react";
import { SetState } from "zustand";

declare const window: any;

const HandTracking = () => {
  const handPositions = useStore((s) => s.handPositions);
  const ref = useRef();

  useCheckSupportedDevices();

  const onResults = (props) => {
    let r, l;

    if (props.multiHandedness[0]) {
      if (props.multiHandedness[0].label === "Right")
        r = props.multiHandLandmarks[0];
      else l = props.multiHandLandmarks[0];
    }

    if (props.multiHandedness[1]) {
      if (props.multiHandedness[1].label === "Right")
        r = props.multiHandLandmarks[1];
      else l = props.multiHandLandmarks[1];
    }

    useStore.setState({ handPositions: { l, r } });
  };

  useEffect(() => {
    const hands = new window.Hands({
      locateFile: (file: string) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${window.VERSION}/${file}`;
      },
    });
    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      selfieMode: true,
    });
    hands.onResults(onResults);

    const camera = new window.Camera(ref.current, {
      onFrame: async () => {
        console.log("frame");
        await hands.send({ image: ref.current });
      },
      width: 1280,
      height: 720,
    });
    camera.start();
  }, []);

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
      {/* <div>{JSON.stringify(handPositions)}</div> */}
    </>
  );
};

export default HandTracking;
