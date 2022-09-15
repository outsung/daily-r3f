import { GetStaticProps } from "next";
import { readFolder, ReadableFolder } from "@/helpers/fs/readFolder";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Box = dynamic(() => import("@/components/canvas/box/shader/Shader"), {
  ssr: false,
});

export const DOM = ({ previewablePaths }: PageProps) => {
  const { query } = useRouter();
  const focusFilePath = query?.name;

  return (
    <div>
      <div className="text-xs">미리보기</div>
      <div className="text-xs">간단한 모델링 작품을 미리보는 공간</div>

      <h3 className="text-3xl">index</h3>
      <ul>
        {previewablePaths.map((path) => (
          <li className={path === focusFilePath ? "underline" : ""}>
            <Link href={`/preview/${path}`}>{path}</Link>
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
  previewablePaths: string[];
}
const Page = (props: PageProps) => {
  return (
    <>
      <DOM previewablePaths={props.previewablePaths} />
      {/* @ts-ignore */}
      <R3F r3f />
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const paths = await readFolder(ReadableFolder.PREVIEWABLE_MODELS);

  return {
    props: {
      title: "Preview",
      previewablePaths: paths,
    },
  };
};
