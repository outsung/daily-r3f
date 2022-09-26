import { forwardRef, MutableRefObject, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { ReadableFolder, readFolder } from "@/helpers/fs/readFolder";
import { GetStaticProps } from "next";
import { DOM as WILIndex } from ".";

import { BoxWithTransformControlsRef } from "@/components/canvas/wil/20220919";

let R3FRef: React.MutableRefObject<BoxWithTransformControlsRef>;
const BoxWithTransformControls = dynamic(
  () => import("@/components/canvas/wil/20220919"),
  {
    ssr: false,
  }
);

const DOM = ({ paths }: PageProps) => {
  const [forLoadSceneInputValue, setForLoadSceneInputValue] = useState("");

  return (
    <div className="absolute">
      <div>
        <WILIndex paths={paths} />
      </div>

      <div>9월 19일 ~ 9월 25일</div>
      <ul>
        <li>박스 위치 조정 및 저장, 불러오기</li>
        <li>
          <a href="https://threejs.org/examples/#webgl_geometry_spline_editor">
            https://threejs.org/examples/#webgl_geometry_spline_editor
          </a>
        </li>
      </ul>

      <div>메뉴</div>
      <div className="flex flex-col items-start">
        <button
          onClick={() => {
            R3FRef.current.saveScene();
          }}
        >
          저장하기 (문자열)
        </button>
        <input
          onChange={(value) => setForLoadSceneInputValue(value.target.value)}
        ></input>
        <button
          onClick={() => {
            alert("기존 정보는 사라집니다.");
            R3FRef.current.loadScene(forLoadSceneInputValue);
          }}
        >
          불러오기
        </button>
      </div>
    </div>
  );
};

const R3F = () => {
  R3FRef = useRef<BoxWithTransformControlsRef>();

  return (
    <>
      <BoxWithTransformControls ref={R3FRef} />
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
