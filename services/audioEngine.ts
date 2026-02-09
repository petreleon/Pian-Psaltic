class AudioEngine {
  private ctx: AudioContext | null = null;
  private oscillators: Map<number, OscillatorNode> = new Map();
  private gainNodes: Map<number, GainNode> = new Map();
  private masterGain: GainNode | null = null;
  private masterVolume: number = 0.5;

  constructor() {
    // Initialize context only on user interaction usually, but we define it here
  }

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.masterVolume; // Use stored volume
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public setVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
    }
  }

  public playTone(frequency: number, noteIndex: number, waveform: OscillatorType = 'triangle') {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Stop existing note strictly to prevent overlap on same key
    this.stopTone(noteIndex);

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = waveform;
    osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

    // Envelope for attack
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(1, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();

    this.oscillators.set(noteIndex, osc);
    this.gainNodes.set(noteIndex, gain);
  }

  public stopTone(noteIndex: number) {
    if (!this.ctx) return;

    // Retrieve active nodes
    const osc = this.oscillators.get(noteIndex);
    const gain = this.gainNodes.get(noteIndex);

    // CRITICAL FIX: Remove from map IMMEDIATELY.
    // This prevents race conditions where a delayed cleanup from a previous click
    // deletes the record of a new note started in the meantime.
    if (this.oscillators.has(noteIndex)) {
      this.oscillators.delete(noteIndex);
      this.gainNodes.delete(noteIndex);
    }

    if (osc && gain) {
      const now = this.ctx.currentTime;
      
      // Envelope for release
      // Cancel any future scheduled values to take control immediately
      gain.gain.cancelScheduledValues(now);
      
      // Ramp down
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      
      // Stop oscillator slightly after volume drops
      osc.stop(now + 0.15);
      
      // Disconnect nodes for GC after they are done playing
      setTimeout(() => {
        osc.disconnect();
        gain.disconnect();
      }, 200);
    }
  }
}

export const audioEngine = new AudioEngine();