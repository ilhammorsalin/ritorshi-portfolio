// Module-level scroll store: bypasses React entirely for high-frequency scroll data.
// React state/context re-renders on every scroll frame and was the main cause of jank.
// Consumers read `scrollStore.progress` inside their own rAF / useFrame loops instead
// of subscribing to React state.

export const scrollStore = {
  /** Normalized Lenis scroll progress, 0..1 */
  progress: 0,
};
