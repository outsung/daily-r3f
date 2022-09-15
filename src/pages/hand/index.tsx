import HandTracking from "@/components/dom/HandTracking";
import dynamic from "next/dynamic";
import { Vector3 } from "three";

const Hands = dynamic(() => import("@/components/canvas/hand"), {
  ssr: false,
});

const DOM = () => {
  return (
    <>
      <HandTracking />
    </>
  );
};

const R3F = () => {
  return (
    <>
      <group position={new Vector3(-3, 3, 0)}>
        <Hands />
      </group>
    </>
  );
};

const Page = () => {
  return (
    <>
      <DOM />
      {/* @ts-ignore */}
      <R3F r3f />
    </>
  );
};

export default Page;

export async function getStaticProps() {
  return {
    props: {
      title: "Hand",
    },
  };
}
