import dynamic from "next/dynamic";
import Instructions from "@/components/dom/Instructions";
import { GetStaticProps } from "next";
import { ReadableFolder, readFolder } from "@/helpers/fs/readFolder";
import Link from "next/link";

const Box = dynamic(() => import("@/components/canvas/box/shader/Shader"), {
  ssr: false,
});

export const DOM = ({ paths }: PageProps) => {
  return (
    <div>
      <div>this week i learned about</div>

      <ul>
        {paths.map((path, index) => (
          <li key={index}>
            <Link href={`/wil/${path}`}>{`${path.slice(0, 4)}년 ${path.slice(
              4,
              6
            )}월 ${path.slice(6)}일`}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const R3F = () => {
  return (
    <>
      <Box />
    </>
  );
};

interface PageProps {
  paths: string[];
}
const Page = ({ paths }: PageProps) => {
  return (
    <>
      <DOM paths={paths} />
      {/* @ts-ignore */}
      <R3F r3f />
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const paths = await readFolder(ReadableFolder.WIL_PROJECT);

  return {
    props: {
      title: "this week i learned about",
      paths: paths
        .map((path) => path.split(".")[0])
        .filter((path) => path !== "index"),
    },
  };
};
