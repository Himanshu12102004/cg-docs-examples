function utilCreateShader(gl, shaderType, shaderSource) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (shaderType == gl.VERTEX_SHADER) {
      console.error("Error in vertex shader:");
    } else {
      console.error("Error in fragment shader:");
    }
    const error = gl.getShaderInfoLog(shader);
    console.error(error);
    throw error;
  }
  return shader;
}

function utilCreateProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const error = gl.getProgramInfoLog(program);
    throw error;
  }
  return program;
}

function utilCreateBuffer(gl, attribLocation, data) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(attribLocation);
  return buffer;
}
