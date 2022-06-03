import { useLoader } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { FontLoader, TextGeometry } from "three-stdlib";
import * as THREE from "three";

import { Suspense, useEffect, useMemo, useState } from "react";

export interface NameCardEntity {
  name: string; // 이름
  duty: string; // 직책
  department: string; // 부서
  company: string; // 기업명
  addr: string; // 주소
  tel: string; // 연락처
  email: string; // 이메일
  fax: string; // 팩스
  mobile: string; // 휴대전화
}

declare const window: any;

export default function NameCard() {
  const [text] = useNameCardInfo();

  const font = useLoader(
    FontLoader,
    "/fonts/SpoqaHanSans-Regular_Regular.json"
  );

  return (
    <Suspense fallback={<Box scale={2} />}>
      <mesh>
        <Box args={[3, 1, 0.1]} />
        {/* args={[char[0], { font, size, height }]} */}
        <mesh
          geometry={new TextGeometry(text, { font, size: 0.1, height: 0.01 })}
        >
          <meshStandardMaterial roughness={0.6} />
        </mesh>
      </mesh>
    </Suspense>
  );
}

type AppEventActions = { SET_NAME_CARD_ACTION: NameCardEntity };

function useListenerApp<A extends keyof AppEventActions>(
  action: A,
  func: (data: AppEventActions[A]) => void
) {
  useEffect(() => {
    const listener = (event: any) => {
      const {
        action: actionName,
        data,
      }: {
        action: string;
        data: AppEventActions[A];
      } = typeof event.data === "object" ? event.data : JSON.parse(event.data);

      if (actionName === action) func(data);
    };

    // window or global
    if (window.ReactNativeWebView) {
      alert("웹뷰입니다. 이벤트 추가");

      /** android */
      document.addEventListener("message", listener);
      /** ios */
      window.addEventListener("message", listener);
    }

    return () => {
      /** android */
      document.removeEventListener("message", listener);
      /** ios */
      window.removeEventListener("message", listener);
    };
  }, []);
}

function useNameCardInfo() {
  const [nameCard, setNameCard] = useState<NameCardEntity | null>(null);

  useListenerApp("SET_NAME_CARD_ACTION", (data) => {
    setNameCard(data);
  });

  // const nameCard:  = ;
  // {
  //   name: "김성우",
  //   duty: "대표",
  //   department: "영업부",
  //   company: "에스에스테크",
  //   addr: "서울시 강남구 역삼동",
  //   tel: "02-1234-5678",
  //   email: "adas",
  //   fax: "02-1234-5678",
  //   mobile: "010-1234-5678",
  // }

  const text = useMemo(
    () =>
      nameCard
        ? `이름 : ${nameCard.name}
  직책 : ${nameCard.duty}
  부서 : ${nameCard.department}
  기업명 : ${nameCard.company}
  주소 : ${nameCard.addr}
  연락처 : ${nameCard.tel}
  이메일 : ${nameCard.email}
  팩스 : ${nameCard.fax}
  휴대전화 : ${nameCard.mobile}`
        : "대기중...",
    [nameCard]
  );

  return [text] as const;
}
