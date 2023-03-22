import React from 'react';

const boxs = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

const Benda = () => {
   return (
      <>
         {boxs.map((box, index) => {
               return (
                  <mesh position={[box, 0.25, 0]}>
                     <boxGeometry args={[0.5, 0.5, 0.5]} />
                     <meshStandardMaterial color="red" />
                  </mesh>
               );
            })
         }
      </>
   );
}

export default Benda;