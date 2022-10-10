import { RhetoricSidebar } from "../RhetoricSidebar";
import { RhetoricInfo } from "./RhetoricInfo";
import { RhetoricR3FObjectInfo } from "./RhetoricR3FObjectInfo";
import { RhetoricUsersList } from "./RhetoricUsersList";

export function RhetoricSidebarRight() {
  return (
    <RhetoricSidebar position="right">
      <RhetoricInfo title="Users">
        <RhetoricUsersList />
        <RhetoricR3FObjectInfo />
      </RhetoricInfo>
    </RhetoricSidebar>
  );
}
