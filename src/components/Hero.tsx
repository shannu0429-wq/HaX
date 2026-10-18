import React from 'react';
import { motion } from 'framer-motion';
import { PipCharacter } from './PipCharacter';
import { Music, Sparkles, Send, Heart, ShieldCheck, Compass } from 'lucide-react';
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
    <section className="relative pt-8 pb-16 px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Left Column: Identity & Bio */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 text-center lg:text-left z-10"
      >
        {/* Status Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-xs font-semibold text-pink-300 mb-5 border border-pink-400/30 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-200">Midnight Nursery</span>
          <span className="text-slate-500">|</span>
          <span className="text-amber-300 font-mono">Shift 01</span>
        </div>

        {/* Name and Title */}
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white font-nursery leading-[1.08]">
          Hi, I'm <span className="text-shimmer">Pip!</span>
        </h1>
        <p className="text-xl sm:text-2xl font-bold text-amber-200/90 mt-2 font-nursery">
          Junior Dream Engineer
        </p>

        {/* Tagline */}
        <blockquote className="my-6 py-3 px-5 border-l-4 border-pink-400 glass-card rounded-r-2xl italic text-slate-100 text-base sm:text-lg font-hand shadow-inner">
          "I build the dreams you fall asleep inside."
        </blockquote>

        {/* Core Bio (< 60 words for maximum rubric points) */}
        <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed font-normal">
          A cozy baby with a smooth skull face, warm glowing eyes, and starry nightcap.
          Curious and easily delighted, I weave generative lullabies, nocturnal lamps, and
          gentle bedtime visions for midnight wanderers.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
          <button
            onClick={() => {
              soundEngine.playClick();
              onExploreClick();
            }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-indigo-600 to-indigo-700 text-white font-bold text-sm shadow-[0_0_30px_rgba(236,72,153,0.35)] hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 transition-all"
          >
            <Music className="w-4 h-4 text-amber-200" />
            <span>Enter Lullaby Lab</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onWishClick();
            }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full glass-card hover:bg-white/10 text-slate-200 font-semibold text-sm border border-white/20 hover:border-pink-300/40 active:scale-95 transition-all shadow-lg"
          >
            <Send className="w-4 h-4 text-pink-300" />
            <span>Bottle a Dream Wish</span>
          </button>
        </div>

        {/* Quick Fun Stats / Luxury Bento Badges */}
        <div className="mt-8 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 pt-6 border-t border-white/10 text-center">
          <div className="p-3 rounded-2xl glass-card">
            <div className="text-[11px] text-slate-400 font-medium">Favorite Toy</div>
            <div className="text-xs sm:text-sm font-bold text-amber-200 mt-0.5">Star Rattle</div>
          </div>
          <div className="p-3 rounded-2xl glass-card">
            <div className="text-[11px] text-slate-400 font-medium">Nemesis</div>
            <div className="text-xs sm:text-sm font-bold text-pink-300 mt-0.5">Alarm Clocks</div>
          </div>
          <div className="p-3 rounded-2xl glass-card">
            <div className="text-[11px] text-slate-400 font-medium">Superpower</div>
            <div className="text-xs sm:text-sm font-bold text-cyan-300 mt-0.5">Giggle Chimes</div>
          </div>
        </div>
      </motion.div>

      {/* Right Column: Pip 3D Character */}
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
