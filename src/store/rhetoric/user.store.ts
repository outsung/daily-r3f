import { R3fObjectId } from "@/types/r3fObject";
import { User, UserId } from "@/types/user";
import { Euler, Vector3 } from "three";
import create from "zustand";

interface UserStore {
  // property
  userList: User[];

  // method
  add: (payload: { user: User }) => void;
  deleteById: (payload: { userId: UserId }) => void;

  moveById: (payload: {
    userId: UserId;
    position: Vector3;
    rotation: Euler;
  }) => void;
  handMoveById: (payload: { userId: UserId; handPosition: Vector3 }) => void;

  focusR3fObjectById: (payload: {
    userId: UserId;
    r3fObjectId: R3fObjectId;
  }) => void;
  blurR3fObjectById: (payload: {
    userId: UserId;
    r3fObjectId: R3fObjectId;
  }) => void;
}

/**
 * @summary UserStore에 들어갈 정보
 * - 나의 정보: 어차피 로그인 이후 들어올거라 자기 유저 id는 가지고 있음.
 * - 유저 입장 이벤트가 일어나고,
 * - 나의 유저 id와 비교후 다른 로직으로 진행 ex) `방에 입장했습니다` or `~~님이 방에 입장 했습니다.`
 * - 나를 포함한 모든 유저 들을 저장할 스토어임.
 */
export const useUserStore = create<UserStore>((set) => ({
  userList: [],

  add: ({ user }) => set((prev) => ({ userList: prev.userList.concat(user) })),
  deleteById: ({ userId }) =>
    set((prev) => ({
      userList: prev.userList.filter((user) => user.id !== userId),
    })),
  moveById: ({ userId, position, rotation }) =>
    set((prev) => ({
      userList: prev.userList.map((user) =>
        user.id === userId ? { ...user, position, rotation } : user
      ),
    })),
  handMoveById: ({ userId, handPosition }) =>
    set((prev) => ({
      userList: prev.userList.map((user) =>
        user.id === userId ? { ...user, handPosition } : user
      ),
    })),
  focusR3fObjectById: ({ userId, r3fObjectId }) =>
    set((prev) => ({
      userList: prev.userList.map((user) =>
        user.id === userId
          ? {
              ...user,
              focusedR3fObjectIds: [r3fObjectId],
            }
          : user
      ),
    })),
  blurR3fObjectById: ({ userId, r3fObjectId }) =>
    set((prev) => ({
      userList: prev.userList.map((user) =>
        user.id === userId
          ? {
              ...user,
              focusedR3fObjectIds: user.focusedR3fObjectIds.filter(
                (focusedR3fObjectId) => focusedR3fObjectId !== r3fObjectId
              ),
            }
          : user
      ),
    })),
}));
