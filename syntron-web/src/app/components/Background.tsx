
import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Background() {
  return (
    <Canvas style={{ height: "100vh", background: "#000014" }}>
      <CameraControls />
    </Canvas>
  );
}
