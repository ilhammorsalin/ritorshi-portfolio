import { CameraRig } from './CameraRig';
import { Hero3D } from './Hero3D';

export function HeroScene() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Hero3D />
    </>
  );
}
