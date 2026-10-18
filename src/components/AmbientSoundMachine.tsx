import React, { useState } from 'react';
import { CloudRain, Wind, Sparkles, Volume2, Music } from 'lucide-react';
import { soundEngine } from '../utils/sound';

export const AmbientSoundMachine: React.FC = () => {
  const [rainActive, setRainActive] = useState<boolean>(false);
  const [windActive, setWindActive] = useState<boolean>(false);

  const handleToggleRain = () => {
    soundEngine.playClick();
    const active = soundEngine.toggleRain();
    setRainActive(active);
  };

  const handleToggleWind = () => {
    soundEngine.playClick();
    const active = soundEngine.toggleWind();
    setWindActive(active);
  };

  return (
    <section className="py-6 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-pink-500/30 border border-white/15 flex items-center justify-center text-2xl shadow-inner">
            🌙
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base font-nursery">
                Midnight Sleep Soundscape
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                100% Procedural
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Layer real-time synthesized soothing white noise while exploring Pip's portfolio.
            </p>
          </div>
        </div>

        {/* Ambient Sound Toggles */}
        <div className="flex items-center gap-3">
          {/* Gentle Bedtime Rain */}
          <button
            onClick={handleToggleRain}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold border transition-all active:scale-95 ${
              rainActive
                ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <CloudRain className={`w-4 h-4 ${rainActive ? 'text-cyan-300 animate-bounce' : 'text-slate-400'}`} />
            <span>{rainActive ? 'Bedtime Rain: ON' : 'Bedtime Rain'}</span>
          </button>

          {/* Midnight Wind Breeze */}
          <button
            onClick={handleToggleWind}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold border transition-all active:scale-95 ${
              windActive
                ? 'bg-indigo-500/25 border-indigo-400 text-indigo-200 shadow-lg shadow-indigo-500/20'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Wind className={`w-4 h-4 ${windActive ? 'text-indigo-300 animate-pulse' : 'text-slate-400'}`} />
            <span>{windActive ? 'Night Breeze: ON' : 'Night Breeze'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
