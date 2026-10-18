import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Moon, Sun, Sparkles, BedDouble, Clock, Flashlight } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import { getVisitorProfile } from '../utils/visitorMemory';

interface NavbarProps {
  dreamCount: number;
  isDaytime: boolean;
  onToggleDaytime: () => void;
  onSleepClick: () => void;
  isFlashlight: boolean;
  onToggleFlashlight: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  dreamCount,
  isDaytime,
  onToggleDaytime,
  onSleepClick,
  isFlashlight,
  onToggleFlashlight,
}) => {
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [timeStr, setTimeStr] = useState<string>('00:00:00');
  const profile = getVisitorProfile();

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

  const scrollTo = (id: string) => {
    soundEngine.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070913]/85 border-b border-white/10 px-4 md:px-8 py-2.5 transition-colors duration-500 shadow-2xl">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Visitor Recognition */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-400 via-indigo-500 to-amber-300 p-0.5 shadow-lg shadow-pink-500/20">
            <div className="w-full h-full bg-[#0a0d1e] rounded-[14px] flex items-center justify-center text-base">
              🌙
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white font-nursery">
                Pip's Sanctuary
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                Track 1
              </span>
              {profile.visitCount > 1 && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 hidden sm:inline">
                  Visit #{profile.visitCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
              <Clock className="w-3 h-3 text-amber-300" />
              <span>Nursery Clock: {timeStr}</span>
            </div>
          </div>
        </div>

        {/* Quick Jump Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-slate-300">
          <button onClick={() => scrollTo('lullaby-lab')} className="px-2.5 py-1 rounded-lg hover:bg-white/10 hover:text-white transition">Lullaby</button>
          <button onClick={() => scrollTo('nightlights')} className="px-2.5 py-1 rounded-lg hover:bg-white/10 hover:text-white transition">Lanterns</button>
          <button onClick={() => scrollTo('dream-routes')} className="px-2.5 py-1 rounded-lg hover:bg-white/10 hover:text-white transition">Rooftops</button>
          <button onClick={() => scrollTo('toy-box')} className="px-2.5 py-1 rounded-lg hover:bg-white/10 hover:text-white transition">Toy Box</button>
          <button onClick={() => scrollTo('growth-chart')} className="px-2.5 py-1 rounded-lg hover:bg-white/10 hover:text-white transition">Growth Wall</button>
          <button onClick={() => scrollTo('dream-oracle')} className="px-2.5 py-1 rounded-lg hover:bg-white/10 hover:text-white transition">Oracle Chat</button>
          <button onClick={() => scrollTo('dream-jar')} className="px-2.5 py-1 rounded-lg hover:bg-white/10 hover:text-white transition">Wish Jar</button>
        </nav>

        {/* Nostalgic Brass & Glass Odometer */}
        <div className="flex items-center gap-2 bg-black/60 border border-amber-300/30 px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(255,209,102,0.15)] text-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span className="text-slate-300 hidden sm:inline">Delivered:</span>
          <span className="font-mono font-black text-amber-300 tracking-wider text-xs">
            {dreamCount.toLocaleString()}
          </span>
        </div>

        {/* Interactive Control Toggles */}
        <div className="flex items-center gap-2">
          {/* Flashlight Beam Toggle (Tier 2 feature) */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onToggleFlashlight();
            }}
            title={isFlashlight ? 'Disable Flashlight Lens' : 'Enable Flashlight Lens'}
            className={`p-2 rounded-full border transition-all active:scale-90 ${
              isFlashlight
                ? 'bg-amber-400 text-slate-900 border-amber-300 shadow-md shadow-amber-300/40'
                : 'glass-card hover:bg-white/10 text-slate-300'
            }`}
          >
            <Flashlight className="w-3.5 h-3.5" />
          </button>

          {/* Quick Bedtime trigger */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onSleepClick();
            }}
            title="Nap Time"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-indigo-900/40 hover:bg-pink-500/20 text-pink-200 border border-indigo-500/30 hover:border-pink-400/50 transition-all active:scale-95"
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
            className="p-2 rounded-full glass-card hover:bg-white/10 text-amber-300 transition-all active:scale-90"
          >
            {isDaytime ? <Moon className="w-3.5 h-3.5 text-indigo-300" /> : <Sun className="w-3.5 h-3.5 text-amber-300" />}
          </button>

          {/* Master Mute Switch */}
          <button
            onClick={handleMuteToggle}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            title={isMuted ? 'Sound is MUTED (Click to unmute)' : 'Sound is ON (Click to mute)'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all active:scale-95 ${
              isMuted
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30 shadow-md shadow-emerald-500/20'
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-bounce" />}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
