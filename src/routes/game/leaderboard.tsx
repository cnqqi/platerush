import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { PrismaClient } from '@prisma/client'
import { motion } from 'framer-motion'
import { ArrowLeft, Trophy, Medal } from 'lucide-react'

const prisma = new PrismaClient()

// Server function to get leaderboard
export const getLeaderboard = createServerFn({ method: 'GET' })
  .handler(async () => {
    return await prisma.score.findMany({
      orderBy: { score: 'desc' },
      take: 10,
    })
  })

export const Route = createFileRoute('/game/leaderboard')({
  component: Leaderboard,
  loader: async () => await getLeaderboard(),
})

function Leaderboard() {
  const scores = Route.useLoaderData()

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/70 backdrop-blur-xl p-8 max-w-lg w-full border border-white/50 shadow-xl shadow-slate-200/50 rounded-3xl"
      >
        <div className="text-center mb-8 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
            Papan Peringkat
          </h2>
          <p className="text-slate-500">Pemain dengan skor tertinggi</p>
        </div>
        
        <div className="flex flex-col gap-3">
          {scores.length === 0 ? (
            <p className="text-center text-slate-400 py-8 italic border border-dashed border-slate-200 rounded-2xl">Belum ada skor yang tercatat. Jadilah yang pertama!</p>
          ) : (
            scores.map((score, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                key={score.id}
                className={`flex items-center justify-between p-4 bg-white rounded-2xl border ${index < 3 ? 'border-orange-200 shadow-sm shadow-orange-100' : 'border-slate-100'} transition-all hover:scale-[1.02]`}
              >
                <div className="flex items-center gap-4">
                  <span className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${
                    index === 0 ? 'bg-yellow-100 text-yellow-600' : 
                    index === 1 ? 'bg-slate-100 text-slate-500' : 
                    index === 2 ? 'bg-amber-100 text-amber-700' : 
                    'bg-slate-50 text-slate-400'
                  }`}>
                    {index < 3 ? <Medal className="w-5 h-5" /> : `#${index + 1}`}
                  </span>
                  <span className="text-lg text-slate-800 font-bold">{score.name}</span>
                </div>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
                  {score.score}
                </span>
              </motion.div>
            ))
          )}
        </div>
        
        <Link
          to="/game/menu"
          className="w-full flex items-center justify-center py-4 mt-8 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Kembali ke Menu
        </Link>
      </motion.div>
    </div>
  )
}
