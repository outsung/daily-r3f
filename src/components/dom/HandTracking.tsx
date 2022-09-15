import useCheckSupportedDevices from "@/helpers/checkSupportedDevices";
import useStore from "@/helpers/store";
import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
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

  const handInit = () => {
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
  };

  const [handLoaded, setHandLoaded] = useState(false);

  useEffect(() => {
    const handCheck = () => {
      console.log("check", window.Hands);
      if (window.Hands) {
        setHandLoaded(true);
        handInit();
      }
    };

    let close: NodeJS.Timeout;

    if (!handLoaded) {
      console.log("handLoaded : ", handLoaded);
      close = setInterval(handCheck, 300);
    }

    return () => {
      close && clearInterval(close);
    };
  }, [handLoaded]);

  const isHandUndefined = useMemo(
    () => handPositions.l === undefined && handPositions.r === undefined,
    [handPositions]
  );

  return (
    <>
      <Head>
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
      </Head>
      <video className="hidden" ref={ref} />

      {(!handLoaded || isHandUndefined) && (
        <div
          className="absolute max-w-lg px-4 py-2 text-sm shadow-xl pointer-events-none select-none md:text-base top-8 left-1/2 text-gray-50 transform -translate-x-1/2"
          style={{
            backgroundColor: "rgb(27, 30, 40)",
            maxWidth: "calc(100% - 28px)",
          }}
        >
          {handLoaded ? "카메라에게 손을 보여주세요." : "로딩중입니다."}
        </div>
      )}
    </>
  );
};

export default HandTracking;
