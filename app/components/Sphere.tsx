// Sphere.tsx
"use client"

import * as THREE from "three";
import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

const NUM_POINTS = 2000;
const SCALE = 0.9;

function populateSpherePoints(): THREE.Vector3[] {
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

const SpherePoints = () => {
  const points = useMemo(() => {
    return new Float32Array(populateSpherePoints().flatMap(v => [v.x, v.y, v.z]));
  }, []);

  return (
    <Points positions={points} frustumCulled={false}>
      <PointMaterial size={0.02} sizeAttenuation color="white" />
    </Points>
  );
};

export default function Sphere() {
  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <ambientLight />
      <SpherePoints />
    </Canvas>
  );
}
