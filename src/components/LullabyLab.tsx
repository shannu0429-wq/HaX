import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Volume2, RotateCcw } from 'lucide-react';
import { soundEngine, DREAM_SCALE } from '../utils/sound';

interface LullabyLabProps {
  onInteract: () => void;
}

export const LullabyLab: React.FC<LullabyLabProps> = ({ onInteract }) => {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);
  const [ripples, setRipples] = useState<{ id: number; color: string; label: string }[]>([]);

  const playNote = (item: typeof DREAM_SCALE[0]) => {
    soundEngine.playChime(item.freq, 1.2);
    setActiveNote(item.note);
    onInteract();

    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev.slice(-4), { id, color: item.color, label: item.label }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1400);

    setTimeout(() => {
      setActiveNote(null);
    }, 280);
  };

  const playAutoLullaby = () => {
    if (isPlayingAuto) return;
    setIsPlayingAuto(true);
    soundEngine.playClick();

    // A soothing lullaby sequence indices: 0, 2, 4, 2, 5, 4, 2, 0
    const sequence = [0, 2, 4, 5, 4, 2, 1, 0, 2, 4, 7, 5, 2, 0];
    sequence.forEach((noteIdx, i) => {
      setTimeout(() => {
        const item = DREAM_SCALE[noteIdx];
        if (item) {
          playNote(item);
        }
        if (i === sequence.length - 1) {
          setIsPlayingAuto(false);
        }
      }, i * 360);
    });
  };

  return (
    <section id="lullaby-lab" className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="bg-gradient-to-b from-[#181d3b] to-[#101428] rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Subtle music waves in background */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Showcase Project 01 · Playable Instrument</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-nursery">
              The Lullaby Lab 🎶
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-lg">
              Synthesized soothing frequencies crafted by Pip to tuck midnight thoughts into bed.
              Tap the golden keys or trigger the auto-lullaby!
            </p>
          </div>

          {/* Auto Play Button */}
          <button
            onClick={playAutoLullaby}
            disabled={isPlayingAuto}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-lg active:scale-95 ${
              isPlayingAuto
                ? 'bg-amber-400 text-slate-900 animate-pulse'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isPlayingAuto ? 'fill-slate-900' : 'fill-white'}`} />
            <span>{isPlayingAuto ? 'Playing Lullaby...' : 'Auto-Lullaby'}</span>
          </button>
        </div>

        {/* Note Ripples Stage */}
        <div className="h-14 relative flex items-center justify-center overflow-hidden mb-4">
          <AnimatePresence>
            {ripples.map((rip) => (
              <motion.div
                key={rip.id}
                initial={{ scale: 0.4, opacity: 1, y: 10 }}
                animate={{ scale: 1.6, opacity: 0, y: -20 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-lg"
                style={{
                  backgroundColor: `${rip.color}25`,
                  borderColor: rip.color,
                  color: rip.color,
                }}
              >
                <span>✨</span>
                <span>{rip.label}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 8 Pentatonic Music Box Keys */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
          {DREAM_SCALE.map((item) => {
            const isActive = activeNote === item.note;
            return (
              <button
                key={item.note}
                onClick={() => playNote(item)}
                className={`relative flex flex-col items-center justify-between h-36 sm:h-44 p-3 rounded-2xl border transition-all duration-150 transform active:scale-95 select-none ${
                  isActive
                    ? 'scale-105 shadow-xl -translate-y-2'
                    : 'hover:-translate-y-1 hover:border-white/30'
                }`}
                style={{
                  backgroundColor: isActive ? item.color : '#1f2544',
                  borderColor: isActive ? '#ffffff' : 'rgba(255,255,255,0.12)',
                  color: isActive ? '#0f172a' : '#f8fafc',
                }}
              >
                {/* Note Indicator */}
                <span className="text-xs font-mono font-bold tracking-wider opacity-80">
                  {item.note}
                </span>

                {/* Key Center Graphic: Glowing Music Note */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
                    isActive ? 'scale-125' : ''
                  }`}
                  style={{
                    backgroundColor: isActive ? '#ffffff' : `${item.color}30`,
                    color: isActive ? item.color : '#ffffff',
                  }}
                >
                  <span className="text-xs font-bold">♪</span>
                </div>

                {/* Label */}
                <span className="text-[11px] font-semibold text-center leading-tight">
                  {item.label}
                </span>

                {/* Glow bar at bottom */}
                <div
                  className="w-full h-1.5 rounded-full mt-1"
                  style={{ backgroundColor: item.color }}
                />
              </button>
            );
          })}
        </div>

        {/* Tip caption */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
          <span>💡 Built with native Web Audio API oscillators. Zero external audio downloads.</span>
          <span className="hidden sm:inline font-hand text-pink-300">♪ Pentatonic dream tuning</span>
        </div>
      </div>
    </section>
  );
};
