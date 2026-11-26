import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Drip component for liquid animation
function LiquidDrip({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `calc(50% + ${x}px)`,
        background: 'linear-gradient(180deg, #f97316, #ea580c)',
        boxShadow: '0 4px 20px rgba(249,115,22,0.4)',
      }}
      initial={{ top: '50%', opacity: 0, scaleY: 1 }}
      animate={{
        top: ['50%', '55%', '85%', '95%'],
        opacity: [0, 1, 0.8, 0],
        scaleY: [1, 1.5, 2, 0.5],
        scaleX: [1, 0.8, 0.6, 1.5],
      }}
      transition={{
        duration: 1.8,
        delay,
        ease: 'easeIn',
        repeat: Infinity,
        repeatDelay: 0.5,
      }}
    />
  );
}

// Splash ripple at the bottom
function SplashRipple({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border-2 border-orange-400/60"
      initial={{ width: 0, height: 0, opacity: 0.8 }}
      animate={{
        width: [0, 80, 140],
        height: [0, 16, 24],
        opacity: [0.8, 0.4, 0],
      }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        repeatDelay: 1,
        ease: 'easeOut',
      }}
    />
  );
}

export function CreativeFood() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full h-full min-h-[450px] relative flex items-center justify-center cursor-pointer select-none overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >



      {/* Main Apple */}
      <motion.div
        className="relative z-20 pointer-events-none"
        animate={
          isHovered
            ? {
                scale: [1, 1.15, 0],
                rotate: [0, -10, 180],
                opacity: [1, 1, 0],
              }
            : {
                scale: 1,
                rotate: 0,
                opacity: 1,
              }
        }
        transition={
          isHovered
            ? { duration: 0.7, ease: 'easeInOut' }
            : { duration: 0.5, delay: 0.8, ease: 'backOut' }
        }
      >
        {/* Apple body */}
        <div className="relative">
          {/* Stem & leaf */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <motion.div
              className="w-10 h-5 bg-gradient-to-r from-green-400 to-green-600 rounded-full rounded-tr-none ml-6 shadow-md border border-green-300"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            />
            <div className="w-2 h-8 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full rotate-6 -ml-1" />
          </div>
          {/* Main fruit shape */}
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-[3rem] bg-gradient-to-br from-red-400 via-red-500 to-rose-700 shadow-2xl border border-red-300/60 relative overflow-hidden">
            {/* Glass highlight */}
            <div className="absolute top-2 left-3 w-20 h-10 bg-white/35 rounded-full blur-[2px] rotate-[-20deg]" />
            <div className="absolute top-1 left-5 w-8 h-4 bg-white/50 rounded-full blur-sm" />
            {/* Inner shadow */}
            <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_-15px_30px_rgba(0,0,0,0.35)]" />
          </div>
        </div>
      </motion.div>

      {/* === LIQUID PHASE (visible only when hovered) === */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Central liquid mass */}
            <motion.div
              className="absolute z-25 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              {/* Main juice blob */}
              <motion.div
                className="w-36 h-36 rounded-full relative"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #fdba74, #f97316, #ea580c)',
                  boxShadow: '0 8px 40px rgba(249,115,22,0.5)',
                }}
                animate={{
                  borderRadius: [
                    '50%',
                    '40% 60% 55% 45% / 55% 40% 60% 45%',
                    '55% 45% 40% 60% / 45% 55% 45% 55%',
                    '50%',
                  ],
                  scale: [1, 1.05, 0.95, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Bubble highlights */}
                <motion.div
                  className="absolute top-4 left-6 w-6 h-6 bg-white/40 rounded-full"
                  animate={{ y: [-2, 2, -2], x: [-1, 1, -1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-8 right-6 w-3 h-3 bg-white/50 rounded-full"
                  animate={{ y: [2, -2, 2] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-6 left-10 w-4 h-4 bg-white/30 rounded-full"
                  animate={{ y: [1, -3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
              </motion.div>
            </motion.div>

            {/* Liquid drips falling down */}
            <LiquidDrip delay={0.7} x={-15} size={14} />
            <LiquidDrip delay={1.0} x={10} size={10} />
            <LiquidDrip delay={1.4} x={-5} size={18} />
            <LiquidDrip delay={1.8} x={20} size={12} />
            <LiquidDrip delay={2.2} x={-20} size={8} />

            {/* Splash ripples at bottom */}
            <SplashRipple delay={1.6} />
            <SplashRipple delay={2.2} />

            {/* Puddle at the bottom */}
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-[50%] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, #f97316, #ea580c)',
                boxShadow: '0 2px 20px rgba(249,115,22,0.4)',
              }}
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{
                width: [0, 60, 100],
                height: [0, 10, 16],
                opacity: [0, 0.7, 0.85],
              }}
              exit={{ width: 0, height: 0, opacity: 0 }}
              transition={{ duration: 1.2, delay: 1.5 }}
            />

          </>
        )}
      </AnimatePresence>
    </div>
  );
}

