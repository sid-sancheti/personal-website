import { useEffect, useRef } from "react";
import { InitSphere } from "../scripts/sphere.js";

const SphereStyle = {
    position: "absolute",
    top: "59%",
    left: "78%",
};

const Sphere = () => {
  useEffect(() => {
    InitSphere();
  }, []);

  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Initialize WebGL only if it's not already initialized
    if (!canvasRef.current.dataset.initialized) {
      canvasRef.current.dataset.initialized = true;
      initWebGL(canvasRef.current);
    }
  }, []);

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <canvas id="sphere" style={SphereStyle}>
        Your browser does not support HTML5
      </canvas>
      <br />
      <i>Demo is above this text</i>
    </div>
  );
};

export default Sphere;
