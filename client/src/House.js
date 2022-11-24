import React, { useRef, useEffect, useState } from "react";
import { useLoader, extend } from "react-three-fiber";
import * as THREE from "three";
import { Text, } from "troika-three-text";
import doorColorTextureLoader from "./assets/textures/door/color.jpg";
import doorAlphaTextureLoader from "./assets/textures/door/alpha.jpg";
import doorAoTextureLoader from "./assets/textures/door/ambientOcclusion.jpg";
import doorHeightTextureLoader from "./assets/textures/door/height.jpg";
import doorNormalTextureLoader from "./assets/textures/door/normal.jpg";
import doorMetalnessTextureLoader from "./assets/textures/door/metalness.jpg";
import doorRoughnessTextureLoader from "./assets/textures/door/roughness.jpg";
import Bush from "./Bush";
import bricksColorTextureLoader from "./assets/textures/bricks/color.jpg";
import bricksAoTextureLoader from "./assets/textures/bricks/ambientOcclusion.jpg";
import bricksRoughnessTextureLoader from "./assets/textures/bricks/roughness.jpg";
import bricksNormalTextureLoader from "./assets/textures/bricks/normal.jpg";
import fonts from "./fonts";

extend({ Text });

const House = ({ id, units, requester, updater, sendPayload }) => {
  const [newUnits, setNewUnits] = useState(units);
  const [lightIntensity, setLightIntensity] = useState(5);
  const door = useRef();
  const bricks = useRef();
  const doorLight = useRef();
      const [opts, setOpts] = useState({
        font: "Philosopher",
        fontSize: 0.5,
        color: "white",
        maxWidth: 300,
        lineHeight: 1,
        letterSpacing: 0,
        textAlign: "justify",
        materialType: "MeshPhongMaterial",
      });
  const [
    doorColorTexture,
    doorAlphaTexture,
    doorAmbientOcclusionTexture,
    doorHeightTexture,
    doorNormalTexture,
    doorMetalnessTexture,
    doorRoughnessTexture,
  ] = useLoader(THREE.TextureLoader, [
    doorColorTextureLoader,
    doorAlphaTextureLoader,
    doorAoTextureLoader,
    doorHeightTextureLoader,
    doorNormalTextureLoader,
    doorMetalnessTextureLoader,
    doorRoughnessTextureLoader,
  ]);

  const [
    bricksColorTexture,
    bricksAmbientOcclusionTexture,
    bricksRoughnessTexture,
    bricksNormalTexture,
  ] = useLoader(THREE.TextureLoader, [
    bricksColorTextureLoader,
    bricksAoTextureLoader,
    bricksRoughnessTextureLoader,
    bricksNormalTextureLoader,
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

  // When ever you recieve a balance request
  useEffect(() => {
    if (requester) {
      sendPayload(
        "unitBalanceResponder",
        JSON.stringify({ buildingID: id, units: newUnits })
      );
    }
  }, [requester]);

  useEffect(() => {
    if (updater && updater.buildingID == id) {
      setNewUnits(updater.units);
    }
  }, [updater]);

  useEffect(() => {
    if (newUnits < 50) {
      setLightIntensity(3);
    }
    if (newUnits < 30) {
      setLightIntensity(2);
    }
    if (newUnits < 20) {
      setLightIntensity(1);
    }
    if (newUnits < 10) {
      setLightIntensity(0.5);
    }
    if (newUnits <= 0) {
      setLightIntensity(0);
    }
  }, [newUnits]);

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
        <text
          {...opts}
          text={`${newUnits} Watts`}
          font={fonts[opts.font]}
          anchorX="center"
          anchorY="bottom"
          position-z={1}
          position-y={2}
        >
          {opts.materialType === "MeshPhongMaterial" ? (
            <meshPhongMaterial attach="material" color={opts.color} />
          ) : null}
        </text>
      </mesh>

      <pointLight
        castShadow={true}
        ref={doorLight}
        intensity={lightIntensity}
        color="#ff7d46"
        distance={7}
        position={[0, 2.2, 2.7]}
      />
      <Bush position={[0.8, 0.2, 2.2]} scale={[0.5, 0.5, 0.5]} />
      <Bush position={[1.4, 0.1, 2.1]} scale={[0.25, 0.25, 0.25]} />
      <Bush position={[-0.8, 0.1, 2.2]} scale={[0.4, 0.4, 0.4]} />
      <Bush position={[-1, 0.05, 2.6]} scale={[0.15, 0.15, 0.15]} />
    </group>
  );
};

export default House;
