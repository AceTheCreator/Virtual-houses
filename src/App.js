import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";

import Lights from "./Lights";
import House from "./House";
import Grass from "./Grass";
import Bush from "./Bush";
import Graves from "./Graves";

import "./styles.css";

const houses = [
  {
    position: [-1.2, 0, 0],
  },
  {
    position: [-6.2, 0, 0],
  },
  {
    position: [4, 0, 0],
  },
];


const Camera = ({ ...rest }) => {
  const camera = useRef();
  const { setDefaultCamera } = useThree();
  const [aspect, setAspect] = useState(null);

  useEffect(() => {
    setDefaultCamera(camera.current);
    setAspect(window.innerWidth / window.innerHeight);
  }, [setDefaultCamera]);

  useFrame(() => camera.current.updateMatrixWorld());

  return (
    <perspectiveCamera ref={camera} args={[75, aspect, 0.1, 100]} {...rest} />
  );
};

export default function App() {
  return (
    <Canvas style={{ height: `100vh` }} shadowMap={true}>
      <color attach="background" args={["#262837"]} />
      <fog attach="fog" args={["#262837", 1, 15]} />
      <Camera position={[4, 2, 5]} />
      <ambientLight intensity={0.15} color="#b9d5ff" />

      <Suspense fallback={null}>
        {houses.map((house, i) => (
          <mesh key={i} position={house.position}>
            <House
              id={i}
            />
          </mesh>
        ))}
        <Grass />
      </Suspense>

      <OrbitControls />
    </Canvas>
  );
}
