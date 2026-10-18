import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Sparkles, Bot, User, Moon } from 'lucide-react';
import { soundEngine } from '../utils/sound';

interface DreamOracleChatProps {
  onInteract: () => void;
}

interface Message {
  id: string;
  sender: 'pip' | 'user';
  text: string;
  time: string;
}

const PRESET_QUESTIONS = [
  'Why do you have a skull face?',
  'Interpret my dream about flying clouds',
  'What is your secret bedtime snack?',
  'Can you sing me a sleepy tune?',
];

const PIP_KNOWLEDGE: { [key: string]: string } = {
  skull: "Because skeletons are just cuddly bones waiting for pajamas! In the Midnight Nursery, skull faces remind us that even spooky things can be super gentle and cozy.",
  flying: "Flying dreams mean your spirit is getting ready for a Cloud Stroll! Make sure to pack warm socks so your toes don't catch a cold on moonbeams.",
  snack: "Warm star cocoa with sugar star sprinkles and a toasted marshmallow shaped like a crescent moon! ☕✨",
  sing: "♪ Star drop, moon dew, close your eyes, the night loves you... 🎶 (Hear that in the Lullaby Lab above!)",
  default: "Ooh, that's such a sleepy wonder! I'll weave that into tonight's dream delivery route across the rooftops. Sleep soft tonight! 🌙",
};

export const DreamOracleChat: React.FC<DreamOracleChatProps> = ({ onInteract }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'pip',
      text: "Hullo! I'm Pip. Ask me about dreams, bedtime secrets, or why my nightcap has stars! 🌙",
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    soundEngine.playClick();
    onInteract();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: 'Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Determine Pip's answer
    let responseText = PIP_KNOWLEDGE.default;
    const lower = query.toLowerCase();

    if (lower.includes('skull') || lower.includes('face') || lower.includes('look') || lower.includes('scary')) {
      responseText = PIP_KNOWLEDGE.skull;
    } else if (lower.includes('fly') || lower.includes('cloud') || lower.includes('interpret') || lower.includes('dream')) {
      responseText = PIP_KNOWLEDGE.flying;
    } else if (lower.includes('snack') || lower.includes('eat') || lower.includes('food') || lower.includes('cocoa')) {
      responseText = PIP_KNOWLEDGE.snack;
    } else if (lower.includes('sing') || lower.includes('song') || lower.includes('lullaby') || lower.includes('tune')) {
      responseText = PIP_KNOWLEDGE.sing;
    }

    setTimeout(() => {
      setIsTyping(false);
      soundEngine.playChime(1046.5, 0.8);
      const pipMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'pip',
        text: responseText,
        time: 'Just now',
      };
      setMessages((prev) => [...prev, pipMsg]);
    }, 750);
  };

  return (
    <section id="dream-oracle" className="py-12 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 md:p-10 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold mb-2 border border-pink-400/30">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Tier 3 Legendary Feature · Pip's Bedtime Dialogue Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-nursery">
            Pip's Dream Oracle Chat <span className="text-pink-300 font-normal">💬</span>
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-lg">
            Chat directly with Pip in real time. Ask for dream interpretations, bedtime advice, or nursery lore!
          </p>
        </div>

        {/* Suggestion Quick Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {PRESET_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="text-xs px-3 py-1.5 rounded-full glass-card hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 active:scale-95 transition"
            >
              ✨ {q}
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="bg-black/50 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-inner flex flex-col h-[380px]">
          {/* Messages Scroll Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 pr-2">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 items-start ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'pip' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-indigo-500 flex items-center justify-center text-sm shadow-md flex-shrink-0">
                    🌙
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl max-w-sm sm:max-w-md text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-pink-500 to-indigo-600 text-white rounded-tr-none shadow-md'
                      : 'glass-card border border-white/15 text-slate-200 rounded-tl-none font-normal'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="block text-[9px] text-white/50 mt-1 font-mono text-right">{m.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 items-center text-slate-400 text-xs pl-2">
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                <span className="font-hand text-base text-pink-300">Pip is thinking of a bedtime answer...</span>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Pip anything about dreams..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-pink-400 transition"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold text-xs shadow-md hover:opacity-90 active:scale-95 disabled:opacity-40 transition flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask Pip</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
