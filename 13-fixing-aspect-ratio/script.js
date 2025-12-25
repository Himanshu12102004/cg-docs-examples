// Step 1: Set the viewport and clear the canvas
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl2");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

// Step 2: Write the shaders
// Vertex shader
const vertexShaderSource = `#version 300 es
in vec2 a_position;
in vec3 a_color;
uniform float u_aspectRatio;
out vec3 frag_color;
void main() {
    gl_Position = vec4(a_position.x, a_position.y*u_aspectRatio, 0, 1);
    frag_color = a_color;
}`;

// Fragment shader
const fragmentShaderSource = `#version 300 es
precision mediump float;
in vec3 frag_color;
out vec4 color;
void main() {
    color = vec4(frag_color, 1);
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

// Step 5: Define square vertices and colors using TRIANGLE_STRIP
const vertexCoordinatesAndColors = [
  // x, y, r, g, b
  -0.5,
  0.5,
  1.0,
  0.0,
  0.0, // Top-left → Red
  -0.5,
  -0.5,
  0.0,
  1.0,
  0.0, // Bottom-left → Green
  0.5,
  0.5,
  0.0,
  0.0,
  1.0, // Top-right → Blue
  0.5,
  -0.5,
  1.0,
  1.0,
  0.0, // Bottom-right → Yellow
];

// Step 6: Get attribute locations
const a_position_location = gl.getAttribLocation(program, "a_position");
const a_color_location = gl.getAttribLocation(program, "a_color");

// Step 7: Use the WebGL program and create buffer
gl.useProgram(program);

const u_resolution_location = gl.getUniformLocation(program, "u_aspectRatio");
gl.uniform1f(u_resolution_location, canvas.width / canvas.height);

const buffer = utilCreateBuffer(gl, vertexCoordinatesAndColors);
gl.vertexAttribPointer(a_position_location, 2, gl.FLOAT, false, 5 * 4, 0);
gl.enableVertexAttribArray(a_position_location);
gl.vertexAttribPointer(a_color_location, 3, gl.FLOAT, false, 5 * 4, 2 * 4);
gl.enableVertexAttribArray(a_color_location);

// Step 8: Draw the square using TRIANGLE_STRIP
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
