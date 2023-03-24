import React, { useRef, Fragment } from 'react';
import { PointerLockControls, SoftShadows, useHelper } from '@react-three/drei';
import { useXR } from '@react-three/xr';
import { DirectionalLightHelper, OrthographicCamera } from 'three';
import Floor from './Floor';
import { LeoVR } from './character/Leonard';
import { Hands } from './hand/Srg_glove';
import { Lab } from './environment/Laboratory';
import { Table } from './assets/Table';

const cameraShadow = new OrthographicCamera(-20, 20, 20, -20, 0.1, 1000);

const handData = [
   {
      name: 'hand_left',
      posX: -0.5,
      scaling: [0.01, -0.01, 0.01],
      rotate: Math.PI/2,
      grip: 'left',
   },
   {
      name: 'hand_right',
      posX: 0.5,
      scaling: [0.01, 0.01, 0.01],
      rotate: Math.PI/2,
      grip: 'right',
   },
]

const Virtual = () => {
   const lighting = useRef();
   useHelper(lighting, DirectionalLightHelper, 1, 'purple');

   // XR
   const { session } = useXR();

   // THREE

   return (
      <Fragment>
         <PointerLockControls />
         <directionalLight ref={lighting} castShadow color='#FCE570' intensity={2} position={[7, 7, 10]} shadow-mapSize={[2048, 2048]} shadow-camera={cameraShadow} />
         <SoftShadows size={10} samples={50} />
         <Floor />
         <LeoVR />
         <Lab />
         <Table />
         {
            session && handData.map((hand, index) => <Hands key={index} name={hand.name} posX={hand.posX} scaling={hand.scaling} rotate={hand.rotate} grip={hand.grip} />)
         }
      </Fragment>
   );
}

export default Virtual;