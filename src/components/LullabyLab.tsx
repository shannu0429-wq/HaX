import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Volume2, Activity, Music } from 'lucide-react';
import { soundEngine, DREAM_SCALE } from '../utils/sound';

interface LullabyLabProps {
  onInteract: () => void;
}

export const LullabyLab: React.FC<LullabyLabProps> = ({ onInteract }) => {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);
  const [ripples, setRipples] = useState<{ id: number; color: string; label: string }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Live Canvas Waveform / Spectrum Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const analyser = soundEngine.getAnalyser();
    const bufferLength = analyser ? analyser.frequencyBinCount : 32;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (analyser) {
        analyser.getByteFrequencyData(dataArray);
      }

      const barWidth = (canvas.width / bufferLength) * 1.8;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const val = analyser ? dataArray[i] : 8;
        const barHeight = Math.max((val / 255) * canvas.height * 0.85, 3);

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
        gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.6)');
        gradient.addColorStop(1, 'rgba(255, 209, 102, 0.9)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - barHeight, barWidth - 2, barHeight, 4);
        ctx.fill();

        x += barWidth;
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const playNote = (item: typeof DREAM_SCALE[0]) => {
    soundEngine.playChime(item.freq, 1.4);
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
      }, i * 350);
    });
  };

  return (
    <section id="lullaby-lab" className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 md:p-10 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute -right-24 -top-24 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header & Waveform */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold mb-2 border border-pink-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Showcase Project 01 · Celestial Synthesizer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-nursery">
              The Lullaby Lab <span className="text-pink-300 font-normal">🎶</span>
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-lg">
              Harmonic pentatonic frequencies woven to calm nocturnal restless spirits.
              Watch the live audio spectrum wave dance as you play!
            </p>
          </div>

          {/* Controls & Waveform Display */}
          <div className="flex flex-col items-end gap-3">
            <button
              onClick={playAutoLullaby}
              disabled={isPlayingAuto}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-xl active:scale-95 ${
                isPlayingAuto
                  ? 'bg-amber-300 text-slate-900 shadow-amber-300/30 animate-pulse'
                  : 'bg-gradient-to-r from-pink-500 to-indigo-600 text-white hover:opacity-90 border border-pink-300/30'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${isPlayingAuto ? 'fill-slate-900' : 'fill-white'}`} />
              <span>{isPlayingAuto ? 'Playing Lullaby...' : 'Auto-Lullaby Sequence'}</span>
            </button>

            {/* Live Audio Visualizer Canvas */}
            <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-xl border border-white/10">
              <Activity className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <canvas ref={canvasRef} width={120} height={20} className="w-28 h-5" />
              <span className="text-[10px] text-slate-400 font-mono">LIVE SPECTRUM</span>
            </div>
          </div>
        </div>

        {/* Note Ripples Stage */}
        <div className="h-12 relative flex items-center justify-center overflow-hidden mb-4">
          <AnimatePresence>
            {ripples.map((rip) => (
              <motion.div
                key={rip.id}
                initial={{ scale: 0.5, opacity: 1, y: 10 }}
                animate={{ scale: 1.8, opacity: 0, y: -24 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold border shadow-2xl backdrop-blur-md"
                style={{
                  backgroundColor: `${rip.color}30`,
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

        {/* 8 Crystal Music Box Keys */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {DREAM_SCALE.map((item) => {
            const isActive = activeNote === item.note;
            return (
              <button
                key={item.note}
                onClick={() => playNote(item)}
                className={`relative flex flex-col items-center justify-between h-40 sm:h-48 p-3 rounded-2xl border transition-all duration-150 transform active:scale-95 select-none ${
                  isActive
                    ? 'scale-105 shadow-[0_0_30px_rgba(255,255,255,0.4)] -translate-y-2'
                    : 'glass-card hover:-translate-y-1 hover:border-white/30'
                }`}
                style={{
                  backgroundColor: isActive ? item.color : 'rgba(255, 255, 255, 0.04)',
                  borderColor: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
                  color: isActive ? '#0f172a' : '#f8fafc',
                }}
              >
                {/* Note Indicator */}
                <span className="text-xs font-mono font-bold tracking-widest opacity-80">
                  {item.note}
                </span>

                {/* Crystal Center Shimmer */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-transform shadow-md ${
                    isActive ? 'scale-125' : ''
                  }`}
                  style={{
                    backgroundColor: isActive ? '#ffffff' : `${item.color}25`,
                    color: isActive ? item.color : '#ffffff',
                    border: `1px solid ${item.color}50`,
                  }}
                >
                  <Music className="w-4 h-4" />
                </div>

                {/* Label */}
                <span className="text-[11px] font-bold text-center leading-tight">
                  {item.label}
                </span>

                {/* Glow bar */}
                <div
                  className="w-full h-1.5 rounded-full mt-1 shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
              </button>
            );
          })}
        </div>

        {/* Tip caption */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-4 border-t border-white/10">
          <span>💡 Built with pure Web Audio API sine & triangle harmonics. 0 external samples.</span>
          <span className="font-hand text-pink-300 text-sm">♪ Tuned to 432Hz sleep resonance</span>
        </div>
      </div>
    </section>
  );
};
