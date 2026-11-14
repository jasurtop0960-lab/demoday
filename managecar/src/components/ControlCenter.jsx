import React from 'react'
import { Sun, Moon, Eye, X, Lock, Unlock, CarFront, CarRear, Window, Wiper, Ac, Thermometer, Fan, Palette, Drop, MapPin, Search, ShieldCheck, Flash, Music, Settings, Home, ArrowRight, ArrowLeft, Cpu, Battery, Zap, Tire, Fuel, Map, Layout, List, MoreHorizontal, ChevronDown, LogOut, LogIn, Settings as SettingsIcon } from 'lucide-react'

// Translations for control center labels
const controlLabels = {
  uz: {
    security: 'Xavfsizlik',
    location: 'Lokatsiya',
    lock: 'Quriltirish',
    unlock: 'Aqlliqtirish',
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
    refuel: 'Refueling simulation',
  },
  en: {
    security: 'Security',
    location: 'Location',
    lock: 'Lock',
    unlock: 'Unlock',
    findMyCar: 'Find My Car',
    sentryMode: 'Sentry Mode',
    windows: 'Windows',
    openAll: 'Open All',
    vent15: 'Vent 15%',
    closeAll: 'Close All',
    climate: 'Climate',
    acPower: 'A/C',
    temperature: 'Temperature',
    cabinTemp: 'Cabins temp',
    ambientColor: 'Ambient color',
    driveModes: 'Drive Modes',
    eco: 'ECO',
    comfort: 'COMFORT',
    sport: 'SPORT+',
    tirePressure: 'Tire Pressure (TPMS)',
    refuel: 'Refueling simulation',
  },
  ru: {
    security: 'Безопасность',
    location: 'Локация',
    lock: 'Замок',
    unlock: 'Открыть',
    findMyCar: 'Найти мою машину',
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
    refuel: 'Симуляция заправки',
  },
}

export const ControlCenter = ({
  selectedBrand,
  powertrainType,
  windowStates,
  setWindowStates,
  doorsLocked,
  setDoorsLocked,
  acOn,
  setAcOn,
  acTargetTemp,
  setAcTargetTemp,
  interiorTemp,
  setInteriorTemp,
  ambientCabinColor,
  setAmbientCabinColor,
  driveMode,
  setDriveMode,
  tirePressure,
  setTirePressure,
  refueling,
  setRefueling,
  tpmPSI,
  onLanguageChange,
}) => {
  const translate = (key) => controlLabels[onLanguageChange]?.[key] || controlLabels.uz[key] || key

  return (
    <div className="w-full grid grid-cols-2 gap-4 pt-4">
      {/* Card 1: Security & Location */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300">
        <h3 className="text-slate-100 text-sm font-medium mb-4">{translate('security')}</h3>
        <div className="space-y-4">
          <button
            onClick={() => setDoorsLocked(true)}
            className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-600/30 rounded-lg px-4 py-3 text-slate-100 flex items-center justify-between hover:border-cyan-400/50 transition-colors"
          >
            <span>{translate('lock')}</span>
            <svg className="w-4 h-4 text-yellow-400" data-lucide="lock" />
          </button>
          <button
            onClick={() => setDoorsLocked(false)}
            className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-600/30 rounded-lg px-4 py-3 text-slate-100 flex items-center justify-between hover:border-cyan-400/50 transition-colors"
          >
            <span>{translate('unlock')}</span>
            <svg className="w-4 h-4 text-green-400" data-lucide="unlock" />
          </button>
          <button
            onClick={() => setTirePressure(t => t >= 30 ? t - 2 : t)}
            className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-600/30 rounded-lg px-4 py-3 text-slate-100 flex items-center justify-between hover:border-cyan-400/50 transition-colors"
          >
            <span>TPMS -</span>
            <span className="text-cyan-400">{tpmPSI} PSI</span>
          </button>
          <button
            onClick={() => setTirePressure(t => t + 2)}
            className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-600/30 rounded-lg px-4 py-3 text-slate-100 flex items-center justify-between hover:border-cyan-400/50 transition-colors"
          >
            <span>TPMS +</span>
            <span className="text-cyan-400">{tpmPSI + 2} PSI</span>
          </button>
        </div>
      </div>

      {/* Card 2: Windows & Glass */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300">
        <h3 className="text-slate-100 text-sm font-medium mb-4">{translate('windows')}</h3>
        <div className="space-y-3">
          <button
            onClick={() => setWindowStates([100, 100, 100, 100])}
            className="w-full bg-cyan-500/20 hover:bg-cyan-400/30 text-cyan-300 font-medium py-2 rounded-lg transition-colors"
          >
            {translate('openAll')}
          </button>
          <button
            onClick={() => setWindowStates([15, 15, 15, 15])}
            className="w-full bg-cyan-500/20 hover:bg-cyan-400/30 text-cyan-300 font-medium py-2 rounded-lg transition-colors"
          >
            {translate('vent15')}
          </button>
          <button
            onClick={() => setWindowStates([0, 0, 0, 0])}
            className="w-full bg-cyan-500/20 hover:bg-cyan-400/30 text-cyan-300 font-medium py-2 rounded-lg transition-colors"
          >
            {translate('closeAll')}
          </button>
          {/* Individual window sliders - simplified: use input range */}
          <div className="mt-3 flex justify-between text-slate-400 text-xs">
            <span>FL: {windowStates?.[0]}%</span>
            <span>FR: {windowStates?.[1]}%</span>
            <span>RL: {windowStates?.[2]}%</span>
            <span>RR: {windowStates?.[3]}%</span>
          </div>
          {/* Sliders for individual windows */}
          <div className="mt-3">
            <input
              type="range"
              min="0"
              max="100"
              value={windowStates?.[0] ?? 0}
              onChange={(e) => setWindowStates([parseInt(e.target.value), windowStates?.[1] ?? 0, windowStates?.[2] ?? 0, windowStates?.[3] ?? 0])}
              className="w-full bg-slate-800/50 border border-slate-600/30 rounded-lg h-2 appearance-none"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={windowStates?.[1] ?? 0}
              onChange={(e) => setWindowStates([windowStates?.[0] ?? 0, parseInt(e.target.value), windowStates?.[2] ?? 0, windowStates?.[3] ?? 0])}
              className="w-full bg-slate-800/50 border border-slate-600/30 rounded-lg h-2 appearance-none mt-2"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={windowStates?.[2] ?? 0}
              onChange={(e) => setWindowStates([windowStates?.[0] ?? 0, windowStates?.[1] ?? 0, parseInt(e.target.value), windowStates?.[3] ?? 0])}
              className="w-full bg-slate-800/50 border border-slate-600/30 rounded-lg h-2 appearance-none mt-2"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={windowStates?.[3] ?? 0}
              onChange={(e) => setWindowStates([windowStates?.[0] ?? 0, windowStates?.[1] ?? 0, windowStates?.[2] ?? 0, parseInt(e.target.value)])}
              className="w-full bg-slate-800/50 border border-slate-600/30 rounded-lg h-2 appearance-none mt-2"
            />
          </div>
        </div>
      </div>

      {/* Card 3: Climate & Airflow */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300">
        <h3 className="text-slate-100 text-sm font-medium mb-4">{translate('climate')}</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>{translate('acPower')}</span>
            <label className="relative inline-flex items-center">
              <input
                type="checkbox"
                checked={acOn}
                onChange={(e) => setAcOn(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-600 cursor-pointer accent-cyan-500"
              />
              <span className="ml-2 text-slate-300">ON</span>
            </label>
          </div>
          <div>
            <label className="block text-slate-300 text-sm mb-1">Target Temperature</label>
            <input
              type="range"
              min="16"
              max="30"
              value={acTargetTemp}
              onChange={(e) => setAcTargetTemp(parseInt(e.target.value))}
              className="w-full bg-slate-800/50 border border-slate-600/30 rounded-lg h-2 appearance-none"
            />
            <span className="text-slate-200 ml-2">{acTargetTemp}°C</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-slate-300">Interior: {interiorTemp}°C</span>
            <span className="text-cyan-400">FRESH AIR</span>
          </div>
          {/* Ambient Cabin Color Picker */}
          <div>
            <label className="block text-slate-300 text-sm mb-1">{translate('ambientColor')}</label>
            <div className="flex gap-2">
              <button
                onClick={() => setAmbientCabinColor('#00ffff')}
                className={`w-8 h-8 rounded-full ${ambientCabinColor === '#00ffff' ? 'border-2 border-cyan-400' : ''} ${ambientCabinColor === '#00ffff' ? 'bg-cyan-400' : 'opacity-30'}`}
              ></button>
              <button
                onClick={() => setAmbientCabinColor('#ffffff')}
                className={`w-8 h-8 rounded-full ${ambientCabinColor === '#ffffff' ? 'border-2 border-cyan-400' : ''} ${ambientCabinColor === '#ffffff' ? 'bg-white' : 'opacity-30'}`}
              ></button>
              <button
                onClick={() => setAmbientCabinColor('#0000ff')}
                className={`w-8 h-8 rounded-full ${ambientCabinColor === '#0000ff' ? 'border-2 border-cyan-400' : ''} ${ambientCabinColor === '#0000ff' ? 'bg-blue-400' : 'opacity-30'}`}
              ></button>
              <button
                onClick={() => setAmbientCabinColor('#ffa500')}
                className={`w-8 h-8 rounded-full ${ambientCabinColor === '#ffa500' ? 'border-2 border-cyan-400' : ''} ${ambientCabinColor === '#ffa500' ? 'bg-orange-400' : 'opacity-30'}`}
              ></button>
            </div>
          </div>
        </div>
      </div>

      {/* Card 4: Drive Modes & Diagnostics */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300">
        <h3 className="text-slate-100 text-sm font-medium mb-4">{translate('driveModes')}</h3>
        <div className="space-y-3">
          {/* Drive Mode Selector */}
          <div>
            <label className="block text-slate-300 text-sm mb-1">Drive Mode</label>
            <div className="flex space-x-2">
              <button
                onClick={() => setDriveMode('ECO')}
                className={`px-4 py-2 rounded ${driveMode === 'ECO' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800/50 text-cyan-300 border border-cyan-400/30'}`}
              >
                {translate('eco')}
              </button>
              <button
                onClick={() => setDriveMode('COMFORT')}
                className={`px-4 py-2 rounded ${driveMode === 'COMFORT' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800/50 text-cyan-300 border border-cyan-400/30'}`}
              >
                {translate('comfort')}
              </button>
              <button
                onClick={() => setDriveMode('SPORT+')}
                className={`px-4 py-2 rounded ${driveMode === 'SPORT+' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800/50 text-cyan-300 border border-cyan-400/30'}`}
              >
                {translate('sport')}
              </button>
            </div>
          </div>

          {/* Tire Pressure TPMS Display */}
          <div>
            <label className="block text-slate-300 text-sm mb-1">Tire Pressure (TPMS)</label>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-300">{tpmPSI} PSI</span>
              <span className={tpmPSI < 30 ? 'text-red-400' : 'text-green-400'}>{tpmPSI < 30 ? 'LOW' : 'OK'}</span>
            </div>
            <input
              type="range"
              min="25"
              max="45"
              value={tpmPSI}
              onChange={(e) => setTirePressure(parseInt(e.target.value))}
              className="w-full bg-slate-800/50 border border-slate-600/30 rounded-lg h-2 appearance-none mt-1"
            />
          </div>

          {/* Refueling / Fast Charging */}
          <div>
            <label className="block text-slate-300 text-sm mb-1">{isElectric ? 'Fast Charging' : 'Refueling'}</label>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">{refuel ? 'Active' : 'Idle'}</span>
              <button
                onClick={() => setRefueling(!refuel)}
                className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-400/30 text-cyan-300 rounded transition-colors text-sm"
              >
                {refuel ? 'Stop' : 'Start'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}