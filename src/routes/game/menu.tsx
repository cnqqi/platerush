import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useContext, useEffect } from 'react'
import { PlayerContext } from '../game'
import { motion } from 'framer-motion'
import { Play, Settings, Trophy, LogOut } from 'lucide-react'

export const Route = createFileRoute('/game/menu')({
  component: GameMenu,
})

function GameMenu() {
  const { playerName, setPlayerName } = useContext(PlayerContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!playerName) {
      navigate({ to: '/game' })
    }
  }, [playerName, navigate])

  if (!playerName) return null

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/70 backdrop-blur-xl p-10 max-w-sm w-full border border-white/50 shadow-xl shadow-slate-200/50 rounded-3xl"
      >
        <div className="text-center mb-10">
          <p className="text-sm font-bold text-orange-500 tracking-wider uppercase mb-2">Pemain Saat Ini</p>
          <h2 className="text-4xl font-extrabold text-slate-900">
            {playerName}
          </h2>
        </div>
        
        <div className="flex flex-col gap-4">
          <Link
            to="/game/play"
            className="flex items-center justify-center w-full px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-xl font-bold transition-all  hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 group"
          >
            <Play className="w-6 h-6 mr-2 fill-current group-hover:scale-110 transition-transform" /> Mulai Game
          </Link>
          
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Link
              to="/game/settings"
              className="flex flex-col items-center justify-center p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl transition-all  hover:shadow-md active:scale-95 group"
            >
              <Settings className="w-8 h-8 text-slate-600 mb-2 group-hover:text-orange-500 transition-colors" />
              <span className="font-semibold text-slate-700">Pengaturan</span>
            </Link>
            <Link
              to="/game/leaderboard"
              className="flex flex-col items-center justify-center p-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl transition-all  hover:shadow-md active:scale-95 group"
            >
              <Trophy className="w-8 h-8 text-slate-600 mb-2 group-hover:text-orange-500 transition-colors" />
              <span className="font-semibold text-slate-700">Leaderboard</span>
            </Link>
          </div>
          
          <button
            onClick={() => {
              setPlayerName('')
              navigate({ to: '/' })
            }}
            className="flex items-center justify-center w-full px-6 py-4 mt-4 text-slate-500 hover:text-slate-900 font-medium transition-colors group"
          >
            <LogOut className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Ganti Pemain
          </button>
        </div>
      </motion.div>
    </div>
  )
}
