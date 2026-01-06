const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl2");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0, 0, 0, 1);

const vertexShaderSource = `#version 300 es
in vec2 a_position;
void main(){
  gl_Position = vec4(a_position, 0, 1);
  gl_PointSize = 30.0;
}
`;

const fragmentShaderSource = `#version 300 es
precision mediump float;
out vec4 color;
void main(){
  color = vec4(1,0,0,1);
}
`;

const vertexShader = utilCreateShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = utilCreateShader(
  gl,
  gl.FRAGMENT_SHADER,
  fragmentShaderSource
);

const program = utilCreateProgram(gl, vertexShader, fragmentShader);

gl.useProgram(program);

let pointPosition = [0, 0];
const a_positionLocation = gl.getAttribLocation(program, "a_position");
const buffer = utilCreateBuffer(gl, pointPosition);
gl.vertexAttribPointer(a_positionLocation, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(a_positionLocation);

function animate() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  pointPosition[0] += 0.005;
  if(pointPosition[0] > 1){
    pointPosition[0] = 0;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(pointPosition),
    gl.STATIC_DRAW
  );
  gl.drawArrays(gl.POINTS, 0, 1);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
