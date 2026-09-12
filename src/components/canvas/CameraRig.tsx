import { useFrame, useThree } from '@react-three/fiber';
import { useAppContext } from '../../context/AppContext';
import * as THREE from 'three';

export function CameraRig() {
  const { camera } = useThree();
  const { scrollProgress, activePage } = useAppContext();

  useFrame(() => {
    let targetX = 0;
    let targetY = -scrollProgress * 40;
    let targetZ = 10; // Default home Z

    if (activePage !== 'home') {
      targetZ = 2; // Zoom in close to the object
      targetY = 0; // Center vertically on the object
      if (activePage === 'graphic-design') targetX = -4;
      if (activePage === 'animations') targetX = 0;
      if (activePage === 'cinematography') targetX = 4;
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
  });

  return null;
}
