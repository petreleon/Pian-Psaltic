export type NoteName = 'Ni' | 'Pa' | 'Vu' | 'Ga' | 'Di' | 'Ke' | 'Zo';

// --- TEMPORAL THEORY ---

export type TemporalCategory = 'augmentation' | 'division';

export interface TemporalSign {
    id: string;
    nume: string;
    caracter: string;
    category: TemporalCategory;
    chronosFactor: number; // Multiplier for base duration
    descriere: string;
    detalii?: string;
    codepoint: string;
    glyphName: string;
    example?: string;
}

export interface NoteDefinition {
  name: NoteName;
  label: string;
  centsFromBase: number;
  isTonic: boolean;
  octaveOffset: number;
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

// Combined sign for display examples
export interface TemporalExample {
    id: string;
    title: string;
    description: string;
    baseSign: string;     // The quantitative neume (e.g. ison)
    temporalSign: string;  // The modifier applied
    resultSign: string;    // How it looks combined
    baseDuration: string;  // Human readable
    resultDuration: string;
    audioDurationMs: number; // For actual playback
}