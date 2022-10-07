import { useMyUserFocusedR3fObjectList } from "@/hooks/store/r3fObject";
import { R3fObject } from "@/types/r3fObject";
import { RhetoricInfo, RhetoricInfoItem } from "./RhetoricInfo";

export function RhetoricR3FObjectInfo() {
  const myUserFocusedR3fObjectList = useMyUserFocusedR3fObjectList();

  if (myUserFocusedR3fObjectList.length === 0)
    return <RhetoricR3FObjectInfoEmpty />;

  if (myUserFocusedR3fObjectList.length === 1)
    return (
      <RhetoricR3FObjectInfoBox r3fObject={myUserFocusedR3fObjectList[0]} />
    );

  if (myUserFocusedR3fObjectList.length > 1)
    return <RhetoricR3FObjectInfoGroup />;
}

function RhetoricR3FObjectInfoEmpty() {
  return <div>박스를 선택하세요.</div>;
}

function RhetoricR3FObjectInfoBox({ r3fObject }: { r3fObject: R3fObject }) {
  return (
    <div key={r3fObject.id}>
      <RhetoricInfo title="info">
        <RhetoricInfoItem label="name">{r3fObject.name}</RhetoricInfoItem>
      </RhetoricInfo>
      <RhetoricInfo title="transform">
        <RhetoricInfoItem label="position">
          {`${JSON.stringify(r3fObject.position)}`}
        </RhetoricInfoItem>
      </RhetoricInfo>
      <RhetoricInfo title="developer">
        <RhetoricInfoItem label="uuid">{r3fObject.id}</RhetoricInfoItem>
      </RhetoricInfo>
    </div>
  );
}

function RhetoricR3FObjectInfoGroup() {
  return <div>개발중입니다.</div>;
}
