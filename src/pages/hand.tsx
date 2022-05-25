// const Hand = dynamic(() => import("@/components/canvas/hand"), {
//   ssr: false,
// });

const DOM = () => {
  return (
    <>
      <h1>준비중</h1>
    </>
  );
};

const R3F = () => {
  return <>{/* <Hand /> */}</>;
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
