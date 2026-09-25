import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface Particle {
  id: number;
  startPosition: THREE.Vector3;
  velocity: THREE.Vector3;
  color: string;
  size: number;
  rotationSpeed: number;
  shapeType: 'square' | 'triangle' | 'circle';
}

function TriangleGeometry() {
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.5);
    shape.lineTo(-0.433, -0.25);
    shape.lineTo(0.433, -0.25);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);
  return <primitive object={geo} attach="geometry" />;
}

export function ComicExplosion({ onComplete }: { onComplete: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const time = useRef(0);
  const completed = useRef(false);
  const { viewport } = useThree();

  // Explosion origin: left edge of the viewport, vertically centered
  const originX = -viewport.width / 2;

  const particles = useMemo(() => {
    const colors = ['#ffcc00', '#ff3300', '#ffffff', '#00ccff', '#ff6600', '#ffff00'];
    const shapes: Particle['shapeType'][] = ['square', 'triangle', 'circle'];
    const temp: Particle[] = [];

    for (let i = 0; i < 60; i++) {
      // All particles originate from the left edge center
      const startX = originX + (Math.random() * 0.5 - 0.25);
      const startY = (Math.random() * 1.0 - 0.5);

      // Shoot outward to the RIGHT (into the visible area)
      const angle = (Math.random() - 0.5) * Math.PI * 0.8; // spread ~72 degrees
      const speed = 3 + Math.random() * 8;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const vz = (Math.random() - 0.5) * 2;

      temp.push({
        id: i,
        startPosition: new THREE.Vector3(startX, startY, 0),
        velocity: new THREE.Vector3(vx, vy, vz),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 0.3 + Math.random() * 1.2,
        rotationSpeed: (Math.random() - 0.5) * 12,
        shapeType: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }
    return temp;
  }, [originX]);

  useFrame((_, delta) => {
    time.current += delta;

    if (time.current > 2.5 && !completed.current) {
      completed.current = true;
      onComplete();
    }

    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const p = particles[i];
        if (!p) return;

        // Move along velocity
        child.position.x = p.startPosition.x + p.velocity.x * time.current;
        child.position.y = p.startPosition.y + p.velocity.y * time.current;
        child.position.z = p.startPosition.z + p.velocity.z * time.current;

        child.rotation.z += p.rotationSpeed * delta;

        // Shrink and fade over time
        const lifeProgress = time.current / 2.5;
        const scale = Math.max(0, p.size * (1 - lifeProgress * lifeProgress));
        child.scale.set(scale, scale, scale);

        // Fade opacity
        const mesh = child as THREE.Mesh;
        if (mesh.material && (mesh.material as THREE.MeshBasicMaterial).opacity !== undefined) {
          (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - lifeProgress);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p) => (
        <mesh key={p.id} position={[p.startPosition.x, p.startPosition.y, p.startPosition.z]}>
          {p.shapeType === 'square' && <planeGeometry args={[1, 1]} />}
          {p.shapeType === 'triangle' && <TriangleGeometry />}
          {p.shapeType === 'circle' && <circleGeometry args={[0.5, 16]} />}
          <meshBasicMaterial
            color={p.color}
            side={THREE.DoubleSide}
            transparent
            opacity={1}
          />
        </mesh>
      ))}
    </group>
  );
}
