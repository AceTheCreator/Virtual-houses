import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import * as mqtt from "react-paho-mqtt";

import House from "./House";
import Grass from "./Grass";

import "./styles.css";

const houses = [
  {
    units: 100,
    position: [-1.2, 0, 0],
  },
  {
    units: 80,
    position: [-6.2, 0, 0],
  },
  {
    units: 50,
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
  const [client, setClient] = useState(null);
  const [requester, setRequester] = useState(null);
  const [updater, setUpdater] = useState(null);
  const _topics = ["unitBalanceRequester", "unitBalanceUpdater"];
  const _init = () => {
    const c = mqtt.connect(
      "test.mosquitto.org",
      Number(8081),
      "mqtt",
      _onConnectionLost,
      _onMessageArrived
    );
    setClient(c);
  };

  const _onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost: " + responseObject.errorMessage);
    }
  };

  const _onMessageArrived = (message) => {
    if (message.destinationName === _topics[0]) {
      setRequester(message.payloadString);
    }
    if (message.destinationName === _topics[1]) {
      console.log(JSON.parse(message.payloadString));
      setUpdater(JSON.parse(message.payloadString));
    }
  };
  const _sendPayload = (channel, message) => {
    const payload = mqtt.parsePayload(channel, message)
    client.send(payload)
  }

  useEffect(() => {
    _init();
  }, []);

  useEffect(() => {
    if (client) {
      onConnect();
    }
  }, [client]);

  const onConnect = () => {
    client.connect({
      reconnect: true,
      onSuccess: () => {
        for (var i = 0; i < _topics.length; i++) {
          client.subscribe(_topics[i], {});
        }
      },
    });
  };
  return (
    <Canvas style={{ height: `100vh` }} shadowMap={true}>
      <color attach="background" args={["#262837"]} />
      <fog attach="fog" args={["#262837", 1, 15]} />
      <Camera position={[4, 2, 5]} />
      <ambientLight intensity={0.15} color="#b9d5ff" />

      <Suspense fallback={null}>
        {houses.map((house, i) => (
          <mesh key={i} position={house.position}>
            <House id={i} requester={requester} units={house.units} updater={updater} sendPayload={_sendPayload} />
          </mesh>
        ))}
        <Grass />
      </Suspense>

      <OrbitControls />
    </Canvas>
  );
}
