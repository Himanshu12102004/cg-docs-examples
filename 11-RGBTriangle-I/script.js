//Step 1: Set the viewport
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl2");
canvas.height = window.innerHeight; // For making the canvas full screen
canvas.width = window.innerWidth; // For making the canvas full screen
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT)
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
in vec3 frag_color;
out vec4 color;
void main(){
  color = vec4(frag_color,1);
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
  0, 0.5, // First point
  -0.5, -0.5, // Second point
  0.5, -0.5, // Third point
];

const vertexColor = [
  1, 0, 0, // first vertex color
  0, 1, 0, // second vertex color
  0, 0, 1 // third vertex color
]

const a_position_location = gl.getAttribLocation(program, "a_position");
const a_color_location = gl.getAttribLocation(program, "a_color");

const pointsBuffer = utilCreateBuffer(gl, a_position_location, pointsCoordinates);
gl.vertexAttribPointer(a_position_location, 2, gl.FLOAT, false, 0, 0);

const colorBuffer = utilCreateBuffer(gl, a_color_location, vertexColor);
gl.vertexAttribPointer(a_color_location, 3, gl.FLOAT, false, 0, 0);

// Step 7: Use the WebGL program
gl.useProgram(program);

// Step 8: Issue the draw call
gl.drawArrays(gl.TRIANGLES, 0, 3);
