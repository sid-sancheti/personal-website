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
    <div>
      <canvas id="sphere" style={SphereStyle}>
        Your browser does not support HTML5
      </canvas>
    </div>
  );
};

export default Sphere;
