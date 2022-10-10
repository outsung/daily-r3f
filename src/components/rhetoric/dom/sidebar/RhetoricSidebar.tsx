import React from "react";

interface RhetoricSidebarProps {
  position: "left" | "right";
  children: React.ReactNode;
}
export function RhetoricSidebar({ position, children }: RhetoricSidebarProps) {
  return (
    <div className="absolute flex h-full" style={{ [position]: "0px" }}>
      <div
        className="border-2 border-black rounded m-4 w-64"
        style={{ backdropFilter: "blur(10px)" }}
      >
        {children}
      </div>
    </div>
  );
}
