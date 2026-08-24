import * as THREE from 'three';
import { forwardRef, useRef, useState } from 'react';
import type { ThreeElements } from '@react-three/fiber';
import { useLoader, useFrame } from '@react-three/fiber';
import flashUrl from '../../assets/flash.png';
import journalUrl from '../../assets/journal.png';
import scrapUrl from '../../assets/scrap.png';
import debris1Url from '../../assets/debris1.png';
import debris2Url from '../../assets/debris2.png';

export const Flash = forwardRef<THREE.Mesh, ThreeElements['mesh']>((props, ref) => {
  const texture = useLoader(THREE.TextureLoader, flashUrl);
  return (
    <mesh ref={ref} {...props} scale={4}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent={true} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
});

export const Journal = ({ onClick }: { onClick: () => void }) => {
  const texture = useLoader(THREE.TextureLoader, journalUrl);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = hovered ? 2.8 : 2.5;
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={2.5}
      onClick={onClick}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent={true} side={THREE.DoubleSide} />
    </mesh>
  );
};

export const Scrap = () => {
  const texture = useLoader(THREE.TextureLoader, scrapUrl);
  return (
    <mesh scale={2}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent={true} side={THREE.DoubleSide} />
    </mesh>
  );
};

export const Debris1 = () => {
  const texture = useLoader(THREE.TextureLoader, debris1Url);
  return (
    <mesh scale={1}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent={true} side={THREE.DoubleSide} />
    </mesh>
  );
};

export const Debris2 = () => {
  const texture = useLoader(THREE.TextureLoader, debris2Url);
  return (
    <mesh scale={0.8}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent={true} side={THREE.DoubleSide} />
    </mesh>
  );
};