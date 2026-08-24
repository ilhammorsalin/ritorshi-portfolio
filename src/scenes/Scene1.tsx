import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import Shuttle from '../components/assets/Shuttle';
import { Flash, Journal, Scrap, Debris1, Debris2 } from '../components/assets/CrashAssets';
import bgUrl from '../assets/bg.jpg';

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const AnimatedShuttle = ({ onCrash }: { onCrash: () => void }) => {
  const groupRef = useRef<THREE.Group>(null);
  const crashedRef = useRef(false);

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.position.x -= 0.05;
    groupRef.current.position.y += 0.033;

    if (groupRef.current.position.x < -6 && !crashedRef.current) {
      crashedRef.current = true;
      onCrash();
    }
  });

  return (
    <group ref={groupRef} position={[6, -4, 0]}>
      <Shuttle />
    </group>
  );
};

const CrashSequence = ({ onJournalClick }: { onJournalClick: () => void }) => {
  const flashRef = useRef<THREE.Mesh>(null);
  const journalRef = useRef<THREE.Group>(null);
  const scrapRef = useRef<THREE.Group>(null);
  const debris1Ref = useRef<THREE.Group>(null);
  const debris2Ref = useRef<THREE.Group>(null);

  const startTime = useRef<number | null>(null);

  const journalTarget = new THREE.Vector3(0, 0, 0.5);
  const scrapTarget = new THREE.Vector3(0, 2.5, 0.2);
  const debris1Target = new THREE.Vector3(2.5, 1.5, 0);
  const debris2Target = new THREE.Vector3(-2.5, -1.5, 0);

  useFrame(({ clock }) => {
    if (startTime.current === null) startTime.current = clock.getElapsedTime();

    const elapsed = clock.getElapsedTime() - startTime.current;
    const duration = 2.0;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);

    if (flashRef.current) {
      const flashOpacity = Math.max(0, 1 - elapsed * 2);
      (flashRef.current.material as THREE.MeshBasicMaterial).opacity = flashOpacity;
    }

    const lerpPos = (ref: { current: THREE.Group | null }, target: THREE.Vector3) => {
      if (ref.current) {
        ref.current.position.lerpVectors(new THREE.Vector3(-6, 4, 0), target, easedProgress);
      }
    };

    lerpPos(journalRef, journalTarget);
    lerpPos(scrapRef, scrapTarget);
    lerpPos(debris1Ref, debris1Target);
    lerpPos(debris2Ref, debris2Target);
  });

  return (
    <group>
      <Flash ref={flashRef} position={[-6, 4, 1]} />

      <group ref={journalRef}>
        <Journal onClick={onJournalClick} />
      </group>

      <group ref={scrapRef}>
        <Scrap />
      </group>

      <group ref={debris1Ref}>
        <Debris1 />
      </group>

      <group ref={debris2Ref}>
        <Debris2 />
      </group>
    </group>
  );
};

const Scene1 = ({ onJournalClick }: { onJournalClick: () => void }) => {
  const [crashed, setCrashed] = useState(false);

  return (
    <div className="w-full h-full absolute inset-0 bg-black">
      <img
        src={bgUrl}
        alt="Space Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <Canvas
        camera={{ position: [0, 0, 5], fov: 100 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
      >
        {!crashed && <AnimatedShuttle onCrash={() => setCrashed(true)} />}
        {crashed && <CrashSequence onJournalClick={onJournalClick} />}
      </Canvas>
    </div>
  );
};

export default Scene1;