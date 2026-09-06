"use client";

import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec3 aPosition;
attribute vec3 aColor;
uniform float uTime;
uniform float uScroll;
uniform vec2 uPointer;
uniform float uPixelRatio;
uniform float uAspect;
varying vec3 vColor;
varying float vAlpha;

mat2 rotate2d(float angle) {
  float s = sin(angle), c = cos(angle);
  return mat2(c, -s, s, c);
}

void main() {
  vec3 point = aPosition;
  float time = uTime * .12;
  float wave = sin(point.x * 1.4 + time * 2.1) + cos(point.y * 1.15 - time * 1.35) + sin(point.z + time);
  point += normalize(point + vec3(.001)) * wave * .05;

  float orbit = time * .2 + uScroll * 8.4;
  point.xz = rotate2d(orbit * .58) * point.xz;
  point.xy = rotate2d(-orbit * .16 + uPointer.x * .78) * point.xy;
  point.yz = rotate2d(uPointer.y * .55 + sin(time * .35) * .07) * point.yz;
  point *= .9 + .17 * sin(uScroll * 18.85 + aPosition.z * .65);

  vec3 camera = vec3(uPointer.x * 1.45 + sin(uScroll * 7.0) * .2, -uPointer.y * 1.05 + cos(uScroll * 5.0) * .12, 5.0 - sin(uScroll * 15.7) * .34);
  vec3 view = point - camera;
  view.xz = rotate2d(sin(uScroll * 8.2) * .18 + uPointer.x * .36) * view.xz;
  view.xy = rotate2d(sin(uScroll * 11.0) * .045) * view.xy;

  float depth = max(.28, -view.z);
  vec2 projected = view.xy * (1.62 / depth);
  projected.x /= max(1.0, uAspect);
  gl_Position = vec4(projected, 0.0, 1.0);

  float near = clamp(1.13 - depth / 8.0, .12, 1.0);
  gl_PointSize = clamp(5.1 * uPixelRatio * (1.0 / depth) * (1.0 + near), 1.0, 14.0 * uPixelRatio);
  vColor = aColor * (.72 + near * .66);
  float pageExit = 1.0 - smoothstep(.72, .91, uScroll);
  vAlpha = near * .94 * pageExit;
}
`;

const fragmentShader = `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec2 uv = gl_PointCoord - .5;
  float distanceToCenter = dot(uv, uv);
  if (distanceToCenter > .25) discard;
  float glow = exp(-distanceToCenter * 16.0);
  float core = smoothstep(.08, 0.0, distanceToCenter);
  gl_FragColor = vec4(vColor, (glow * .72 + core * .55) * vAlpha);
}
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
  if (!vertex || !fragment) return null;
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  return program;
}

function makeParticles(count) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = [[1.0, .18, .70], [.68, .22, 1.0], [.20, .78, 1.0], [1.0, .55, .92]];
  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const chance = Math.random(), angle = Math.random() * Math.PI * 2, tilt = (Math.random() - .5) * Math.PI;
    let x, y, z;
    if (chance < .48) {
      const outer = 1.25 + Math.random() * .7, inner = (Math.random() - .5) * .72;
      x = (outer + inner * Math.cos(tilt)) * Math.cos(angle);
      y = inner * Math.sin(tilt) * 1.25;
      z = (outer + inner * Math.cos(tilt)) * Math.sin(angle);
    } else if (chance < .82) {
      const radius = .65 + Math.pow(Math.random(), .55) * 1.9;
      x = Math.cos(angle) * Math.cos(tilt) * radius;
      y = Math.sin(tilt) * radius * .78;
      z = Math.sin(angle) * Math.cos(tilt) * radius;
    } else {
      const radius = 1.0 + Math.random() * 2.6;
      x = Math.cos(angle) * radius;
      y = (Math.random() - .5) * 2.4;
      z = Math.sin(angle) * radius;
    }
    positions[offset] = x + (Math.random() - .5) * .09;
    positions[offset + 1] = y + (Math.random() - .5) * .09;
    positions[offset + 2] = z + (Math.random() - .5) * .09;
    const color = palette[(Math.random() * palette.length) | 0];
    const intensity = .72 + Math.random() * .42;
    colors[offset] = Math.min(1, color[0] * intensity);
    colors[offset + 1] = Math.min(1, color[1] * intensity);
    colors[offset + 2] = Math.min(1, color[2] * intensity);
  }
  return { positions, colors };
}

export default function GlobalParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultiplied: false, powerPreference: "high-performance" });
    if (!gl) { canvas.dataset.failed = "true"; return undefined; }
    const program = createProgram(gl);
    if (!program) { canvas.dataset.failed = "true"; return undefined; }

    const mobile = matchMedia("(max-width: 720px)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = reduced ? 1400 : mobile ? 3600 : 7600;
    const particles = makeParticles(count);
    gl.useProgram(program);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.disable(gl.DEPTH_TEST);

    const positionLocation = gl.getAttribLocation(program, "aPosition");
    const colorLocation = gl.getAttribLocation(program, "aColor");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, particles.positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, particles.colors, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

    const uniforms = {
      time: gl.getUniformLocation(program, "uTime"), scroll: gl.getUniformLocation(program, "uScroll"), pointer: gl.getUniformLocation(program, "uPointer"), pixelRatio: gl.getUniformLocation(program, "uPixelRatio"), aspect: gl.getUniformLocation(program, "uAspect")
    };
    let frame = 0;
    let visible = !document.hidden;
    let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
    let gyroTargetX = 0, gyroTargetY = 0;
    let gyroActive = false, gyroListening = false, gyroBaseline = null;
    const startedAt = performance.now();
    const resize = () => {
      const density = Math.min(devicePixelRatio || 1, mobile ? 1.3 : 1.75);
      const width = Math.max(1, Math.floor(innerWidth * density));
      const height = Math.max(1, Math.floor(innerHeight * density));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };
    const onPointer = (event) => {
      targetX = (event.clientX / innerWidth - .5) * 2;
      targetY = (event.clientY / innerHeight - .5) * 2;
    };
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const onOrientation = (event) => {
      if (!Number.isFinite(event.beta) || !Number.isFinite(event.gamma)) return;
      if (!gyroBaseline) gyroBaseline = { beta: event.beta, gamma: event.gamma };
      gyroTargetX = clamp((event.gamma - gyroBaseline.gamma) / 15, -1.35, 1.35);
      gyroTargetY = clamp((event.beta - gyroBaseline.beta) / 15, -1.35, 1.35);
      gyroActive = true;
    };
    const startGyro = () => {
      if (reduced || gyroListening || typeof window.DeviceOrientationEvent === "undefined") return;
      gyroListening = true;
      window.addEventListener("deviceorientation", onOrientation, { passive: true });
    };
    const requestGyro = () => {
      const orientation = window.DeviceOrientationEvent;
      if (reduced || !orientation || gyroListening) return;
      if (typeof orientation.requestPermission === "function") {
        orientation.requestPermission().then((permission) => { if (permission === "granted") startGyro(); }).catch(() => {});
      } else startGyro();
    };
    const onVisibility = () => { visible = !document.hidden; if (visible && !frame) frame = requestAnimationFrame(draw); };
    const getScroll = () => Math.max(0, Math.min(1, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)));
    function draw(now) {
      frame = 0;
      if (!visible) return;
      resize();
      const motionX = gyroActive ? gyroTargetX : targetX;
      const motionY = gyroActive ? gyroTargetY : targetY;
      pointerX += (motionX - pointerX) * .065;
      pointerY += (motionY - pointerY) * .065;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform1f(uniforms.time, (now - startedAt) / 1000);
      gl.uniform1f(uniforms.scroll, getScroll());
      gl.uniform2f(uniforms.pointer, pointerX, pointerY);
      gl.uniform1f(uniforms.pixelRatio, Math.min(devicePixelRatio || 1, 1.75));
      gl.uniform1f(uniforms.aspect, canvas.width / Math.max(1, canvas.height));
      gl.drawArrays(gl.POINTS, 0, count);
      if (!reduced) frame = requestAnimationFrame(draw);
    }

    resize();
    frame = requestAnimationFrame(draw);
    addEventListener("resize", resize, { passive: true });
    addEventListener("pointermove", onPointer, { passive: true });
    if (mobile && !reduced) {
      if (typeof window.DeviceOrientationEvent?.requestPermission === "function") {
        window.addEventListener("pointerdown", requestGyro, { once: true, passive: true });
      } else requestGyro();
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", requestGyro);
      window.removeEventListener("deviceorientation", onOrientation);
      document.removeEventListener("visibilitychange", onVisibility);
      if (frame) cancelAnimationFrame(frame);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(colorBuffer);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas ref={canvasRef} className="global-particle-field" aria-hidden="true" />;
}
