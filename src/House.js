import React, { useRef, useEffect } from "react";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

import doorColorTextureLoader from "./assets/textures/door/color.jpg";
import doorAlphaTextureLoader from "./assets/textures/door/alpha.jpg";
import doorAoTextureLoader from "./assets/textures/door/ambientOcclusion.jpg";
import doorHeightTextureLoader from "./assets/textures/door/height.jpg";
import doorNormalTextureLoader from "./assets/textures/door/normal.jpg";
import doorMetalnessTextureLoader from "./assets/textures/door/metalness.jpg";
import doorRoughnessTextureLoader from "./assets/textures/door/roughness.jpg";

import bricksColorTextureLoader from "./assets/textures/bricks/color.jpg";
import bricksAoTextureLoader from "./assets/textures/bricks/ambientOcclusion.jpg";
import bricksRoughnessTextureLoader from "./assets/textures/bricks/roughness.jpg";
import bricksNormalTextureLoader from "./assets/textures/bricks/normal.jpg";

const House = () => {
  const door = useRef();
  const bricks = useRef();
  const doorLight = useRef();

  const [
    doorColorTexture,
    doorAlphaTexture,
    doorAmbientOcclusionTexture,
    doorHeightTexture,
    doorNormalTexture,
    doorMetalnessTexture,
    doorRoughnessTexture
  ] = useLoader(THREE.TextureLoader, [
    doorColorTextureLoader,
    doorAlphaTextureLoader,
    doorAoTextureLoader,
    doorHeightTextureLoader,
    doorNormalTextureLoader,
    doorMetalnessTextureLoader,
    doorRoughnessTextureLoader
  ]);

  const [
    bricksColorTexture,
    bricksAmbientOcclusionTexture,
    bricksRoughnessTexture,
    bricksNormalTexture
  ] = useLoader(THREE.TextureLoader, [
    bricksColorTextureLoader,
    bricksAoTextureLoader,
    bricksRoughnessTextureLoader,
    bricksNormalTextureLoader
  ]);

  useEffect(() => {
    door.current.geometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(
        door.current.geometry.attributes.uv.array,
        2
      )
    );

    bricks.current.geometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(
        bricks.current.geometry.attributes.uv.array,
        2
      )
    );
  }, []);

  return (
    <group>
      <mesh position={[0, 3, 0]} rotation={[0, Math.PI * 0.25, 0]}>
        <coneGeometry args={[3.5, 1, 4]} />
        <meshStandardMaterial color="#b35f45" />
      </mesh>

      <mesh ref={bricks} position={[0, 1.25, 0]} castShadow={true}>
        <boxGeometry args={[4, 2.5, 4]} />
        <meshStandardMaterial
          map={bricksColorTexture}
          aoMap={bricksAmbientOcclusionTexture}
          normalMap={bricksNormalTexture}
          roughnessMap={bricksRoughnessTexture}
        />
      </mesh>

      <mesh ref={door} position={[0, 1, 2.001]}>
        <planeGeometry args={[2.2, 2.2, 100, 100]} />
        <meshStandardMaterial
          transparent={true}
          displacementScale={0.1}
          map={doorColorTexture}
          alphaMap={doorAlphaTexture}
          aoMap={doorAmbientOcclusionTexture}
          displacementMap={doorHeightTexture}
          normalMap={doorNormalTexture}
          metalnessMap={doorMetalnessTexture}
          roughnessMap={doorRoughnessTexture}
        />
      </mesh>

      <pointLight
        castShadow={true}
        ref={doorLight}
        intensity={1}
        color="#ff7d46"
        distance={7}
        position={[0, 2.2, 2.7]}
      />
    </group>
  );
};

export default House;
