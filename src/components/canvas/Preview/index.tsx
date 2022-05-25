import { useGLTF } from "@react-three/drei";

const Preview = ({ name }: { name: string }) => {
  const { scene } = useGLTF(`/models/previewable/${name}`);
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
