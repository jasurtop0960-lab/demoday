import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Library } from 'lucide-react'

// ============ VEHICLE DATA & TRANSLATIONS ============
const vehicleData = [
  { id: 'byd-han', brand: 'BYD Han EV', powertrain: 'electric', battery: '87%', range: '460 km', labelUz: 'BYD Han EV', labelEn: 'BYD Han EV', labelRu: 'BYD Han EV' },
  { id: 'byd-song', brand: 'BYD Song Plus', powertrain: 'electric', battery: '72%', range: '380 km', labelUz: 'BYD Song Plus', labelEn: 'BYD Song Plus', labelRu: 'BYD Song Plus' },
  { id: 'chevelle', brand: 'Chevrolet Malibu XL', powertrain: 'gasoline', fuel: '68%', range: '540 km', labelUz: 'Chevrolet Malibu XL', labelEn: 'Chevrolet Malibu XL', labelRu: 'Chevrolet Malibu XL' },
  { id: 'chevy-tracker', brand: 'Chevrolet Tracker', powertrain: 'gasoline', fuel: '55%', range: '420 km', labelUz: 'Chevrolet Tracker', labelEn: 'Chevrolet Tracker', labelRu: 'Chevrolet Tracker' },
  { id: 'tesla', brand: 'Tesla Model S Plaid', powertrain: 'electric', battery: '95%', range: '650 km', labelUz: 'Tesla Model S Plaid', labelEn: 'Tesla Model S Plaid', labelRu: 'Tesla Model S Plaid' },
  { id: 'bmw-m8', brand: 'BMW M8 Competition', powertrain: 'gasoline', fuel: '78%', range: '600 km', labelUz: 'BMW M8 Competition', labelEn: 'BMW M8 Competition', labelRu: 'BMW M8 Competition' },
  { id: 'porsche', brand: 'Porsche Taycan Turbo S', powertrain: 'electric', battery: '82%', range: '520 km', labelUz: 'Porsche Taycan Turbo S', labelEn: 'Porsche Taycan Turbo S', labelRu: 'Porsche Taycan Turbo S' },
  { id: 'mercedes', brand: 'Mercedes-AMG GT', powertrain: 'gasoline', fuel: '70%', range: '500 km', labelUz: 'Mercedes-AMG GT', labelEn: 'Mercedes-AMG GT', labelRu: 'Mercedes-AMG GT' },
]

const translations = {
  uz: {
    login: 'Kirish',
    managecar: 'ManageCar',
    subtitle: 'Smart Car Control Platform',
    brand: 'Marka',
    vin: 'VIN kod',
    pin: 'PIN kod',
    connect: 'Ulanish',
    connecting: 'Telemetya sura...',
    dashboard: 'Asosiy dashboard',
    backToLogin: 'Qayta kirish',
    vehicleSelected: 'Mashina tanlandi:',
    vinPrefilled: 'UZ-777-MC (instant test)',
    powertrainElectric: 'Elektromobil',
    powertrainGasoline: 'Benzin',
    exteriorTemp: 'Chiqaruvchi harorat',
    interiorTemp: 'Kabin harorati',
    batteryLevel: 'Battery level',
    fuelLevel: 'Fuel level',
    range: 'Range',
    findMyCar: 'Mening avtomobilim',
    sentryMode: 'Sentry Mode',
    windows: 'Janalar',
    openAll: 'Barchasini och',
    vent15: 'Ventilatsiya 15%',
    closeAll: 'Barchasini yopil',
    climate: 'Klima',
    acPower: 'A/C',
    temperature: 'Temperature',
    cabinTemp: 'Kabin havosy',
    ambientColor: 'Ambient color',
    driveModes: 'Shurfatlar',
    eco: 'ECO',
    comfort: 'COMFORT',
    sport: 'SPORT+',
    tirePressure: 'Tire Pressure (TPMS)',
    refueling: 'Refueling simulation',
    security: 'Xavfsizlik',
    location: 'Lokatsiya',
    lock: 'Quriltirish',
    unlock: 'Aqlliqtirish',
    tireLow: 'Qishloq qalgan',
    ok: 'Qo\'shy',
    fastCharging: 'Quick charging',
    refuel: 'Tanklanish',
    language: 'Til',
    uzbek: 'UZ',
    english: 'EN',
    russian: 'RU',
    notification: 'Xabarmakor',
    logout: 'Chiqish',
    error: 'Xato',
    success: 'Muvaffaqiyat',
  },
  en: {
    login: 'Sign In',
    managecar: 'ManageCar',
    subtitle: 'Smart Car Control Platform',
    brand: 'Car Brand',
    vin: 'VIN Code',
    pin: 'PIN Code',
    connect: 'Connect',
    connecting: 'Pairing telemetry...',
    dashboard: 'Main Dashboard',
    backToLogin: 'Back to Login',
    vehicleSelected: 'Vehicle Selected:',
    vinPrefilled: 'UZ-777-MC (instant test)',
    powertrainElectric: 'Electric',
    powertrainGasoline: 'Gasoline',
    exteriorTemp: 'External Temperature',
    interiorTemp: 'Interior Temperature',
    batteryLevel: 'Battery Level',
    fuelLevel: 'Fuel Level',
    range: 'Range',
    findMyCar: 'Find My Car',
    sentryMode: 'Sentry Mode',
    windows: 'Windows',
    openAll: 'Open All',
    vent15: 'Vent 15%',
    closeAll: 'Close All',
    climate: 'Climate',
    acPower: 'A/C',
    temperature: 'Temperature',
    cabinTemp: 'Cab temp',
    ambientColor: 'Ambient Color',
    driveModes: 'Drive Modes',
    eco: 'ECO',
    comfort: 'COMFORT',
    sport: 'SPORT+',
    tirePressure: 'Tire Pressure (TPMS)',
    refueling: 'Refueling simulation',
    security: 'Security',
    location: 'Location',
    lock: 'Lock',
    unlock: 'Unlock',
    tireLow: 'Low pressure',
    ok: 'OK',
    fastCharging: 'Fast Charging',
    refuel: 'Refueling',
    language: 'Language',
    uzbek: 'UZ',
    english: 'EN',
    russian: 'RU',
    notification: 'Notification',
    logout: 'Logout',
    error: 'Error',
    success: 'Success',
  },
  ru: {
    login: 'Вход',
    managecar: 'ManageCar',
    subtitle: 'Smart Car Control Platform',
    brand: 'Марка',
    vin: 'VIN код',
    pin: 'Код PIN',
    connect: 'Подключиться',
    connecting: 'Подача телеметрии...',
    dashboard: 'Главный дашборд',
    backToLogin: 'Вход снова',
    vehicleSelected: 'Выбрана машина:',
    vinPrefilled: 'UZ-777-MC (быстрый тест)',
    powertrainElectric: 'Электромобиль',
    powertrainGasoline: 'Бензин',
    exteriorTemp: 'Внешняя температура',
    interiorTemp: 'Внутренняя температура',
    batteryLevel: 'Уровень батареи',
    fuelLevel: 'Уровень топлива',
    range: 'Диапазон',
    findMyCar: 'Моя машина',
    sentryMode: 'Sentry Mode',
    windows: 'Окна',
    openAll: 'Открыть все',
    vent15: 'Вентиляция 15%',
    closeAll: 'Закрыть все',
    climate: 'Климат',
    acPower: 'Климат',
    temperature: 'Температура',
    cabinTemp: 'Темп кабины',
    ambientColor: 'Цвет салона',
    driveModes: 'Режимы вождения',
    eco: 'ECO',
    comfort: 'КОМФОРТ',
    sport: 'СПОРТ+',
    tirePressure: Давление в шинах (TPMS)',
    refueling: 'Симуляция заправки',
    security: 'Безопасность',
    location: 'Локация',
    lock: 'Замок',
    unlock: 'Открыть',
    tireLow: 'Низкое давление',
    ok: 'ОК',
    fastCharging: 'Быстрая зарядка',
    refuel: 'Заправка',
    language: 'Язык',
    uzbek: 'UZ',
    english: 'EN',
    russian: 'RU',
    notification: 'Уведомление',
    logout: 'Выход',
    error: 'Ошибка',
    success: 'Успех',
  },
}

// Translation hook
const useTranslation = (lang) => {
  const t = (key) => translations[lang]?.[key] || translations.uz[key] || key
  return t
}

// ============ COMPONENTS ============

// Navbar
const Navbar = ({ lang, setLang, isConnected, selectedVehicle, telemetry }) => {
  const t = useTranslation(lang)
  return (
    <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl flex items-center justify-between px-6 py-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-extrabold text-cyan-400">M</div>
          <span className="text-xl font-bold text-slate-100">ManageCar</span>
          {isConnected && (
            <span className="bg-cyan-500/20 text-cyan-300 rounded-full px-3 py-1 text-xs font-medium">
              ● Connected • {selectedVehicle?.label[lang]}
            </span>
          )}
        </div>
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-2 text-slate-300 text-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>{t('batteryLevel')}: {telemetry.battery}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300 text-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>{t('exteriorTemp')}: {telemetry.externalTemp}°C</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300 text-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>{t('range')}: {telemetry.range}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-600/30 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-400/50"
          >
            <option value="uz">{t('uzbek')}</option>
            <option value="en">{t('english')}</option>
            <option value="ru">{t('russian')}</option>
          </select>
          <span className="text-slate-400 text-xs">🔔</span>
          <button
            onClick={() => alert('Logging out')}
            className="text-slate-400 hover:text-slate-100 transition-colors px-3 py-1 rounded"
          >
            {t('logout')}
          </button>
        </div>
      </div>
    </nav>
  )
}

// Car3DViewer component
const Car3DViewer = ({
  selectedBrand, powertrainType, windowStates, setWindowStates,
  doorsLocked, setDoorsLocked, acOn, setAcOn, acTargetTemp, setAcTargetTemp,
  interiorTemp, setInteriorTemp, ambientCabinColor, setAmbientCabinColor,
  driveMode, setDriveMode, tirePressure, setTirePressure, refueling, setRefueling,
  tpmPSI, findCar,
}) => {
  const containerRef = useRef(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (initialized) return
    setInitialized(true)

    const container = containerRef.current
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0a)

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.set(0, 12, 25)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)

    // Lights
    scene.add(new THREE.AmbientLight(0x404040, 0.6))
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
    dirLight.position.set(10, 15, 10)
    scene.add(dirLight)

    // Determine brand features
    const brandKey = (selectedBrand?.id || 'byd-han').toLowerCase().replace(/\s+/g, '-')
    const isElectric = powertrainType === 'electric'

    // Car body - Pure Glossy White
    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.85,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    })

    const carGroup = new THREE.Group()
    scene.add(carGroup)

    // Chassis
    const chassis = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 1.6, 2.4),
      whiteMat
    )
    chassis.position.y = 0.8
    carGroup.add(chassis)

    // Roof (dark smoked glass)
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(4.0, 0.9, 2.2),
      new THREE.MeshStandardMaterial({
        color: 0x2a3a4a,
        metalness: 0.1,
        roughness: 0.4,
        transparent: true,
        opacity: 0.3,
      })
    )
    roof.position.y = 1.9
    carGroup.add(roof)

    // Hood
    const hood = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.8, 1.1),
      whiteMat
    )
    hood.position.set(0.9, 0.8, 0)
    carGroup.add(hood)

    // Trunk
    const trunk = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 0.8, 1.1),
      whiteMat
    )
    trunk.position.set(-0.9, 0.8, 0)
    carGroup.add(trunk)

    // Wheel arches
    ;[1, -1].forEach((side, i) => {
      const arch = new THREE.Mesh(
        new THREE.CylinderGeometry(0.9, 1.1, 0.7, 32),
        new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.4, roughness: 0.6 })
      )
      arch.position.set(side * 1.4, 0.6, i === 0 ? 0.8 : -0.8)
      arch.rotation.z = Math.PI / 2
      carGroup.add(arch)
    })

    // Wheels with red brake calipers
    const wheelDiam = 0.95
    const wheelPositions = [[1.7, 0.3, 0.8], [1.7, 0.3, -0.8], [-1.7, 0.3, 0.8], [-1.7, 0.3, -0.8]]

    wheelPositions.forEach(([x, y, z], i) => {
      const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(wheelDiam / 2, wheelDiam / 2, 0.35, 32),
        new THREE.MeshStandardMaterial({ color: 0x3d3d3d, metalness: 0.7, roughness: 0.3 })
      )
      wheel.rotation.x = -Math.PI / 2
      wheel.position.set(x, y, z)
      carGroup.add(wheel)

      const caliper = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.2, 0.15),
        new THREE.MeshStandardMaterial({ color: 0xff0000, metalness: 0.5, roughness: 0.2 })
      )
      caliper.position.set(x + (x > 0 ? 0.15 : -0.15), 0.25, 0)
      carGroup.add(caliper)
    })

    // Side mirrors
    ;[1, -1].forEach((side) => {
      const mirrorArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 1.3, 8),
        new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.5, roughness: 0.3 })
      )
      mirrorArm.position.set(side * 2.2, 1.3, 0.1)
      mirrorArm.rotation.z = Math.PI / 2
      carGroup.add(mirrorArm)

      const mirrorGlass = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.25, 0.1),
        new THREE.MeshStandardMaterial({ color: 0x0a0a0a, metalness: 0.1, roughness: 0.4, transparent: true, opacity: 0.6 })
      )
      mirrorGlass.position.set(side * 2.45, 1.2, 0.02)
      carGroup.add(mirrorGlass)
    })

    // Flush door handles
    ;[1, -1].forEach((side) => {
      const handle = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.1, 0.15),
        new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.4 })
      )
      handle.position.set(side * 1.2, 0.6, side * 0.7)
      carGroup.add(handle)
    })

    // Headlights
    ;[1, -1].forEach((side) => {
      const headlight = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 16, 16),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0xffffff,
          emissiveIntensity: acOn ? 2.5 : 0.3,
        })
      )
      headlight.position.set(side * 2.0, 1.3, side * 0.1)
      carGroup.add(headlight)
    })

    // LED light bar (electric) or exhaust tips (gasoline)
    if (isElectric) {
      const ledBar = new THREE.Mesh(
        new THREE.BoxGeometry(4.0, 0.2, 0.15),
        new THREE.MeshStandardMaterial({
          color: 0x00ff00,
          emissive: 0x00ff00,
          emissiveIntensity: acOn ? 1.5 : 0.1,
        })
      )
      ledBar.position.set(0, 1.4, 0)
      carGroup.add(ledBar)
    } else {
      ;[1, -1].forEach((side) => {
        const exhaust = new THREE.Mesh(
          new THREE.CylinderGeometry(0.18, 0.18, 0.5, 8),
          new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.7, roughness: 0.3 })
        )
        exhaust.position.set(-2.3, 0.5, side * 0.3)
        exhaust.rotation.x = Math.PI / 2
        carGroup.add(exhaust)
      })
    }

    // Windows (animated planes)
    const windowPositions = [
      { x: 1.0, z: 0.85, rx: -0.2, rz: 0.05 },
      { x: 1.0, z: -0.85, rx: -0.2, rz: -0.05 },
      { x: -1.0, z: 0.85, rx: -0.2, rz: 0.05 },
      { x: -1.0, z: -0.85, rx: -0.2, rz: -0.05 },
    ]

    const windowMeshes = []
    for (let i = 0; i < 4; i++) {
      const wp = windowPositions[i]
      const wh = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 1.3),
        new THREE.MeshStandardMaterial({
          color: 0x0a0a0a,
          metalness: 0.1,
          roughness: 0.4,
          transparent: true,
          opacity: 0.4,
        })
      )
      wh.position.set(wp.x, 1.4, wp.z)
      wh.rotation.x = wp.rx
      wh.rotation.z = wp.rz
      carGroup.add(wh)
      windowMeshes.push(wh)
    }

    // A/C Particle System
    const particleCount = 80
    const particlePositions = new Float32Array(particleCount * 3)
    const particleSizes = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 3
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 2 + 1
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2.5
      particleSizes[i] = Math.random() * 0.5 + 0.2
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1))

    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(ambientCabinColor || '#00ffff'),
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    })
    const particleSystem = new THREE.Points(particleGeo, particleMat)
    particleSystem.position.y = 1.0
    scene.add(particleSystem)

    // Animation tick
    const tick = () => {
      carGroup.rotation.y += 0.005

      // Animate windows with lerp
      windowMeshes.forEach((mesh, i) => {
        const target = windowStates?.[i] ?? 0
        const fullyUp = 1.4
        const fullyDown = -0.3
        const targetY = fullyUp - (target / 100) * (fullyUp - fullyDown)
        mesh.position.y = mesh.position.y + (targetY - mesh.position.y) * 0.1
      })

      // Animate particles when AC on
      if (acOn) {
        const pos = particleSystem.geometry.attributes.position.array
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3 + 1] -= 0.01
          if (pos[i * 3 + 1] < 0) pos[i * 3 + 1] = 2
        }
        particleSystem.geometry.attributes.position.needsUpdate = true
      }

      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }

    tick()

    // Resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [initialized, selectedBrand, powertrainType, windowStates, doorsLocked, acOn, acTargetTemp, interiorTemp, ambientCabinColor, driveMode, tirePressure, refueling, tpmPSI])

  if (!initialized) return <div className="h-full w-full flex items-center justify-center text-slate-400">Loading 3D viewer...</div>
  return null
}

// LoginScreen
const LoginScreen = ({ onConnect, lang, setLang, setIsConnected, setSelectedVehicle }) => {
  const t = useTranslation(lang)
  const [selectedVehicleId, setSelectedVehicleId] = useState('byd-han')
  const [vin, setVin] = useState('UZ-777-MC')
  const [pin, setPin] = useState('1234')

  const vehicle = vehicleData.find(v => v.id === selectedVehicleId) || vehicleData[0]

  const handleConnect = () => {
    window.alert(t('connecting'))
    onConnect(vehicle, lang)
    setIsConnected(true)
    setLang('uz')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-5 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 text-center mb-1">{t('managecar')}</h1>
          <p className="text-slate-400 text-center text-sm">{t('subtitle')}</p>
        </div>

        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">{t('brand')}</label>
          <select
            value={selectedVehicleId}
            onChange={(e) => setSelectedVehicleId(e.target.value)}
            className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-600/30 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-400/50 transition-colors"
          >
            {vehicleData.map(v => (
              <option key={v.id} value={v.id} className="text-slate-200">
                {v.label[lang]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">{t('vin')}</label>
          <input
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            placeholder={t('vinPrefilled')}
            className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-600/30 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-400/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">{t('pin')}</label>
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="1234"
            type="password"
            className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-600/30 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-400/50 transition-colors"
          />
        </div>

        <div>
          <button
            onClick={handleConnect}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium py-3 rounded-lg transition-colors shadow-lg shadow-cyan-400/20"
          >
            {t('connect')}
          </button>
        </div>
      </div>
    </div>
  )
}

// Dashboard
const Dashboard = ({
  lang, setLang, selectedVehicle, powertrainType,
  // Window states
  windowStates, setWindowStates,
  doorsLocked, setDoorsLocked,
  acOn, setAcOn, acTargetTemp, setAcTargetTemp,
  interiorTemp, setInteriorTemp,
  ambientCabinColor, setAmbientCabinColor,
  driveMode, setDriveMode,
  tirePressure, setTirePressure,
  refueling, setRefueling,
  tpmPSI,
  findCar,
}) => {
  const t = useTranslation(lang)

  // Simulate interior temp adjusting toward target
  useEffect(() => {
    const id = setInterval(() => {
      if (acOn) {
        if (interiorTemp < acTargetTemp) setInteriorTemp(interiorTemp + 0.5)
        else if (interiorTemp > acTargetTemp) setInteriorTemp(interiorTemp - 0.5)
      } else {
        if (interiorTemp > 22) setInteriorTemp(interiorTemp - 0.2)
        else if (interiorTemp < 22) setInteriorTemp(interiorTemp + 0.2)
      }
    }, 100)
    return () => clearInterval(id)
  }, [acOn, acTargetTemp, interiorTemp, setInteriorTemp])

  const handleFindCar = () => {
    findCar()
    alert('Horn flashing and headlights blinking! Visualizing soundwave ripples on the showroom floor.')
  }

  return (
    <div className="min-h-screen relative">
      {/* Navbar */}
      <Navbar lang={lang} setLang={setLang} isConnected={true} selectedVehicle={selectedVehicle} telemetry={{
        battery: powertrainType === 'electric' ? selectedVehicle?.battery || '87%' : selectedVehicle?.fuel || '68%',
        externalTemp: '22',
        range: powertrainType === 'electric' ? '460 km' : '540 km',
      }} />

      {/* 3D Showroom */}
      <div className="relative">
        <div className="h-[60vh] w-full bg-slate-950 rounded-t-lg overflow-hidden">
          <Car3DViewer
            selectedBrand={selectedVehicle}
            powertrainType={powertrainType}
            windowStates={windowStates}
            setWindowStates={setWindowStates}
            doorsLocked={doorsLocked}
            setDoorsLocked={setDoorsLocked}
            acOn={acOn}
            setAcOn={setAcOn}
            acTargetTemp={acTargetTemp}
            setAcTargetTemp={setAcTargetTemp}
            interiorTemp={interiorTemp}
            setInteriorTemp={setInteriorTemp}
            ambientCabinColor={ambientCabinColor}
            setAmbientCabinColor={setAmbientCabinColor}
            driveMode={driveMode}
            setDriveMode={setDriveMode}
            tirePressure={tirePressure}
            setTirePressure={setTirePressure}
            refueling={refueling}
            setRefueling={setRefueling}
            tpmPSI={tpmPSI}
            findCar={handleFindCar}
          />
        </div>

        <div className="absolute top-6 left-6 px-4 py-2 bg-slate-800/80 backdrop-blur-xl rounded-xl text-cyan-300 font-medium text-sm">
          ● Connected • {selectedVehicle?.label[lang]}
        </div>
      </div>

      {/* Control Center */}
      <div className="mt-20 p-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Security & Location card */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300">
            <h3 className="text-slate-100 text-sm font-medium mb-4">{t('security')}</h3>
            <div className="space-y-3">
              <button
                onClick={() => setDoorsLocked(true)}
                className="w-full bg-slate-800/50 border border-slate-600/30 rounded-lg px-4 py-3 text-slate-100 flex items-center justify-between hover:border-cyan-400/50 transition-colors"
              >
                <span>{t('lock')}</span>
                <svg className="w-4 h-4 text-yellow-400" data-lucide="lock" />
              </button>
              <button
                onClick={() => setDoorsLocked(false)}
                className="w-full bg-slate-800/50 border border-slate-600/30 rounded-lg px-4 py-3 text-slate-100 flex items-center justify-between hover:border-cyan-400/50 transition-colors"
              >
                <span>{t('unlock')}</span>
                <svg className="w-4 h-4 text-green-400" data-lucide="unlock" />
              </button>
            </div>
          </div>

          {/* Windows card */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300">
            <h3 className="text-slate-100 text-sm font-medium mb-4">{t('windows')}</h3>
            <div className="space-y-3">
              <button
                onClick={() => setWindowStates([100, 100, 100, 100])}
                className="w-full bg-cyan-500/20 hover:bg-cyan-400/30 text-cyan-300 font-medium py-2 rounded-lg transition-colors"
              >
                {t('openAll')}
              </button>
              <button
                onClick={() => setWindowStates([15, 15, 15, 15])}
                className="w-full bg-cyan-500/20 hover:bg-cyan-400/30 text-cyan-300 font-medium py-2 rounded-lg transition-colors"
              >
                {t('vent15')}
              </button>
              <button
                onClick={() => setWindowStates([0, 0, 0, 0])}
                className="w-full bg-cyan-500/20 hover:bg-cyan-400/30 text-cyan-300 font-medium py-2 rounded-lg transition-colors"
              >
                {t('closeAll')}
              </button>
              <div className="mt-2 flex justify-between text-slate-400 text-xs">
                <span>FL: {windowStates?.[0]}%</span>
                <span>FR: {windowStates?.[1]}%</span>
                <span>RL: {windowStates?.[2]}%</span>
                <span>RR: {windowStates?.[3]}%</span>
              </div>
              <div className="mt-3 space-y-2">
                <input
                  type="range" min="0" max="100" value={windowStates?.[0] ?? 0}
                  onChange={(e) => setWindowStates([parseInt(e.target.value), windowStates?.[1] ?? 0, windowStates?.[2] ?? 0, windowStates?.[3] ?? 0])}
                  className="w-full bg-slate-800/50 border border-slate-600/30 rounded-lg h-2 appearance-none"
                />
                <input
                  type="range" min="0" max="100" value={windowStates?.[1] ?? 0}
                  onChange={(e) => setWindowStates([windowStates?.[0] ?? 0, parseInt(e.target.value), windowStates?.[2] ?? 0, windowStates?.[3] ?? 0])}
                  className="w-full bg-slate-800/50 border border-slate-600/30 rounded-lg h-2 appearance-none mt-2"
                />
                <input
                  type="range" min="0" max="100" value={windowStates?.[2] ?? 0}
                  onChange={(e) => setWindowStates([windowStates?.[0] ?? 0, windowStates?.[1] ?? 0, parseInt(e.target.value), windowStates?.[3] ?? 0])}
                  className="w-full bg-slate-800/50 border border-slate-600/30 rounded-lg h-2 appearance-none mt-2"
                />
                <input
                  type="range" min="0" max="100" value={windowStates?.[3] ?? 0}
                  onChange={(e) => setWindowStates([windowStates?.[0] ?? 0, windowStates?.[1] ?? 0, windowStates?.[2] ?? 0, parseInt(e.target.value)])}
                  className="w-full bg-slate-800/50 border border-slate-600/30 rounded-lg h-2 appearance-none mt-2"
                />
              </div>
            </div>
          </div>

          {/* Climate card */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300">
            <h3 className="text-slate-100 text-sm font-medium mb-4">{t('climate')}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>{t('acPower')}</span>
                <label className="relative inline-flex items-center">
                  <input
                    type="checkbox" checked={acOn} onChange={(e) => setAcOn(e.target.checked)}
                    className="w-4 h-4 rounded bg-cyan-600 cursor-pointer accent-cyan-500"
                  />
                  <span className="ml-2 text-slate-300">ON</span>
                </label>
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-1">Target Temperature</label>
                <input
                  type="range" min="16" max="30" value={acTargetTemp}
                  onChange={(e) => setAcTargetTemp(parseInt(e.target.value))}
                  className="w-full bg-slate-800/50 border border-slate-600/30 rounded-lg h-2 appearance-none"
                />
                <span className="text-slate-200 ml-2">{acTargetTemp}°C</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-slate-300">Interior: {interiorTemp}°C</span>
                <span className="text-cyan-400">FRESH AIR</span>
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-1">Ambient Color</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setAmbientCabinColor('#00ffff')}
                    className={`w-8 h-8 rounded-full ${ambientCabinColor === '#00ffff' ? 'border-2 border-cyan-400 bg-cyan-400' : 'opacity-30'}`}
                  ></button>
                  <button
                    onClick={() => setAmbientCabinColor('#ffffff')}
                    className={`w-8 h-8 rounded-full ${ambientCabinColor === '#ffffff' ? 'border-2 border-cyan-400 bg-white' : 'opacity-30'}`}
                  ></button>
                  <button
                    onClick={() => setAmbientCabinColor('#0000ff')}
                    className={`w-8 h-8 rounded-full ${ambientCabinColor === '#0000ff' ? 'border-2 border-cyan-400 bg-blue-400' : 'opacity-30'}`}
                  ></button>
                  <button
                    onClick={() => setAmbientCabinColor('#ffa500')}
                    className={`w-8 h-8 rounded-full ${ambientCabinColor === '#ffa500' ? 'border-2 border-cyan-400 bg-orange-400' : 'opacity-30'}`}
                  ></button>
                </div>
              </div>
            </div>
          </div>

          {/* Drive Modes card */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300">
            <h3 className="text-slate-100 text-sm font-medium mb-4">{t('driveModes')}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-slate-300 text-sm mb-1">Drive Mode</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setDriveMode('ECO')}
                    className={`px-4 py-2 rounded ${driveMode === 'ECO' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800/50 text-cyan-300 border border-cyan-400/30'}`}
                  >
                    {t('eco')}
                  </button>
                  <button
                    onClick={() => setDriveMode('COMFORT')}
                    className={`px-4 py-2 rounded ${driveMode === 'COMFORT' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800/50 text-cyan-300 border border-cyan-400/30'}`}
                  >
                    {t('comfort')}
                  </button>
                  <button
                    onClick={() => setDriveMode('SPORT+')}
                    className={`px-4 py-2 rounded ${driveMode === 'SPORT+' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800/50 text-cyan-300 border border-cyan-400/30'}`}
                  >
                    {t('sport')}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-1">Tire Pressure (TPMS)</label>
                <div className="flex items-baseline justify-between">
                  <span className="text-slate-300">{tpmPSI} PSI</span>
                  <span className={tpmPSI < 30 ? 'text-red-400' : 'text-green-400'}>{tpmPSI < 30 ? 'LOW' : 'OK'}</span>
                </div>
                <input
                  type="range" min="25" max="45" value={tpmPSI}
                  onChange={(e) => setTirePressure(parseInt(e.target.value))}
                  className="w-full bg-slate-800/50 border border-slate-600/30 rounded-lg h-2 appearance-none mt-1"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-1">{powertrainType === 'electric' ? 'Fast Charging' : 'Refueling'}</label>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">{refueling ? 'Active' : 'Idle'}</span>
                  <button
                    onClick={() => setRefueling(!refueling)}
                    className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-400/30 text-cyan-300 rounded transition-colors text-sm"
                  >
                    {refueling ? 'Stop' : 'Start'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============ MAIN APP ============
export default function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [lang, setLang] = useState('uz')
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [powertrainType, setPowertrainType] = useState('electric')

  const handleConnect = (vehicle, language) => {
    setSelectedVehicle(vehicle)
    setPowertrainType(vehicle.powertrain)
    setLang('uz')
    setIsConnected(true)
  }

  const handleFindCar = () => {
    alert('Horn flashing and headlights blinking! Visualizing soundwave ripples on the showroom floor.')
  }

  if (!isConnected) {
    return <LoginScreen onConnect={handleConnect} lang={lang} setLang={setLang} setIsConnected={setIsConnected} setSelectedVehicle={setSelectedVehicle} />
  }

  // Initialize window states based on powertrain
  const [windowStates, setWindowStates] = useState(() => powertrainType === 'electric' ? [0, 0, 0, 0] : [0, 0, 0, 0])
  const [doorsLocked, setDoorsLocked] = useState(false)
  const [acOn, setAcOn] = useState(false)
  const [acTargetTemp, setAcTargetTemp] = useState(22)
  const [interiorTemp, setInteriorTemp] = useState(22)
  const [ambientCabinColor, setAmbientCabinColor] = useState('#00ffff')
  const [driveMode, setDriveMode] = useState('ECO')
  const [tirePressure, setTirePressure] = useState(30)
  const [refueling, setRefueling] = useState(false)
  const [tpmPSI, setTpmPSI] = useState(30)

  return (
    <Router>
      <Dashboard
        lang={lang}
        setLang={setLang}
        selectedVehicle={selectedVehicle}
        powertrainType={powertrainType}
        windowStates={windowStates}
        setWindowStates={setWindowStates}
        doorsLocked={doorsLocked}
        setDoorsLocked={setDoorsLocked}
        acOn={acOn}
        setAcOn={setAcOn}
        acTargetTemp={acTargetTemp}
        setAcTargetTemp={setAcTargetTemp}
        interiorTemp={interiorTemp}
        setInteriorTemp={setInteriorTemp}
        ambientCabinColor={ambientCabinColor}
        setAmbientCabinColor={setAmbientCabinColor}
        driveMode={driveMode}
        setDriveMode={setDriveMode}
        tirePressure={tirePressure}
        setTirePressure={setTirePressure}
        refueling={refueling}
        setRefueling={setRefueling}
        tpmPSI={tpmPSI}
        findCar={handleFindCar}
      />
    </Router>
  )
}