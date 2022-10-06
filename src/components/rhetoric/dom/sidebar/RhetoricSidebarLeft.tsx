import { Tree } from "antd";
import useRhetoricStore from "@/store/rhetoricStore";

import { RhetoricSidebar } from "./RhetoricSidebar";
import { useMemo } from "react";
import { DataNode } from "antd/lib/tree";
import { rhetoricId, rhetoricType } from "@/core/rhetoric/Rhetoric";

export function RhetoricSidebarLeft() {
  const rhetorics = useRhetoricStore((state) => state.tree);
  const setSelectedRhetoricIds = useRhetoricStore(
    (state) => state.setSelectedRhetoricIds
  );
  const selectedRhetoricIds = useRhetoricStore(
    (state) => state.selectedRhetoricIds
  );

  const treeData = useMemo<DataNode[]>(() => {
    return [
      {
        key: "root",
        title: "root",
        style: { backgroundColor: "#F5E1D7" },
        children: rhetorics.map<DataNode>((rhetoric) => ({
          key: rhetoric.id,
          title: rhetoric.name,
          isLeaf: rhetoric.type === rhetoricType.object,
        })),
      },
    ];
  }, [rhetorics]);

  return (
    <RhetoricSidebar position="left">
      <Tree
        style={{ backgroundColor: "#F5E1D7" }}
        onSelect={(_, info) =>
          setSelectedRhetoricIds([info.node.key as rhetoricId])
        }
        showLine
        multiple
        defaultExpandAll
        treeData={treeData}
        selectedKeys={selectedRhetoricIds}
      />
    </RhetoricSidebar>
  );
}

// import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';
// import React from 'react';

// const App: React.FC = () => {
//   const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
//     console.log('Trigger Select', keys, info);
//   };

//   const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
//     console.log('Trigger Expand', keys, info);
//   };

//   return (

//   );
// };
