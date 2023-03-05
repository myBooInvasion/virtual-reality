import { useTexture } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React from 'react';
import { DoubleSide, RepeatWrapping, Vector2 } from 'three';

function Map() {
  const [diffuse, rough, nor, AO] = useTexture([
    '/textures/pavement/hexagonal_concrete_paving_diff_4k.jpg',
    '/textures/pavement/hexagonal_concrete_paving_rough_4k.jpg',
    '/textures/pavement/hexagonal_concrete_paving_nor_gl_4k.jpg',
    '/textures/pavement/hexagonal_concrete_paving_ao_4k.jpg',
  ], () => {
    diffuse.wrapS = diffuse.wrapT = RepeatWrapping;
    diffuse.repeat = new Vector2(5, 5);
    rough.wrapS = rough.wrapT = RepeatWrapping;
    rough.repeat = new Vector2(5, 5);
    nor.wrapS = nor.wrapT = RepeatWrapping;
    nor.repeat = new Vector2(5, 5);
    AO.wrapS = AO.wrapT = RepeatWrapping;
    AO.repeat = new Vector2(5, 5);
  });

  return (
    <RigidBody colliders='hull' type='fixed' position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <planeGeometry args={[20, 20, 100, 100]} />
        <meshStandardMaterial side={DoubleSide} map={diffuse} roughnessMap={rough} normalMap={nor} aoMap={AO} />
      </mesh>
    </RigidBody>
  );
}

export default Map;