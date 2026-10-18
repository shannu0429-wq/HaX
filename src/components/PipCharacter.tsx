import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../utils/sound';
import confetti from 'canvas-confetti';

interface PipCharacterProps {
  isSleeping: boolean;
  onWakeUp: () => void;
  onBowEasterEgg: () => void;
  isDaytime: boolean;
}

export const PipCharacter: React.FC<PipCharacterProps> = ({
  isSleeping,
  onWakeUp,
  onBowEasterEgg,
  isDaytime,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [bowClicks, setBowClicks] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showBowTooltip, setShowBowTooltip] = useState(false);

  // 3D Parallax & Pupil tracking
  useEffect(() => {
    if (isSleeping) return;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const clientX = 'touches' in e ? e.touches[0]?.clientX ?? centerX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY ?? centerY : e.clientY;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      // 3D Card Tilt (Expensive Apple-like feel)
      const tiltX = -(deltaY / 30);
      const tiltY = deltaX / 30;
      setCardTilt({
        rotateX: Math.max(Math.min(tiltX, 12), -12),
        rotateY: Math.max(Math.min(tiltY, 12), -12),
      });

      // Pupil Deflection
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 7;

      if (distance > 0) {
        const factor = Math.min(distance / 250, 1) * maxDistance;
        setPupilOffset({
          x: (deltaX / distance) * factor,
          y: (deltaY / distance) * factor,
        });
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [isSleeping]);

  // Natural blinking
  useEffect(() => {
    if (isSleeping) return;
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 4200 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, [isSleeping]);

  // Bow Easter Egg Trigger
  const handleBowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextCount = bowClicks + 1;
    setBowClicks(nextCount);

    soundEngine.playChime(659.25 + nextCount * 120, 0.45);

    if (nextCount >= 3) {
      setBowClicks(0);
      onBowEasterEgg();
    } else {
      setShowBowTooltip(true);
      setTimeout(() => setShowBowTooltip(false), 1800);
    }
  };

  const handlePipClick = () => {
    if (isSleeping) {
      onWakeUp();
    } else {
      soundEngine.playGiggle();
      confetti({
        particleCount: 26,
        spread: 55,
        origin: { y: 0.45 },
        colors: ['#ff9ebb', '#ffd166', '#70d6ff', '#ffeaa7'],
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center select-none"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCardTilt({ rotateX: 0, rotateY: 0 });
      }}
    >
      {/* Bow Tooltip Hint */}
      <AnimatePresence>
        {showBowTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute -top-12 z-30 bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-xl border border-pink-300"
          >
            {bowClicks === 1 && '✨ Pip giggled! Click bow 2 more times...'}
            {bowClicks === 2 && '🌟 Almost bedtime... 1 more click!'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Zzz */}
      {isSleeping && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30">
          <motion.span
            animate={{ y: [-10, -45], opacity: [0, 1, 0], scale: [0.8, 1.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            className="text-pink-300 font-extrabold text-3xl drop-shadow-lg"
          >
            Z
          </motion.span>
          <motion.span
            animate={{ y: [-5, -32], opacity: [0, 1, 0], scale: [0.6, 1.1] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.8, ease: 'easeOut' }}
            className="text-amber-200 font-extrabold text-xl drop-shadow-md ml-6"
          >
            z
          </motion.span>
          <motion.span
            animate={{ y: [0, -22], opacity: [0, 1, 0], scale: [0.4, 0.9] }}
            transition={{ duration: 2.0, repeat: Infinity, delay: 1.5, ease: 'easeOut' }}
            className="text-cyan-200 font-extrabold text-sm drop-shadow -ml-4"
          >
            z
          </motion.span>
        </div>
      )}

      {/* 3D Tilted Wrapper */}
      <motion.div
        animate={{
          rotateX: isSleeping ? 0 : cardTilt.rotateX,
          rotateY: isSleeping ? 0 : cardTilt.rotateY,
          scale: isHovered && !isSleeping ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="relative group cursor-pointer"
        onClick={handlePipClick}
      >
        {/* Soft Dream Halo */}
        <div
          className={`absolute -inset-12 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
            isDaytime
              ? 'bg-amber-300/25'
              : isSleeping
              ? 'bg-indigo-950/60'
              : 'bg-gradient-to-tr from-pink-500/30 via-indigo-600/35 to-amber-400/30'
          }`}
        />

        {/* Pip Floating Vector */}
        <motion.div
          animate={
            isSleeping
              ? { y: [0, 6, 0] }
              : { y: [0, -12, 0] }
          }
          transition={{
            duration: isSleeping ? 4.5 : 3.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          <svg viewBox="0 0 280 280" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="boneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="65%" stopColor="#f5f0e3" />
                <stop offset="100%" stopColor="#e5ded0" />
              </linearGradient>

              <linearGradient id="nightcapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3730a3" />
                <stop offset="50%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>

              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* PIP ONESIE */}
            <g id="pip-body">
              <path
                d="M100 190 Q140 215 180 190 Q195 245 140 248 Q85 245 100 190 Z"
                fill="#4338ca"
                stroke="#312e81"
                strokeWidth="3"
              />
              <circle cx="140" cy="208" r="3.5" fill="#ffd166" />
              <circle cx="140" cy="223" r="3.5" fill="#ffd166" />
              <circle cx="140" cy="238" r="3.5" fill="#ffd166" />

              {/* Little Hands */}
              <path d="M96 200 Q76 188 72 174 Q86 173 98 188 Z" fill="#f5f0e3" stroke="#e5ded0" strokeWidth="2" />
              <path d="M184 200 Q204 205 210 218 Q198 226 182 210 Z" fill="#f5f0e3" stroke="#e5ded0" strokeWidth="2" />
            </g>

            {/* PIP SKULL HEAD */}
            <g id="pip-head">
              <ellipse cx="140" cy="142" rx="62" ry="56" fill="url(#boneGrad)" stroke="#d6cbba" strokeWidth="2" />
              <path d="M106 166 Q140 196 174 166 Q162 190 140 190 Q118 190 106 166 Z" fill="url(#boneGrad)" />

              {/* Rosy Blushing Cheeks */}
              <ellipse cx="98" cy="154" rx="11" ry="7" fill="#ff9ebb" opacity="0.7" />
              <ellipse cx="182" cy="154" rx="11" ry="7" fill="#ff9ebb" opacity="0.7" />

              {/* Nose */}
              <path d="M140 151 C138 147 134 148 135 152 C136 156 140 158 140 158 C140 158 144 156 145 152 C146 148 142 147 140 151 Z" fill="#1e1b4b" />

              {/* Crooked Sweet Smile */}
              <path d="M128 167 Q140 176 152 168" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <line x1="134" y1="168" x2="134" y2="173" stroke="#1e1b4b" strokeWidth="1.5" />
              <line x1="146" y1="169" x2="146" y2="174" stroke="#1e1b4b" strokeWidth="1.5" />

              {/* EYES */}
              {isSleeping ? (
                <g id="eyes-sleeping">
                  <path d="M104 135 Q118 147 130 135" stroke="#1e1b4b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <path d="M150 135 Q162 147 176 135" stroke="#1e1b4b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </g>
              ) : isBlinking ? (
                <g id="eyes-blinking">
                  <line x1="104" y1="136" x2="130" y2="136" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" />
                  <line x1="150" y1="136" x2="176" y2="136" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" />
                </g>
              ) : (
                <g id="eyes-open">
                  <ellipse cx="117" cy="135" rx="14" ry="16" fill="#0d1124" />
                  <circle cx={117 + pupilOffset.x} cy={135 + pupilOffset.y} r="5" fill="#ffd166" filter="url(#softGlow)" />
                  <circle cx={117 + pupilOffset.x - 1} cy={135 + pupilOffset.y - 1} r="2" fill="#ffffff" />

                  <ellipse cx="163" cy="135" rx="14" ry="16" fill="#0d1124" />
                  <circle cx={163 + pupilOffset.x} cy={135 + pupilOffset.y} r="5" fill="#ffd166" filter="url(#softGlow)" />
                  <circle cx={163 + pupilOffset.x - 1} cy={135 + pupilOffset.y - 1} r="2" fill="#ffffff" />
                </g>
              )}
            </g>

            {/* NIGHTCAP */}
            <g id="nightcap">
              <path d="M80 115 Q140 92 200 115 Q140 102 80 115 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              <path d="M85 110 Q100 45 155 35 Q225 35 240 100 Q245 145 220 155 Q205 130 195 110 Z" fill="url(#nightcapGrad)" stroke="#312e81" strokeWidth="2.5" />

              <polygon points="135,50 138,57 146,57 140,62 142,70 135,65 128,70 130,62 124,57 132,57" fill="#ffd166" opacity="0.95" />
              <polygon points="175,60 177,65 183,65 178,69 180,75 175,71 170,75 172,69 167,65 173,65" fill="#ffd166" opacity="0.95" />
              <polygon points="210,85 212,89 217,89 213,92 215,97 210,94 205,97 207,92 203,89 208,89" fill="#ffd166" opacity="0.95" />

              <circle cx="222" cy="158" r="9.5" fill="#ff9ebb" stroke="#ff7597" strokeWidth="2" />

              {/* CLICKABLE PINK BOW */}
              <g id="nightcap-bow" className="cursor-pointer transition-transform hover:scale-125 active:scale-95" onClick={handleBowClick}>
                <ellipse cx="94" cy="108" rx="5.5" ry="5.5" fill="#ff7597" />
                <path d="M94 108 C80 95 72 108 94 112 Z" fill="#ff9ebb" stroke="#ff7597" strokeWidth="1.5" />
                <path d="M94 108 C108 95 116 108 94 112 Z" fill="#ff9ebb" stroke="#ff7597" strokeWidth="1.5" />
                <path d="M92 112 Q85 124 82 128" stroke="#ff7597" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M96 112 Q102 124 106 128" stroke="#ff7597" strokeWidth="2" fill="none" strokeLinecap="round" />
              </g>
            </g>

            {/* DREAM LANTERN */}
            <g id="dream-lantern" transform="translate(196, 175)">
              <circle cx="16" cy="24" r="28" fill="#ffd166" opacity="0.35" filter="url(#softGlow)" />
              <path d="M10 8 Q16 0 22 8" stroke="#e0a96d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <polygon points="6,12 26,12 21,8 11,8" fill="#bc8a4d" />
              <rect x="8" y="12" width="16" height="22" rx="2" fill="#fffdf0" opacity="0.8" stroke="#bc8a4d" strokeWidth="1.5" />
              <path d="M17 17 C13 19 13 25 17 28 C15 28 13 26 13 22 C13 18 15 17 17 17 Z" fill="#ffd166" />
              <rect x="7" y="34" width="18" height="4" rx="1" fill="#bc8a4d" />
            </g>

            {/* CLOUD BASE */}
            <g id="cloud-bed" opacity="0.95">
              <path
                d="M50 240 Q70 215 105 230 Q140 205 180 225 Q215 210 235 240 Q250 265 215 272 Q140 280 65 272 Q35 260 50 240 Z"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="2"
              />
              <path d="M80 240 Q105 228 135 235" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {/* Glass Speech Bubble */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-4 px-4 py-2 rounded-2xl glass-card text-center shadow-2xl max-w-xs border border-white/10"
      >
        <p className="text-xs font-semibold text-slate-200 font-nursery">
          {isSleeping ? (
            <span className="text-pink-300">"Zzz... dreaming of star jelly and night songs."</span>
          ) : (
            <span>"Hello friend! I'm Pip. Click my bow for a sleepy secret!"</span>
          )}
        </p>
      </motion.div>
    </div>
  );
};
