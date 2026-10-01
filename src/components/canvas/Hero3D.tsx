import { useState, useRef, useMemo, useEffect } from 'react';
import { Image } from '@react-three/drei';
import { useAppContext } from '../../context/AppContext';
import { ComicExplosion } from './ComicExplosion';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Each icon has its own random float offset seeds
interface FloatSeed {
  freqX: number;
  freqY: number;
  ampX: number;
  ampY: number;
  phaseX: number;
  phaseY: number;
}

function makeFloatSeed(): FloatSeed {
  return {
    freqX: 0.3 + Math.random() * 0.4,  // ~0.3-0.7 Hz → 3-4 sec cycle
    freqY: 0.25 + Math.random() * 0.35,
    ampX: 0.1 + Math.random() * 0.2,   // ±0.1 to ±0.3 units
    ampY: 0.1 + Math.random() * 0.2,
    phaseX: Math.random() * Math.PI * 2,
    phaseY: Math.random() * Math.PI * 2,
  };
}

export function Hero3D() {
  const { hasExploded, setHasExploded, setActivePage, activePage } = useAppContext();
  const [showIcons, setShowIcons] = useState(hasExploded);
  const { viewport } = useThree();

  // Refs for the 3 icon meshes to animate positions
  const icon1Ref = useRef<THREE.Group>(null);
  const icon2Ref = useRef<THREE.Group>(null);
  const icon3Ref = useRef<THREE.Group>(null);

  // Tracks how long since icons appeared (for wobble-in + float)
  const iconTime = useRef(hasExploded ? 2.0 : 0);

  // Float freeze: once an icon is clicked, idle floating eases to a stop for all icons, then resumes when returning home
  const freezeTriggered = useRef(false);
  const freezeProgress = useRef(0); // 0 = floating, 1 = fully stopped

  // Reset freeze when returning home
  useEffect(() => {
    if (activePage === 'home') {
      freezeTriggered.current = false;
    }
  }, [activePage]);

  // Explosion origin (left edge of viewport)
  const originX = -viewport.width / 2;

  // Final resting positions for the 3 icons near bottom of screen in asymmetrical positions
  const finalPositions = useMemo(() => [
    new THREE.Vector3(-3.8, -1.5, 0),  // Sketchbook
    new THREE.Vector3(0, -2, 0),   // TV
    new THREE.Vector3(3.7, -1.5, 0),   // Camera
  ], []);

  // Final resting rotations (subtle unique fixed tilt on Z-axis for a chaotic sticker look)
  const finalRotations = useMemo(() => [
    (-8 * Math.PI) / 180,  // Sketchbook (-8°)
    (5 * Math.PI) / 180,   // TV (+5°)
    (-10 * Math.PI) / 180, // Camera (-10°)
  ], []);

  // Float seeds (stable across renders)
  const floatSeeds = useMemo(() => [
    makeFloatSeed(),
    makeFloatSeed(),
    makeFloatSeed(),
  ], []);

  const handleDive = (page: string) => {
    // Clicking any icon stops the floating animation for all three
    freezeTriggered.current = true;
    setActivePage(page);
  };

  useFrame((_, delta) => {
    if (!showIcons) return;

    iconTime.current += delta;
    const t = iconTime.current;

    // Wobble-in duration: ~2 seconds to reach final position
    const wobbleInDuration = 2.0;
    // How far along the wobble-in are we (0 to 1, clamped)
    const wobbleProgress = Math.min(1, t / wobbleInDuration);
    // Eased progress (ease-out cubic)
    const easedProgress = 1 - Math.pow(1 - wobbleProgress, 3);

    // Ease floating to a complete stop once frozen (~0.6s ramp down), ease back to floating when returning home
    if (freezeTriggered.current) {
      if (freezeProgress.current < 1) {
        freezeProgress.current = Math.min(1, freezeProgress.current + delta / 0.6);
      }
    } else {
      if (freezeProgress.current > 0) {
        freezeProgress.current = Math.max(0, freezeProgress.current - delta / 0.6);
      }
    }
    const stopFactor = 1 - freezeProgress.current;

    const refs = [icon1Ref, icon2Ref, icon3Ref];

    refs.forEach((ref, i) => {
      if (!ref.current) return;
      const final = finalPositions[i];
      const seed = floatSeeds[i];

      // --- Wobble-in: interpolate from explosion origin to final pos ---
      const startX = originX;
      const startY = 0;

      const baseX = THREE.MathUtils.lerp(startX, final.x, easedProgress);
      const baseY = THREE.MathUtils.lerp(startY, final.y, easedProgress);

      // --- Idle floating (only kicks in fully once wobble-in is done) ---
      const floatStrength = wobbleProgress * stopFactor; // ramps 0→1, then eases to 0 once frozen
      const floatX = Math.sin(t * seed.freqX * Math.PI * 2 + seed.phaseX) * seed.ampX * floatStrength;
      const floatY = Math.sin(t * seed.freqY * Math.PI * 2 + seed.phaseY) * seed.ampY * floatStrength;

      // --- Wobble overlay during travel (gives a wobbly, not straight-line feel) ---
      const wobbleX = wobbleProgress < 1 ? Math.sin(t * 5) * 0.15 * (1 - wobbleProgress) : 0;
      const wobbleY = wobbleProgress < 1 ? Math.cos(t * 7) * 0.1 * (1 - wobbleProgress) : 0;

      ref.current.position.x = baseX + floatX + wobbleX;
      ref.current.position.y = baseY + floatY + wobbleY;
      ref.current.position.z = final.z;

      // Subtle fixed rotation tilt eased in as icons travel into place
      ref.current.rotation.z = THREE.MathUtils.lerp(0, finalRotations[i], easedProgress);
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Explosion plays first */}
      {!hasExploded && (
        <ComicExplosion
          onComplete={() => {
            setHasExploded(true);
            setShowIcons(true);
          }}
        />
      )}

      {/* Icons: start at explosion origin, wobble to final positions, then float */}
      {showIcons && (
        <>
          <group ref={icon1Ref} position={[originX, 0, 0]}>
            <Image
              url="/sketchbook-bg-removed.png"
              scale={[2.5, 2.5]}
              transparent
              onClick={() => handleDive('graphic-design')}
              onPointerOver={() => document.body.style.cursor = 'pointer'}
              onPointerOut={() => document.body.style.cursor = 'auto'}
            />
          </group>
          <group ref={icon2Ref} position={[originX, 0, 0]}>
            <Image
              url="/crt-bg-removed-with-image.png"
              scale={[3.0, 3.0]}
              transparent
              onClick={() => handleDive('animations')}
              onPointerOver={() => document.body.style.cursor = 'pointer'}
              onPointerOut={() => document.body.style.cursor = 'auto'}
            />
          </group>
          <group ref={icon3Ref} position={[originX, 0, 0]}>
            <Image
              url="/camera-without-bg.png"
              scale={[2.4, 2.4]}
              transparent
              onClick={() => handleDive('cinematography')}
              onPointerOver={() => document.body.style.cursor = 'pointer'}
              onPointerOut={() => document.body.style.cursor = 'auto'}
            />
          </group>
        </>
      )}
    </group>
  );
}
