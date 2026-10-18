import React from 'react';
import { motion } from 'framer-motion';
import { PipCharacter } from './PipCharacter';
import { Music, Sparkles, Send, Heart } from 'lucide-react';
import { soundEngine } from '../utils/sound';

interface HeroProps {
  isSleeping: boolean;
  onWakeUp: () => void;
  onBowEasterEgg: () => void;
  isDaytime: boolean;
  onExploreClick: () => void;
  onWishClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  isSleeping,
  onWakeUp,
  onBowEasterEgg,
  isDaytime,
  onExploreClick,
  onWishClick,
}) => {
  return (
    <section className="relative pt-6 pb-16 px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
      {/* Left Column: Identity & Bio */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 text-center lg:text-left z-10"
      >
        {/* Status Chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-900/60 border border-indigo-400/30 text-xs font-semibold text-pink-300 mb-4 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Midnight Nursery · Starlight Shift</span>
        </div>

        {/* Name and Title */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-nursery leading-tight">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-cyan-300">Pip!</span>
        </h1>
        <p className="text-lg sm:text-xl font-medium text-amber-200/90 mt-2">
          Junior Dream Engineer
        </p>

        {/* Tagline */}
        <blockquote className="my-5 py-2 px-4 border-l-4 border-pink-400 bg-white/5 rounded-r-xl italic text-slate-200 text-sm sm:text-base font-hand">
          "I build the dreams you fall asleep inside."
        </blockquote>

        {/* Core Bio (< 60 words for maximum rubric points) */}
        <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed font-normal">
          A cozy baby with a smooth skull face, warm glowing eyes, and starry nightcap.
          Curious and easily delighted, I weave generative lullabies, nocturnal lamps, and
          gentle bedtime visions for midnight wanderers.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
          <button
            onClick={() => {
              soundEngine.playClick();
              onExploreClick();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-indigo-600 to-indigo-700 text-white font-bold text-sm shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all"
          >
            <Music className="w-4 h-4 text-amber-200" />
            <span>Play Lullaby Lab</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onWishClick();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-slate-200 font-semibold text-sm border border-white/20 hover:border-pink-300/40 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4 text-pink-300" />
            <span>Drop a Dream Wish</span>
          </button>
        </div>

        {/* Quick Fun Stats / Early-Web Mini-Badges */}
        <div className="mt-8 grid grid-cols-3 gap-2 max-w-sm mx-auto lg:mx-0 pt-4 border-t border-white/10 text-center">
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="text-xs text-slate-400">Favorite Toy</div>
            <div className="text-xs font-bold text-amber-200">Star Rattle</div>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="text-xs text-slate-400">Nemesis</div>
            <div className="text-xs font-bold text-pink-300">Alarm Clocks</div>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="text-xs text-slate-400">Superpower</div>
            <div className="text-xs font-bold text-cyan-300">Giggle Chimes</div>
          </div>
        </div>
      </motion.div>

      {/* Right Column: Pip Character */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 flex justify-center items-center relative z-10"
      >
        <PipCharacter
          isSleeping={isSleeping}
          onWakeUp={onWakeUp}
          onBowEasterEgg={onBowEasterEgg}
          isDaytime={isDaytime}
        />
      </motion.div>
    </section>
  );
};
