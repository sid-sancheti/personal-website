/**
 https://chatgpt.com/share/6745a91b-9338-8003-9711-b7494923e589
 */

import { mat4, vec3 } from 'gl-matrix';

var vextexShaderText = `#version 300 es
precision mediump float;

in vec3 aPos;
uniform mat4 rotation;
void main() {
  gl_Position = rotation * vec4(aPos, 1.0);
  gl_PointSize = (gl_Position.z + 0.5) / 0.25;     // Map z: [-1, 1] to PointSize: [0, 6]
}`;

var fragmentShaderText = `#version 300 es
precision mediump float;

out vec4 FragColor;
void main(void) {
  // gl_PointCoord gives a normalized [0, 1] range
  vec2 coord = gl_PointCoord - vec2(0.5);
  float distanceFromCenter = length(coord);
  // If the fragment is outside the circle, discard it
  if (distanceFromCenter > 0.5) {
    discard;
  }

  // Use depth to control color
  if (gl_FragCoord.z < 0.3) {
    FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  } else {
    FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
}`;

const NUM_POINTS = 2000;
const SCALE = 0.9;

/**
 * Generates a 3D array of points that represent a sphere
 *
 * Uses the formula specified in the following paper:
 * @link https://scholar.rose-hulman.edu/cgi/viewcontent.cgi?article=1387&context=rhumj
 * @returns {number[]} - A 3D array of NUM_POINTS number of points
 */
function populate3DArray() {
  const points = new Array(NUM_POINTS * 3);
  var s = -1 + 1.0 / (NUM_POINTS - 1);
  const stepSize = (2.0 - 2.0 / (NUM_POINTS - 1)) / (NUM_POINTS - 1);
  const x = 0.1 + 1.2 * NUM_POINTS;

  for (var i = 0; i < NUM_POINTS * 3; i += 3, s += stepSize) {
    const u = s * x;
    const v = (Math.PI / 2) * Math.sign(s) * (1 - Math.sqrt(1 - Math.abs(s)));

    points[i] = SCALE * Math.cos(u) * Math.cos(v);
    points[i + 1] = SCALE * Math.sin(u) * Math.cos(v);
    points[i + 2] = SCALE * Math.sin(v);
  }

  return points;
}

export function InitSphere() {
  console.log("Hello World!");
  const canvas = document.getElementById("sphere");
  var gl = canvas.getContext("webgl2");

  if (!gl) {
    console.log("WebGL2 not supported, falling back on experimental-webgl");
    gl = canvas.getContext("experimental-webgl");
  }

  if (!gl) {
    alert("Your browser does not support WebGL");
  }

  // Resize the canvas to match the window size
  const resizeCanvas = () => {
    canvas.width = window.innerWidth / 1.2;
    canvas.height = window.innerHeight / 1.2;

    // Center the viewport
    var min = canvas.width < canvas.height ? canvas.width : canvas.height;
    var xOffset = (canvas.width - min) / 2;
    var yOffset = (canvas.height - min) / 2;
    gl.viewport(xOffset, yOffset, min, min);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  };

  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vextexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);

  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error(
      "ERROR compiling vertex shader!",
      gl.getShaderInfoLog(vertexShader)
    );
    return;
  }

  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error(
      "ERROR compiling fragment shader!",
      gl.getShaderInfoLog(fragmentShader)
    );
    return;
  }

  // Combine the shaders into a program.
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("ERROR linking program!", gl.getProgramInfoLog(program));
    return;
  }

  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error("ERROR validating program!", gl.getProgramInfoLog(program));
    return;
  }
  gl.useProgram(program);

  var points = populate3DArray();
  var pointBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pointBufferObject);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

  var positionAttribLocation = gl.getAttribLocation(program, "aPos");
  gl.vertexAttribPointer(
    positionAttribLocation,
    3,
    gl.FLOAT,
    false,
    3 * Float32Array.BYTES_PER_ELEMENT,
    0
  );

  gl.enableVertexAttribArray(positionAttribLocation);

  var rotationUniformLocation = gl.getUniformLocation(program, "rotation");
  var projectionUniformLocation = gl.getUniformLocation(program, "projection");

  var rotation = new Float32Array(16);
  mat4.identity(rotation);

  var directionVector = new Float32Array(3);
  vec3.set(directionVector, -2, 3, 1);
  vec3.normalize(directionVector, directionVector);

  var identity = new Float32Array(16);
  mat4.identity(identity);
  /*
   * Main loop
   */
  var loop = function () {
    var theta = (performance.now() / 1000 / 100) * 2 * Math.PI;
    mat4.rotate(rotation, identity, theta, directionVector);

    gl.uniformMatrix4fv(rotationUniformLocation, gl.FALSE, rotation);

    gl.useProgram(program);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, NUM_POINTS);

    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
