import dynamic from "next/dynamic";
import Instructions from "@/components/dom/Instructions";

const Box = dynamic(() => import("@/components/canvas/box/shader/Shader"), {
  ssr: false,
});

const DOM = () => {
  return <Instructions />;
};

const R3F = () => {
  return (
    <>
      <Box />
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
      title: "outsung",
    },
  };
}
