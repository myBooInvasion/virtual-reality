import React, { Suspense } from 'react';
import { Physics, Debug } from '@react-three/rapier';
import { Controllers, VRButton, XR } from '@react-three/xr';
import { KeyboardControls, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import './App.css';
import Loading from './components/Loading';
import Map from './components/Map';
import Boxes from './components/Grabing';
// import JoinBody from './components/JoinBody';

function App() {
  const keyMap = [
    { name: 'forward', keys: ['w'] },
    { name: 'left', keys: ['a'] },
    { name: 'back', keys: ['s'] },
    { name: 'right', keys: ['d'] },
    { name: 'jump', keys: ['Space'] },
  ];

  return (
    <>
      <VRButton sessionInit={{ optionalFeatures: ['local', 'local-floor', 'bounded-floor', 'hand-tracking', 'layers', 'unbounded'] }} />
      <Canvas
        gl={{ physicallyCorrectLights: true }}
        camera={{ position: [0, 2, 3] }}
      >
        <OrbitControls />
        <directionalLight castShadow color='white' intensity={5} />
        <XR referenceSpace='local'>
          <Controllers rayMaterial={{ color: 'blue' }} />
          <Suspense fallback={<Loading />}>
            <Physics colliders={false}>
              <Debug />
              <KeyboardControls map={keyMap}>
                <Map />
                <Boxes />
                {/* <JoinBody /> */}
              </KeyboardControls>
            </Physics>
          </Suspense>
        </XR>
      </Canvas>
    </>
  );
}

export default App;
