import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody, useRevoluteJoint } from '@react-three/rapier';
import React, { useRef } from 'react';
import { Vector3 } from 'three';

const translate = new Vector3();

function JoinBody() {
  const bodyFirst = useRef();
  const bodySecond = useRef();

  const joint = useRevoluteJoint(bodyFirst, bodySecond, [
    [0, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
  ]);

  // KeyControlls
  const [, getKey] = useKeyboardControls();

  useFrame((state, delta) => {
    const keying = getKey();

    if (keying.forward) {
      translate.set(0, 0, -1);
      bodySecond.current.setLinvel(translate);
    }
    if (keying.back) {
      translate.set(0, 0, 1);
      bodySecond.current.setLinvel(translate);
    }
  });

  return (
    <group>
      <RigidBody ref={bodyFirst} colliders='cuboid' type='kinematicPosition' position={[0, 1.5, 0]}>
        <mesh>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color='orange' />
        </mesh>
      </RigidBody>
      <RigidBody ref={bodySecond} colliders='cuboid' mass={5} position={[-1, 2, 0]}>
        <mesh>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshBasicMaterial color='green' />
        </mesh>
      </RigidBody>
    </group>
  );
}

export default JoinBody;