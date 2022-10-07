import { Tree } from "antd";
import { RhetoricSidebar } from "./RhetoricSidebar";
import { useMemo } from "react";
import { DataNode } from "antd/lib/tree";
import { useR3fObjectStore } from "@/store/rhetoric";
import { useMyUser } from "@/hooks/store/user";
import { useWebRTCStore } from "@/store/webRTC";
import { R3fObjectId } from "@/types/r3fObject";

export function RhetoricSidebarLeft() {
  const r3fObjectList = useR3fObjectStore((state) => state.r3fObjectList);
  const myUser = useMyUser();

  const send = useWebRTCStore((state) => state.send);

  const treeData = useMemo<DataNode[]>(() => {
    return [
      {
        key: "root",
        title: "root",
        style: { backgroundColor: "#F5E1D7" },
        children: r3fObjectList.map<DataNode>((r3fObject) => ({
          key: r3fObject.id,
          title: r3fObject.name,
          isLeaf: true,
        })),
      },
    ];
  }, [r3fObjectList]);

  return (
    <RhetoricSidebar position="left">
      <Tree
        style={{ backgroundColor: "#F5E1D7" }}
        onSelect={(_, info) =>
          send({
            eventName: "userR3fObjectFocus",
            payload: {
              userId: myUser.id,
              r3fObjectId: info.node.key as R3fObjectId,
            },
          })
        }
        showLine
        multiple
        defaultExpandAll
        treeData={treeData}
        selectedKeys={myUser.focusedR3fObjectIds}
      />
    </RhetoricSidebar>
  );
}
