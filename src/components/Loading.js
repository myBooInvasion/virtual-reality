import { Html, useProgress } from '@react-three/drei';
import React from 'react';

function Loading() {
  const { progress } = useProgress();
  return (
    <Html center>Loading {progress} %</Html>
  );
}

export default Loading;