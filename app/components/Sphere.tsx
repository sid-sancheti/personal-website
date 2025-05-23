"use client";

import "@/global.css";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useState, useRef, useMemo } from "react";
import * as THREE from "three";

const NUM_POINTS = 2000;
const SCALE = 0.9;

function populateSpherePoints(): Float32Array {
  const positions = new Float32Array(NUM_POINTS * 3);
  let s = -1 + 1.0 / (NUM_POINTS - 1);
  const stepSize = (2.0 - 2.0 / (NUM_POINTS - 1)) / (NUM_POINTS - 1);
  const x = 0.1 + 1.2 * NUM_POINTS;

  for (let i = 0; i < NUM_POINTS; i++, s += stepSize) {
    const u = s * x;
    const v = (Math.PI / 2) * Math.sign(s) * (1 - Math.sqrt(1 - Math.abs(s)));

    positions[i * 3] = SCALE * Math.cos(u) * Math.cos(v);
    positions[i * 3 + 1] = SCALE * Math.sin(u) * Math.cos(v);
    positions[i * 3 + 2] = SCALE * Math.sin(v);
  }

  return positions;
}

function SpherePoints() {
  const ref = useRef<THREE.Points>(null);
  const points = useMemo(() => {
    const positions = populateSpherePoints();
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const spriteTexture = useLoader(THREE.TextureLoader, "/white_circle.png");

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.0005;
      ref.current.rotation.y += 0.0005;
    }
  });

  // Creating the clipping plane
  const clippingPlane = useMemo(() => {
    return new THREE.Plane(new THREE.Vector3(0, 0, 1), 0.0);
  }, []);

  return (
    <>
      <points ref={ref} geometry={points} dispose={null}>
        <pointsMaterial
          size={0.02}
          side={THREE.DoubleSide}
          sizeAttenuation={true}
          map={spriteTexture}
          alphaTest={0.1}
          clippingPlanes={[clippingPlane]}
        />
      </points>

    </>
  );
}

export default function App() {
  const [size, setSize] = useState({ width: 500, height: 500 });

  useEffect(() => {
    setSize({
      width: window.innerHeight / 1.5,
      height: window.innerHeight / 1.5,
    });
  }, []);


  return (
    <Canvas
      camera={{ position: [0, 0, 1.55] }}
      style={{
        backgroundColor: "#222",
        width: `${size.width}px`,
        height: `${size.height}px`,
        position: "absolute",
        left: "80%",
        top: "60%",
        zIndex: 1,
      }}
    >
      <SpherePoints />
    </Canvas>
  );
}
