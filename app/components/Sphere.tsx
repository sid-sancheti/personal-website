// components/Sphere.tsx
"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

const NUM_POINTS = 2000;
const SCALE = 0.9;

// Color of the background
const BACKGROUND_COLOR = 0x000000;

/**
 * Generates a 3D array of points that represent a sphere
 *
 * Uses the formula specified in the following paper:
 * @link https://scholar.rose-hulman.edu/cgi/viewcontent.cgi?article=1387&context=rhumj
 * @returns {THREE.Vector3} - An array of NUM_POINTS number of Vector3 points
 */
function populateSpherePoints(): THREE .Vector3[] {
  let points: THREE.Vector3[] = [];
  let s = -1 + 1.0 / (NUM_POINTS - 1);
  const stepSize = (2.0 - 2.0 / (NUM_POINTS - 1)) / (NUM_POINTS - 1);
  const x = 0.1 + 1.2 * NUM_POINTS;

  for (let i = 0; i < NUM_POINTS; i++, s += stepSize) {
    const u = s * x;
    const v = (Math.PI / 2) * Math.sign(s) * (1 - Math.sqrt(1 - Math.abs(s)));

    points.push(
      new THREE.Vector3(
        SCALE * Math.cos(u) * Math.cos(v),
        SCALE * Math.sin(u) * Math.cos(v),
        SCALE * Math.sin(v)
      )
    );
  }

  return points;
}

const Sphere: React.FC = () => {
  const points = populateSpherePoints();
  const groupRef = useRef<THREE.Group>(null);

  return (
    <Canvas
      id="canvas"
      style={{
        background: `#${BACKGROUND_COLOR.toString(16)}`,
        position: "absolute",
        top: "59%",
        left: "78%",
      }}
    >
      <ambientLight intensity={0.5} />
      {/* <pointLight position={} /> */}
      <group ref={groupRef}>
        {points.map((point, index) => (
          <mesh key={index} position={point}>
            <sphereGeometry args={[0.01, 32, 32]} />
            <meshStandardMaterial color={point.z < 0.3 ? "black" : "white"} />
          </mesh>
        ))}
      </group>
    </Canvas>
  );
};

export default Sphere;
