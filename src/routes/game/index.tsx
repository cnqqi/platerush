import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useContext, useState } from 'react'
import { PlayerContext } from '../game'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Monitor, Laptop, TabletSmartphone, X, CheckCircle } from 'lucide-react'

export const Route = createFileRoute('/game/')({
  component: NameInput,
})

function DeviceRecommendationModal({ onContinue }: { onContinue: () => void }) {
  const devices = [
    {
      icon: <Laptop className="w-10 h-10" />,
      name: 'Laptop',
      description: 'Dengan webcam bawaan',
    },
    {
      icon: <Monitor className="w-10 h-10" />,
      name: 'Desktop',
      description: 'Dengan webcam eksternal',
    },
    {
      icon: <TabletSmartphone className="w-10 h-10" />,
      name: 'Tablet',
      description: 'Mode landscape',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative bg-white rounded-3xl shadow-2xl shadow-slate-900/20 max-w-lg w-full overflow-hidden"
      >
        {/* Top decorative gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500" />

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 mb-5"
            >
              <Monitor className="w-8 h-8 text-orange-500" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              Rekomendasi Perangkat
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
              Untuk pengalaman bermain terbaik, gunakan salah satu perangkat berikut dengan layar yang cukup lebar.
            </p>
          </div>

          {/* Device cards */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {devices.map((device, index) => (
              <motion.div
                key={device.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                className="flex flex-col items-center text-center p-4 md:p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-300 group"
              >
                <div className="text-slate-400 group-hover:text-orange-500 transition-colors duration-300 mb-3">
                  {device.icon}
                </div>
                <p className="font-bold text-slate-900 text-sm mb-1">
                  {device.name}
                </p>
                <p className="text-xs text-slate-400 leading-snug">
                  {device.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Info tip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100 mb-8"
          >
            <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm text-amber-700 leading-relaxed">
              Game ini menggunakan <strong>kamera & gestur tangan</strong> untuk bermain. Pastikan perangkatmu memiliki webcam dan pencahayaan yang cukup.
            </p>
          </motion.div>

          {/* Action button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onClick={onContinue}
            className="w-full flex items-center justify-center py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 transition-all active:scale-[0.98] cursor-pointer"
          >
            Saya Mengerti, Lanjutkan <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function NameInput() {
  const navigate = useNavigate()
  const { playerName, setPlayerName } = useContext(PlayerContext)
  const [nameInput, setNameInput] = useState(playerName)
  const [showDeviceModal, setShowDeviceModal] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (nameInput.trim()) {
      setPlayerName(nameInput.trim())
      navigate({ to: '/game/menu' })
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <Link to="/" className="absolute top-8 left-8 flex items-center text-slate-500 hover:text-slate-900 transition-colors font-medium">
        <ArrowLeft className="w-5 h-5 mr-2" /> Kembali ke Beranda
      </Link>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/70 backdrop-blur-xl p-10 max-w-md w-full border border-white/50 shadow-xl shadow-slate-200/50 rounded-3xl"
      >
        <div className="text-center mb-8">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-xs font-bold tracking-wider mb-4">
            LANGKAH 1
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Siapa Namamu?</h2>
          <p className="text-slate-500">Masukkan nama Anda untuk memulai permainan dan mencatat skor di Leaderboard.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="playerName" className="block text-sm font-medium text-slate-700 mb-2">Nama Pemain</label>
            <input
              id="playerName"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Contoh: Budi"
              className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
              maxLength={15}
              required
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={!nameInput.trim()}
            className="w-full flex items-center justify-center py-4 mt-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 transition-all  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Lanjut <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </form>
      </motion.div>

      {/* Device Recommendation Modal */}
      <AnimatePresence>
        {showDeviceModal && (
          <DeviceRecommendationModal onContinue={() => setShowDeviceModal(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}
