import React, { useState, useEffect } from "react";

const Graves = () => {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    let graves = [];

    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 6;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      graves.push({ x: x, z: z });
    }

    setCoordinates(graves);
  }, []);

  return (
    <group>
      {coordinates.map((coordinate, index) => {
        return (
          <mesh
            key={index}
            castShadow={true}
            position={[coordinate.x, 0.3, coordinate.z]}
            rotation={[
              0,
              (Math.random() - 0.5) * 0.4,
              (Math.random() - 0.5) * 0.4
            ]}
          >
            <boxGeometry args={[0.6, 0.8, 0.2]} />
            <meshStandardMaterial color="#b2b6b1" />
          </mesh>
        );
      })}
    </group>
  );
};

export default Graves;
