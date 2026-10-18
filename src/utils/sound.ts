// Ultra-High Fidelity Web Audio API Engine for haX.baby Track 1 (Pip)
// 100% self-contained mathematical synthesis - zero external audio files.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private isMuted: boolean = false;
  private listeners: ((muted: boolean) => void)[] = [];

  // Ambient sound nodes
  private rainNode: AudioBufferSourceNode | null = null;
  private rainGain: GainNode | null = null;
  private isRainPlaying: boolean = false;

  private windNode: AudioBufferSourceNode | null = null;
  private windGain: GainNode | null = null;
  private isWindPlaying: boolean = false;

  constructor() {}

  public getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;
        this.analyser.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getAnalyser(): AnalyserNode | null {
    this.getContext();
    return this.analyser;
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
    if (this.isMuted) {
      if (this.rainGain) this.rainGain.gain.value = 0;
      if (this.windGain) this.windGain.gain.value = 0;
    } else {
      if (this.rainGain && this.isRainPlaying) this.rainGain.gain.value = 0.08;
      if (this.windGain && this.isWindPlaying) this.windGain.gain.value = 0.06;
    }
    this.listeners.forEach(fn => fn(this.isMuted));
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    this.listeners.forEach(fn => fn(this.isMuted));
  }

  /**
   * Play music-box chime with rich celestial harmonics & connected to AnalyserNode
   */
  public playChime(freq: number, duration: number = 1.6) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Primary fundamental tone (Sine)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Harmonic bell tone (Triangle)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.01, now);

    // Warm undertone (Sub sine)
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 0.5, now);

    // Filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3600, now);

    // Envelopes
    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.linearRampToValueAtTime(0.3, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.linearRampToValueAtTime(0.09, now + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.7));

    gain3.gain.setValueAtTime(0.0001, now);
    gain3.gain.linearRampToValueAtTime(0.06, now + 0.03);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.5));

    osc1.connect(gain1);
    osc2.connect(gain2);
    osc3.connect(gain3);

    gain1.connect(filter);
    gain2.connect(filter);
    gain3.connect(filter);

    if (this.analyser) {
      filter.connect(this.analyser);
    } else {
      filter.connect(ctx.destination);
    }

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + duration);
    osc2.stop(now + duration);
    osc3.stop(now + duration);
  }

  public playClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(1080, now + 0.05);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    if (this.analyser) {
      gain.connect(this.analyser);
    } else {
      gain.connect(ctx.destination);
    }

    osc.start(now);
    osc.stop(now + 0.06);
  }

  public playBubblePop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.14);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    osc.connect(gain);
    if (this.analyser) {
      gain.connect(this.analyser);
    } else {
      gain.connect(ctx.destination);
    }

    osc.start(now);
    osc.stop(now + 0.14);
  }

  public playGiggle() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 880.00, 1174.66, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 0.45);
      }, idx * 65);
    });
  }

  // --- AMBIENT SOUND GENERATION (100% Procedural) ---

  /**
   * Generate continuous soft bedtime rain using pink noise synthesis
   */
  public toggleRain(): boolean {
    const ctx = this.getContext();
    if (!ctx) return false;

    if (this.isRainPlaying) {
      if (this.rainNode) {
        try { this.rainNode.stop(); } catch {}
        this.rainNode = null;
      }
      this.isRainPlaying = false;
      return false;
    }

    // Synthesize 5 seconds of looped gentle rain noise
    const bufferSize = ctx.sampleRate * 5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Lowpass filter brown/pink noise
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(750, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(this.isMuted ? 0 : 0.07, ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    this.rainNode = noise;
    this.rainGain = gain;
    this.isRainPlaying = true;
    return true;
  }

  /**
   * Generate gentle midnight wind breeze with LFO resonance
   */
  public toggleWind(): boolean {
    const ctx = this.getContext();
    if (!ctx) return false;

    if (this.isWindPlaying) {
      if (this.windNode) {
        try { this.windNode.stop(); } catch {}
        this.windNode = null;
      }
      this.isWindPlaying = false;
      return false;
    }

    const bufferSize = ctx.sampleRate * 6;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(320, ctx.currentTime);
    filter.Q.setValueAtTime(3.5, ctx.currentTime);

    // LFO to make wind swell gently
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.18, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(140, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(this.isMuted ? 0 : 0.06, ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    this.windNode = noise;
    this.windGain = gain;
    this.isWindPlaying = true;
    return true;
  }
}

export const soundEngine = new SoundEngine();

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
