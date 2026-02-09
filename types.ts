export type NoteName = 'Ni' | 'Pa' | 'Vu' | 'Ga' | 'Di' | 'Ke' | 'Zo';

export interface NoteDefinition {
  name: NoteName;
  label: string; // Greek or specialized char if needed
  centsFromBase: number; // Relative to the tonic of the mode
  isTonic: boolean;
  octaveOffset: number; // 0 for main octave, -1 for lower, +1 for higher
}

export interface GlasDefinition {
  id: number;
  name: string;
  baseNote: NoteName;
  description: string;
  // Sequence of intervals (cents) for one octave starting from base
  intervals: number[]; 
}

export interface AudioSettings {
  baseFrequency: number; // Hz for the Tonic (Isokratima)
  waveform: OscillatorType;
  volume: number;
}