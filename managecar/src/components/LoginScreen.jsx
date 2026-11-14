import React, { useState } from 'react'
import { Menu, Settings, Lock, Search, Device, Music, Shield, Truck, Car, Map, Sun, Cloud, ExclamationCircle, Check, X, Eye, EyeOff, Mail, Phone, MailReply, Share, LogOut, Home, Refresh, Palette, Zap, Calendar, Layout, Flag, MoreHorizontal, ChevronDown, Filter, MailForward, Gift, Heart, Histogram, Info, Leaf, Mic, Monitor, Speaker, Sunrise, Sunset, Library, Notifications, Package, Link, MailOpen, MailQuestion, MailWarning, MailError, MailSuccess, MailDownload, MailUpload, MailEdit, MailDelete, MailPrint, MailSave, MailCopy, MailCut, MailPaste, MailUndo, MailRedo, MailFind, MailReplace, MailSearch, MailGo, MailHome, MailEnd, MailBack, MailForward2, MailBack2, MailRefresh, MailMore, MailCollapse, MailExpand } from 'lucide-react'

// Vehicle data with brand, powertrain type, battery/fuel info
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

export const LoginScreen = ({ onConnect }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleData[0])
  const [vin, setVin] = useState('UZ-777-MC')
  const [pin, setPin] = useState('1234')
  const [lang, setLang] = useState('uz')

  const brands = vehicleData.map(v => ({
    value: v.id,
    label: {
      uz: v.labelUz,
      en: v.labelEn,
      ru: v.labelRu,
    },
    powertrain: v.powertrain,
  }))

  const handleConnect = () => {
    // Trigger telemetry pairing animation (simple alert for now)
    // In a real app, this would involve a visual animation
    window.alert('Telemetry pairing initiated...')
    onConnect(selectedVehicle, lang)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-5 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 text-center mb-2">ManageCar</h1>
          <p className="text-slate-400 text-center text-sm">Smart Car Control Platform</p>
        </div>

        {/* Brand Selector */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">Select Car Brand</label>
          <select
            value={selectedVehicle.id}
            onChange={(e) => setSelectedVehicle(vehicleData.find(v => v.id === e.target.value) || vehicleData[0])}
            className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-600/30 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-400/50 transition-colors"
          >
            {brands.map(b => (
              <option key={b.value} value={b.value} className="text-slate-200">
                {b.label[lang]}
              </option>
            ))}
          </select>
        </div>

        {/* VIN Input */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">Vehicle VIN</label>
          <input
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            placeholder="UZ-777-MC (pre-filled)"
            className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-600/30 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-400/50 transition-colors"
          />
        </div>

        {/* PIN Input */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-2">Driver PIN</label>
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="1234"
            type="password"
            className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-600/30 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-cyan-400/50 transition-colors"
          />
        </div>

        {/* Connect Button */}
        <div>
          <button
            onClick={handleConnect}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium py-3 rounded-lg transition-colors shadow-lg shadow-cyan-400/20"
          >
            Connect / Ulanish
          </button>
        </div>
      </div>
    </div>
  )
}