import React, { useRef, useEffect, useState } from 'react';
import type { HandCursor } from '../hooks/useHandTracking';
import type { GameDifficulty } from '../routes/game';

interface GameCanvasProps {
  cursorRef: React.MutableRefObject<HandCursor>;
  difficulty: GameDifficulty;
  speedRange: { min: number, max: number };
  baseSpawnInterval: number;
  timeRemaining: number;
  totalDuration: number;
  onGameOver: (score: number) => void;
}

type FoodCategory = 'Karbohidrat' | 'Protein' | 'Serat' | 'Biji-bijian';

type FoodItem = {
  id: string;
  name: string;
  emoji: string;
  category: FoodCategory;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  isGrabbed: boolean;
};

const CATEGORIES: { name: FoodCategory; color: string; hoverColor: string; image: string }[] = [
  { name: 'Karbohidrat', color: '#eab308', hoverColor: '#facc15', image: '/assets/piring_karbohidrat.png' },
  { name: 'Protein', color: '#ef4444', hoverColor: '#f87171', image: '/assets/piring_protein.png' },
  { name: 'Serat', color: '#22c55e', hoverColor: '#4ade80', image: '/assets/piring_serat.png' },
  { name: 'Biji-bijian', color: '#f97316', hoverColor: '#fb923c', image: '/assets/piring_biji.png' },
];

const FOOD_TYPES = [
  { name: 'Roti', emoji: '🍞', category: 'Karbohidrat' },
  { name: 'Nasi', emoji: '🍚', category: 'Karbohidrat' },
  { name: 'Kentang', emoji: '🥔', category: 'Karbohidrat' },
  { name: 'Daging', emoji: '🥩', category: 'Protein' },
  { name: 'Telur', emoji: '🥚', category: 'Protein' },
  { name: 'Ayam', emoji: '🍗', category: 'Protein' },
  { name: 'Apel', emoji: '🍎', category: 'Serat' },
  { name: 'Wortel', emoji: '🥕', category: 'Serat' },
  { name: 'Pisang', emoji: '🍌', category: 'Serat' },
  { name: 'Kacang', emoji: '🥜', category: 'Biji-bijian' },
  { name: 'Bunga Matahari', emoji: '🌻', category: 'Biji-bijian' },
] as const;

export function GameCanvas({ cursorRef, difficulty, speedRange, baseSpawnInterval, timeRemaining, totalDuration, onGameOver }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const plateImagesRef = useRef<Map<FoodCategory, HTMLImageElement>>(new Map());
  
  // Preload plate images
  useEffect(() => {
    CATEGORIES.forEach(cat => {
      const img = new Image();
      img.src = cat.image;
      plateImagesRef.current.set(cat.name, img);
    });
  }, []);
  
  // Track foods placed on each plate
  type PlacedFood = { emoji: string; offsetX: number; offsetY: number };
  
  // Use refs for mutable game state that shouldn't trigger re-renders
  const stateRef = useRef({
    foods: [] as FoodItem[],
    score: 0,
    lastSpawnTime: 0,
    timeRemaining: timeRemaining,
    plateFoods: new Map<FoodCategory, PlacedFood[]>(),
  });

  // Since cursor is now passed as a ref, we no longer need to sync it to stateRef.current.cursorRef!
  // We can just read cursorRef.current directly.
  
  useEffect(() => {
    stateRef.current.timeRemaining = timeRemaining;
    if (timeRemaining <= 0) {
      onGameOver(stateRef.current.score);
    }
  }, [timeRemaining, onGameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let isActive = true;

    // Handle canvas resize
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const spawnFood = (timestamp: number) => {
      const state = stateRef.current;
      const elapsedTime = totalDuration - state.timeRemaining; // 0 to totalDuration
      
      // Calculate intensity (spawn rate)
      const initialDelay = baseSpawnInterval * 1000;
      const minDelay = initialDelay * 0.4; // At the end of the game, it's 2.5x faster (40% of initial interval)
      const spawnDelay = Math.max(minDelay, initialDelay - (elapsedTime * ((initialDelay - minDelay) / totalDuration)));

      if (timestamp - state.lastSpawnTime > spawnDelay) {
        const type = FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)];
        const size = 60;
        
        // Calculate food speed
        let foodSpeed = speedRange.min + Math.random() * (speedRange.max - speedRange.min);
        if (difficulty === 'hard') {
          // Increase speed over time in hard mode (up to +5 over max duration)
          const speedBoost = (elapsedTime / totalDuration) * 5;
          foodSpeed += speedBoost;
        }

        state.foods.push({
          id: Math.random().toString(36).substring(7),
          name: type.name,
          emoji: type.emoji,
          category: type.category as FoodCategory,
          x: Math.random() * (canvas.width - size),
          y: -size,
          width: size,
          height: size,
          speed: foodSpeed,
          isGrabbed: false
        });
        state.lastSpawnTime = timestamp;
      }
    };

    const playSound = (type: 'success' | 'error') => {
      try {
        const audio = new Audio(type === 'success' ? 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3' : 'https://assets.mixkit.co/active_storage/sfx/2997/2997-preview.mp3');
        audio.volume = 0.5;
        audio.play().catch(() => {});
      } catch (e) {}
    };

    const gameLoop = (timestamp: number) => {
      if (!isActive) return;
      if (stateRef.current.timeRemaining <= 0) return;

      const state = stateRef.current;
      const currentCursor = cursorRef.current;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      spawnFood(timestamp);

      // Convert cursor percentage to pixel coordinates
      const cursorPx = {
        x: currentCursor.x * canvas.width,
        y: currentCursor.y * canvas.height
      };

      // Draw Bins (Boxes)
      const binWidth = canvas.width / CATEGORIES.length;
      const binHeight = 120;
      const binY = canvas.height - binHeight;

      // Check physics and interactions
      let grabbedFood: FoodItem | null = null;

      state.foods.forEach((food) => {
        if (food.isGrabbed && !currentCursor.isGrabbing) {
          food.isGrabbed = false;
          
          // Check if dropped in a bin
          const dropBinIndex = Math.floor(food.x + (food.width / 2)) / binWidth;
          const dropBin = Math.floor(dropBinIndex);
          
          if (food.y + food.height > binY && dropBin >= 0 && dropBin < CATEGORIES.length) {
            const targetCategory = CATEGORIES[dropBin].name;
            if (food.category === targetCategory) {
              state.score += 2;
              playSound('success');
              // Place food on plate visually
              const existing = state.plateFoods.get(targetCategory) || [];
              existing.push({
                emoji: food.emoji,
                offsetX: (Math.random() - 0.5) * 0.5, // random spread within plate
                offsetY: (Math.random() - 0.5) * 0.3,
              });
              // Keep max 6 visible per plate
              if (existing.length > 6) existing.shift();
              state.plateFoods.set(targetCategory, existing);
            } else {
              state.score -= 1;
              playSound('error');
            }
            // Mark for removal
            food.y = canvas.height + 100;
          }
        }

        if (currentCursor.isGrabbing) {
          // Check collision with cursor
          if (!grabbedFood && 
              cursorPx.x > food.x && cursorPx.x < food.x + food.width &&
              cursorPx.y > food.y && cursorPx.y < food.y + food.height) {
            food.isGrabbed = true;
            grabbedFood = food;
          }
        } else {
          food.isGrabbed = false;
        }

        if (food.isGrabbed) {
          food.x = cursorPx.x - food.width / 2;
          food.y = cursorPx.y - food.height / 2;
        } else {
          food.y += food.speed;
        }
      });

      // Filter out foods that fell out of bounds
      state.foods = state.foods.filter(f => f.y < canvas.height);

      // Render Foods
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '50px system-ui';
      state.foods.forEach(food => {
        ctx.fillText(food.emoji, food.x + food.width / 2, food.y + food.height / 2);
      });

      // Render Bins (plate images)
      CATEGORIES.forEach((cat, index) => {
        const x = index * binWidth;
        const plateImg = plateImagesRef.current.get(cat.name);

        if (plateImg && plateImg.complete && plateImg.naturalWidth > 0) {
          // Draw plate image scaled to bin area
          const imgAspect = plateImg.naturalWidth / plateImg.naturalHeight;
          const drawHeight = binHeight;
          const drawWidth = drawHeight * imgAspect;
          const imgX = x + (binWidth - drawWidth) / 2;
          ctx.drawImage(plateImg, imgX, binY, drawWidth, drawHeight);
        } else {
          // Fallback colored box while image loads
          ctx.fillStyle = cat.color + 'CC';
          ctx.beginPath();
          ctx.roundRect(x + 10, binY, binWidth - 20, binHeight, [15, 15, 0, 0]);
          ctx.fill();
          // Label only for fallback
          ctx.fillStyle = 'white';
          ctx.font = 'bold 20px system-ui';
          ctx.textAlign = 'center';
          ctx.fillText(cat.name, x + binWidth / 2, binY + binHeight / 2);
        }

        // Render placed foods on plate
        const placed = state.plateFoods.get(cat.name);
        if (placed && placed.length > 0) {
          const centerX = x + binWidth / 2;
          const centerY = binY + binHeight * 0.35; // slightly above center of plate
          ctx.font = '32px system-ui';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          placed.forEach(pf => {
            const fx = centerX + pf.offsetX * binWidth * 0.5;
            const fy = centerY + pf.offsetY * binHeight * 0.4;
            ctx.fillText(pf.emoji, fx, fy);
          });
        }
      });

      // 3. Render Hand Cursor
      if (currentCursor.isVisible) {
        ctx.beginPath();
        ctx.arc(cursorPx.x, cursorPx.y, 25, 0, Math.PI * 2);
        ctx.fillStyle = currentCursor.isGrabbing ? 'rgba(74, 222, 128, 0.5)' : 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
        ctx.strokeStyle = currentCursor.isGrabbing ? '#22c55e' : '#ffffff';
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // Draw a smaller dot in the center
        ctx.beginPath();
        ctx.arc(cursorPx.x, cursorPx.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = currentCursor.isGrabbing ? '#16a34a' : '#ef4444';
        ctx.fill();
      }

      // Sync score to React state only if changed to avoid unnecessary renders
      setScore(prev => {
        if (prev !== state.score) return state.score;
        return prev;
      });

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      isActive = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [difficulty, speedRange.min, speedRange.max, baseSpawnInterval, totalDuration, onGameOver]);

  // Expose score to parent using an effect
  useEffect(() => {
    // Parent can read the score if needed, but we update the display directly
    const scoreElement = document.getElementById('game-score-display');
    if (scoreElement) {
      scoreElement.innerText = score.toString();
    }
  }, [score]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-10 touch-none pointer-events-none"
    />
  );
}
