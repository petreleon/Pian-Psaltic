import { NoteName } from '../../types';
export type { NoteName };

export type PsalticSignTip = 'urcare' | 'coborare' | 'mentinere';

export interface PsalticSign {
    id: string;
    nume: string;
    caracter: string;
    descriere: string;
    detalii?: string;
    tip: PsalticSignTip;
    valoare: number;
}

export interface PsalticNoteDefinition {
    nume: NoteName;
    caracter: string;
}

export interface TemporalSign {
    id: string;
    nume: string;
    caracter: string;
    category: 'augmentation' | 'division';
    batai: number;
    descriere: string;
    detalii?: string;
    codepoint: string;
    glyphName: string;
    affectedNeumes: number;
    exampleFormula?: string;
}

export interface TempoSign {
    id: string;
    nume: string;
    caracter: string;
    descriere: string;
}

export interface NoteDefinition {
    nume: NoteName;
    caracter: string;
}
