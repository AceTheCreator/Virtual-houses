import React, { useRef, useEffect } from "react";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

import grassColorTextureLoader from "./assets/textures/grass/color.jpg";
import grassAoTextureLoader from "./assets/textures/grass/ambientOcclusion.jpg";
import grassRoughnessTextureLoader from "./assets/textures/grass/roughness.jpg";
import grassNormalTextureLoader from "./assets/textures/grass/normal.jpg";

const Grass = () => {
  const grass = useRef();

  const [
    grassColorTexture,
    grassAmbientOcclusionTexture,
    grassRoughnessTexture,
    grassNormalTexture
  ] = useLoader(THREE.TextureLoader, [
    grassColorTextureLoader,
    grassAoTextureLoader,
    grassRoughnessTextureLoader,
    grassNormalTextureLoader
  ]);

  useEffect(() => {
    grass.current.geometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(
        grass.current.geometry.attributes.uv.array,
        2
      )
    );

    grassColorTexture.repeat.set(8, 8);
    grassAmbientOcclusionTexture.repeat.set(8, 8);
    grassNormalTexture.repeat.set(8, 8);
    grassRoughnessTexture.repeat.set(8, 8);

    grassColorTexture.wrapS = THREE.RepeatWrapping;
    grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
    grassNormalTexture.wrapS = THREE.RepeatWrapping;
    grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

    grassColorTexture.wrapT = THREE.RepeatWrapping;
    grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
    grassNormalTexture.wrapT = THREE.RepeatWrapping;
    grassRoughnessTexture.wrapT = THREE.RepeatWrapping;
  });

  return (
    <mesh ref={grass} rotation={[-Math.PI * 0.5, 0, 0]} receiveShadow={true}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial
        map={grassColorTexture}
        aoMap={grassAmbientOcclusionTexture}
        normalMap={grassNormalTexture}
        roughnessMap={grassRoughnessTexture}
      />
    </mesh>
  );
};

export default Grass;
