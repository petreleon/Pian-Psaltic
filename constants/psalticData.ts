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
        id: 'apostrof',
        nume: 'Apostrof (Epistrof)',
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
        id: 'elafron_apostrof',
        nume: 'Elafron cu Apostrof',
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
        id: 'hamili_apostrof',
        nume: 'Hamili cu Apostrof',
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
        id: 'hamili_elafron_apostrof',
        nume: 'Hamili, Elafron și Apostrof',
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
