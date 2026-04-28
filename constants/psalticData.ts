export type PsalticSignTip = 'urcare' | 'coborare' | 'mentinere';
export type NoteName = 'Ni' | 'Pa' | 'Vu' | 'Ga' | 'Di' | 'Ke' | 'Zo';

export interface PsalticSign {
    id: string;
    nume: string;
    caracter: string;
    descriere: string;
    detalii?: string;
    tip: PsalticSignTip;
    valoare: number;
}

export interface NoteDefinition {
    nume: NoteName;
    caracter: string;
}

export const NOTE_DEFINITIONS: NoteDefinition[] = [
    { nume: 'Ni', caracter: '\uE2E0' },
    { nume: 'Pa', caracter: '\uE2E1' },
    { nume: 'Vu', caracter: '\uE2E2' },
    { nume: 'Ga', caracter: '\uE2E3' },
    { nume: 'Di', caracter: '\uE2E4' },
    { nume: 'Ke', caracter: '\uE2E5' },
    { nume: 'Zo', caracter: '\uE2E6' },
];

// --- TEMPORAL SIGNS ---

export interface TemporalSign {
    id: string;
    nume: string;
    caracter: string;
    category: 'augmentation' | 'division';
    batai: number; // Numărul de bătăi
    descriere: string;
    detalii?: string;
    codepoint: string;
    glyphName: string;
    affectedNeumes: number; // Câte semne afectează
    exampleFormula?: string; // Formula ritmică
}

export const TEMPORAL_SIGNS: TemporalSign[] = [
    // TEMPORAL AUGMENTATION (Prelungire)
    {
        id: 'klasma',
        nume: 'Klasma',
        caracter: '\uE0D0',
        category: 'augmentation',
        batai: 2,
        descriere: 'Prelungește durata semnului cu încă o bătaie.',
        detalii: 'Semnul pe care se așează clasma va dura două bătăi (timpi). Se scrie sub semnul vocalic.',
        codepoint: 'U+E0D0',
        glyphName: 'klasmaAbove',
        affectedNeumes: 1,
        exampleFormula: 'semn + clasma = 2 bătăi'
    },
    {
        id: 'apli',
        nume: 'Apli',
        caracter: '\uE0D2',
        category: 'augmentation',
        batai: 2,
        descriere: 'Are același efect ca și clasma (două bătăi).',
        detalii: 'Înlocuiește o clasă simplă. Nota durează 2 bătăi.',
        codepoint: 'U+E0D2',
        glyphName: 'apli',
        affectedNeumes: 1,
        exampleFormula: 'semn + apli = 2 bătăi'
    },
    {
        id: 'dipli',
        nume: 'Dipli',
        caracter: '\uE0D3',
        category: 'augmentation',
        batai: 3,
        descriere: 'Nota pe care se așează durează 3 bătăi.',
        detalii: 'Echivalează cu trei chronoi pe o notă.',
        codepoint: 'U+E0D3',
        glyphName: 'dipli',
        affectedNeumes: 1,
        exampleFormula: 'semn + dipli = 3 bătăi'
    },
    {
        id: 'tripli',
        nume: 'Tripli',
        caracter: '\uE0D4',
        category: 'augmentation',
        batai: 4,
        descriere: 'Nota pe care se așează durează 4 bătăi.',
        detalii: 'Echivalează cu patru chronoi pe o notă.',
        codepoint: 'U+E0D4',
        glyphName: 'tripli',
        affectedNeumes: 1,
        exampleFormula: 'semn + tripli = 4 bătăi'
    },
    // ARGON - Încetinire (special)
    {
        id: 'argon',
        nume: 'Argon',
        caracter: '\uE0FC',
        category: 'augmentation',
        batai: 2,
        descriere: 'Are efect de clasmă pentru semnul pe care se așează și de gorgon pentru semnele anterioare.',
        detalii: 'Se întâlnește în formula: semn vocalic + oligon (cu argon). Semnul anterior se ia împreună cu oligonul.',
        codepoint: 'U+E0FC',
        glyphName: 'argon',
        affectedNeumes: 2,
        exampleFormula: '* + oligon(argon) = 2 bătăi'
    },
    {
        id: 'diargon',
        nume: 'Diargon',
        caracter: '\uE0FD',
        category: 'augmentation',
        batai: 3,
        descriere: 'Întâlnit în aceeași formulă ritmică, are efect de dipli asupra oligonului.',
        detalii: 'Semn vocalic + oligon (cu diargon) = 3 bătăi.',
        codepoint: 'U+E0FD',
        glyphName: 'diargon',
        affectedNeumes: 2,
        exampleFormula: '* + oligon(diargon) = 3 bătăi'
    },
    // GORGON - Grăbire
    {
        id: 'gorgon',
        nume: 'Gorgon',
        caracter: '\uE0F0',
        category: 'division',
        batai: 0.5,
        descriere: 'Împarte timpul în două jumătăți.',
        detalii: 'Are efect asupra a DOUĂ semne: cel pe care se așează ȘI semnul DINAINTE. Se ia întotdeauna la ridicare de mână. Nu se așează niciodată pe petasti.',
        codepoint: 'U+E0F0',
        glyphName: 'gorgonAbove',
        affectedNeumes: 2,
        exampleFormula: 'semn1 + semn2(gorgon) = ambele într-o bătaie'
    },
    {
        id: 'digorgon',
        nume: 'Digorgon',
        caracter: '\uE0F4',
        category: 'division',
        batai: 0.333,
        descriere: 'Împarte timpul în trei părți egale.',
        detalii: 'Are efect asupra a TREI semne: cel pe care se așează, unul DINAINTE și unul DUPĂ. Toate trei se cântă într-o bătaie.',
        codepoint: 'U+E0F4',
        glyphName: 'digorgon',
        affectedNeumes: 3,
        exampleFormula: 'semn1 + semn2(digorgon) + semn3 = toate 3 într-o bătaie'
    },
    {
        id: 'trigorgon',
        nume: 'Trigorgon',
        caracter: '\uE0F8',
        category: 'division',
        batai: 0.25,
        descriere: 'Împarte timpul în patru părți egale.',
        detalii: 'Are efect asupra a PATRU semne: cel pe care se așează, unul DINAINTE și două DUPĂ. Toate patru se cântă într-o bătaie.',
        codepoint: 'U+E0F8',
        glyphName: 'trigorgon',
        affectedNeumes: 4,
        exampleFormula: 'semn1 + semn2(trigorgon) + semn3 + semn4 = toate 4 într-o bătaie'
    },
];

// --- TEMPO SIGNS (Agogi) ---

export interface TempoSign {
    id: string;
    nume: string;
    caracter: string;
    descriere: string;
}

export const TEMPO_SIGNS: TempoSign[] = [
    { id: 'poli_argos', nume: 'Poli Argos', caracter: '\uE120', descriere: 'Foarte lent' },
    { id: 'argoteros', nume: 'Argoteros', caracter: '\uE121', descriere: 'Mai lent' },
    { id: 'argos', nume: 'Argos', caracter: '\uE122', descriere: 'Lent' },
    { id: 'metria', nume: 'Metria', caracter: '\uE123', descriere: 'Moderat' },
    { id: 'mesis', nume: 'Mesis', caracter: '\uE124', descriere: 'Mediu' },
    { id: 'gorgos', nume: 'Gorgos', caracter: '\uE125', descriere: 'Rapid' },
    { id: 'gorgoteros', nume: 'Gorgoteros', caracter: '\uE126', descriere: 'Mai rapid' },
    { id: 'poli_gorgos', nume: 'Poli Gorgos', caracter: '\uE127', descriere: 'Foarte rapid' },
];

export const PSALTIC_SIGNS: PsalticSign[] = [
    {
        id: 'ison',
        nume: 'Ison',
        caracter: '𝁆',
        descriere: 'Nu urcă, nu coboară. Menține treapta curentă.',
        tip: 'mentinere',
        valoare: 0
    },
    {
        id: 'oligon',
        nume: 'Oligon',
        caracter: '𝁇',
        descriere: 'Urcă o treaptă neaccentuată.',
        detalii: 'De obicei pe o silabă consonantă.',
        tip: 'urcare',
        valoare: 1
    },
    {
        id: 'petaste',
        nume: 'Petaste',
        caracter: '𝁉',
        descriere: 'Urcă o treaptă accentuată.',
        detalii: 'Numai pe consoană.',
        tip: 'urcare',
        valoare: 1
    },
    {
        id: 'kentemata',
        nume: 'Kentemata',
        caracter: '𝁎',
        descriere: 'Urcă o treaptă neaccentuată, moale.',
        detalii: 'Se pune de obicei pe a doua silabă a unui cuvânt.',
        tip: 'urcare',
        valoare: 1
    },
    {
        id: 'oligon_kentimata_jos',
        nume: 'Oligon cu Kentemata dedesubt',
        caracter: '\uE082',
        descriere: 'Urcă 2 trepte consecutiv, neaccentuat.',
        tip: 'urcare',
        valoare: 2
    },
    {
        id: 'oligon_kentima_dreapta',
        nume: 'Oligon cu Kentima la dreapta',
        caracter: '\uE002',
        descriere: 'Urcă 2 trepte (prin salt).',
        detalii: 'Kentima este așezată la dreapta Oligonului.',
        tip: 'urcare',
        valoare: 2
    },
    {
        id: 'oligon_kentima_jos',
        nume: 'Oligon cu Kentima dedesubt',
        caracter: '\uE003',
        descriere: 'Urcă 2 trepte (prin salt).',
        detalii: 'Kentima este așezată dedesubtul Oligonului.',
        tip: 'urcare',
        valoare: 2
    },
    {
        id: 'oligon_kentima_sus',
        nume: 'Oligon cu Kentima deasupra',
        caracter: '\uE004',
        descriere: 'Urcă 3 trepte, neaccentuat.',
        tip: 'urcare',
        valoare: 3
    },
    {
        id: 'petasti_kentima_sus',
        nume: 'Petast cu Kentima deasupra',
        caracter: '\uE043',
        descriere: 'Urcă 3 trepte, accentuat.',
        tip: 'urcare',
        valoare: 3
    },
    {
        id: 'oligon_ypsili_dreapta',
        nume: 'Oligon peste Ypsili (dreapta)',
        caracter: '\uE005',
        descriere: 'Urcă 4 trepte, neaccentuat.',
        tip: 'urcare',
        valoare: 4
    },
    {
        id: 'petasti_ypsili_dreapta',
        nume: 'Petast peste Ypsili (dreapta)',
        caracter: '\uE044',
        descriere: 'Urcă 4 trepte, accentuat.',
        tip: 'urcare',
        valoare: 4
    },
    {
        id: 'oligon_ypsili_stanga',
        nume: 'Oligon cu Ypsili (stânga)',
        caracter: '\uE006',
        descriere: 'Urcă 5 trepte, neaccentuat.',
        tip: 'urcare',
        valoare: 5
    },
    {
        id: 'petasti_ypsili_stanga',
        nume: 'Petast cu Ypsili (stânga)',
        caracter: '\uE045',
        descriere: 'Urcă 5 trepte, accentuat.',
        tip: 'urcare',
        valoare: 5
    },
    {
        id: 'oligon_kentima_ypsili_6',
        nume: 'Oligon cu Kentima și Ypsili',
        caracter: '\uE007',
        descriere: 'Urcă 6 trepte, neaccentuat.',
        tip: 'urcare',
        valoare: 6
    },
    {
        id: 'petasti_kentima_ypsili_6',
        nume: 'Petast cu Kentima și Ypsili',
        caracter: '\uE046',
        descriere: 'Urcă 6 trepte, accentuat.',
        tip: 'urcare',
        valoare: 6
    },
    {
        id: 'oligon_kentima_ypsili_sus',
        nume: 'Oligon, Kentima și Ypsili (sus)',
        caracter: '\uE008',
        descriere: 'Urcă 7 trepte, neaccentuat.',
        tip: 'urcare',
        valoare: 7
    },
    {
        id: 'petasti_kentima_ypsili_sus',
        nume: 'Petast, Kentima și Ypsili (sus)',
        caracter: '\uE047',
        descriere: 'Urcă 7 trepte, accentuat.',
        tip: 'urcare',
        valoare: 7
    },
    {
        id: 'epistrof',
        nume: 'Epistrof',
        caracter: '𝁑',
        descriere: 'Coboară o treaptă.',
        tip: 'coborare',
        valoare: -1
    },
    {
        id: 'iporoi',
        nume: 'Iporoi',
        caracter: '𝁓',
        descriere: 'Coboară două trepte consecutiv.',
        tip: 'coborare',
        valoare: -2
    },
    {
        id: 'elafron_epistrof',
        nume: 'Elafron cu Epistrof',
        caracter: '\uE026',
        descriere: 'Coboară 3 trepte.',
        tip: 'coborare',
        valoare: -3
    },
    {
        id: 'elafron',
        nume: 'Elafron',
        caracter: '𝁕',
        descriere: 'Coboară două trepte prin salt.',
        tip: 'coborare',
        valoare: -2
    },
    {
        id: 'hamili_epistrof',
        nume: 'Hamili cu Epistrof',
        caracter: '\uE028',
        descriere: 'Coboară 5 trepte.',
        tip: 'coborare',
        valoare: -5
    },
    {
        id: 'hamili_elafron',
        nume: 'Hamili cu Elafron',
        caracter: '\uE029',
        descriere: 'Coboară 6 trepte.',
        tip: 'coborare',
        valoare: -6
    },
    {
        id: 'hamili_elafron_epistrof',
        nume: 'Hamili, Elafron și Epistrof',
        caracter: '\uE02A',
        descriere: 'Coboară 7 trepte.',
        tip: 'coborare',
        valoare: -7
    },
    {
        id: 'hamile',
        nume: 'Hamili',
        caracter: '𝁖',
        descriere: 'Coboară patru trepte prin salt.',
        tip: 'coborare',
        valoare: -4
    }
];
