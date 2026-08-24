import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import shuttleUrl from '../../assets/shuttle.png';

const Shuttle = () => {
  const texture = useLoader(THREE.TextureLoader, shuttleUrl);

  return (
    <mesh scale={1.5}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent={true} side={THREE.DoubleSide} />
    </mesh>
  );
};

export default Shuttle;