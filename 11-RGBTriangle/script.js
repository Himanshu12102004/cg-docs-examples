//Step 1: Set the viewport
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl2");
canvas.height = window.innerHeight; // For making the canvas full screen
canvas.width = window.innerWidth; // For making the canvas full screen
gl.viewport(0, 0, canvas.width, canvas.height);

//Step 2: Write the shaders
// vertex shader
const vertexShaderSource = `#version 300 es
in vec2 a_position;
in vec3 a_color;
out vec3 frag_color;
void main(){
  gl_Position = vec4(a_position,0,1);
  gl_PointSize = 30.0;
  frag_color = a_color;
}`;

// fragment shader
const fragmentShaderSource = `# version 300 es
precision mediump float;

out vec4 color;
void main(){
  color = vec4(1,0,0,1); 
}`;

// Step 3: Compile the shaders
const vertexShader = utilCreateShader(gl, gl.VERTEX_SHADER, vertexShaderSource);

const fragmentShader = utilCreateShader(
  gl,
  gl.FRAGMENT_SHADER,
  fragmentShaderSource
);

// Step 4: Create a WebGL program
const program = utilCreateProgram(gl, vertexShader, fragmentShader);

const pointsCoordinates = [
  0,
  0.5, // First point
  -0.5,
  -0.5, // Second point
  0.5,
  -0.5, // Third point
];

const a_position_location = gl.getAttribLocation(program, "a_position");
// Create Buffer
const pointsBuffer = utilCreateBuffer(
  gl,
  a_position_location,
  pointsCoordinates,
  2,
  0,
  0
);
// Step 7: Use the WebGL program
gl.useProgram(program);

// Step 8: Issue the draw call
gl.drawArrays(gl.TRIANGLES, 0, 3);
