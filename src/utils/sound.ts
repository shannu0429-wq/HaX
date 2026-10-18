// Web Audio API Synthesizer Engine for haX.baby Track 1 (Pip)
// 100% self-contained mathematical synthesis - no external audio files required.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private listeners: ((muted: boolean) => void)[] = [];

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public subscribe(listener: (muted: boolean) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.listeners.forEach(fn => fn(this.isMuted));
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    this.listeners.forEach(fn => fn(this.isMuted));
  }

  /**
   * Play a delicate music-box chime using dual sine harmonics and an exponential decay envelope.
   */
  public playChime(freq: number, duration: number = 1.4) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Primary bell tone (Sine)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Harmonic bell tone (Soft triangle for warmth)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Filter to soften high transients
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3200, now);

    // Envelope: sharp attack, gentle music-box shimmer decay
    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.linearRampToValueAtTime(0.28, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.linearRampToValueAtTime(0.08, now + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.7));

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(filter);
    gain2.connect(filter);
    filter.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  /**
   * Soft UI bubble click sound.
   */
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(840, now + 0.06);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  }

  /**
   * Dream bubble pop sound (used when dropping dreams onto rooftops).
   */
  public playBubblePop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(700, now);
    osc.frequency.exponentialRampToValueAtTime(280, now + 0.12);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  /**
   * Pip's signature giggle chime (Easter egg).
   * Generates a cascading warm pentatonic laugh arpeggio.
   */
  public playGiggle() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 880.00, 1174.66];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 0.4);
      }, idx * 75);
    });
  }

  /**
   * Soothing deep sleepy hum (when Pip naps).
   */
  public playSleepHum() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(196, now); // G3
    osc.frequency.linearRampToValueAtTime(174.61, now + 1.2); // F3

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.8);
  }
}

export const soundEngine = new SoundEngine();

// Pentatonic Dream Scale (C5, D5, E5, G5, A5, C6, D6, E6)
export const DREAM_SCALE = [
  { note: 'C5', freq: 523.25, label: 'Star Drop', color: '#ff9ebb' },
  { note: 'D5', freq: 587.33, label: 'Moon Dew', color: '#ffd166' },
  { note: 'E5', freq: 659.25, label: 'Cloud Puff', color: '#70d6ff' },
  { note: 'G5', freq: 783.99, label: 'Night Bell', color: '#b8a9c9' },
  { note: 'A5', freq: 880.00, label: 'Dream Wind', color: '#a8dadc' },
  { note: 'C6', freq: 1046.50, label: 'Silver Wish', color: '#ffeaa7' },
  { note: 'D6', freq: 1174.66, label: 'Aurora Glow', color: '#ffc6ff' },
  { note: 'E6', freq: 1318.51, label: 'Lullaby Spark', color: '#bdb2ff' },
];
