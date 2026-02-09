import { GlasDefinition, NoteName, NoteDefinition } from './types';

// Approximate Cent values for Psaltic intervals (Chrysanthine system converted roughly to cents)
// 12 moria ~ 200 cents (Major tone)
// 10 moria ~ 167 cents (Minor tone)
// 8 moria ~ 133 cents (Minimum tone)
// 6 moria ~ 100 cents (Semitone - Chromatic)

// Standard Diatonic Scale (Ni-Pa-Vu-Ga-Di-Ke-Zo-Ni')
// Steps: 12, 10, 8, 12, 12, 10, 8 (Moria)
// Cents: 200, 167, 133, 200, 200, 167, 133
const DIATONIC_INTERVALS = [200, 167, 133, 200, 200, 167, 133];

// Hard Chromatic (Glas 2) - Starting Di
// Di-Ke(semitone)-Zo(aug)-Ni'(semi)-Pa'(tone)...
// Approx Cents: 85, 280, 85, 200, ... (Simplified for web playback)
const CHROMATIC_HARD_INTERVALS = [100, 267, 100, 200, 100, 267, 100]; // Simplification of Glas 2

// Enharmonic (Glas 3) - Base Ga
// Ga-Di-Ke (Diatonic-ish) but often F is sharp. 
// Using a standard approximation for Glas 3
const ENHARMONIC_INTERVALS = [200, 200, 200, 200, 200, 100, 100]; // Very rough F-Major-ish approx

export const NOTE_NAMES: NoteName[] = ['Ni', 'Pa', 'Vu', 'Ga', 'Di', 'Ke', 'Zo'];

// Definitions for the 8 Glasuri (Modes)
export const GLASURI: GlasDefinition[] = [
  {
    id: 1,
    name: "Glasul 1",
    baseNote: 'Pa',
    description: "Diatonic (Baza: Pa)",
    intervals: [167, 133, 200, 200, 167, 133, 200] // Steps from Pa: Pa->Vu(10m), Vu->Ga(8m)...
  },
  {
    id: 2,
    name: "Glasul 2",
    baseNote: 'Di',
    description: "Chromatic Moale/Tare (Baza: Di)",
    intervals: [100, 267, 100, 200, 100, 267, 100] // Starts from Di
  },
  {
    id: 3,
    name: "Glasul 3",
    baseNote: 'Ga',
    description: "Enharmonic (Baza: Ga)",
    intervals: [200, 200, 200, 200, 200, 100, 100] // Starts from Ga
  },
  {
    id: 4,
    name: "Glasul 4 (Legetos)",
    baseNote: 'Vu',
    description: "Diatonic Legetos (Baza: Vu)",
    intervals: [133, 200, 200, 167, 133, 200, 167] // Starts from Vu
  },
  {
    id: 5,
    name: "Glasul 5",
    baseNote: 'Pa',
    description: "Diatonic (Baza: Pa - similar Glas 1)",
    intervals: [167, 133, 200, 200, 167, 133, 200]
  },
  {
    id: 6,
    name: "Glasul 6",
    baseNote: 'Pa',
    description: "Chromatic (Baza: Pa)",
    intervals: [100, 267, 100, 200, 133, 167, 233] // Modified for Plagal 2 feel
  },
  {
    id: 7,
    name: "Glasul 7 (Varys)",
    baseNote: 'Zo',
    description: "Enharmonic/Diatonic (Baza: Zo)",
    intervals: [133, 200, 167, 133, 200, 200, 167] // From Zo low
  },
  {
    id: 8,
    name: "Glasul 8",
    baseNote: 'Ni',
    description: "Diatonic (Baza: Ni)",
    intervals: [200, 167, 133, 200, 200, 167, 133] // From Ni
  }
];

// Helper to generate the full keyboard layout based on selected glas
export const generateKeyboardMap = (glasId: number): NoteDefinition[] => {
  const glas = GLASURI.find(g => g.id === glasId) || GLASURI[0];
  const notes: NoteDefinition[] = [];
  
  // The sequence of names is circular: Ni, Pa, Vu, Ga, Di, Ke, Zo, Ni...
  const baseNameIndex = NOTE_NAMES.indexOf(glas.baseNote);
  
  // We want: 
  // 1. The Main Octave (Base -> Base + 7 steps)
  // 2. 4 notes below Base
  // 3. 4 notes above Main Octave
  // Total range: -4 to +11 (relative to base index 0)
  
  // Total keys = 4 (below) + 1 (base) + 6 (rest of octave) + 4 (above) = 15 keys
  // Actually, let's do: 4 below, 1 base, 7 above (complete octave), 4 above that. 
  
  const rangeStart = -4; 
  const rangeEnd = 11; // Base is 0. 7 is octave. 11 is octave + 4.

  for (let i = rangeStart; i <= rangeEnd; i++) {
    // Determine Note Name
    let nameIndex = (baseNameIndex + i) % 7;
    if (nameIndex < 0) nameIndex += 7;
    const noteName = NOTE_NAMES[nameIndex];

    // Determine Octave Offset relative to the Base Note's natural octave
    // i=0 is base. i=7 is base+octave. i=-7 is base-octave.
    const octaveShift = Math.floor(i / 7);

    // Calculate Cents
    // We need to sum intervals from 0 to i.
    let cents = 0;
    
    if (i > 0) {
      // Sum intervals going up
      for (let j = 0; j < i; j++) {
        // Use modulo to cycle through the interval pattern of the Glas
        cents += glas.intervals[j % 7];
      }
    } else if (i < 0) {
      // Sum intervals going down (subtracting)
      for (let j = -1; j >= i; j--) {
        // When going down from 0:
        // -1 is the step below 0. The interval to subtract is the last one in the cycle?
        // Let's look at the cycle: Base -> (+int0) -> Note1.
        // Note below Base: Base <- (-int6) <- Note-1? 
        // Yes, the interval leading TO base from below is the last interval of the previous octave.
        
        let intervalIndex = (j % 7);
        if (intervalIndex < 0) intervalIndex += 7;
        
        // Wait, if scale is A, B, C... interval[0] is A->B.
        // Going down from A, we need G->A. That is interval[6] (the last one).
        cents -= glas.intervals[intervalIndex];
      }
    }

    notes.push({
      name: noteName,
      label: noteName,
      centsFromBase: cents,
      isTonic: i === 0 || i % 7 === 0, // Mark octaves of tonic as red too? Or just main? 
      // User asked for "începutul glasurilor" marked. Usually the main base.
      // We will mark i=0 as the primary RED key. Octaves can be slightly different.
      octaveOffset: octaveShift
    });
  }

  return notes;
};