import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Preview = dynamic(() => import("@/components/canvas/Preview"), {
  ssr: false,
});

const R3F = ({ name }) => {
  return (
    <>
      <Preview name={name} />
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

import fs from "fs/promises";

export async function getStaticPaths({ params }) {
  const dir = await fs.opendir("public/models/previewable");
  const paths = [];
  for await (const file of dir) {
    paths.push({ params: { name: file.name } });
  }
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      title: "Preview",
      name: params.name,
    },
  };
}
