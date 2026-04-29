import { NoteName, NoteDefinition } from '../types';

// In the Chrysanthine system, the octave is divided into 72 equal parts called "Moria".
// 1 Octave = 72 Moria = 1200 Cents.
// 1 Moria = 1200 / 72 = 16.666... Cents.
export const CENTS_PER_MORIA = 1200 / 72;

export const BASE_NOTE_FREQUENCIES: Record<string, number> = {
  'Ni': 261.63, // C4
  'Pa': 293.66, // D4
  'Vu': 329.63, // E4 (approx)
  'Ga': 349.23, // F4
  'Di': 392.00, // G4
  'Ke': 440.00, // A4
  'Zo': 493.88  // B4
};

// --- INTERVAL DEFINITIONS (IN MORIA) ---

// 1. DIATONIC (Scara Diatonica)
// Structure: 12 - 10 - 8 - 12 - 12 - 10 - 8
// Used in: Glas 1, Glas 4 (Legetos varied), Glas 5, Glas 8
export const DIATONIC_MORIA = [12, 10, 8, 12, 12, 10, 8];

// 2. CHROMATIC SOFT (Cromatic Moale) - Glas 2
// Structure: 8 - 14 - 8 - 12 - 8 - 14 - 8
export const CHROMATIC_SOFT_MORIA = [8, 14, 8, 12, 8, 14, 8];

// 3. CHROMATIC HARD (Cromatic Tare) - Glas 6 / Glas 2 Tare
// Structure: 6 - 20 - 4 - 12 - 6 - 20 - 4
export const CHROMATIC_HARD_MORIA = [6, 20, 4, 12, 6, 20, 4];

// 4. ENHARMONIC (Enharmonic / Major-ish) - Glas 3
// Generic structure often mapped to Western Major (F Major): 12 - 12 - 6 - 12 - 12 - 12 - 6
export const ENHARMONIC_MORIA = [12, 12, 6, 12, 12, 12, 6];

// 5. ENHARMONIC VARYS (Glas 7)
// Using the "Diatonic from Zo" definition (Mixolydian-ish).
export const VARYS_MORIA = [8, 12, 10, 8, 12, 12, 10];

export const NOTE_NAMES: NoteName[] = ['Ni', 'Pa', 'Vu', 'Ga', 'Di', 'Ke', 'Zo'];
