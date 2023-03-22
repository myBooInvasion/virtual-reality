/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.2 Leo.glb --transform --shadows --keepnames
*/

import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations, useKeyboardControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useXR } from '@react-three/xr';
import { Vector2, Vector3 } from 'three';
import { BallCollider, RigidBody } from '@react-three/rapier';

const vectorVelocity = new Vector3();
const stickArea = new Vector2();

export function LeoVR(props) {
   // refs
   const group = useRef();
   const leonard = useRef();

   // useGLTF
   const { nodes, materials, animations } = useGLTF('/model/Leo-transformed.glb');
   const { actions } = useAnimations(animations, group);
   
   // XR hooks
   const { controllers, session } = useXR();

   // Three fiber hooks
   const { camera } = useThree();

   // Local state
   const [pose, setPose] = useState('Idle');

   // Keyboard controls hooks
   const [, getKey] = useKeyboardControls();

   // EFFECT
   useEffect(() => {
      actions[pose].reset().fadeIn(0.5).play();

      return () => {
         actions[pose].fadeOut(0.5);
      }
   }, [pose, actions]);
   useEffect(() => {
      if (session === null) {
         camera.position.set(0, 2, 4);
      }
      console.log('session call');
   }, [session, camera]);

   // create useframe
   useFrame((state, delta) => {
      if (session) {
         if (controllers.length !== 0) {
            movementCharacter();
         }
      } else {
         movementCharacterFPS();
      }
   });

   // movement character in VR mode
   const movementCharacter = () => {
      const originalVelocity = leonard.current.linvel();
      const yAxesJoystick = controllers[1].inputSource.gamepad.axes[3];
      const xAxesJoystick = controllers[1].inputSource.gamepad.axes[2];

      stickArea.set(xAxesJoystick, yAxesJoystick);
      let angle = stickArea.angle();
      if (angle >= 5.5 || (angle <= 0.5 && angle !== 0)) {
         setPose('Right');
      } else if (angle <= 2.5 && angle >= 0.5) {
         setPose('Backward');
      } else if (angle <= 3.5 && angle >= 2.5) {
         setPose('Left');
      } else if (angle <= 5.5 && angle >= 3.5) {
         setPose('Walking');
      } else {
         setPose('Idle');
      }

      vectorVelocity.set(xAxesJoystick, 0, yAxesJoystick).multiplyScalar(1);

      leonard.current.setLinvel({ x: vectorVelocity.x, y: originalVelocity.y, z: vectorVelocity.z }, true);
   }

   // movement character in FPS mode
   const movementCharacterFPS = () => {
      const { forward, backward, left, right } = getKey();
      const originalVelocity = leonard.current.linvel();

      vectorVelocity.set(right - left, 0, backward - forward).multiplyScalar(1);

      leonard.current.setLinvel({ x: vectorVelocity.x, y: originalVelocity.y, z: vectorVelocity.z }, true);
   }

   return (
      <group ref={group} {...props} dispose={null}>
         <group name="Scene">
            <RigidBody ref={leonard} colliders={false} type='dynamic' position={[0, 2, 1]} lockRotations name='leonard'>
               <group name="Armature" rotation={[-Math.PI / 2, -Math.PI, 0]} scale={0.007}>
                  <primitive object={nodes.mixamorig9Hips} />
                  <skinnedMesh castShadow name="Ch31_Body" geometry={nodes.Ch31_Body.geometry} material={materials.Ch31_body} skeleton={nodes.Ch31_Body.skeleton} />
                  <skinnedMesh castShadow name="Ch31_Collar" geometry={nodes.Ch31_Collar.geometry} material={materials.Ch31_body} skeleton={nodes.Ch31_Collar.skeleton} />
                  <skinnedMesh castShadow name="Ch31_Eyelashes" geometry={nodes.Ch31_Eyelashes.geometry} material={materials.Ch31_hair} skeleton={nodes.Ch31_Eyelashes.skeleton} />
                  <skinnedMesh castShadow name="Ch31_Hair" geometry={nodes.Ch31_Hair.geometry} material={materials.Ch31_hair} skeleton={nodes.Ch31_Hair.skeleton} />
                  <skinnedMesh castShadow name="Ch31_Pants" geometry={nodes.Ch31_Pants.geometry} material={materials.Ch31_body} skeleton={nodes.Ch31_Pants.skeleton} />
                  <skinnedMesh castShadow name="Ch31_Shoes" geometry={nodes.Ch31_Shoes.geometry} material={materials.Ch31_body} skeleton={nodes.Ch31_Shoes.skeleton} />
                  <skinnedMesh castShadow name="Ch31_Sweater" geometry={nodes.Ch31_Sweater.geometry} material={materials.Ch31_body} skeleton={nodes.Ch31_Sweater.skeleton} />
               </group>
               <BallCollider mass={70} args={[0.2]} position={[0, 0.198, 0]} />
            </RigidBody>
         </group>
      </group>
   );
}

useGLTF.preload('/model/Leo-transformed.glb');