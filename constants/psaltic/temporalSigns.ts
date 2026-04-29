import { TemporalSign } from './types';

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
        detalii: 'Întâlnit numai în formula: semn vocalic + oligon (cu argon). Oligonul prelungește la 2 bătăi (efect de clasmă), iar semnul dinainte se scurtează ca la gorgon.',
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
        descriere: 'Întâlnit în aceeași formulă ritmică ca argonul, are efect de dipli asupra oligonului.',
        detalii: 'Oligonul prelungește la 3 bătăi (efect de dipli). Același context ca argonul, dar cu durată triplă.',
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
