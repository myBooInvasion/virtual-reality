import React, { Suspense, useMemo } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { Debug, Physics } from '@react-three/rapier';
import { Controllers, VRButton, XR } from '@react-three/xr';
import { Environment, KeyboardControls } from '@react-three/drei';
import { ACESFilmicToneMapping, sRGBEncoding } from 'three';
import Virtual from './components/Virtual';

function App() {
  // Mapping keyboard keys to actions
  const keyMap = useMemo(() => [
    {name: 'forward', keys: ['w', 'ArrowUp']},
    {name: 'backward', keys: ['s', 'ArrowDown']},
    {name: 'left', keys: ['a', 'ArrowLeft']},
    {name: 'right', keys: ['d', 'ArrowRight']},
  ], []);

  return (
    <div id='canvas-container'>
      <VRButton />
      <Canvas
        shadows='soft'
        camera={{ position: [0, 2, 4], near: 0.01, far: 1000 }}
        gl={{ toneMappingExposure: 1, toneMapping: ACESFilmicToneMapping, outputEncoding: sRGBEncoding, antialias: true, alpha: true }}
      >

        <XR>
          <Environment files='/model/HDR/forgotten_miniland_4k.hdr' background />
          <Controllers rayMaterial={{color: 'blue'}} />
          <Suspense fallback={null}>
            <Physics colliders={false}>
              <Debug />
              <KeyboardControls map={keyMap}>
                <Virtual />
              </KeyboardControls>
            </Physics>
          </Suspense>
        </XR>

      </Canvas>
    </div>
  );
}

export default App;
