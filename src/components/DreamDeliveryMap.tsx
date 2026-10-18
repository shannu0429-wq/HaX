import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Sparkles, Home, Star } from 'lucide-react';
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

const DREAM_EMOJIS = ['⭐', '🌙', '☁️', '🎈', '✨', '💤', '🧸'];

export const DreamDeliveryMap: React.FC<DreamDeliveryMapProps> = ({ onDeliverDream }) => {
  const [fallingDreams, setFallingDreams] = useState<FallingDream[]>([]);
  const [deliveredCount, setDeliveredCount] = useState<number>(12);

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
      particleCount: 15,
      spread: 35,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ['#ffd166', '#ff9ebb', '#70d6ff'],
    });

    setTimeout(() => {
      setFallingDreams((prev) => prev.filter((d) => d.id !== newDream.id));
    }, 1200);
  };

  return (
    <section id="dream-routes" className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="bg-gradient-to-b from-[#181d3b] to-[#0f1224] rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Showcase Project 03 · Rooftop Logistics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-nursery">
              Midnight Dream Delivery Routes 🏘️
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-lg">
              Click anywhere on the midnight skyline to drop a peaceful dream bubble down into a sleepy chimney!
            </p>
          </div>

          <div className="bg-indigo-950/80 border border-indigo-400/30 px-4 py-2 rounded-2xl flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Rooftop Drops</div>
              <div className="text-sm font-bold text-amber-300 font-mono">{deliveredCount} Dreams Dropped</div>
            </div>
          </div>
        </div>

        {/* Interactive Rooftop Canvas Stage */}
        <div
          onClick={handleStageClick}
          className="relative h-64 sm:h-80 w-full rounded-2xl bg-gradient-to-b from-[#090b16] via-[#101428] to-[#1c2242] border border-white/15 overflow-hidden cursor-crosshair shadow-inner"
        >
          {/* Subtle Starry background */}
          <div className="absolute inset-0 opacity-40">
            <span className="absolute top-6 left-12 text-xs text-amber-200">✦</span>
            <span className="absolute top-14 right-24 text-xs text-pink-200">★</span>
            <span className="absolute top-20 left-1/3 text-xs text-cyan-200">✧</span>
            <span className="absolute top-8 right-1/3 text-xs text-white">✦</span>
          </div>

          {/* Prompt instruction banner */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 text-xs text-slate-200 font-medium pointer-events-none flex items-center gap-2">
            <span>✨ Tap anywhere to drop a dream into the town</span>
          </div>

          {/* Falling Dream Particles */}
          <AnimatePresence>
            {fallingDreams.map((dream) => (
              <motion.div
                key={dream.id}
                initial={{ opacity: 1, scale: 0.5, x: dream.x, y: dream.y }}
                animate={{ opacity: 0, scale: 1.8, y: dream.y + 70 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: 'easeOut' }}
                className="absolute pointer-events-none text-2xl -translate-x-1/2 -translate-y-1/2 drop-shadow-md"
              >
                {dream.emoji}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Rooftop Silhouettes SVG at bottom of container */}
          <div className="absolute bottom-0 inset-x-0 pointer-events-none">
            <svg viewBox="0 0 800 160" className="w-full h-auto text-[#070914] fill-current">
              {/* Back layer houses */}
              <path
                opacity="0.5"
                d="M0 160 L0 100 L40 70 L80 100 L120 75 L160 100 L220 60 L280 100 L340 70 L400 100 L460 65 L520 100 L600 70 L680 100 L740 60 L800 100 L800 160 Z"
              />
              {/* Front layer houses with glowing chimney windows */}
              <path d="M0 160 L0 120 L50 85 L100 120 L130 120 L130 90 L145 90 L145 120 L190 90 L240 125 L300 80 L320 80 L320 60 L335 60 L335 80 L370 120 L440 75 L500 120 L560 90 L580 90 L580 70 L595 70 L595 90 L630 120 L700 80 L760 120 L800 95 L800 160 Z" />
            </svg>
          </div>

          {/* Little cozy glowing windows */}
          <div className="absolute bottom-4 left-1/4 w-3 h-3 bg-amber-300 rounded-sm shadow-lg shadow-amber-300/80 pointer-events-none" />
          <div className="absolute bottom-6 right-1/4 w-3 h-3 bg-amber-300 rounded-sm shadow-lg shadow-amber-300/80 pointer-events-none" />
          <div className="absolute bottom-8 right-1/2 w-3 h-3 bg-pink-300 rounded-sm shadow-lg shadow-pink-300/80 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
