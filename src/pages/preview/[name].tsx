import dynamic from "next/dynamic";
import { readFolder, ReadableFolder } from "@/helpers/fs/readFolder";
import { DOM } from ".";

const Preview = dynamic(() => import("@/components/canvas/Preview"), {
  ssr: false,
});

const R3F = ({ filePath }) => {
  return <Preview filePath={filePath} />;
};

const Page = (props) => {
  return (
    <>
      <DOM {...props} />
      {/* @ts-ignore */}
      <R3F r3f {...props} />
    </>
  );
};

export default Page;

export async function getStaticPaths({ params }) {
  const paths = await readFolder(ReadableFolder.PREVIEWABLE_MODELS);

  return {
    paths: paths.map((path) => ({ params: { name: path } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const paths = await readFolder(ReadableFolder.PREVIEWABLE_MODELS);

  return {
    props: {
      title: "Preview",
      filePath: params.name,
      previewablePaths: paths,
    },
  };
}
