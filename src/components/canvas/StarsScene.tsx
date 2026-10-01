import { Stars } from '@react-three/drei';

export function StarsScene() {
  // Note: CameraRig lives in HeroScene only. Both scenes now share ONE canvas,
  // and a second rig here would lerp the same camera twice per frame.
  return (
    <>
      {/* Layer 1: Stars only - blinking stars above Layer 0 (bg + gradients) */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  );
}
