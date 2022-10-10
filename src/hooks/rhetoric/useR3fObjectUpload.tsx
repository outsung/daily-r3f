import { getTypeOfFileUpload, r3fObjectLoad } from "@/helpers/rhetoric";
import { useRef } from "react";
import { Group } from "three";

export function useR3fObjectUpload(callback: (group: Group) => void) {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const file = event.target.files ? event.target.files[0] : undefined;

    if (file) {
      const type = getTypeOfFileUpload(file.name);

      console.log(type, file.name);
      if (!type) {
        return alert("지원하지 않는 파일 입니다.");
      }

      // file
      const rootFile = file;
      const rootPath =
        uploadInputRef.current?.value.replace(file.name, "") || "";

      const fileURL = URL.createObjectURL(rootFile);
      const cleanup = () => {
        URL.revokeObjectURL(fileURL);
      };

      const group = await r3fObjectLoad({ fileURL, rootPath, file, type });
      console.log(group);
      callback(group);

      cleanup();
    }
  };

  const R3fObjectUploadInput = () => (
    <input
      ref={uploadInputRef}
      onChange={onChange}
      type="file"
      accept=".gltf, .glb, .obj, .fbx"
    />
  );

  return {
    R3fObjectUploadInput,
    onClick: () => {
      uploadInputRef.current?.click();
    },
  };
}
