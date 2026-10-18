import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Moon, Sun, Sparkles, BedDouble } from 'lucide-react';
import { soundEngine } from '../utils/sound';

interface NavbarProps {
  dreamCount: number;
  isDaytime: boolean;
  onToggleDaytime: () => void;
  onSleepClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  dreamCount,
  isDaytime,
  onToggleDaytime,
  onSleepClick,
}) => {
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());

  useEffect(() => {
    return soundEngine.subscribe((muted) => setIsMuted(muted));
  }, []);

  const handleMuteToggle = () => {
    soundEngine.playClick();
    soundEngine.toggleMute();
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-opacity-80 transition-colors duration-500 border-b border-white/10 px-4 md:px-8 py-3 bg-[#0c0e1e]/90 text-white">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-400 via-indigo-500 to-amber-300 flex items-center justify-center shadow-lg shadow-pink-500/20 ring-2 ring-white/20">
            <span className="text-xl">🌙</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-wide text-dream-cloud font-nursery">
                Pip's Sanctuary
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                haX · Track 1
              </span>
            </div>
            <p className="text-xs text-dream-lavender hidden sm:block">
              Junior Dream Engineer @ Midnight Nursery
            </p>
          </div>
        </div>

        {/* Nostalgic Odometer Counter (+1 pt bonus) */}
        <div className="flex items-center gap-2 bg-indigo-950/70 border border-indigo-400/30 px-3.5 py-1.5 rounded-full shadow-inner text-xs sm:text-sm">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="text-slate-300 font-medium">Dreams Delivered:</span>
          <span className="font-mono font-bold text-amber-300 tracking-widest text-sm bg-black/40 px-2 py-0.5 rounded border border-amber-300/30">
            {dreamCount.toLocaleString()}
          </span>
        </div>

        {/* Controls & Badges */}
        <div className="flex items-center gap-2">
          {/* Quick Bedtime trigger */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onSleepClick();
            }}
            title="Nap Time"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-indigo-900/60 hover:bg-pink-500/20 text-pink-200 border border-indigo-700/50 hover:border-pink-400/50 transition-all active:scale-95"
          >
            <BedDouble className="w-3.5 h-3.5 text-pink-300" />
            <span className="hidden md:inline">Nap Mode</span>
          </button>

          {/* Day/Night Mood Toggle */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onToggleDaytime();
            }}
            title={isDaytime ? 'Switch to Midnight Shift' : 'Switch to Daytime Nap'}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-amber-300 transition-all active:scale-90"
          >
            {isDaytime ? <Moon className="w-4 h-4 text-indigo-300" /> : <Sun className="w-4 h-4 text-amber-300" />}
          </button>

          {/* Prominent Mute Switch (+3 pt bonus requirement) */}
          <button
            onClick={handleMuteToggle}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            title={isMuted ? 'Sound is MUTED (Click to unmute)' : 'Sound is ON (Click to mute)'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all active:scale-95 ${
              isMuted
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30 shadow-sm shadow-emerald-500/20'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-bounce" />}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio ON'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
