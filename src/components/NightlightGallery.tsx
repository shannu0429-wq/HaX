import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanternItem } from '../types';
import { Moon, Sparkles, Cloud, Lightbulb, Sliders, Sun } from 'lucide-react';
import { soundEngine } from '../utils/sound';

interface NightlightGalleryProps {
  onInteract: () => void;
}

const LANTERNS: LanternItem[] = [
  {
    id: 'crescent-moon',
    name: 'Sleeping Crescent Lantern',
    description: 'Pip’s official canon nursery lantern. Handcrafted brass cage with a sleeping porcelain moon that radiates golden lullaby warmth.',
    blueprint: 'Spec: 240 Lumens of warm amber. Battery powered by stardust capacitors. Never burns hot against baby paws.',
    power: 'Warm Amber · 2700K',
    color: '#ffd166',
    glow: 'glow-star',
  },
  {
    id: 'star-jar',
    name: 'Captured Constellation Jar',
    description: 'A vintage sealed mason flask capturing five restless nursery stars that gently swirl in rhythmic sleepy circles.',
    blueprint: 'Spec: Multi-chromatic twinkling cycle. Emits faint wind-chime frequencies when shaken gently.',
    power: 'Soft Lavender · 3200K',
    color: '#ff9ebb',
    glow: 'glow-pink',
  },
  {
    id: 'cloud-puff',
    name: 'Cumulus Dream Diffuser',
    description: 'A sculpted cotton-soft cloud light that floats 2 inches above bedside tables using magnetic dream repulsion.',
    blueprint: 'Spec: Dynamic ambient tint. Automatically dims as room silence deepens past midnight.',
    power: 'Ethereal Cyan · 4500K',
    color: '#70d6ff',
    glow: 'glow-cyan',
  },
];

export const NightlightGallery: React.FC<NightlightGalleryProps> = ({ onInteract }) => {
  const [selectedId, setSelectedId] = useState<string>('crescent-moon');
  const [luminance, setLuminance] = useState<number>(75);
  const selectedLantern = LANTERNS.find((l) => l.id === selectedId) || LANTERNS[0];

  const handleSelect = (lantern: LanternItem) => {
    soundEngine.playChime(783.99, 0.8);
    setSelectedId(lantern.id);
    onInteract();
  };

  return (
    <section id="nightlights" className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 md:p-10 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2 border border-amber-400/30">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Showcase Project 02 · Luminescence Craft</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-nursery">
              The Nightlight Collection <span className="text-amber-300 font-normal">🏮</span>
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-lg">
              Bedside lanterns engineered by Pip so night creatures feel safe. Test the live ambient dimmer below!
            </p>
          </div>

          {/* Interactive Luminescence Slider */}
          <div className="glass-card px-4 py-2.5 rounded-2xl flex items-center gap-3 border border-white/10">
            <Sliders className="w-4 h-4 text-amber-300" />
            <div className="flex flex-col">
              <div className="flex items-center justify-between text-[10px] text-slate-300 font-bold">
                <span>DIMMER</span>
                <span className="font-mono text-amber-300">{luminance}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={luminance}
                onChange={(e) => setLuminance(Number(e.target.value))}
                className="w-28 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-300"
              />
            </div>
          </div>
        </div>

        {/* Lantern Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {LANTERNS.map((lantern) => {
            const isSelected = lantern.id === selectedId;
            return (
              <button
                key={lantern.id}
                onClick={() => handleSelect(lantern)}
                className={`p-4 rounded-2xl border text-left transition-all active:scale-95 ${
                  isSelected
                    ? 'glass-card border-white/40 shadow-2xl scale-[1.02]'
                    : 'glass-card hover:border-white/25 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold shadow-md"
                    style={{ backgroundColor: `${lantern.color}25`, color: lantern.color }}
                  >
                    {lantern.id === 'crescent-moon' && <Moon className="w-4 h-4" />}
                    {lantern.id === 'star-jar' && <Sparkles className="w-4 h-4" />}
                    {lantern.id === 'cloud-puff' && <Cloud className="w-4 h-4" />}
                  </div>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: lantern.color,
                      boxShadow: isSelected ? `0 0 12px ${lantern.color}` : 'none',
                    }}
                  />
                </div>
                <h3 className="font-bold text-white text-sm">{lantern.name}</h3>
                <p className="text-xs text-slate-400 mt-1 truncate">{lantern.power}</p>
              </button>
            );
          })}
        </div>

        {/* Active Lantern Showcase Stage */}
        <div className="relative rounded-2xl bg-black/50 border border-white/10 p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 overflow-hidden shadow-inner">
          {/* Dynamic Illumination Aura linked to Dimmer */}
          <div
            className="absolute -inset-10 rounded-full blur-3xl transition-all duration-500 pointer-events-none"
            style={{
              backgroundColor: selectedLantern.color,
              opacity: (luminance / 100) * 0.45,
            }}
          />

          {/* Pedestal Stage */}
          <div className="relative z-10 w-48 h-48 flex items-center justify-center">
            <motion.div
              key={selectedLantern.id}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative flex items-center justify-center"
            >
              <div
                className="w-36 h-36 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500"
                style={{
                  backgroundColor: `${selectedLantern.color}15`,
                  boxShadow: `0 0 ${luminance}px ${selectedLantern.color}80`,
                  border: `2px solid ${selectedLantern.color}80`,
                }}
              >
                {selectedLantern.id === 'crescent-moon' && (
                  <Moon className="w-20 h-20 animate-pulse" style={{ color: selectedLantern.color }} />
                )}
                {selectedLantern.id === 'star-jar' && (
                  <Sparkles className="w-20 h-20 animate-pulse" style={{ color: selectedLantern.color }} />
                )}
                {selectedLantern.id === 'cloud-puff' && (
                  <Cloud className="w-20 h-20 animate-pulse" style={{ color: selectedLantern.color }} />
                )}
              </div>
            </motion.div>
          </div>

          {/* Blueprint & Specs */}
          <div className="relative z-10 flex-1 space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold px-3 py-0.5 rounded-full bg-white/10 text-slate-200 border border-white/10">
                ACTIVE EMITTER
              </span>
              <span className="text-xs text-amber-200 font-mono">
                {selectedLantern.power}
              </span>
            </div>

            <h4 className="text-2xl font-bold text-white font-nursery">
              {selectedLantern.name}
            </h4>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {selectedLantern.description}
            </p>

            <div className="p-4 rounded-xl bg-indigo-950/70 border border-indigo-400/30 font-hand text-pink-200 text-base shadow-sm">
              <span className="font-bold text-amber-300">Pip's Blueprint Note: </span>
              {selectedLantern.blueprint}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
