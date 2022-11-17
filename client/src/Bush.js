import React from "react";

const Bush = ({ ...rest }) => {
  return (
    <mesh {...rest} castShadow={true}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#89c854" />
    </mesh>
  );
};

export default Bush;
