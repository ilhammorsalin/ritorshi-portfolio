import { Stars } from '@react-three/drei';
import { CameraRig } from './CameraRig';

export function StarsScene() {
  return (
    <>
      <CameraRig />
      {/* Layer 1: Stars only - blinking stars above Layer 0 (bg + gradients) */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  );
}
