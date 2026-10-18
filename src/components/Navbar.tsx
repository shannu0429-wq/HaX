import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Moon, Sun, Sparkles, BedDouble, Clock } from 'lucide-react';
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
  const [timeStr, setTimeStr] = useState<string>('00:00:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString());
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return soundEngine.subscribe((muted) => setIsMuted(muted));
  }, []);

  const handleMuteToggle = () => {
    soundEngine.playClick();
    soundEngine.toggleMute();
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#070913]/80 border-b border-white/10 px-4 md:px-8 py-3 transition-colors duration-500 shadow-2xl">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 via-indigo-500 to-amber-300 p-0.5 shadow-lg shadow-pink-500/20">
            <div className="w-full h-full bg-[#0a0d1e] rounded-[14px] flex items-center justify-center text-lg">
              🌙
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white font-nursery">
                Pip's Sanctuary
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                haX · Track 1
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <Clock className="w-3 h-3 text-amber-300" />
              <span>Nursery Clock: {timeStr}</span>
            </div>
          </div>
        </div>

        {/* Nostalgic Brass & Glass Odometer */}
        <div className="flex items-center gap-2.5 bg-black/60 border border-amber-300/30 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(255,209,102,0.15)] text-xs sm:text-sm">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="text-slate-300 font-medium">Dreams Delivered:</span>
          <span className="font-mono font-black text-amber-300 tracking-widest text-sm bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent border-b border-amber-300/40">
            {dreamCount.toLocaleString()}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Bedtime trigger */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onSleepClick();
            }}
            title="Nap Time"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full bg-indigo-900/40 hover:bg-pink-500/20 text-pink-200 border border-indigo-500/30 hover:border-pink-400/50 transition-all active:scale-95 shadow-sm"
          >
            <BedDouble className="w-3.5 h-3.5 text-pink-300" />
            <span className="hidden sm:inline">Nap Mode</span>
          </button>

          {/* Day/Night Mood Toggle */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onToggleDaytime();
            }}
            title={isDaytime ? 'Switch to Midnight Shift' : 'Switch to Daytime Nap'}
            className="p-2 rounded-full glass-card hover:bg-white/10 text-amber-300 transition-all active:scale-90"
          >
            {isDaytime ? <Moon className="w-4 h-4 text-indigo-300" /> : <Sun className="w-4 h-4 text-amber-300" />}
          </button>

          {/* Master Mute Switch */}
          <button
            onClick={handleMuteToggle}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            title={isMuted ? 'Sound is MUTED (Click to unmute)' : 'Sound is ON (Click to mute)'}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all active:scale-95 ${
              isMuted
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30 shadow-lg shadow-emerald-500/20'
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
