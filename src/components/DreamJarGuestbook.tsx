import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DreamWish } from '../types';
import { Sparkles, Send, Heart, MessageSquare } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import confetti from 'canvas-confetti';

interface DreamJarGuestbookProps {
  onWishAdded: () => void;
}

const DEFAULT_WISHES: DreamWish[] = [
  {
    id: 'seed-1',
    author: 'Sleepy Sprout',
    wish: 'I wish for a warm cup of starlight cocoa that never goes cold.',
    timestamp: 'Just now',
    color: '#ff9ebb',
    seed: true,
  },
  {
    id: 'seed-2',
    author: 'Little Cloud',
    wish: 'I wish to fly high enough to tickle the belly of the moon.',
    timestamp: '10m ago',
    color: '#ffd166',
    seed: true,
  },
  {
    id: 'seed-3',
    author: 'Ghostly Whisper',
    wish: 'I wish all night frights turn into singing butterflies.',
    timestamp: '32m ago',
    color: '#70d6ff',
    seed: true,
  },
  {
    id: 'seed-4',
    author: 'Pip',
    wish: 'I wish every baby falls asleep inside a dream they love.',
    timestamp: 'Midnight',
    color: '#c8b6ff',
    seed: true,
  },
];

const WISH_COLORS = ['#ff9ebb', '#ffd166', '#70d6ff', '#c8b6ff', '#ffeaa7'];

export const DreamJarGuestbook: React.FC<DreamJarGuestbookProps> = ({ onWishAdded }) => {
  const [wishes, setWishes] = useState<DreamWish[]>([]);
  const [name, setName] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pip_dream_wishes');
      if (saved) {
        setWishes(JSON.parse(saved));
      } else {
        setWishes(DEFAULT_WISHES);
        localStorage.setItem('pip_dream_wishes', JSON.stringify(DEFAULT_WISHES));
      }
    } catch {
      setWishes(DEFAULT_WISHES);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    soundEngine.playChime(1046.5, 1.2);
    setIsSubmitting(true);

    const newWish: DreamWish = {
      id: Date.now().toString(),
      author: name.trim() || 'A Midnight Dreamer',
      wish: text.trim(),
      timestamp: 'Just now',
      color: WISH_COLORS[Math.floor(Math.random() * WISH_COLORS.length)],
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('pip_dream_wishes', JSON.stringify(updated));
    } catch (err) {
      console.warn('Could not save to localStorage', err);
    }

    setText('');
    setName('');
    setIsSubmitting(false);
    onWishAdded();

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ff9ebb', '#ffd166', '#70d6ff', '#c8b6ff'],
    });
  };

  return (
    <section id="dream-jar" className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="bg-gradient-to-b from-[#181d3b] to-[#101428] rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl relative">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Side Quest · Interactive Dream Jar Guestbook (+2 pts)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-nursery">
            The Glowing Dream Jar ✨
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-lg">
            Whisper your bedtime wish into Pip's jar. Wishes stay preserved for midnight visitors!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Wish Input Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-5 bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4"
          >
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Whisper a New Wish</span>
            </h3>

            <div>
              <label className="block text-xs text-slate-300 mb-1 font-medium">Your Name / Title</label>
              <input
                type="text"
                placeholder="e.g. Starry Wanderer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={30}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-pink-400 transition"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1 font-medium">Bedtime Wish</label>
              <textarea
                placeholder="What dream would you like Pip to weave tonight?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                maxLength={180}
                rows={3}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-pink-400 transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !text.trim()}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 active:scale-95 disabled:opacity-50 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Bottle This Wish</span>
            </button>
          </form>

          {/* Dream Jar Wish Wall */}
          <div className="lg:col-span-7 space-y-3 max-h-[380px] overflow-y-auto pr-2">
            <AnimatePresence initial={false}>
              {wishes.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition relative overflow-hidden group"
                >
                  <div
                    className="absolute top-0 left-0 w-1.5 h-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex items-center justify-between mb-1 pl-2">
                    <span className="font-bold text-xs text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.author}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 pl-2 leading-relaxed font-hand text-base">
                    "{item.wish}"
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
