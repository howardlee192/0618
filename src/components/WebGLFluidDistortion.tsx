import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Texture, Program, Mesh, Triangle } from 'ogl';

interface WebGLFluidDistortionProps {
  src: string;
  type?: 'image' | 'video';
  cursorRadius?: number; // 0 to 1 (relative to screen width/height)
  dissipationSpeed?: number; // 0 to 1 (e.g. 0.96 for gradual decay)
  className?: string;
}

export const WebGLFluidDistortion: React.FC<WebGLFluidDistortionProps> = ({
  src,
  type = 'image',
  cursorRadius = 0.15,
  dissipationSpeed = 0.97,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect touch device for performance optimization
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false, antialias: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    
    // Style the canvas to fill the container perfectly
    gl.canvas.style.position = 'absolute';
    gl.canvas.style.top = '0';
    gl.canvas.style.left = '0';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    container.appendChild(gl.canvas);

    const camera = new Camera(gl);
    camera.position.z = 1;

    const geometry = new Triangle(gl);

    // Setup Flowmap Texture (64x64 is usually enough for a smooth flowmap)
    const grid = 64;
    const flowData = new Uint8Array(grid * grid * 4);
    const flowVelocity = new Float32Array(grid * grid * 2); // Store continuous X and Y velocity
    
    for(let i=0; i<flowData.length; i+=4) {
      flowData[i] = 128;   // R (X velocity)
      flowData[i+1] = 128; // G (Y velocity)
      flowData[i+2] = 0;   // B (unused)
      flowData[i+3] = 255; // A
    }
    const tFlow = new Texture(gl, {
      image: flowData,
      width: grid,
      height: grid,
      flipY: false,
      internalFormat: gl.RGBA,
      format: gl.RGBA,
      type: gl.UNSIGNED_BYTE,
      magFilter: gl.LINEAR,
      minFilter: gl.LINEAR,
      wrapS: gl.CLAMP_TO_EDGE,
      wrapT: gl.CLAMP_TO_EDGE
    });

    // Load Media
    const tMap = new Texture(gl, {
      generateMipmaps: false,
      minFilter: gl.LINEAR,
      wrapS: gl.CLAMP_TO_EDGE,
      wrapT: gl.CLAMP_TO_EDGE
    });
    
    let mediaEl: HTMLImageElement | HTMLVideoElement;
    const uImageResolution = { value: [1, 1] };
    
    if (type === 'image') {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => {
        tMap.image = img;
        uImageResolution.value = [img.width, img.height];
      };
      mediaEl = img;
    } else {
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.src = src;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.play();
      video.addEventListener('loadedmetadata', () => {
        uImageResolution.value = [video.videoWidth, video.videoHeight];
      });
      tMap.image = video;
      mediaEl = video;
    }

    const vertex = `
      attribute vec2 uv;
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
      }
    `;

    const fragment = `
      precision highp float;
      uniform sampler2D tMap;
      uniform sampler2D tFlow;
      uniform vec2 uResolution;
      uniform vec2 uImageResolution;
      uniform float uDisableEffect;
      uniform float uTime;
      uniform vec2 uMouseSmooth;
      uniform float uZoomScale;
      varying vec2 vUv;

      // Sine-less 3D Hash by David Hoskins (for perfect, independent random slices per frame)
      float hash(vec3 p) {
        vec3 p3  = fract(p * .1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }

      float getLuminance(vec3 color) {
        return dot(color, vec3(0.299, 0.587, 0.114));
      }

      void main() {
        // Object-fit cover logic + Parallax Zoom
        vec2 ratio = vec2(
          min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
          min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
        );
        vec2 uv = vec2(
          vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
          vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
        );

        // 1. Calculate dynamic zoom scale
        float breath = sin(uTime * 1.2) * 0.5 + 0.5;
        float totalScale = uZoomScale - breath * 0.02; // Oscillates dynamically

        // 2. Apply focal zoom using the smoothed target position
        uv = (uv - uMouseSmooth) * totalScale + uMouseSmooth;

        // Generate Cinematic Film Grain
        // 1. Quantize coordinates for slightly organic grain size (not too chunky)
        float grainSize = 1.6;
        vec2 grainPos = floor(vUv * uResolution / grainSize);
        
        // 2. Cinematic framerate for grain (24 fps)
        float t = floor(uTime * 24.0);
        
        // 3. Generate noise using 3D hash (X, Y, Time) so every frame is 100% organically independent
        float noise = hash(vec3(grainPos, t));
        noise = noise * 2.0 - 1.0;
        
        // 4. Shape the noise distribution to look softer and more natural
        noise = sign(noise) * pow(abs(noise), 1.1);

        if (uDisableEffect > 0.5) {
          // Render plain image/video for touch devices, with film grain
          vec4 color = texture2D(tMap, uv);
          float lum = getLuminance(color.rgb);
          float grainStrength = 0.08 * (1.0 - abs(lum - 0.5)); // More obvious contrast
          color.rgb += noise * grainStrength;
          gl_FragColor = vec4(color.rgb, 1.0);
          return;
        }

        // Read flowmap
        vec4 flow = texture2D(tFlow, vUv);
        // Map 0..1 to -1..1
        vec2 displacement = (flow.xy - 0.5) * 2.0;
        
        // Sample without Chromatic Aberration. Subtract displacement to make distortion follow mouse movement.
        vec2 distortedUv = uv - displacement * 0.10; // Reduced from 0.12 to 0.10 for less sensitive water touch
        vec4 color = texture2D(tMap, distortedUv);
        
        // Apply Film Grain
        float lum = getLuminance(color.rgb);
        float grainStrength = 0.10 * (1.0 - abs(lum - 0.5)); // Increased from 0.06 to 0.10 for obvious variation
        color.rgb += noise * grainStrength;
        
        gl_FragColor = vec4(color.rgb, 1.0);
      }
    `;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        tMap: { value: tMap },
        tFlow: { value: tFlow },
        uResolution: { value: [1, 1] },
        uImageResolution: uImageResolution,
        uDisableEffect: { value: 0.0 },
        uTime: { value: 0 },
        uMouseSmooth: { value: [0.5, 0.5] },
        uZoomScale: { value: 1.0 }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    // Interaction state
    const mouse = { x: 0.5, y: 0.5, vX: 0, vY: 0 };
    const zoomSmooth = { x: 0.5, y: 0.5, scale: 1.0 }; // restored focal center default
    const lastMouse = { x: 0, y: 0 };
    let isMouseMoving = false;

    const updateMousePos = (clientX: number, clientY: number) => {
      const x = clientX / window.innerWidth;
      const y = 1.0 - (clientY / window.innerHeight); // WebGL uses bottom-left origin
      
      mouse.vX = x - lastMouse.x;
      mouse.vY = y - lastMouse.y;
      mouse.x = x;
      mouse.y = y;
      
      lastMouse.x = x;
      lastMouse.y = y;
      isMouseMoving = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateMousePos(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      // Just set the initial position without huge velocity jump
      const x = e.touches[0].clientX / window.innerWidth;
      const y = 1.0 - (e.touches[0].clientY / window.innerHeight);
      mouse.x = x;
      mouse.y = y;
      lastMouse.x = x;
      lastMouse.y = y;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    };
    window.addEventListener('resize', resize);
    resize();

    let animationFrame: number;
    const updateFlowmap = () => {
      // Decay existing continuous values towards 0
      for (let i = 0; i < grid * grid; i++) {
        // Decay X and Y velocity
        flowVelocity[i * 2] *= dissipationSpeed;
        flowVelocity[i * 2 + 1] *= dissipationSpeed;
      }

      // Add new mouse velocity
      if (isMouseMoving && (Math.abs(mouse.vX) > 0 || Math.abs(mouse.vY) > 0)) {
        const gridX = Math.floor(mouse.x * grid);
        const gridY = Math.floor(mouse.y * grid);
        
        // Apply influence in a fixed small radius
        const radius = Math.max(1, Math.floor(cursorRadius * grid));
        for (let y = -radius; y <= radius; y++) {
          for (let x = -radius; x <= radius; x++) {
            const gx = gridX + x;
            const gy = gridY + y;
            if (gx >= 0 && gx < grid && gy >= 0 && gy < grid) {
              const distSq = x*x + y*y;
              if (distSq < radius*radius) {
                const falloff = 1.0 - Math.sqrt(distSq) / radius;
                const index2 = (gy * grid + gx) * 2;
                
                // Add continuous velocity. Reduced multiplier for less sensitive flow feeling.
                flowVelocity[index2] += mouse.vX * falloff * 4000;
                flowVelocity[index2 + 1] += mouse.vY * falloff * 4000;
              }
            }
          }
        }
        
        mouse.vX = 0;
        mouse.vY = 0;
      }

      // Write continuous velocity to Uint8Array, properly clamped to 0..255 (128 is neutral)
      for (let i = 0; i < grid * grid; i++) {
        flowData[i * 4] = Math.max(0, Math.min(255, 128 + flowVelocity[i * 2]));
        flowData[i * 4 + 1] = Math.max(0, Math.min(255, 128 + flowVelocity[i * 2 + 1]));
      }

      tFlow.image = flowData;
      tFlow.needsUpdate = true;
    };

    const render = (t: number) => {
      program.uniforms.uTime.value = t * 0.001; // update time for noise animation
      
      // Use continuous weights instead of hard if/else to eliminate stiffness
      let targetX = 0.5;
      let targetY = 0.5; 
      let targetScale = 1.0;
      
      let leftWeight = 0.0;
      let rightWeight = 0.0;

      // Left character
      if (mouse.y < 0.9) {
        leftWeight = Math.min(1.0, Math.max(0.0, (0.50 - mouse.x) / 0.05));
      }
      
      // Right character
      if (mouse.y > 0.1) {
        rightWeight = Math.min(1.0, Math.max(0.0, (mouse.x - 0.50) / 0.05));
      }

      if (leftWeight > 0.0) {
        targetX = 0.5 + (0.25 - 0.5) * leftWeight;
        targetY = 0.5 + (0.65 - 0.5) * leftWeight; 
        targetScale = 1.0 + (0.82 - 1.0) * leftWeight; // 18% zoom
      } else if (rightWeight > 0.0) {
        targetX = 0.5 + (0.80 - 0.5) * rightWeight;
        targetY = 0.5 + (0.35 - 0.5) * rightWeight; 
        targetScale = 1.0 + (0.82 - 1.0) * rightWeight; // 18% zoom
      }
      
      zoomSmooth.x += (targetX - zoomSmooth.x) * 0.03;
      zoomSmooth.y += (targetY - zoomSmooth.y) * 0.03;
      zoomSmooth.scale += (targetScale - zoomSmooth.scale) * 0.03;

      program.uniforms.uMouseSmooth.value = [zoomSmooth.x, zoomSmooth.y];
      program.uniforms.uZoomScale.value = zoomSmooth.scale;
      
      updateFlowmap();
      
      // Update video texture if playing
      if (type === 'video' && mediaEl instanceof HTMLVideoElement && mediaEl.readyState >= mediaEl.HAVE_CURRENT_DATA) {
        tMap.needsUpdate = true;
      }

      renderer.render({ scene: mesh });
      animationFrame = requestAnimationFrame(render);
    };
    animationFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
      if (gl.canvas.parentNode) {
        gl.canvas.parentNode.removeChild(gl.canvas);
      }
    };
  }, [src, type, cursorRadius, dissipationSpeed]);

  return <div ref={containerRef} className={`overflow-hidden ${className}`} />;
};
