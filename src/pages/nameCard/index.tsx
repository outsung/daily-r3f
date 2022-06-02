import dynamic from "next/dynamic";

const NameCard = dynamic(() => import("@/components/canvas/NameCard"), {
  ssr: false,
});

const R3F = () => {
  return (
    <>
      <NameCard />
    </>
  );
};

const Page = (props) => {
  return (
    <>
      {/* @ts-ignore */}
      <R3F r3f {...props} />
    </>
  );
};

export default Page;

export async function getStaticProps({ params }) {
  return {
    props: {
      title: "전자 명함",
    },
  };
}
