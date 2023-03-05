import { RigidBody } from '@react-three/rapier';
import React from 'react';

function Character() {
  return (
    <RigidBody colliders='cuboid' type='dynamic' position={[0, 2, -1]}>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshPhysicalMaterial color='orange' />
      </mesh>
    </RigidBody>
  );
}

export default Character;