import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Moon, Sun, Heart } from 'lucide-react';
import { soundEngine } from '../utils/sound';

interface EasterEggOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggOverlay: React.FC<EasterEggOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleWake = () => {
    soundEngine.playChime(880, 0.8);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleWake}
        className="fixed inset-0 z-50 bg-[#060814]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center select-none cursor-pointer"
      >
        {/* Soft Dream Moon */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-300 via-pink-300 to-indigo-400 p-1 shadow-2xl shadow-pink-500/30 flex items-center justify-center mb-6"
        >
          <div className="w-full h-full bg-[#0c0e1e] rounded-full flex items-center justify-center text-4xl">
            🌙
          </div>
        </motion.div>

        {/* Easter Egg Secret Title */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold mb-3 border border-pink-400/30">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Secret Discovered · Pip's Bedtime Nap</span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-nursery mb-3">
          Shhh... Pip is fast asleep! 💤
        </h3>

        <p className="text-slate-300 max-w-md text-sm sm:text-base leading-relaxed mb-6 font-hand text-lg">
          You tickled Pip's nightcap bow! Pip curled up into the sleepy clouds to dream of cotton candy galaxies and sugar star dust.
        </p>

        {/* Wake up button pill */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="px-6 py-2.5 rounded-full bg-white/10 border border-white/25 text-amber-200 text-xs font-bold shadow-lg hover:bg-white/20 transition"
        >
          ✨ Click anywhere to gently wake Pip up ✨
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
