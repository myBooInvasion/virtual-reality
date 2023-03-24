import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

const Benda = () => {
   const sphereRef = useRef();

   useFrame((state, delta) => {
      const offset = new Vector3(0, 1.3, 0.3);
      const leonard = state.scene.getObjectByName('leonard');

      offset.applyQuaternion(leonard.quaternion);
      offset.add(leonard.position);

      sphereRef.current.position.copy(offset);
   });

   return (
      <mesh ref={sphereRef}>
         <sphereGeometry args={[0.1]} />
         <meshStandardMaterial color="red" />
      </mesh>
   );
}

export default Benda;