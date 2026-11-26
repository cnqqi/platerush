import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-black tracking-tighter text-slate-900">
              Ohayou<span className="text-orange-500">.</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/#about" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Tentang</Link>
            <Link to="/#features" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Fitur</Link>
            <Link to="/#testimonials" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Testimoni</Link>
            <Link
              to="/game"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all bg-slate-900 rounded-full hover:bg-slate-800 hover:shadow-lg "
            >
              Main Sekarang
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-lg absolute w-full">
          <Link to="/#about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md">Tentang</Link>
          <Link to="/#features" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md">Fitur</Link>
          <Link to="/#testimonials" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md">Testimoni</Link>
          <Link to="/game" className="block w-full text-center mt-4 px-3 py-3 text-base font-bold text-white bg-slate-900 rounded-lg">
            Main Sekarang
          </Link>
        </div>
      )}
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <span className="text-2xl font-black tracking-tighter text-white">
            Ohayou<span className="text-orange-500">.</span>
          </span>
          <p className="mt-2 text-sm text-slate-400">Game Edukasi Nutrisi Generasi Baru.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between">
        <p>&copy; {new Date().getFullYear()} Ohayou. Hak Cipta Dilindungi.</p>
        <div className="mt-4 md:mt-0 space-x-4">
          <Link to="/privacy" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
        </div>
      </div>
    </footer>
  )
}

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-orange-200 selection:text-orange-900">
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  )
}
