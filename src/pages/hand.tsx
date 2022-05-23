import HandTracking from "@/components/dom/HandTracking";
import dynamic from "next/dynamic";

const Hand = dynamic(() => import("@/components/canvas/hand"), {
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
      <Hand />
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
