import React from 'react';
import { Sparkles, Heart, ExternalLink, Moon } from 'lucide-react';
import { soundEngine } from '../utils/sound';

export const EarlyWebFooter: React.FC = () => {
  const handleBadgeClick = (text: string) => {
    soundEngine.playClick();
  };

  return (
    <footer className="mt-20 border-t border-white/10 bg-[#080a14] pt-12 pb-16 px-4 text-center text-xs text-slate-400">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Nostalgic 90s Web Badges (+5 pt bonus) */}
        <div>
          <p className="text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-4">
            ✦ Cozy Web Badges & Stamps ✦
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span
              onClick={() => handleBadgeClick('blanket')}
              className="cursor-pointer px-3 py-1 rounded bg-black/60 border border-pink-500/40 text-pink-300 font-mono text-[11px] shadow-sm hover:border-pink-400 transition"
            >
              🛌 Best viewed under a blanket
            </span>
            <span
              onClick={() => handleBadgeClick('sound')}
              className="cursor-pointer px-3 py-1 rounded bg-black/60 border border-amber-500/40 text-amber-300 font-mono text-[11px] shadow-sm hover:border-amber-400 transition"
            >
              🎧 Enhanced with Web Audio API
            </span>
            <span
              onClick={() => handleBadgeClick('dreams')}
              className="cursor-pointer px-3 py-1 rounded bg-black/60 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] shadow-sm hover:border-cyan-400 transition"
            >
              ⭐ 100% Organic Star Dust
            </span>
            <span
              onClick={() => handleBadgeClick('friendly')}
              className="cursor-pointer px-3 py-1 rounded bg-black/60 border border-indigo-500/40 text-indigo-300 font-mono text-[11px] shadow-sm hover:border-indigo-400 transition"
            >
              👻 Friendly ghosts welcome
            </span>
          </div>
        </div>

        {/* Nostalgic Webring Box */}
        <div className="inline-block p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 max-w-md w-full">
          <div className="text-amber-200 font-bold text-xs mb-1">
            ✦ The Midnight Spirits Webring ✦
          </div>
          <p className="text-[11px] text-slate-400 mb-3">
            Connecting whimsical bedrooms, rooftop strollers & dream weavers across the internet.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-mono">
            <button
              onClick={() => soundEngine.playClick()}
              className="text-pink-300 hover:underline"
            >
              [ « Prev ]
            </button>
            <span className="text-slate-500">|</span>
            <button
              onClick={() => soundEngine.playGiggle()}
              className="text-amber-300 hover:underline font-bold"
            >
              [ Random Dream ]
            </button>
            <span className="text-slate-500">|</span>
            <button
              onClick={() => soundEngine.playClick()}
              className="text-cyan-300 hover:underline"
            >
              [ Next » ]
            </button>
          </div>
        </div>

        {/* Official Attributions & Credits */}
        <div className="pt-6 border-t border-white/5 space-y-2 text-slate-500 text-[11px]">
          <p>
            Built for <strong className="text-pink-300">haX.baby · Baby's First Website Hackathon</strong> (17–19 October 2026).
          </p>
          <p>
            Canon Character: <strong className="text-slate-300">Pip the Skull Baby</strong> · Junior Dream Engineer at Midnight Nursery.
          </p>
          <p className="text-slate-600">
            Self-contained frontend craft · Web Audio API · Tailwind CSS · Framer Motion · Canvas Sparkles.
          </p>
        </div>
      </div>
    </footer>
  );
};
