import { Stars } from '@react-three/drei';
import { CameraRig } from './CameraRig';
import { Hero3D } from './Hero3D';

export function Scene() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <CameraRig />
      <Hero3D />
    </>
  );
}
