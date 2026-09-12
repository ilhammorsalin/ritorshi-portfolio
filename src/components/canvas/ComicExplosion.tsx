import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface Particle {
  id: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: string;
  size: number;
  rotationSpeed: number;
}

export function ComicExplosion({ onComplete }: { onComplete: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const time = useRef(0);

  const particles = useMemo(() => {
    const colors = ['#ffcc00', '#ff3300', '#ffffff', '#00ccff'];
    const temp: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      // Originate from left half of screen
      const startX = -5 + (Math.random() * 2 - 1); 
      const startY = (Math.random() * 4 - 2);
      
      // Shoot mostly towards the right
      const vx = 2 + Math.random() * 6;
      const vy = (Math.random() - 0.5) * 6;
      const vz = (Math.random() - 0.5) * 4;

      temp.push({
        id: i,
        position: new THREE.Vector3(startX, startY, 0),
        velocity: new THREE.Vector3(vx, vy, vz),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 0.5 + Math.random() * 1.5,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }
    return temp;
  }, []);

  useFrame((_, delta) => {
    time.current += delta;
    if (time.current > 2.5) {
      onComplete();
    }

    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const p = particles[i];
        child.position.add(p.velocity.clone().multiplyScalar(delta));
        child.rotation.z += p.rotationSpeed * delta;
        // Shrink over time
        const scale = Math.max(0, p.size * (1 - time.current / 2.0));
        child.scale.set(scale, scale, scale);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p) => (
        <mesh key={p.id} position={p.position}>
          {/* Cartoon style 2D geometry (Planes) */}
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color={p.color} side={THREE.DoubleSide} transparent />
        </mesh>
      ))}
    </group>
  );
}
