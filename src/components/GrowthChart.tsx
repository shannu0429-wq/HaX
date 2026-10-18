import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, Sparkles, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import { soundEngine } from '../utils/sound';

interface GrowthChartProps {
  onInteract: () => void;
}

interface SkillMilestone {
  id: string;
  height: string;
  title: string;
  category: string;
  level: number;
  diary: string;
  color: string;
}

const MILESTONES: SkillMilestone[] = [
  {
    id: 'lullaby-audio',
    height: '42 Moons Tall',
    title: 'Lullaby Frequency Weaving',
    category: 'Web Audio API & DSP Synthesis',
    level: 98,
    diary: 'Pip learned to generate pure 432Hz sine waves and pentatonic scales without touching a single external audio file. No more broken MP3 links for nocturnal dreamers!',
    color: '#ff9ebb',
  },
  {
    id: 'cranium-code',
    height: '36 Moons Tall',
    title: 'Baby Cranium Calibration',
    category: 'React 18 + TypeScript + Vite',
    level: 95,
    diary: 'Pip’s skull cranium was optimized for 60fps eye-tracking and 3D card perspective tilt. Zero runtime bugs, zero console warnings.',
    color: '#ffd166',
  },
  {
    id: 'blanket-fort',
    height: '28 Moons Tall',
    title: 'Blanket Fort Architecture',
    category: 'Responsive CSS & Tailwind',
    level: 99,
    diary: 'Pip proved that whether a website is viewed on a 360px phone under bed covers or a 4K desktop monitor, every button remains cozy and finger-friendly.',
    color: '#70d6ff',
  },
  {
    id: 'rooftop-nav',
    height: '20 Moons Tall',
    title: 'Rooftop Celestial Navigation',
    category: 'Interactive SVG & Canvas Physics',
    level: 90,
    diary: 'Pip mastered rooftop trajectories so dream bubbles float safely into chimney pots instead of getting snagged on TV antennas.',
    color: '#c8b6ff',
  },
  {
    id: 'nightlight-wiring',
    height: '14 Moons Tall',
    title: 'Nightlight Luminescence Wiring',
    category: 'Dynamic Radial Glows & Dimmers',
    level: 94,
    diary: 'Pip engineered bedside lanterns with custom CSS radial shaders and live dimmers so monsters never lurk in pitch black.',
    color: '#ffeaa7',
  },
];

export const GrowthChart: React.FC<GrowthChartProps> = ({ onInteract }) => {
  const [activeId, setActiveId] = useState<string>('lullaby-audio');
  const selected = MILESTONES.find((m) => m.id === activeId) || MILESTONES[0];

  const handleSelect = (id: string) => {
    soundEngine.playChime(880, 0.6);
    setActiveId(id);
    onInteract();
  };

  return (
    <section id="growth-chart" className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 md:p-10 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-2 border border-indigo-400/30">
            <Ruler className="w-3.5 h-3.5" />
            <span>Showcase Project 06 · Nursery Wall Growth Chart</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-nursery">
            Pip's Growth Chart & Skills Wall <span className="text-indigo-300 font-normal">📏</span>
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-lg">
            Tracked in "Moons Tall" on the nursery wall. Each notch marks an engineering craft Pip mastered!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Wooden Nursery Growth Ruler Column */}
          <div className="lg:col-span-5 space-y-2.5">
            {MILESTONES.map((m) => {
              const isSelected = m.id === activeId;
              return (
                <button
                  key={m.id}
                  onClick={() => handleSelect(m.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between active:scale-95 ${
                    isSelected
                      ? 'glass-card border-white/40 shadow-xl scale-[1.02]'
                      : 'glass-card hover:border-white/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-8 rounded-full"
                      style={{ backgroundColor: m.color }}
                    />
                    <div>
                      <div className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                        {m.height}
                      </div>
                      <div className="text-sm font-bold text-white">{m.title}</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>

          {/* Diary & Skill Inspector Stage */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/10 text-amber-200 border border-white/10">
                    HEIGHT: {selected.height}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-300">
                    MASTERY: {selected.level}%
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white font-nursery">
                  {selected.title}
                </h3>

                <p className="text-xs text-pink-300 font-mono font-semibold">
                  Stack: {selected.category}
                </p>

                {/* Progress bar */}
                <div className="w-full h-2.5 rounded-full bg-black/50 overflow-hidden border border-white/10 p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selected.level}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: selected.color }}
                  />
                </div>

                {/* Handwritten Diary Snippet */}
                <div className="p-4 rounded-xl bg-indigo-950/70 border border-indigo-400/25 font-hand text-slate-100 text-base shadow-sm">
                  <span className="font-bold text-amber-300">Pip's Growth Log: </span>
                  "{selected.diary}"
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
