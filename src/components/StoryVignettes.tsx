import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryChapter } from '../types';
import { BookOpen, Sparkles, Feather, Heart } from 'lucide-react';
import { soundEngine } from '../utils/sound';

const CHAPTERS: StoryChapter[] = [
  {
    id: 1,
    title: 'The Stray Nightcap',
    subtitle: 'Where it all began',
    badge: 'Origins',
    text: 'Before Pip knew what dreams were, Pip was just a tiny creature wandering through the sleepy clouds. One dusk, tangled between moonbeams, Pip found an oversized midnight nightcap stitched with glowing stars. Sliding it on, a tiny pink bow fluttered to life—and Pip heard the whispers of sleeping ghosts.',
    pipReaction: '🌟 Discovered purpose in the starlight.',
  },
  {
    id: 2,
    title: 'The First Lullaby',
    subtitle: 'Learning the craft',
    badge: 'Apprenticeship',
    text: 'At Midnight Nursery, baby monsters were having restless nightmares about lost socks and thunder. Pip took a wooden music box, tuned each tine to star frequencies, and turned the crank. In three notes, the room was snoring softly. The Elders awarded Pip the title of Junior Dream Engineer.',
    pipReaction: '🎶 Discovered that gentleness cures any nightmare.',
  },
  {
    id: 3,
    title: 'The Midnight Oath',
    subtitle: 'Pip\'s lifelong promise',
    badge: 'Current Mission',
    text: 'Every night when clocks strike twelve, Pip checks the dream lanterns, polishes the star rattle, and maps rooftop routes. Pip’s promise is simple: no child or friendly ghost ever has to drift into sleep alone. The nursery lights stay on until the sun rises.',
    pipReaction: '🌙 "I build the dreams you fall asleep inside."',
  },
];

export const StoryVignettes: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const current = CHAPTERS.find((c) => c.id === activeChapter) || CHAPTERS[0];

  const handleSelectChapter = (id: number) => {
    soundEngine.playChime(659.25 + id * 80, 0.6);
    setActiveChapter(id);
  };

  return (
    <section id="story" className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 md:p-10 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold mb-2 border border-violet-400/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Pip's Story · Bedtime Storybook</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-nursery">
            How Pip Came to the Midnight Nursery <span className="text-violet-300 font-normal">📖</span>
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-lg">
            Flip through the chapters of Pip's journey. No novel walls of text—just cozy memories from the clouds.
          </p>
        </div>

        {/* Chapter Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          {CHAPTERS.map((ch) => {
            const isActive = ch.id === activeChapter;
            return (
              <button
                key={ch.id}
                onClick={() => handleSelectChapter(ch.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-xl shadow-pink-500/20 border border-pink-400/50'
                    : 'glass-card text-slate-300 hover:text-white hover:border-white/20'
                }`}
              >
                <span className="font-mono text-amber-300">0{ch.id}.</span>
                <span>{ch.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Card */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-inner"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-500/40">
              {current.badge}
            </span>
            <span className="text-xs text-slate-400 font-medium">{current.subtitle}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-nursery">
            {current.title}
          </h3>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            {current.text}
          </p>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-pink-300 font-hand text-lg">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{current.pipReaction}</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">Page {current.id} of 3</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
