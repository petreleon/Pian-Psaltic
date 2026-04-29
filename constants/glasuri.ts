import { GlasDefinition, NoteDefinition } from '../types';
import { CENTS_PER_MORIA, DIATONIC_MORIA, CHROMATIC_SOFT_MORIA, CHROMATIC_HARD_MORIA, ENHARMONIC_MORIA, VARYS_MORIA, NOTE_NAMES } from './music';

export const GLASURI: GlasDefinition[] = [
  {
    id: 1,
    name: "Glasul 1",
    baseNote: 'Pa',
    description: "Diatonic (Baza: Pa) [Gr: Echos Protos]",
    intervals: [10, 8, 12, 12, 10, 8, 12]
  },
  {
    id: 2,
    name: "Glasul 2",
    baseNote: 'Di',
    description: "Chromatic Moale (Baza: Di) [Gr: Echos Deuterus]",
    intervals: CHROMATIC_SOFT_MORIA
  },
  {
    id: 3,
    name: "Glasul 3",
    baseNote: 'Ga',
    description: "Enharmonic (Baza: Ga) [Gr: Echos Tritos]",
    intervals: ENHARMONIC_MORIA
  },
  {
    id: 4,
    name: "Glasul 4 (Legetos)",
    baseNote: 'Vu',
    description: "Diatonic Legetos (Baza: Vu) [Gr: Echos Tetartos]",
    intervals: [8, 12, 12, 10, 8, 12, 10]
  },
  {
    id: 5,
    name: "Glasul 5",
    baseNote: 'Pa',
    description: "Diatonic (Baza: Pa - similar Glas 1) [Gr: Echos Plagios Protos]",
    intervals: [10, 8, 12, 12, 10, 8, 12]
  },
  {
    id: 6,
    name: "Glasul 6",
    baseNote: 'Pa',
    description: "Chromatic Tare (Baza: Pa) [Gr: Echos Plagios Deuterus]",
    intervals: CHROMATIC_HARD_MORIA
  },
  {
    id: 7,
    name: "Glasul 7 (Varys)",
    baseNote: 'Zo',
    description: "Enharmonic/Diatonic (Baza: Zo) [Gr: Echos Varys]",
    intervals: VARYS_MORIA
  },
  {
    id: 8,
    name: "Glasul 8",
    baseNote: 'Ni',
    description: "Diatonic (Baza: Ni) [Gr: Echos Plagios Tetartos]",
    intervals: DIATONIC_MORIA
  }
];

export const generateKeyboardMap = (glasId: number): NoteDefinition[] => {
  const glas = GLASURI.find(g => g.id === glasId) || GLASURI[0];
  const notes: NoteDefinition[] = [];
  const baseNameIndex = NOTE_NAMES.indexOf(glas.baseNote);
  const rangeStart = -4;
  const rangeEnd = 11;

  for (let i = rangeStart; i <= rangeEnd; i++) {
    let nameIndex = (baseNameIndex + i) % 7;
    if (nameIndex < 0) nameIndex += 7;
    const noteName = NOTE_NAMES[nameIndex];
    const octaveShift = Math.floor(i / 7);
    let moriaSum = 0;

    if (i > 0) {
      for (let j = 0; j < i; j++) {
        moriaSum += glas.intervals[j % 7];
      }
    } else if (i < 0) {
      for (let j = -1; j >= i; j--) {
        let intervalIndex = (j % 7);
        if (intervalIndex < 0) intervalIndex += 7;
        moriaSum -= glas.intervals[intervalIndex];
      }
    }

    const cents = moriaSum * CENTS_PER_MORIA;

    notes.push({
      name: noteName,
      label: noteName,
      centsFromBase: cents,
      isTonic: i === 0 || i % 7 === 0,
      octaveOffset: octaveShift
    });
  }

  return notes;
};
