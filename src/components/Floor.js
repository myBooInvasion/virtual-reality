import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { DoubleSide } from 'three';

const Floor = () => {
   return (
      <>
         <RigidBody colliders='hull' type='fixed' position={[0, 0, 0]}>
            <mesh rotation-x={-Math.PI / 2} receiveShadow>
               <planeGeometry args={[30, 30, 30, 30]} />
               <meshStandardMaterial color="grey" side={DoubleSide} />
            </mesh>
         </RigidBody>
      </>
   );
}

export default Floor;