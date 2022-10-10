import { stringToColor } from "@/helpers/stringToColor";
import { useUserStore } from "@/store/rhetoric";
import { User } from "@/types/user";
import { Tooltip } from "antd";

export function RhetoricUsersList() {
  const userList = useUserStore((state) => state.userList);

  return (
    <div className="flex flex-row">
      {userList.length ? (
        userList.map((user) => (
          <RhetoricUsersListItem key={user.id} user={user} />
        ))
      ) : (
        <RhetoricUsersListEmpty />
      )}
    </div>
  );
}

function RhetoricUsersListEmpty() {
  return <div>유저가 없습니다.</div>;
}

function RhetoricUsersListItem({ user }: { user: User }) {
  const color = stringToColor(user.id);

  return (
    <Tooltip placement="top" title={user.name}>
      <div
        className="rounded-full w-8 h-8 flex justify-center items-center m-1"
        style={{ backgroundColor: color }}
      >
        <div className="font-bold" style={{ color: "#ffffff" }}>
          {user.name[0].toUpperCase()}
        </div>
      </div>
    </Tooltip>
  );
}
