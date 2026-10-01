import { useFrame, useThree } from '@react-three/fiber';
import { useAppContext } from '../../context/AppContext';
import { scrollStore } from '../../lib/scrollStore';
import * as THREE from 'three';

export function CameraRig() {
  const { camera } = useThree();
  const { activePage } = useAppContext();

  useFrame(() => {
    // Read scroll progress straight from the module store — no React subscription,
    // no context re-render per frame.
    let targetX = 0;
    let targetY = -scrollStore.progress * 40;
    let targetZ = 10; // Default home Z

    if (activePage !== 'home') {
      targetZ = 2; // Zoom in close to the object
      if (activePage === 'graphic-design') {
        targetX = -3.8;
        targetY = -2.8;
      }
      if (activePage === 'animations') {
        targetX = 0.3;
        targetY = -3.3;
      }
      if (activePage === 'cinematography') {
        targetX = 3.7;
        targetY = -2.5;
      }
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
  });

  return null;
}
