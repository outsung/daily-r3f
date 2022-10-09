import { R3fObjectId } from "../r3fObject";
import { UserId } from "../user";

export interface WebRTCEvent {
  /**
   * @summary 유저 카메라 이동
   * @description 유저 position 정보는 vector3로 관리 (바로 사용 가능) -> 하지만 바로 얻을 수가 없음
   */
  userCameraMove: {
    userId: UserId;
    position: [number, number, number];
  };
  /**
   * @summary 유저 마우스 이동
   * @description 마우스 위치 데이터 가공 후 hand 3d position 넘겨주기
   * @todo post-process.outlineEffect 가 여러개의 효과를 표시 하려면 커스텀으로 작업 해야함
   */
  userMouseMove: {
    userId: UserId;
    handPosition: [number, number, number];
  };
  /**
   * @summary 유저 입장
   */
  userEnter: {
    userId: UserId;
    name: string;
  };
  /**
   * @summary 유저 퇴장
   */
  userLeave: {
    userId: UserId;
    name: string;
  };
  /**
   * @summary 유저가 R3fObject 포커스
   */
  userR3fObjectFocus: {
    userId: UserId;
    r3fObjectId: R3fObjectId;
  };
  /**
   * @summary 유저가 R3fObject 블러
   */
  userR3fObjectBlur: {
    userId: UserId;
    r3fObjectId: R3fObjectId;
  };

  /**
   * @summary R3fObject 생성
   */
  r3fObjectCreate: {
    r3fObjectId: R3fObjectId;
    type: "box" | "model";
    groupString?: string;
  };
  /**
   * @summary R3fObject 삭제
   */
  r3fObjectDelete: {
    r3fObjectId: R3fObjectId;
  };
  /**
   * @summary R3fObject 움직임
   * @todo R3fObjectTransform 타입으로 `position`, `scale`, `rotate` 설정하는 방식으로 수정
   */
  r3fObjectTransformPosition: {
    r3fObjectId: R3fObjectId;
    position: [number, number, number];
  };
}

export type WebRTCEventUnion = keyof WebRTCEvent;
