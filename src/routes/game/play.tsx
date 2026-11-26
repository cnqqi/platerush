import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useContext, useState, useEffect, useRef } from 'react'
import { PlayerContext } from '../game'
import { PrismaClient } from '@prisma/client'
import { User, Clock, Trophy } from 'lucide-react'
import { CameraTracker } from '../../components/CameraTracker'
import { GameCanvas } from '../../components/GameCanvas'
import type { HandCursor } from '../../hooks/useHandTracking'

const prisma = new PrismaClient()

// Server action to submit score
export const submitScore = createServerFn({ method: 'POST' })
  .validator((data: { name: string; score: number }) => data)
  .handler(async ({ data }) => {
    return await prisma.score.create({
      data: {
        name: data.name,
        score: data.score
      }
    })
  })

export const Route = createFileRoute('/game/play')({
  component: GamePlay,
})

function GamePlay() {
  const { playerName, gameSettings } = useContext(PlayerContext)
  const navigate = useNavigate()
  
  // Use a ref instead of state to avoid re-rendering GamePlay 60 times a second
  const cursorRef = useRef<HandCursor>({ x: 0, y: 0, isGrabbing: false, isVisible: false })
  const [timeRemaining, setTimeRemaining] = useState(gameSettings.duration)
  const [isGameOver, setIsGameOver] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCursorUpdate = (newCursor: HandCursor) => {
    cursorRef.current = newCursor;
  };

  useEffect(() => {
    // Redirect if no player name
    if (!playerName) {
      navigate({ to: '/game' })
    }
  }, [playerName, navigate])

  useEffect(() => {
    if (isGameOver) return
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isGameOver])

  const handleGameOver = async (score: number) => {
    if (isGameOver) return
    setIsGameOver(true)
    setFinalScore(score)
    setIsSubmitting(true)
    
    try {
      await submitScore({ data: { name: playerName, score } })
    } catch (e) {
      console.error("Failed to save score:", e)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isGameOver) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-white/70 backdrop-blur-xl p-10 max-w-md w-full text-center rounded-3xl border border-white/50 shadow-xl shadow-slate-200/50 animate-in zoom-in duration-500">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Waktu Habis!</h2>
          <p className="text-xl text-slate-500 mb-8">Permainan Selesai</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100 shadow-inner">
            <p className="text-slate-500 mb-2 font-medium">Skor Akhir Anda</p>
            <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              {finalScore}
            </p>
          </div>
          
          <button
            onClick={() => navigate({ to: '/game/leaderboard' })}
            disabled={isSubmitting}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all  disabled:opacity-50"
          >
            {isSubmitting ? 'Menyimpan Skor...' : 'Lihat Leaderboard'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col relative w-full h-full overflow-hidden">
      {/* Top UI Area */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
        <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white shadow-lg text-slate-800 font-bold text-xl flex items-center">
          <User className="w-5 h-5 text-orange-500 mr-2" strokeWidth={2.5} /> {playerName}
        </div>
        <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white shadow-lg text-slate-800 font-bold text-xl flex items-center">
          <Trophy className="w-5 h-5 text-amber-500 mr-2" strokeWidth={2.5} /> Skor: <span id="game-score-display" className="ml-2 text-orange-500 font-black">0</span>
        </div>
      </div>
      
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md px-8 py-3 rounded-2xl border border-white shadow-lg text-slate-800 font-black text-3xl flex items-center gap-3">
        <Clock className="w-7 h-7 text-red-500" strokeWidth={3} /> 00:{timeRemaining.toString().padStart(2, '0')}
      </div>

      {/* Main Game Area */}
      <GameCanvas 
        cursorRef={cursorRef} 
        difficulty={gameSettings.difficulty}
        speedRange={gameSettings.speedRange}
        baseSpawnInterval={gameSettings.baseSpawnInterval}
        totalDuration={gameSettings.duration}
        timeRemaining={timeRemaining}
        onGameOver={handleGameOver}
      />
      
      {/* Camera Feed - Moved to top-left */}
      <div className="absolute top-6 left-6 w-72 h-52 border-4 border-white shadow-2xl rounded-3xl overflow-hidden backdrop-blur-md z-50">
        <CameraTracker onCursorUpdate={handleCursorUpdate} />
      </div>
    </div>
  )
}
