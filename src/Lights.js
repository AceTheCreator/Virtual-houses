import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

const Lights = () => {
  const clock = new THREE.Clock();
  const ghost1 = useRef();
  const ghost2 = useRef();
  const ghost3 = useRef();
  const moonLight = useRef();

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();

    const ghost1Angle = elapsedTime * 0.5;
    ghost1.current.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.current.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.current.position.y = Math.sin(elapsedTime * 3);
    ghost1.current.shadow.mapSize.width = 256;
    ghost1.current.shadow.mapSize.height = 256;
    ghost1.current.shadow.camera.far = 7;

    const ghost2Angle = -elapsedTime * 0.32;
    ghost2.current.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.current.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.current.position.y =
      Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);
    ghost2.current.shadow.mapSize.width = 256;
    ghost2.current.shadow.mapSize.height = 256;
    ghost2.current.shadow.camera.far = 7;

    const ghost3Angle = -elapsedTime * 0.18;
    ghost3.current.position.x =
      Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
    ghost3.current.position.z =
      Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
    ghost3.current.position.y =
      Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 2);
    ghost3.current.shadow.mapSize.width = 256;
    ghost3.current.shadow.mapSize.height = 256;
    ghost3.current.shadow.camera.far = 7;

    moonLight.current.shadow.mapSize.width = 256;
    moonLight.current.shadow.mapSize.height = 256;
    moonLight.current.shadow.camera.far = 15;
  });

  return (
    <>
      <pointLight
        ref={ghost1}
        castShadow={true}
        color="#ff00ff"
        intensity={2}
        distance={3}
      />
      <pointLight
        ref={ghost2}
        castShadow={true}
        color="#00ffff"
        intensity={2}
        distance={3}
      />
      <pointLight
        ref={ghost3}
        castShadow={true}
        color="#ffff00"
        intensity={2}
        distance={3}
      />

      <directionalLight
        ref={moonLight}
        castShadow={true}
        intensity={0.15}
        color="#b9d5ff"
        position={[4, 5, -2]}
      />
    </>
  );
};

export default Lights;
