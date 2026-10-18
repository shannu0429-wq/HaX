import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Sparkles, Home, Star, Wind } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import confetti from 'canvas-confetti';

interface DreamDeliveryMapProps {
  onDeliverDream: () => void;
}

interface FallingDream {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const DREAM_EMOJIS = ['⭐', '🌙', '☁️', '🎈', '✨', '💤', '🧸', '🍭'];

export const DreamDeliveryMap: React.FC<DreamDeliveryMapProps> = ({ onDeliverDream }) => {
  const [fallingDreams, setFallingDreams] = useState<FallingDream[]>([]);
  const [deliveredCount, setDeliveredCount] = useState<number>(24);

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    soundEngine.playBubblePop();
    onDeliverDream();
    setDeliveredCount((prev) => prev + 1);

    const randomEmoji = DREAM_EMOJIS[Math.floor(Math.random() * DREAM_EMOJIS.length)];
    const newDream: FallingDream = {
      id: Date.now() + Math.random(),
      x,
      y,
      emoji: randomEmoji,
    };

    setFallingDreams((prev) => [...prev, newDream]);

    confetti({
      particleCount: 18,
      spread: 45,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ['#ffd166', '#ff9ebb', '#70d6ff', '#ffeaa7'],
    });

    setTimeout(() => {
      setFallingDreams((prev) => prev.filter((d) => d.id !== newDream.id));
    }, 1200);
  };

  return (
    <section id="dream-routes" className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 md:p-10 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold mb-2 border border-cyan-400/30">
              <MapPin className="w-3.5 h-3.5" />
              <span>Showcase Project 03 · Rooftop Logistics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-nursery">
              Midnight Dream Delivery Routes <span className="text-cyan-300 font-normal">🏘️</span>
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-lg">
              Click anywhere on the midnight skyline to dispatch a soothing dream bubble right into a sleeping chimney!
            </p>
          </div>

          <div className="glass-card px-4 py-2 rounded-2xl flex items-center gap-3 border border-white/10">
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Rooftop Drops</div>
              <div className="text-sm font-bold text-amber-300 font-mono">{deliveredCount} Dreams Delivered</div>
            </div>
          </div>
        </div>

        {/* Interactive Skyline Canvas Stage */}
        <div
          onClick={handleStageClick}
          className="relative h-72 sm:h-96 w-full rounded-2xl bg-gradient-to-b from-[#060814] via-[#0d122b] to-[#1a2148] border border-white/15 overflow-hidden cursor-crosshair shadow-2xl"
        >
          {/* Animated Aurora Borealis Overlay */}
          <div className="absolute inset-0 opacity-30 pointer-events-none aurora-bg animate-pulse" />

          {/* Interactive Hint */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 glass-card px-4 py-1.5 rounded-full border border-white/20 text-xs text-slate-200 font-semibold pointer-events-none flex items-center gap-2 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Click any rooftop chimney to drop a dream</span>
          </div>

          {/* Falling Dream Bubbles */}
          <AnimatePresence>
            {fallingDreams.map((dream) => (
              <motion.div
                key={dream.id}
                initial={{ opacity: 1, scale: 0.6, x: dream.x, y: dream.y }}
                animate={{ opacity: 0, scale: 2.2, y: dream.y + 90 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="absolute pointer-events-none text-3xl -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_15px_rgba(255,209,102,0.8)]"
              >
                {dream.emoji}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Rooftop Silhouettes SVG */}
          <div className="absolute bottom-0 inset-x-0 pointer-events-none">
            <svg viewBox="0 0 800 160" className="w-full h-auto text-[#04060e] fill-current drop-shadow-2xl">
              <path
                opacity="0.45"
                d="M0 160 L0 100 L40 70 L80 100 L120 75 L160 100 L220 60 L280 100 L340 70 L400 100 L460 65 L520 100 L600 70 L680 100 L740 60 L800 100 L800 160 Z"
              />
              <path d="M0 160 L0 120 L50 85 L100 120 L130 120 L130 90 L145 90 L145 120 L190 90 L240 125 L300 80 L320 80 L320 60 L335 60 L335 80 L370 120 L440 75 L500 120 L560 90 L580 90 L580 70 L595 70 L595 90 L630 120 L700 80 L760 120 L800 95 L800 160 Z" />
            </svg>
          </div>

          {/* Cozy Glowing Window Panes */}
          <div className="absolute bottom-5 left-1/4 w-3.5 h-3.5 bg-amber-300 rounded-sm shadow-[0_0_12px_#ffd166] pointer-events-none animate-pulse" />
          <div className="absolute bottom-7 right-1/4 w-3.5 h-3.5 bg-amber-300 rounded-sm shadow-[0_0_12px_#ffd166] pointer-events-none animate-pulse" />
          <div className="absolute bottom-9 right-1/2 w-3.5 h-3.5 bg-pink-300 rounded-sm shadow-[0_0_12px_#ff9ebb] pointer-events-none animate-pulse" />
        </div>
      </div>
    </section>
  );
};
