import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanternItem } from '../types';
import { Moon, Sparkles, Cloud, Lightbulb, Compass, Zap } from 'lucide-react';
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
  const selectedLantern = LANTERNS.find((l) => l.id === selectedId) || LANTERNS[0];

  const handleSelect = (lantern: LanternItem) => {
    soundEngine.playChime(783.99, 0.8);
    setSelectedId(lantern.id);
    onInteract();
  };

  return (
    <section id="nightlights" className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="bg-gradient-to-b from-[#141830] to-[#0c0e1e] rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl relative">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Showcase Project 02 · Luminescence Craft</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-nursery">
            The Nightlight Collection 🏮
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-lg">
            Bedside lamps engineered by Pip so little spirits never have to fear the dark. Click to test illumination!
          </p>
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
                    ? 'bg-white/10 border-white/40 shadow-xl'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
                    style={{ backgroundColor: `${lantern.color}30`, color: lantern.color }}
                  >
                    {lantern.id === 'crescent-moon' && <Moon className="w-4 h-4" />}
                    {lantern.id === 'star-jar' && <Sparkles className="w-4 h-4" />}
                    {lantern.id === 'cloud-puff' && <Cloud className="w-4 h-4" />}
                  </div>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: lantern.color,
                      boxShadow: isSelected ? `0 0 10px ${lantern.color}` : 'none',
                    }}
                  />
                </div>
                <h3 className="font-bold text-white text-sm">{lantern.name}</h3>
                <p className="text-xs text-slate-400 mt-1 truncate">{lantern.power}</p>
              </button>
            );
          })}
        </div>

        {/* Active Lantern Showcase Display Stage */}
        <div className="relative rounded-2xl bg-black/40 border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden">
          {/* Dynamic Illumination Radial Aura */}
          <div
            className="absolute -inset-10 rounded-full blur-3xl opacity-30 transition-all duration-700 pointer-events-none"
            style={{ backgroundColor: selectedLantern.color }}
          />

          {/* Glowing Lantern SVG Art */}
          <div className="relative z-10 w-44 h-44 flex items-center justify-center">
            <motion.div
              key={selectedLantern.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative flex items-center justify-center"
            >
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500"
                style={{
                  backgroundColor: `${selectedLantern.color}20`,
                  boxShadow: `0 0 40px ${selectedLantern.color}60`,
                  border: `2px solid ${selectedLantern.color}80`,
                }}
              >
                {selectedLantern.id === 'crescent-moon' && (
                  <Moon className="w-16 h-16 animate-pulse" style={{ color: selectedLantern.color }} />
                )}
                {selectedLantern.id === 'star-jar' && (
                  <Sparkles className="w-16 h-16 animate-pulse" style={{ color: selectedLantern.color }} />
                )}
                {selectedLantern.id === 'cloud-puff' && (
                  <Cloud className="w-16 h-16 animate-pulse" style={{ color: selectedLantern.color }} />
                )}
              </div>
            </motion.div>
          </div>

          {/* Handwritten Blueprint Notes */}
          <div className="relative z-10 flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-white/10 text-slate-300">
                STATUS: ACTIVE EMITTER
              </span>
              <span className="text-xs text-amber-200 font-mono">
                {selectedLantern.power}
              </span>
            </div>

            <h4 className="text-xl font-bold text-white font-nursery">
              {selectedLantern.name}
            </h4>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedLantern.description}
            </p>

            {/* Blueprint sketch note box */}
            <div className="p-3.5 rounded-xl bg-indigo-950/70 border border-indigo-400/25 font-hand text-pink-200 text-sm">
              <span className="font-bold text-amber-300">Pip's Engineering Note: </span>
              {selectedLantern.blueprint}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
