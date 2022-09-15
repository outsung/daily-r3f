import Link from "next/link";

export default function Instructions() {
  return (
    <div>
      <div className="text-xs">안녕하세요.</div>
      <div className="text-xs">오준서의 Three.js 프로젝트 입니다.</div>

      <h3 className="text-3xl">index</h3>
      <ul>
        <li>
          <Link href={"/preview"}>preview</Link>
        </li>
        <li>
          <Link href={"/hand"}>hand</Link>
        </li>
      </ul>

      <h3 className="text-2xl">other</h3>
      <ul>
        <li>
          <a target="_blank" href={"https://outsung.github.io/Duo-frontend/"}>
            duo
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href={"https://outsung.github.io/3d-viewer/upload"}
          >
            3d-viewer
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href={"https://outsung.github.io/interactive-art-t2/"}
          >
            interactive-art-t2
          </a>
        </li>
      </ul>
    </div>
  );
}
