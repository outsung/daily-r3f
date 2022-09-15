import { useGLTF } from "@react-three/drei";

export const PREVIEW_FILE_BASE_PATH = "/models/previewable/";
const Preview = ({ filePath }: { filePath: string }) => {
  const { scene } = useGLTF(`${PREVIEW_FILE_BASE_PATH}${filePath}`);
  return (
    <>
      <group>
        <primitive object={scene} />
      </group>
      <ambientLight />
    </>
  );
};

export default Preview;
