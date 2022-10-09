import { Tree } from "antd";
import { RhetoricSidebar } from "./RhetoricSidebar";
import { useMemo } from "react";
import { DataNode } from "antd/lib/tree";
import { useR3fObjectStore } from "@/store/rhetoric";
import { useMyUser } from "@/hooks/store/user";

export function RhetoricSidebarLeft() {
  const r3fObjectList = useR3fObjectStore((state) => state.r3fObjectList);
  const myUser = useMyUser();

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
        showLine
        multiple
        defaultExpandAll
        treeData={treeData}
        selectedKeys={myUser.focusedR3fObjectIds}
      />
    </RhetoricSidebar>
  );
}
