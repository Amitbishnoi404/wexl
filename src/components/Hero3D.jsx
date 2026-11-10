import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { Layers, Box, Orbit } from 'lucide-react';

// Helper: Generate Tangent-Space 3D Normal Map from Logo Contours
function createNormalTextureFromImage(img) {
  if (!img) return null;
  try {
    const canvas = document.createElement('canvas');
    const w = 512;
    const h = Math.round(512 * ((img.height || 400) / (img.width || 512))) || 400;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    ctx.drawImage(img, 0, 0, w, h);
    const srcData = ctx.getImageData(0, 0, w, h);
    const s = srcData.data;

    // Extract height from alpha & contour luminance
    const heights = new Float32Array(w * h);
    for (let i = 0; i < s.length; i += 4) {
      const a = s[i + 3];
      if (a > 20) {
        const lum = (s[i] * 0.299 + s[i + 1] * 0.587 + s[i + 2] * 0.114) / 255;
        heights[i / 4] = (a / 255.0) * (0.65 + 0.35 * lum);
      } else {
        heights[i / 4] = 0;
      }
    }

    // 2-pass blur to produce smooth, sculpted 3D beveled chamfers
    const bevelH = new Float32Array(w * h);
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        let sum = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            sum += heights[(y + dy) * w + (x + dx)];
          }
        }
        bevelH[y * w + x] = sum / 9.0;
      }
    }

    // Sobel Filter for 3D Tangent Normal Vectors
    const normImg = ctx.createImageData(w, h);
    const nd = normImg.data;
    const strength = 7.5; // Sculpted 3D relief depth

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = y * w + x;
        const tl = bevelH[(y - 1) * w + (x - 1)];
        const t  = bevelH[(y - 1) * w + x];
        const tr = bevelH[(y - 1) * w + (x + 1)];
        const l  = bevelH[y * w + (x - 1)];
        const r  = bevelH[y * w + (x + 1)];
        const bl = bevelH[(y + 1) * w + (x - 1)];
        const b  = bevelH[(y + 1) * w + x];
        const br = bevelH[(y + 1) * w + (x + 1)];

        const dx = (tr + 2 * r + br) - (tl + 2 * l + bl);
        const dy = (bl + 2 * b + br) - (tl + 2 * t + tr);

        let nx = -dx * strength;
        let ny = -dy * strength;
        let nz = 1.0;
        const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
        nx /= len;
        ny /= len;
        nz /= len;

        const p = idx * 4;
        nd[p]     = Math.floor((nx * 0.5 + 0.5) * 255);
        nd[p + 1] = Math.floor((ny * 0.5 + 0.5) * 255);
        nd[p + 2] = Math.floor((nz * 0.5 + 0.5) * 255);
        nd[p + 3] = s[p + 3]; // Preserve mask
      }
    }

    ctx.putImageData(normImg, 0, 0);

    const normTexture = new THREE.CanvasTexture(canvas);
    normTexture.wrapS = THREE.ClampToEdgeWrapping;
    normTexture.wrapT = THREE.ClampToEdgeWrapping;
    normTexture.generateMipmaps = true;
    return normTexture;
  } catch (err) {
    console.warn('Could not generate normal map:', err);
    return null;
  }
}

export default function Hero3D() {
  const mountRef = useRef(null);
  const [activeMode, setActiveMode] = useState('logo3d'); // 'logo3d' | 'lattice' | 'polymer'
  const sceneRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. High-Definition Lab Lighting (Luminous, Vibrant & Anti-Dull)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const mainWhiteLight = new THREE.DirectionalLight(0xffffff, 3.0);
    mainWhiteLight.position.set(4, 6, 6);
    scene.add(mainWhiteLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 2.2);
    fillLight.position.set(-5, -2, 5);
    scene.add(fillLight);

    // Dedicated Frontal Light: ensures the logo face is brilliantly illuminated from the camera
    const frontLight = new THREE.DirectionalLight(0xffffff, 2.2);
    frontLight.position.set(0, 0, 8);
    scene.add(frontLight);

    const emeraldAccentLight = new THREE.PointLight(0x10b981, 2.8, 18);
    emeraldAccentLight.position.set(0, 0, 4.0);
    scene.add(emeraldAccentLight);

    // 3. Materials
    // Luminous Optical Porcelain Base: radiant white with crisp clarity
    const pureWhitePlaqueMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.18, // Eliminates grey shadows so base stays brilliantly white
      roughness: 0.05,
      metalness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.95,
    });

    // Platinum Outer Bezel Rim
    const platinumRimMat = new THREE.MeshPhysicalMaterial({
      color: 0xf1f5f9,
      metalness: 0.95,
      roughness: 0.1,
      clearcoat: 1.0,
    });

    // Radiant Emerald Ring Material
    const emeraldRingMat = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.55,
      metalness: 0.85,
      roughness: 0.12,
      clearcoat: 1.0,
    });

    // Electric Cyan Ring Material
    const cyanRingMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
      metalness: 0.85,
      roughness: 0.12,
      clearcoat: 1.0,
    });

    const latticeEmeraldMat = new THREE.MeshPhysicalMaterial({
      color: 0x059669,
      emissive: 0x064e3b,
      emissiveIntensity: 0.2,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 1.0,
    });

    const bondMaterial = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.6,
      roughness: 0.3,
      transparent: true,
      opacity: 0.75,
    });

    // 4. Main Model Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    groupRef.current = mainGroup;

    let ringOuter = null;
    let ringInner = null;
    let satellites = [];

    // =========================================================================
    // BUILD 3D WEXL LOGO (Pristine White / Transparent Background Aesthetics)
    // =========================================================================
    function build3DLogo() {
      while (mainGroup.children.length > 0) {
        mainGroup.remove(mainGroup.children[0]);
      }
      satellites = [];

      const emblemGroup = new THREE.Group();
      mainGroup.add(emblemGroup);

      // A. Luminous Pure White Optical Plaque (Brilliant Base)
      const diskGeo = new THREE.CylinderGeometry(2.12, 2.12, 0.15, 64);
      diskGeo.rotateX(Math.PI / 2); // Face camera
      const diskMesh = new THREE.Mesh(diskGeo, pureWhitePlaqueMat);
      emblemGroup.add(diskMesh);

      // Multi-Tier Metallic Emerald & Platinum Bevel Rims (Crisp 3D Definition)
      const rimTorusGeo = new THREE.TorusGeometry(2.12, 0.04, 20, 80);
      const rimFront = new THREE.Mesh(rimTorusGeo, emeraldRingMat);
      rimFront.position.z = 0.076;
      emblemGroup.add(rimFront);

      const rimBack = new THREE.Mesh(rimTorusGeo, emeraldRingMat);
      rimBack.position.z = -0.076;
      emblemGroup.add(rimBack);

      // Platinum Outer Edge Ring
      const rimEdgeGeo = new THREE.TorusGeometry(2.14, 0.025, 16, 80);
      const rimEdge = new THREE.Mesh(rimEdgeGeo, platinumRimMat);
      rimEdge.position.z = 0;
      emblemGroup.add(rimEdge);

      // B. Load Super-Resolution High-Definition HD WeXL Logo Texture with 3D Bevel & Normal Mapping
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load('/images/wexl-emblem-hd.png', (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;

        // Generate Dynamic 3D Tangent Normal Map from logo contours
        const normalTexture = createNormalTextureFromImage(texture.image);

        const logoPlaneGeo = new THREE.PlaneGeometry(3.25, 2.55);

        // 1. Raised 3D Embossed Material (Catches dynamic specular light glints across beveled edges)
        const logoMaterial3D = new THREE.MeshPhysicalMaterial({
          map: texture,
          normalMap: normalTexture,
          normalScale: new THREE.Vector2(3.8, 3.8), // Prominent 3D beveled relief
          transparent: true,
          roughness: 0.08,
          metalness: 0.08,
          clearcoat: 1.0,
          clearcoatRoughness: 0.04,
          reflectivity: 0.95,
          polygonOffset: true,
          polygonOffsetFactor: -2,
          polygonOffsetUnits: -2,
        });

        // 2. Physical Depth Extrusion Slice (gives the logo actual 3D physical thickness)
        const extrusionMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          color: 0x059669, // Subtle emerald depth bevel
          transparent: true,
          opacity: 0.85,
          roughness: 0.2,
          metalness: 0.3,
        });

        // FRONT 3D RELIEF
        // Base depth extrusion layer
        const frontBevel = new THREE.Mesh(logoPlaneGeo, extrusionMaterial);
        frontBevel.position.z = 0.078;
        frontBevel.scale.set(1.008, 1.008, 1);
        emblemGroup.add(frontBevel);

        // Top embossed 3D face
        const frontMesh = new THREE.Mesh(logoPlaneGeo, logoMaterial3D);
        frontMesh.position.z = 0.085;
        emblemGroup.add(frontMesh);

        // REVERSE 3D RELIEF
        // Base depth extrusion layer
        const backBevel = new THREE.Mesh(logoPlaneGeo, extrusionMaterial);
        backBevel.position.z = -0.078;
        backBevel.scale.set(1.008, 1.008, 1);
        backBevel.rotation.y = Math.PI;
        emblemGroup.add(backBevel);

        // Mirrored back embossed 3D face
        const backMesh = new THREE.Mesh(logoPlaneGeo, logoMaterial3D);
        backMesh.position.z = -0.085;
        backMesh.rotation.y = Math.PI;
        emblemGroup.add(backMesh);
      });

      // C. Delicate Gyroscope Orbits (Metrology Precision)
      const outerRingGeo = new THREE.TorusGeometry(2.7, 0.025, 16, 80);
      ringOuter = new THREE.Mesh(outerRingGeo, emeraldRingMat);
      mainGroup.add(ringOuter);

      const innerRingGeo = new THREE.TorusGeometry(2.45, 0.02, 16, 80);
      ringInner = new THREE.Mesh(innerRingGeo, cyanRingMat);
      mainGroup.add(ringInner);

      // D. Orbiting Element Atoms (Fe, Cr, Ni, Mo)
      const atomGeo = new THREE.SphereGeometry(0.12, 24, 24);
      const numAtoms = 4;
      for (let i = 0; i < numAtoms; i++) {
        const atomMesh = new THREE.Mesh(atomGeo, i % 2 === 0 ? emeraldRingMat : cyanRingMat);
        mainGroup.add(atomMesh);
        satellites.push({
          mesh: atomMesh,
          orbitRadius: 2.7,
          angleOffset: (i * Math.PI) / 2,
          speed: 1.0
        });
      }
    }

    // Helper: Crystal Lattice
    function buildLattice() {
      while (mainGroup.children.length > 0) {
        mainGroup.remove(mainGroup.children[0]);
      }
      ringOuter = null;
      ringInner = null;
      satellites = [];

      const sphereGeo = new THREE.SphereGeometry(0.24, 28, 28);
      const centerGeo = new THREE.SphereGeometry(0.28, 28, 28);
      const points = [];
      const size = 1.25;

      for (let x = -1; x <= 1; x += 2) {
        for (let y = -1; y <= 1; y += 2) {
          for (let z = -1; z <= 1; z += 2) {
            points.push(new THREE.Vector3(x * size, y * size, z * size));
            const sphere = new THREE.Mesh(sphereGeo, latticeEmeraldMat);
            sphere.position.set(x * size, y * size, z * size);
            mainGroup.add(sphere);
          }
        }
      }

      const faces = [
        new THREE.Vector3(0, size, 0),
        new THREE.Vector3(0, -size, 0),
        new THREE.Vector3(size, 0, 0),
        new THREE.Vector3(-size, 0, 0),
        new THREE.Vector3(0, 0, size),
        new THREE.Vector3(0, 0, -size),
      ];

      faces.forEach((f) => {
        points.push(f);
        const sphere = new THREE.Mesh(centerGeo, cyanRingMat);
        sphere.position.copy(f);
        mainGroup.add(sphere);
      });

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dist = points[i].distanceTo(points[j]);
          if (dist < size * 1.55) {
            const v1 = points[i];
            const v2 = points[j];
            const bondLen = v1.distanceTo(v2);
            const cylGeo = new THREE.CylinderGeometry(0.035, 0.035, bondLen, 10);
            const cyl = new THREE.Mesh(cylGeo, bondMaterial);
            const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
            cyl.position.copy(mid);
            cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(v2, v1).normalize());
            mainGroup.add(cyl);
          }
        }
      }
    }

    // Helper: Polymer Chain
    function buildPolymer() {
      while (mainGroup.children.length > 0) {
        mainGroup.remove(mainGroup.children[0]);
      }
      ringOuter = null;
      ringInner = null;
      satellites = [];

      const sphereGeo = new THREE.SphereGeometry(0.18, 24, 24);
      const points = [];
      const numAtoms = 24;

      for (let i = 0; i < numAtoms; i++) {
        const t = (i / numAtoms) * Math.PI * 4;
        const x = Math.sin(t) * 1.4 + (i % 2 === 0 ? 0.15 : -0.15);
        const y = (i - numAtoms / 2) * 0.12;
        const z = Math.cos(t) * 1.4;
        const pt = new THREE.Vector3(x, y, z);
        points.push(pt);

        const atom = new THREE.Mesh(sphereGeo, i % 2 === 0 ? latticeEmeraldMat : pureWhitePlaqueMat);
        atom.position.copy(pt);
        mainGroup.add(atom);
      }

      for (let i = 0; i < points.length - 1; i++) {
        const v1 = points[i];
        const v2 = points[i + 1];
        const bondLen = v1.distanceTo(v2);
        const cylGeo = new THREE.CylinderGeometry(0.03, 0.03, bondLen, 10);
        const cyl = new THREE.Mesh(cylGeo, bondMaterial);
        const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
        cyl.position.copy(mid);
        cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(v2, v1).normalize());
        mainGroup.add(cyl);
      }
    }

    // Initialize Active Mode
    if (activeMode === 'logo3d') build3DLogo();
    else if (activeMode === 'lattice') buildLattice();
    else buildPolymer();

    gsap.fromTo(mainGroup.scale, { x: 0.35, y: 0.35, z: 0.35 }, { x: 1, y: 1, z: 1, duration: 0.9, ease: 'power2.out' });

    // 5. Floating Micro-particles
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.045,
      transparent: true,
      opacity: 0.45,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. Interactive Mouse Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.55;
      targetRotationX = -y * 0.35;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (activeMode === 'logo3d') {
        // Elegant continuous spin & gentle floating oscillation
        mainGroup.rotation.y += 0.007;
        mainGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;

        if (ringOuter) {
          ringOuter.rotation.x = Math.sin(elapsed * 0.8) * 0.4;
          ringOuter.rotation.y = elapsed * 0.5;
        }
        if (ringInner) {
          ringInner.rotation.x = Math.cos(elapsed * 0.9) * 0.4;
          ringInner.rotation.z = -elapsed * 0.6;
        }

        satellites.forEach((sat) => {
          const a = elapsed * sat.speed + sat.angleOffset;
          sat.mesh.position.x = Math.cos(a) * sat.orbitRadius;
          sat.mesh.position.y = Math.sin(a) * 0.55;
          sat.mesh.position.z = Math.sin(a) * sat.orbitRadius;
        });
      } else {
        mainGroup.rotation.y += 0.005;
        mainGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;
      }

      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;
      mainGroup.rotation.y += (targetRotationY - (mainGroup.rotation.y % (Math.PI * 2))) * 0.03;

      particleSystem.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeMode]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '460px',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(16px)',
      borderRadius: '24px',
      border: '1px solid rgba(226, 232, 240, 0.95)',
      boxShadow: '0 8px 30px rgba(15, 23, 42, 0.05)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '1.25rem'
    }}>
      {/* Top Header Badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <span className="status-dot"></span>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a' }}>
            WeXL 3D Animated Logo
          </span>
        </div>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Interactive 3D Engine
        </span>
      </div>

      {/* 3D Canvas Mounting Container */}
      <div
        ref={mountRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: '50px',
          cursor: 'grab'
        }}
      />

      {/* Mode Switcher Pill Bar (Fixed at bottom) */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        marginTop: 'auto'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.3rem 0.4rem',
          background: 'rgba(241, 245, 249, 0.92)',
          backdropFilter: 'blur(12px)',
          borderRadius: '9999px',
          border: '1px solid rgba(203, 213, 225, 0.8)',
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)'
        }}>
          <button
            type="button"
            onClick={() => setActiveMode('logo3d')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              background: activeMode === 'logo3d' ? '#059669' : 'transparent',
              color: activeMode === 'logo3d' ? '#ffffff' : '#475569',
              boxShadow: activeMode === 'logo3d' ? '0 2px 6px rgba(5, 150, 105, 0.3)' : 'none'
            }}
          >
            <Orbit size={13} />
            <span>3D WeXL Logo</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('lattice')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              background: activeMode === 'lattice' ? '#059669' : 'transparent',
              color: activeMode === 'lattice' ? '#ffffff' : '#475569',
              boxShadow: activeMode === 'lattice' ? '0 2px 6px rgba(5, 150, 105, 0.3)' : 'none'
            }}
          >
            <Box size={13} />
            <span>FCC Steel Lattice</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('polymer')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              background: activeMode === 'polymer' ? '#059669' : 'transparent',
              color: activeMode === 'polymer' ? '#ffffff' : '#475569',
              boxShadow: activeMode === 'polymer' ? '0 2px 6px rgba(5, 150, 105, 0.3)' : 'none'
            }}
          >
            <Layers size={13} />
            <span>Polymer Chain</span>
          </button>
        </div>
      </div>
    </div>
  );
}
