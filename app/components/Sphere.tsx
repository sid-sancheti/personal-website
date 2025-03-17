// Sphere.tsx
"use client"

import * as THREE from "three";
import React, { useMemo, useRef, useFrame } from "react";
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
    const v = (globalThis.Math.PI / 2) * globalThis.Math.sign(s) * (1 - globalThis.Math.sqrt(1 - globalThis.Math.abs(s)));

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
    return populateSpherePoints();
  }, []);

  const clippedPoints = useMemo(() => {
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0.5); // Plane at z = 0.5
    return points.filter((point) => plane.distanceToPoint(point) > 0);
  }, [points]);

  const float32Array = useMemo(() => {
    return new Float32Array(clippedPoints.flatMap(v => [v.x, v.y, v.z]));
  }, [clippedPoints]);

  return (
    <Points positions={float32Array} frustumCulled={false}>
      <PointMaterial size={0.02} sizeAttenuation color="white" transparent alphaTest={0.5} depthWrite={false}/>
    </Points>
  );
};

export default function Sphere() {
  const sphereRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x += 0.005;
      sphereRef.current.rotation.y += 0.005;
      sphereRef.current.rotation.z += 0.005;
    }
  });

  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <ambientLight />
      <group ref={sphereRef}>
        <SpherePoints />
      </group>
    </Canvas>
  );
}