# Agent Notes for Pian Psaltic

## Recent Refactoring & Corrections

### 2026-04-29: Split monolithic files, corrected against Ionascu

This session involved splitting large files and doing a correctness pass against the book *Teoria Muzicii Psaltice* by Pr. Lect. Dr. Stelian Ionascu. Below are the mistakes made so you don't repeat them.

---

## Mistake 1: Circular dependency between constants

**What happened:** Initially placed `generateKeyboardMap` in `constants/music.ts`, which imported `GLASURI` from `constants/glasuri.ts`. But `glasuri.ts` needed interval arrays from `music.ts`. TypeScript circular dependency.

**Fix:** Moved `generateKeyboardMap` to `constants/glasuri.ts` (which imports intervals from music.ts, and music.ts stays pure constants).

**Lesson:** Always check import graphs when splitting files. Keep data files pure (no cross-imports between sibling data files).

---

## Mistake 2: Hardcoded Byzantine Unicode characters incorrectly

**What happened:** When creating `constants/psaltic/psalticSigns.ts` by hand, I typed `\uF000`, `\uF001`, etc. instead of the actual Byzantine Unicode characters like `\uD801\uDC46` (for 󠄀).

**Fix:** Used Python script to extract exact bytes from the original file. The Byzantine Musical Symbols are in the U+1D000 block (surrogate pairs in UTF-16, multi-byte in UTF-8).

**Lesson:** Never transcribe Unicode manually from memory. Always copy/paste or script-extract the exact bytes. A single wrong codepoint = broken glyph display.

---

## Mistake 3: Type re-export confusion (`NoteName`)

**What happened:** `types.ts` (project root) already exported `NoteName`. The new `constants/psaltic/types.ts` tried to both `import` and `export type` the same symbol, causing TS2459 errors.

**Fix:** `constants/psaltic/types.ts` now does:
```ts
import { NoteName } from '../../types';
export type { NoteName };
```
And `constants/music.ts` defines its own `NoteName` as `typeof NOTE_NAMES[number]`.

**Lesson:** Before creating new type files, check if types already exist elsewhere. Use re-exports, not duplication.

---

## Mistake 4: Deleted constants.ts before updating all consumers

**What happened:** Removed `constants.ts` while `App.tsx`, `ControlPanel.tsx`, and `PianoBoard.tsx` still imported from `'../constants'`. Build broke immediately.

**Fix:** Created `constants/index.ts` as a barrel file exporting `music.ts` and `glasuri.ts`. Then updated all consumer imports individually.

**Lesson:** When deleting/replacing a barrel file, either (a) keep the barrel with new exports, or (b) update ALL imports atomically before deleting. Don't delete first.

---

## Mistake 5: Overcorrected and removed a correct formula

**What happened:** In the "Clasma + Gorgon" theory section, the user corrected me that `1 timp = coborâre + ridicare de mână`. I initially thought the `1½ + ½` formula was wrong and replaced it with vague text like "prima prelungită, a doua scurtată". The user then had to re-explain that `1½ + ½` WAS correct all along — I just needed to explain that 1 timp = full beat cycle, so the formula describes how the 2 beats of clasma get unevenly split by gorgon.

**Fix:** Restored `1½ + ½` and added the definition `1 timp = coborâre + ridicare de mână` as context.

**Lesson:** When the user corrects you, make sure you understand WHICH part was wrong before rewriting. Don't throw away correct math/formulas just because the explanation needed work.

---

## Correctness issues found in quiz/theory vs. Ionascu's book

### Temporal signs

| Sign | Original quiz text | What Ionascu actually says | Status |
|------|-------------------|--------------------------|--------|
| **Argon** | "Semnul anterior se ia împreună cu oligonul" (vague) | Dual nature: clasmă on the oligon + gorgon on previous neume. Only appears in one formula. | **Fixed** |
| **Diargon** | "are efect de dipli asupra oligonului" (missing context) | Same rhythmic formula as argon, but with dipli effect (3 beats) instead of clasmă (2 beats). | **Fixed** |

### Theory section visual labels

| Label | Was | Should be | Why |
|-------|-----|-----------|-----|
| Semn clasma | "Ga (clasma)" | "Semn cu Clasma" | Clasma has no melodic function; "Ga" implies note |
| Semn gorgon | "Di (gorgon, urcă 1)" | "Semn cu Gorgon" | Gorgon doesn't "urcă"; the oligon does |

### Gorgon "golden rule"

**Was missing:** "gorgonul (semnul pe care se așează) se ia întotdeauna la ridicare de mână" — Ionascu p. 1325.

**Added.** The golden rule is: affects current + previous neume; the note with gorgon is sung on the upbeat (hand lift).

---

## File structure created

```
constants/
  music.ts           (intervals, frequencies, NOTE_NAMES)
  glasuri.ts         (GLASURI + generateKeyboardMap)
  index.ts           (barrel: exports music + glasuri)
  psaltic/
    types.ts         (PsalticSign, TemporalSign, TempoSign, etc.)
    psalticSigns.ts  (PSALTIC_SIGNS data)
    temporalSigns.ts (TEMPORAL_SIGNS data)
    tempoSigns.ts    (TEMPO_SIGNS data)
    noteDefinitions.ts (NOTE_DEFINITIONS data)
    index.ts         (barrel)
components/
  QuizSection.tsx     (still monolithic - to be split)
  TheorySection.tsx   (still monolithic - to be split)
```

**Note:** QuizSection and TheorySection are still large (~950 and ~520 lines). They were planned to be split into `components/quiz/` and `components/theory/` subdirectories but this was deferred to keep the build passing. Future agents should continue this work.

---

## Build verification

Always run after changes:
```bash
npx tsc --noEmit    # type check
npx vite build       # full build
```

Current state: ✓ both pass.

---

## Source reference

Book: *Teoria Muzicii Psaltice pentru Seminariile Teologice și Școlile de Cântăreți* by Pr. Lect. Dr. Stelian Ionascu, Editura Sophia, București 2006.

PDF available at: `~/Downloads/192785882-Pr-Lec-Dr-Stelian-Ionascu-Teoria-Muzicii-Psaltice (3).pdf`

Extracted text: `/tmp/ionascu.txt` (generated via `pdftotext`)
