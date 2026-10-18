import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Box, RotateCcw, Award, Play } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import { updateBlockRecord, getVisitorProfile } from '../utils/visitorMemory';
import confetti from 'canvas-confetti';

interface ToyBoxMiniGameProps {
  onInteract: () => void;
}

interface BlockItem {
  id: number;
  label: string;
  color: string;
  width: number;
  tilt: number;
  emoji: string;
}

const BLOCK_TYPES = [
  { label: 'Moon Bed Block', color: '#ffd166', emoji: '🌙', width: 140 },
  { label: 'Cloud Cotton Block', color: '#70d6ff', emoji: '☁️', width: 130 },
  { label: 'Starlight Dream Cube', color: '#ff9ebb', emoji: '⭐', width: 120 },
  { label: 'Lullaby Chime Brick', color: '#c8b6ff', emoji: '🎶', width: 110 },
  { label: 'Sugar Snooze Prism', color: '#ffeaa7', emoji: '🍬', width: 100 },
  { label: 'Midnight Mystery Block', color: '#a8dadc', emoji: '🗝️', width: 90 },
];

export const ToyBoxMiniGame: React.FC<ToyBoxMiniGameProps> = ({ onInteract }) => {
  const [blocks, setBlocks] = useState<BlockItem[]>([
    { id: 1, label: 'Nursery Foundation', color: '#4338ca', width: 150, tilt: 0, emoji: '🏛️' },
  ]);
  const [rattleSpin, setRattleSpin] = useState<number>(0);
  const profile = getVisitorProfile();
  const [record, setRecord] = useState<number>(profile.blocksStackedRecord || 1);

  // Stack a new block
  const handleAddBlock = () => {
    if (blocks.length >= 10) {
      soundEngine.playGiggle();
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffd166', '#ff9ebb', '#70d6ff'],
      });
      return;
    }

    soundEngine.playBubblePop();
    onInteract();

    const template = BLOCK_TYPES[(blocks.length - 1) % BLOCK_TYPES.length];
    const randomTilt = (Math.random() - 0.5) * 6; // Gentle realistic wobble

    const newBlock: BlockItem = {
      id: Date.now(),
      label: template.label,
      color: template.color,
      width: Math.max(template.width - (blocks.length * 4), 70),
      tilt: randomTilt,
      emoji: template.emoji,
    };

    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);

    if (newBlocks.length > record) {
      setRecord(newBlocks.length);
      updateBlockRecord(newBlocks.length);
    }
  };

  // Reset blocks
  const handleReset = () => {
    soundEngine.playClick();
    setBlocks([{ id: 1, label: 'Nursery Foundation', color: '#4338ca', width: 150, tilt: 0, emoji: '🏛️' }]);
  };

  // Shake Star Rattle
  const handleShakeRattle = () => {
    soundEngine.playChime(1174.66, 0.4);
    setTimeout(() => soundEngine.playChime(1318.51, 0.4), 80);
    setRattleSpin((prev) => prev + 45);
    onInteract();

    confetti({
      particleCount: 15,
      spread: 40,
      origin: { y: 0.5 },
      colors: ['#ffd166', '#ff9ebb'],
    });
  };

  return (
    <section id="toy-box" className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 md:p-10 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute -left-20 -top-20 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2 border border-amber-400/30">
              <Box className="w-3.5 h-3.5" />
              <span>Showcase Project 04 · Interactive Toy Box Mini-Game</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-nursery">
              Pip's Rattle & Block Workshop <span className="text-amber-300 font-normal">🧸</span>
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-lg">
              Stack Pip's handmade dream blocks into a towering bedtime sculpture, or shake the golden Star Rattle!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="glass-card px-4 py-2 rounded-2xl text-right border border-white/10">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Stack Record</div>
              <div className="text-sm font-bold text-amber-300 font-mono">{record} Blocks High</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Stacking Tower Physics Arena */}
          <div className="md:col-span-8 bg-black/50 border border-white/10 rounded-2xl p-6 min-h-[380px] flex flex-col justify-end items-center relative overflow-hidden shadow-inner">
            {/* Background Measurement Lines */}
            <div className="absolute inset-0 flex flex-col justify-between py-6 px-4 pointer-events-none opacity-20">
              <div className="border-b border-dashed border-white text-[10px] text-slate-400">10 BLOCKS: CELESTIAL PINNACLE</div>
              <div className="border-b border-dashed border-white text-[10px] text-slate-400">07 BLOCKS: CLOUD DRIFT</div>
              <div className="border-b border-dashed border-white text-[10px] text-slate-400">04 BLOCKS: NURSERY WALL</div>
              <div className="border-b border-dashed border-white text-[10px] text-slate-400">01 BLOCK: FOUNDATION</div>
            </div>

            {/* Block Stack Container */}
            <div className="flex flex-col-reverse items-center z-10 w-full mb-2">
              <AnimatePresence>
                {blocks.map((block, idx) => (
                  <motion.div
                    key={block.id}
                    initial={{ y: -80, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1, rotate: block.tilt }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="h-10 sm:h-12 rounded-xl flex items-center justify-between px-3 text-slate-900 font-bold text-xs sm:text-sm shadow-lg mb-1 border border-white/30 cursor-pointer select-none"
                    style={{
                      width: `${block.width}px`,
                      backgroundColor: block.color,
                      boxShadow: `0 4px 15px ${block.color}50`,
                    }}
                    onClick={handleAddBlock}
                  >
                    <span>{block.emoji}</span>
                    <span className="truncate text-[11px] px-1">{block.label}</span>
                    <span className="text-[10px] font-mono opacity-60">#{idx + 1}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Stacking Controls */}
            <div className="flex items-center gap-3 z-20 mt-4">
              <button
                onClick={handleAddBlock}
                disabled={blocks.length >= 10}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-400/25 hover:scale-105 active:scale-95 disabled:opacity-40 transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{blocks.length >= 10 ? 'Tower Completed! 🎉' : 'Drop Next Block (+1)'}</span>
              </button>

              <button
                onClick={handleReset}
                title="Topple Tower"
                className="p-2.5 rounded-full glass-card hover:bg-white/10 text-slate-300 hover:text-white transition active:scale-90"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Star Rattle Toy */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-6 glass-card rounded-2xl border border-white/10 text-center">
            <h3 className="font-bold text-white text-sm mb-1 font-nursery">
              Pip's Lucky Star Rattle
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Click to shake and chime!
            </p>

            {/* Shaking 3D Rattle Graphic */}
            <motion.div
              animate={{ rotate: rattleSpin }}
              transition={{ type: 'spring', stiffness: 350, damping: 15 }}
              onClick={handleShakeRattle}
              className="w-28 h-28 rounded-3xl bg-gradient-to-br from-amber-300 via-pink-400 to-indigo-500 p-1 cursor-pointer shadow-[0_0_35px_rgba(255,209,102,0.4)] hover:scale-110 active:scale-90 transition-transform mb-6 flex items-center justify-center select-none"
            >
              <div className="w-full h-full bg-[#121633] rounded-[22px] flex items-center justify-center text-4xl">
                ⭐
              </div>
            </motion.div>

            <button
              onClick={handleShakeRattle}
              className="px-5 py-2 rounded-full glass-card hover:bg-white/10 text-amber-300 font-bold text-xs border border-amber-300/30 shadow-md active:scale-95 transition"
            >
              Shake Rattle 🔔
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
