import { useState } from 'react';
import { Image } from '@react-three/drei';
import { useAppContext } from '../../context/AppContext';
import { ComicExplosion } from './ComicExplosion';
import { useFrame } from '@react-three/fiber';

export function Hero3D() {
  const { hasExploded, setHasExploded, setActivePage } = useAppContext();
  const [showIcons, setShowIcons] = useState(hasExploded);

  const handleDive = (page: string) => {
    setActivePage(page);
  };

  // Optional: Add a slight floating animation to icons if we are in 'home'
  useFrame(() => {
    // If you want a slight hover effect, you can access meshes via refs
    // For simplicity, we just rely on standard positions.
  });

  return (
    <group position={[0, 0, 0]}>
      {!hasExploded && (
        <ComicExplosion 
          onComplete={() => {
            setHasExploded(true);
            setShowIcons(true);
          }} 
        />
      )}

      {showIcons && (
        <>
          {/* We only show the icons if activePage is home, or if we want them to stay during dive, we leave them.
              Leaving them allows the camera to zoom into them! */}
          <Image 
            url="/sketchbook.png" 
            scale={[3, 3]} 
            position={[-4, 0, 0]} 
            transparent
            onClick={() => handleDive('graphic-design')}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}
          />
          <Image 
            url="/tv.png" 
            scale={[3, 3]} 
            position={[0, 0, 0]} 
            transparent
            onClick={() => handleDive('animations')}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}
          />
          <Image 
            url="/camera.png" 
            scale={[3, 3]} 
            position={[4, 0, 0]} 
            transparent
            onClick={() => handleDive('cinematography')}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}
          />
        </>
      )}
    </group>
  );
}
