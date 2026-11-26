export interface MusicTrack {
  id: string;
  title: string;
  subtitle: string;
  bpm: number;
  durationSec: number;
  notes: readonly number[];
  bassNotes: readonly number[];
}

export const PLAYLIST: readonly MusicTrack[] = [
  {
    id: 'janji-suci',
    title: 'Janji Suci',
    subtitle: 'Piano & Strings · D Major',
    bpm: 72,
    durationSec: 180,
    // D Major romantic arpeggio frequencies (D4, F#4, A4, D5, E5, F#5, A4, B4, G4, E4, A4, C#5)
    notes: [293.66, 369.99, 440.0, 587.33, 440.0, 369.99, 329.63, 392.0, 493.88, 587.33, 493.88, 392.0, 277.18, 329.63, 440.0, 554.37],
    bassNotes: [146.83, 146.83, 110.0, 110.0, 123.47, 123.47, 98.0, 98.0],
  },
  {
    id: 'senja-pelaminan',
    title: 'Senja di Pelaminan',
    subtitle: 'Harp & Chimes · F Major',
    bpm: 66,
    durationSec: 195,
    notes: [349.23, 440.0, 523.25, 659.25, 523.25, 440.0, 293.66, 349.23, 440.0, 587.33, 440.0, 349.23, 261.63, 329.63, 392.0, 523.25],
    bassNotes: [174.61, 174.61, 146.83, 146.83, 130.81, 130.81, 116.54, 130.81],
  },
  {
    id: 'melodi-abadi',
    title: 'Melodi Abadi',
    subtitle: 'Celesta & Pad · G Major',
    bpm: 76,
    durationSec: 165,
    notes: [392.0, 493.88, 587.33, 739.99, 587.33, 493.88, 329.63, 392.0, 493.88, 659.25, 493.88, 392.0, 261.63, 329.63, 392.0, 523.25],
    bassNotes: [196.0, 196.0, 164.81, 164.81, 130.81, 130.81, 146.83, 146.83],
  },
];

export class WeddingMusicEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private stepTimer: number | null = null;
  private progressTimer: number | null = null;
  private isPlaying = false;
  private trackIndex = 0;
  private stepIndex = 0;
  private volume = 0.45;
  private elapsedSec = 0;
  private onProgressCb: ((sec: number) => void) | null = null;

  public setOnProgress(cb: (sec: number) => void) {
    this.onProgressCb = cb;
  }

  private ensureContext(): boolean {
    if (typeof window === 'undefined') return false;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return false;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume * 0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      void this.ctx.resume().catch(() => {
        // Autoplay may be blocked until user gesture
      });
    }
    return true;
  }

  private triggerNote(freq: number, bassFreq?: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Warm piano/harp voice
    const osc = this.ctx.createOscillator();
    const harmonic = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    harmonic.type = 'sine';
    harmonic.frequency.setValueAtTime(freq * 2, now);

    const harmonicGain = this.ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.18, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1900, now);
    filter.frequency.exponentialRampToValueAtTime(650, now + 1.6);

    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.28, now + 0.035);
    noteGain.gain.exponentialRampToValueAtTime(0.0008, now + 1.85);

    osc.connect(filter);
    harmonic.connect(harmonicGain);
    harmonicGain.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    harmonic.start(now);
    osc.stop(now + 1.9);
    harmonic.stop(now + 1.9);

    // Warm string pad bass on every 2nd step
    if (bassFreq) {
      const padOsc = this.ctx.createOscillator();
      const padGain = this.ctx.createGain();
      padOsc.type = 'sine';
      padOsc.frequency.setValueAtTime(bassFreq, now);
      padGain.gain.setValueAtTime(0.0001, now);
      padGain.gain.linearRampToValueAtTime(0.16, now + 0.35);
      padGain.gain.exponentialRampToValueAtTime(0.0008, now + 2.4);

      padOsc.connect(padGain);
      padGain.connect(this.masterGain);
      padOsc.start(now);
      padOsc.stop(now + 2.45);
    }
  }

  public play(trackIdx?: number): boolean {
    if (typeof trackIdx === 'number' && trackIdx >= 0 && trackIdx < PLAYLIST.length) {
      if (trackIdx !== this.trackIndex) {
        this.trackIndex = trackIdx;
        this.stepIndex = 0;
        this.elapsedSec = 0;
        this.onProgressCb?.(0);
      }
    }

    const ok = this.ensureContext();
    this.stopTimers();
    this.isPlaying = true;

    const track = PLAYLIST[this.trackIndex];
    const stepMs = Math.round((60 / track.bpm) * 500); // eighth-note romantic pulse

    if (ok) {
      const playStep = () => {
        if (!this.isPlaying) return;
        const currentTrack = PLAYLIST[this.trackIndex];
        const note = currentTrack.notes[this.stepIndex % currentTrack.notes.length];
        const bass =
          this.stepIndex % 2 === 0
            ? currentTrack.bassNotes[Math.floor(this.stepIndex / 2) % currentTrack.bassNotes.length]
            : undefined;
        this.triggerNote(note, bass);
        this.stepIndex += 1;
      };

      playStep();
      this.stepTimer = window.setInterval(playStep, stepMs);
    }

    this.progressTimer = window.setInterval(() => {
      if (!this.isPlaying) return;
      const currentTrack = PLAYLIST[this.trackIndex];
      this.elapsedSec = (this.elapsedSec + 1) % currentTrack.durationSec;
      this.onProgressCb?.(this.elapsedSec);
    }, 1000);

    return true;
  }

  public pause() {
    this.isPlaying = false;
    this.stopTimers();
  }

  public setVolume(nextVol: number) {
    this.volume = Math.max(0, Math.min(1, nextVol));
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(this.volume * 0.35, this.ctx.currentTime, 0.05);
    }
  }

  public setTrack(index: number) {
    const safeIdx = ((index % PLAYLIST.length) + PLAYLIST.length) % PLAYLIST.length;
    this.trackIndex = safeIdx;
    this.stepIndex = 0;
    this.elapsedSec = 0;
    this.onProgressCb?.(0);
    if (this.isPlaying) {
      this.play(safeIdx);
    }
  }

  private stopTimers() {
    if (this.stepTimer !== null) {
      clearInterval(this.stepTimer);
      this.stepTimer = null;
    }
    if (this.progressTimer !== null) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
  }

  public destroy() {
    this.pause();
    if (this.ctx) {
      void this.ctx.close().catch(() => {});
      this.ctx = null;
      this.masterGain = null;
    }
  }
}
