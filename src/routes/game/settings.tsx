import { createFileRoute, Link } from '@tanstack/react-router'
import { useContext } from 'react'
import { PlayerContext } from '../game'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Zap } from 'lucide-react'

export const Route = createFileRoute('/game/settings')({
  component: GameSettings,
})

function GameSettings() {
  const { gameSettings, setGameSettings } = useContext(PlayerContext)

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGameSettings({ ...gameSettings, duration: parseInt(e.target.value, 10) })
  }

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGameSettings({ ...gameSettings, difficulty: e.target.value as 'easy' | 'hard' })
  }

  const handleMinSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setGameSettings({ 
      ...gameSettings, 
      speedRange: { ...gameSettings.speedRange, min: Math.min(val, gameSettings.speedRange.max - 1) } 
    })
  }

  const handleMaxSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setGameSettings({ 
      ...gameSettings, 
      speedRange: { ...gameSettings.speedRange, max: Math.max(val, gameSettings.speedRange.min + 1) } 
    })
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/70 backdrop-blur-xl p-8 max-w-md w-full border border-white/50 shadow-xl shadow-slate-200/50 rounded-3xl my-8"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Pengaturan</h2>
          <p className="text-slate-500">Sesuaikan tingkat kesulitan game</p>
        </div>
        
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 font-bold flex items-center">
              <Clock className="w-5 h-5 mr-2 text-orange-500" /> Durasi Permainan
            </label>
            <div className="relative">
              <select 
                value={gameSettings.duration} 
                onChange={handleDurationChange}
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none shadow-sm cursor-pointer"
              >
                <option value="30">30 Detik (Sangat Singkat)</option>
                <option value="60">60 Detik (Normal)</option>
                <option value="90">90 Detik (Lama)</option>
                <option value="120">120 Detik (Sangat Lama)</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-700 font-bold flex items-center">
              <Zap className="w-5 h-5 mr-2 text-orange-500" /> Mode Kesulitan
            </label>
            <div className="relative">
              <select 
                value={gameSettings.difficulty} 
                onChange={handleDifficultyChange}
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none shadow-sm cursor-pointer"
              >
                <option value="easy">EASY (Kecepatan Stabil)</option>
                <option value="hard">HARD (Semakin Cepat)</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            {gameSettings.difficulty === 'hard' && (
              <p className="text-xs text-orange-600 font-medium">Dalam mode Hard, kecepatan buah akan terus bertambah seiring waktu!</p>
            )}
          </div>

          <div className="flex flex-col gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-sm font-bold text-slate-700">Rentang Kecepatan Awal</p>
            
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Minimal: <span className="font-bold">{gameSettings.speedRange.min}</span></span>
              </div>
              <input 
                type="range" min="1" max="10" step="0.5" 
                value={gameSettings.speedRange.min} onChange={handleMinSpeedChange}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Maksimal: <span className="font-bold">{gameSettings.speedRange.max}</span></span>
              </div>
              <input 
                type="range" min="2" max="15" step="0.5" 
                value={gameSettings.speedRange.max} onChange={handleMaxSpeedChange}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-slate-700 font-bold flex items-center">
                <Zap className="w-5 h-5 mr-2 text-orange-500" /> Intensitas Makanan (Detik)
              </label>
              <span className="bg-orange-100 text-orange-600 font-bold px-2 py-1 rounded text-sm">
                {gameSettings.baseSpawnInterval} dt
              </span>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="5" 
              step="0.5" 
              value={gameSettings.baseSpawnInterval} 
              onChange={(e) => setGameSettings({ ...gameSettings, baseSpawnInterval: parseFloat(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>Sangat Cepat (Banyak)</span>
              <span>Santai (Sedikit)</span>
            </div>
          </div>
          
          <Link
            to="/game/menu"
            className="w-full flex items-center justify-center py-4 mt-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 transition-all "
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Simpan & Kembali
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
