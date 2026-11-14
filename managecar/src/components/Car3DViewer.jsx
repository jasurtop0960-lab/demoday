import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

// Vehicle data to determine brand-specific styling
const vehicleBrandData = {
  byd: { prefix: 'BYD', type: 'electric', frontFascia: 'ledBar', grille: 'sleekEVFacia' },
  tesla: { prefix: 'TESLA', type: 'electric', frontFascia: 'ledBar', grille: 'sleekEVFacia' },
  porsche: { prefix: 'PORSCHE', type: 'electric', frontFascia: 'ledBar', grille: 'sleekEVFacia' },
  chevrolet: { prefix: 'CHEVROLET', type: 'gasoline', frontFascia: 'radiatorGrille', grille: 'sportyBumper' },
  bmw: { prefix: 'BMW', type: 'gasoline', frontFascia: 'radiatorGrille', grille: 'sportyBumper' },
  mercedes: { prefix: 'MERCEDES', type: 'gasoline', frontFascia: 'radiatorGrille', grille: 'sportyBumper' },
}

export const Car3DViewer = ({
  selectedBrand,
  powertrainType,
  // Window states: 0-100 percent, vent at 15%
  windowStates, // array of 4 values [fl, fr, rl, rr]
  doorsLocked,
  acOn,
  headlightsOn,
  trunkOpen,
  acTargetTemp,
  interiorTemp,
  sentryMode,
  findCarActive,
  ambientCabinColor,
  // Callbacks for controls
  onWindowChange,
  onDoorLockToggle,
  onAcToggle,
  onHeadlightToggle,
  onTrunkToggle,
  onAmbientColorChange,
  onFindCar,
}) => {
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const carGroupRef = useRef(null)
  const windowRefs = useRef([]) // for animated window meshes
  const particleSystemRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0a) // dark background
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 10, 25)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.shadowMap.enabled = true
    rendererRef.current = renderer

    // Append to DOM
    const container = sceneRef.current.domElement || document.body
    if (sceneRef.current.domElement === null) {
      document.body.appendChild(renderer.domElement)
    } else {
      container.innerHTML = ''
      container.appendChild(renderer.domElement)
    }

    // --- Ground/Showroom Floor ---
    const floorGeometry = new THREE.PlaneGeometry(50, 50)
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.8,
      metalness: 0.1,
    })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.01
    scene.add(floor)

    // Studio lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
    dirLight1.position.set(10, 15, 10)
    dirLight1.castShadow = true
    scene.add(dirLight1)

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
    dirLight2.position.set(-10, -10, -10)
    scene.add(dirLight2)

    // === CAR BODY CONSTRUCTION ===
    const carGroup = new THREE.Group()
    carGroupRef.current = carGroup
    scene.add(carGroup)

    // Determine brand-specific features
    const brandKey = selectedBrand?.toLowerCase().replace(/\s+/g, '-') || 'byd'
    const brandInfo = vehicleBrandData[brandKey] || vehicleBrandData.byd
    const isElectric = brandInfo.type === 'electric'

    // --- Car Body Main Shape (simplified fastback sedan) ---
    // Using a combination of boxes to approximate the shape
    // Chassis base
    const chassis = new THREE.Mesh(
      new THREE.BoxGeometry(4, 1.5, 2.2),
      new THREE.MeshStandardMaterial({
        color: 0xffffff, // Pure Glossy White
        metalness: 0.85,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
      })
    )
    chassis.position.y = 0.75
    carGroup.add(chassis)

    // --- Roof (panoramic dark smoked glass) ---
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(3.8, 0.8, 2.0),
      new THREE.MeshStandardMaterial({
        color: 0x2a3a4a, // dark smoked
        metalness: 0.1,
        roughness: 0.4,
        transparent: true,
        opacity: 0.3,
      })
    )
    roof.position.y = 1.8
    carGroup.add(roof)

    // --- Hood (tapered) ---
    const hood = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.7, 1.0),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.85,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
      })
    )
    hood.position.set(0.8, 0.75, 0)
    carGroup.add(hood)

    // --- Trunk (rear) ---
    const trunk = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.7, 1.0),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.85,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
      })
    )
    trunk.position.set(-0.8, 0.75, 0)
    carGroup.add(trunk)

    // --- Wheel Arches (flared) ---

    // Front left wheel arch (opening)
    const frontWheelArchFL = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 1.1, 0.6, 32),
      new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        metalness: 0.4,
        roughness: 0.6,
      })
    )
    frontWheelArchFL.position.set(1.3, 0.6, 0.7)
    frontWheelArchFL.rotation.z = Math.PI / 2
    carGroup.add(frontWheelArchFL)

    // Front right wheel arch
    const frontWheelArchFR = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 1.1, 0.6, 32),
      new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        metalness: 0.4,
        roughness: 0.6,
      })
    )
    frontWheelArchFR.position.set(1.3, 0.6, -0.7)
    frontWheelArchFR.rotation.z = Math.PI / 2
    carGroup.add(frontWheelArchFR)

    // Rear wheel arches
    const rearWheelArchRL = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 1.1, 0.6, 32),
      new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        metalness: 0.4,
        roughness: 0.6,
      })
    )
    rearWheelArchRL.position.set(-1.3, 0.6, 0.7)
    rearWheelArchRL.rotation.z = Math.PI / 2
    carGroup.add(rearWheelArchRL)

    const rearWheelArchRR = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 1.1, 0.6, 32),
      new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        metalness: 0.4,
        roughness: 0.6,
      })
    )
    rearWheelArchRR.position.set(-1.3, 0.6, -0.7)
    rearWheelArchRR.rotation.z = Math.PI / 2
    carGroup.add(rearWheelArchRR)

    // === WHEELS AND TYRES ===

    // Multi-spoke alloy wheels with vibrant red brake calipers
    const wheelDiameter = 0.9

    // Front left wheel
    const wheelFL = new THREE.Mesh(
      new THREE.CylinderGeometry(wheelDiameter / 2, wheelDiameter / 2, 0.35, 32),
      new THREE.MeshStandardMaterial({
        color: 0x3d3d3d, // dark alloy
        metalness: 0.7,
        roughness: 0.3,
      })
    )
    wheelFL.rotation.x = -Math.PI / 2
    wheelFL.position.set(1.6, 0.25, 0)
    carGroup.add(wheelFL)

    // Front right wheel
    const wheelFR = new THREE.Mesh(
      new THREE.CylinderGeometry(wheelDiameter / 2, wheelDiameter / 2, 0.35, 32),
      new THREE.MeshStandardMaterial({
        color: 0x3d3d3d,
        metalness: 0.7,
        roughness: 0.3,
      })
    )
    wheelFR.rotation.x = -Math.PI / 2
    wheelFR.position.set(1.6, 0.25, 0)
    carGroup.add(wheelFR)

    // Rear left wheel
    const wheelRL = new THREE.Mesh(
      new THREE.CylinderGeometry(wheelDiameter / 2, wheelDiameter / 2, 0.35, 32),
      new THREE.MeshStandardMaterial({
        color: 0x3d3d3d,
        metalness: 0.7,
        roughness: 0.3,
      })
    )
    wheelRL.rotation.x = -Math.PI / 2
    wheelRL.position.set(-1.6, 0.25, 0)
    carGroup.add(wheelRL)

    // Rear right wheel
    const wheelRR = new THREE.Mesh(
      new THREE.CylinderGeometry(wheelDiameter / 2, wheelDiameter / 2, 0.35, 32),
      new THREE.MeshStandardMaterial({
        color: 0x3d3d3d,
        metalness: 0.7,
        roughness: 0.3,
      })
    )
    wheelRR.rotation.x = -Math.PI / 2
    wheelRR.position.set(-1.6, 0.25, 0)
    carGroup.add(wheelRR)

    // Brake calipers (vibrant red) - visible through wheel spokes (simulated)
    const caliperMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000, // vibrant red
      metalness: 0.5,
      roughness: 0.2,
    })

    // Front left caliper
    const caliperFL = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.2, 0.15),
      caliperMaterial
    )
    caliperFL.position.set(1.65, 0.2, 0.05)
    carGroup.add(caliperFL)

    // Front right caliper
    const caliperFR = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.2, 0.15),
      caliperMaterial
    )
    caliperFR.position.set(1.65, 0.2, -0.05)
    carGroup.add(caliperFR)

    // Rear left caliper
    const caliperRL = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.2, 0.15),
      caliperMaterial
    )
    caliperRL.position.set(-1.65, 0.2, 0.05)
    carGroup.add(caliperRL)

    // Rear right caliper
    const caliperRR = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.2, 0.15),
      caliperMaterial
    )
    caliperRR.position.set(-1.65, 0.2, -0.05)
    carGroup.add(caliperRR)

    // === SIDE MIRRORS ===
    const mirrorArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 1.2, 8),
      new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.5, roughness: 0.3 })
    )
    mirrorArm.position.set(2.1, 1.2, 0.1)
    mirrorArm.rotation.z = Math.PI / 2
    carGroup.add(mirrorArm)

    const mirrorGlass = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.25, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x0a0a0a, metalness: 0.1, roughness: 0.4, transparent: true, opacity: 0.6 })
    )
    mirrorGlass.position.set(2.35, 1.1, 0.02)
    carGroup.add(mirrorGlass)

    // === FLUSH DOOR HANDLES ===
    const flushHandleFL = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.1, 0.15),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.4 })
    )
    flushHandleFL.position.set(1.1, 0.5, 0.65)
    carGroup.add(flushHandleFL)

    const flushHandleFR = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.1, 0.15),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.4 })
    )
    flushHandleFR.position.set(1.1, 0.5, -0.65)
    carGroup.add(flushHandleFR)

    const flushHandleRL = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.1, 0.15),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.4 })
    )
    flushHandleRL.position.set(-1.1, 0.5, 0.65)
    carGroup.add(flushHandleRL)

    const flushHandleRR = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.1, 0.15),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.4 })
    )
    flushHandleRR.position.set(-1.1, 0.5, -0.65)
    carGroup.add(flushHandleRR)

    // === HEADLIGHTS (volumetric LED) ===
    const headlightColor = headlightsOn ? 0xffffff : 0x3a3a3a

    // Left headlight
    const headlightTL = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 16, 16),
      new THREE.MeshStandardMaterial({ color: headlightColor, emissive: headlightColor, emissiveIntensity: headlightsOn ? 2.0 : 0.5 })
    )
    headlightTL.position.set(1.8, 1.2, 0.1)
    carGroup.add(headlightTL)

    // Right headlight
    const headlightTR = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 16, 16),
      new THREE.MeshStandardMaterial({ color: headlightColor, emissive: headlightColor, emissiveIntensity: headlightsOn ? 2.0 : 0.5 })
    )
    headlightTR.position.set(1.8, 1.2, -0.1)
    carGroup.add(headlightTR)

    // === REAR TAILLIGHTS / EXHAUST TIPS ===
    // Based on brand: gasoline models have dual rear exhaust tips
    if (!isElectric) {
      // Rear exhaust tips
      for (let i = 0; i < 2; i++) {
        const exhaustTip = new THREE.Mesh(
          new THREE.CylinderGeometry(0.15, 0.15, 0.4, 8),
          new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.7, roughness: 0.3 })
        )
        exhaustTip.position.set(-2.2, 0.4, (i === 0 ? -0.3 : 0.3))
        exhaustTip.rotation.x = Math.PI / 2
        carGroup.add(exhaustTip)
      }
      // Rear taillights
      const taillightColor = headlightsOn ? 0xff0000 : 0x5a0a0a
      for (let i = 0; i < 2; i++) {
        const taillight = new THREE.Mesh(
          new THREE.SphereGeometry(0.15, 12, 12),
          new THREE.MeshStandardMaterial({ color: taillightColor, emissive: taillightColor, emissiveIntensity: 0.5 })
        )
        taillight.position.set(-2.5, 0.8, (i === 0 ? -0.3 : 0.3))
        carGroup.add(taillight)
      }
    } else {
      // Electric models: full-width LED light bar at front
      const ledBarColor = headlightsOn ? 0x00ff00 : 0x00aaff
      const ledBar = new THREE.Mesh(
        new THREE.BoxGeometry(3.5, 0.2, 0.1),
        new THREE.MeshStandardMaterial({ color: ledBarColor, emissive: ledBarColor, emissiveIntensity: headlightsOn ? 1.5 : 0.2 })
      )
      ledBar.position.set(0, 1.3, 0)
      carGroup.add(ledBar)
    }

    // === WINDOWS (animated) ===
    // We'll create window meshes that can be moved up/down
    // Using transparent planes

    // Front windshield (curved) - we'll use a simple plane for now
    const windshield = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, 1.8),
      new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        metalness: 0.1,
        roughness: 0.4,
        transparent: true,
        opacity: 0.4,
      })
    )
    windshield.position.set(0, 1.5, 0.95)
    windshield.rotation.x = -0.15
    windshield.rotation.z = 0.05 // slight curve
    carGroup.add(windshield)

    // Rear window
    const rearWindow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 1.2),
      new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        metalness: 0.1,
        roughness: 0.4,
        transparent: true,
        opacity: 0.4,
      })
    )
    rearWindow.position.set(0, 1.1, -0.95)
    rearWindow.rotation.x = -0.15
    carGroup.add(rearWindow)

    // Side windows - we'll create 4 plane meshes that animate
    const sideWindowPositions = [
      { x: 0.8, z: 0.6, rotX: -0.2, rotZ: 0.05 }, // front left
      { x: 0.8, z: -0.6, rotX: -0.2, rotZ: -0.05 }, // front right
      { x: -0.8, z: 0.6, rotX: -0.2, rotZ: 0.05 }, // rear left
      { x: -0.8, z: -0.6, rotX: -0.2, rotZ: -0.05 }, // rear right
    ]

    const windowMeshes = []
    for (let i = 0; i < 4; i++) {
      const ws = sideWindowPositions[i]
      const wh = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, 1.2),
        new THREE.MeshStandardMaterial({
          color: 0x0a0a0a,
          metalness: 0.1,
          roughness: 0.4,
          transparent: true,
          opacity: 0.4,
        })
      )
      wh.position.set(ws.x, 1.2, ws.z)
      wh.rotation.x = ws.rotX
      wh.rotation.z = ws.rotZ
      carGroup.add(wh)
      windowMeshes.push(wh)
    }
    windowRefs.current = windowMeshes

    // === A/C PARTICLE SYSTEM (inside cabin) ===
    // When AC is on, we render glowing particle streams
    const particleCount = 100
    const particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleSizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 3
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 2 + 1
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2.5
      particleSizes[i] = Math.random() * 0.5 + 0.2
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1))

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(ambientCabinColor || '#00ffff'),
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    })

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    particleSystem.position.y = 1.0
    scene.add(particleSystem)
    particleSystemRef.current = particleSystem

    // Animate particles when AC is on
    let animationLoop = null
    const animateParticles = () => {
      if (!acOn) return
      const positions = particleSystem.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        // Move particles down slowly when AC on
        positions[i * 3 + 1] -= 0.01
        if (positions[i * 3 + 1] < 0) {
          positions[i * 3 + 1] = 2 // reset to top
        }
      }
      particleGeometry.attributes.position.needsUpdate = true
    }

    const tick = () => {
      // Rotate car slowly
      carGroup.rotation.y += 0.005

      // Animate windows based on state
      animateWindows(windowMeshes, windowStates)

      // Animate particles
      animateParticles()

      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }

    tick()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationLoop) cancelAnimationFrame(animationLoop)
      renderer.dispose()
      scene.remove(...scene.children)
    }
  }, [selectedBrand, powertrainType, windowStates, doorsLocked, acOn, headlightsOn, trunkOpen, acTargetTemp, interiorTemp, sentryMode, findCarActive, ambientCabinColor])

  // Helper: animate windows with lerp
  const animateWindows = (windowMeshes, windowStates) => {
    // windowStates: [fl, fr, rl, rr] each 0-100 percent
    // 0% = fully up, 100% = fully down, 15% = vent mode
    const ventPercent = 15

    windowMeshes.forEach((mesh, i) => {
      const target = windowStates?.[i] ?? 0
      // Lerp towards target
      const current = mesh.position.y // using y position to represent window depth (simplified)
      // Actually we'll animate opacity or position. For simplicity, we'll adjust the mesh's y position to simulate going down.
      // Fully up: y = 1.2, fully down: y = -0.3 (example)
      const fullyUp = 1.2
      const fullyDown = -0.3
      const ventY = fullyUp - (ventPercent / 100) * (fullyUp - fullyDown)
      const targetY = fullyUp - (target / 100) * (fullyUp - fullyDown)

      // Simple lerp
      const lerpFactor = 0.1
      mesh.position.y = THREE.MathUtils.lerp(current, targetY, lerpFactor)
    })
  }

  return null // The Three.js canvas is rendered in the effect hook; we return null here
}