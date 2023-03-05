import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useXR } from '@react-three/xr';
import { Vector3 } from 'three';
import { RigidBody } from '@react-three/rapier';

const positionHand = new Vector3();

function Boxes() {
  // REF
  const handRef = useRef();

  // HELPER

  // XR
  const { controllers } = useXR();

  // FRAME
  useFrame((state, delta) => {
    if (controllers.length !== 0) {
      const rightControl = controllers[0].grip;

      positionHand.setFromMatrixPosition(rightControl.matrixWorld);

      handRef.current.setTranslation(positionHand);
    }
  });

  return (
    <RigidBody ref={handRef} colliders='ball' type='kinematicPosition' position={[0, 2, -1]} name='spherePhy'>
      <mesh name='sphereTarget'>
        <sphereGeometry args={[0.15, 16]} />
        <meshBasicMaterial color='green' />
      </mesh>
    </RigidBody>
  );
}

export default Boxes;