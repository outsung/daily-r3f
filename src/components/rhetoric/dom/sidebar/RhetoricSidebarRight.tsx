import Socket from "@/core/socket";
import { stringToColor } from "@/helpers/stringToColor";
import { useSelectedRhetorics } from "@/hooks/rhetoric";
import useRhetoricStore, { User } from "@/store/rhetoricStore";
import { RhetoricSidebar } from "./RhetoricSidebar";

export function RhetoricSidebarRight() {
  const selectedRhetorics = useSelectedRhetorics();
  const users = useRhetoricStore((state) => state.users);

  return (
    <RhetoricSidebar position="right">
      <RhetoricInfo title="Users">
        <div className="flex flex-row">
          {Socket.instance?.id && (
            <UserItem
              myUser
              key={Socket.instance.id}
              user={
                {
                  color: stringToColor(Socket.instance.id),
                  id: Socket.instance.id,
                } as User
              }
            />
          )}
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      </RhetoricInfo>

      {selectedRhetorics.map((rhetoric) => (
        <div key={rhetoric.id}>
          <RhetoricInfo title="info">
            <RhetoricInfoItem label="name">{rhetoric.name}</RhetoricInfoItem>
          </RhetoricInfo>
          <RhetoricInfo title="transform">
            <RhetoricInfoItem label="position">
              {`${JSON.stringify(rhetoric.position)}`}
            </RhetoricInfoItem>
          </RhetoricInfo>
          <RhetoricInfo title="developer">
            <RhetoricInfoItem label="uuid">{rhetoric.id}</RhetoricInfoItem>
          </RhetoricInfo>
        </div>
      ))}
    </RhetoricSidebar>
  );
}

// function

interface RhetoricInfoProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
}
function RhetoricInfo({ title, children }: RhetoricInfoProps) {
  return (
    <div className="p-2">
      <div className="font-bold">{title}</div>
      <div className="py-2">{children}</div>
    </div>
  );
}
interface RhetoricInfoItemProps {
  label: string;
  children: React.ReactNode | React.ReactNode[];
}
function RhetoricInfoItem({ label, children }: RhetoricInfoItemProps) {
  return (
    <div className="flex flex-row">
      <div className="w-1/3">{label}</div>
      <div className="w-2/3 break-all">{children}</div>
    </div>
  );
}

interface UserItemProps {
  user: User;
  myUser?: boolean;
}
function UserItem({ user, myUser = false }: UserItemProps) {
  return (
    <div
      className="rounded-full w-8 h-8 flex justify-center items-center m-1"
      style={{
        backgroundColor: user.color,
        border: myUser ? `2px solid #000` : "none",
      }}
    >
      <div className="font-bold" style={{ color: "#ffffff" }}>
        {user.id[0].toUpperCase()}
      </div>
    </div>
  );
}
