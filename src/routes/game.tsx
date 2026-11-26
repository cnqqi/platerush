import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useState, createContext, useContext } from 'react'

export const Route = createFileRoute('/game')({
  component: GameLayout,
})

// Simple global state for the player
export type GameDifficulty = 'easy' | 'hard';

export type GameSettingsType = {
  duration: number; // in seconds
  difficulty: GameDifficulty;
  speedRange: { min: number, max: number };
  baseSpawnInterval: number; // in seconds
};

type PlayerContextType = {
  playerName: string;
  setPlayerName: (name: string) => void;
  gameSettings: GameSettingsType;
  setGameSettings: (settings: GameSettingsType) => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  playerName: '',
  setPlayerName: () => {},
  gameSettings: { duration: 60, difficulty: 'easy', speedRange: { min: 2, max: 5 }, baseSpawnInterval: 2 },
  setGameSettings: () => {}
})

function GameLayout() {
  const [playerName, setPlayerName] = useState('')
  const [gameSettings, setGameSettings] = useState<GameSettingsType>({ duration: 60, difficulty: 'easy', speedRange: { min: 2, max: 5 }, baseSpawnInterval: 2 })

  return (
    <PlayerContext.Provider value={{ playerName, setPlayerName, gameSettings, setGameSettings }}>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden relative">
        {/* Dynamic abstract background for game pages - Light Theme */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] rounded-full bg-orange-200/40 blur-[100px]" />
          <div className="absolute -bottom-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-amber-200/40 blur-[100px]" />
        </div>
        
        <div className="relative z-10 min-h-screen flex flex-col">
          <Outlet />
        </div>
      </div>
    </PlayerContext.Provider>
  )
}
