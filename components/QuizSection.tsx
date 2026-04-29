import React, { useState, useEffect, useRef } from 'react';
import { PSALTIC_SIGNS, NOTE_DEFINITIONS, TEMPORAL_SIGNS, TEMPO_SIGNS } from '../constants/psaltic';
import { PsalticSign, PsalticSignTip, NoteName, TemporalSign } from '../constants/psaltic/types';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { NOTE_NAMES } from '../constants/music';

// Helper pentru amestecarea notelor
const shuffleNotes = (): NoteName[] => {
    const notes = [...NOTE_NAMES];
    for (let i = notes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [notes[i], notes[j]] = [notes[j], notes[i]];
    }
    return notes;
};

interface TheoryQuestion {
    questionText: string;
    glyph?: string;
    choices: string[];
    correctIndex: number;
    explanation: string;
}

export const QuizSection: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState<PsalticSign | null>(null);
    const [startNote, setStartNote] = useState<NoteName | null>(null);
    const [score, setScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const topRef = useRef<HTMLDivElement>(null);
    const phase2Ref = useRef<HTMLDivElement>(null);
    const phase3Ref = useRef<HTMLDivElement>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    // Testul de semne (direcție + trepte + notă)
    const [directionSelected, setDirectionSelected] = useState<PsalticSignTip | null>(null);
    const [stepsSelected, setStepsSelected] = useState<number | null>(null);
    const [nextNoteSelected, setNextNoteSelected] = useState<NoteName | null>(null);
    const [nextNoteCorrect, setNextNoteCorrect] = useState<NoteName | null>(null);
    const [nextNoteShuffled, setNextNoteShuffled] = useState<NoteName[]>([]);

    // Testul de recunoaștere a notelor (mod separat)
    const [noteQuizNote, setNoteQuizNote] = useState<NoteName | null>(null);
    const [noteQuizSelected, setNoteQuizSelected] = useState<NoteName | null>(null);
    const [noteQuizShuffled, setNoteQuizShuffled] = useState<NoteName[]>([]);

    // Testul de durata (teorie temporala)
    const [theoryQuestion, setTheoryQuestion] = useState<TheoryQuestion | null>(null);
    const [theoryAnswerIndex, setTheoryAnswerIndex] = useState<number | null>(null);

    const calculateNextNote = (note: NoteName, jump: number): NoteName => {
        const startIndex = NOTE_NAMES.indexOf(note);
        let nextIndex = (startIndex + jump) % 7;
        if (nextIndex < 0) nextIndex += 7;
        return NOTE_NAMES[nextIndex];
    };

    const generateNewSignQuestion = () => {
        const randomIndex = Math.floor(Math.random() * PSALTIC_SIGNS.length);
        const sign = PSALTIC_SIGNS[randomIndex];
        setCurrentQuestion(sign);
        setDirectionSelected(null);
        setStepsSelected(null);
        setNextNoteSelected(null);

        // Alegem o notă de pornire aleatorie
        const randomStartNote = NOTE_NAMES[Math.floor(Math.random() * NOTE_NAMES.length)];
        setStartNote(randomStartNote);

        // Calculăm nota corectă în funcție de semn
        const correctNextNote = calculateNextNote(randomStartNote, sign.valoare);
        setNextNoteCorrect(correctNextNote);

        // Amestecăm butoanele pentru răspunsuri
        setNextNoteShuffled(shuffleNotes());

        setTimeout(() => {
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 50);
    };

    const generateNewNoteQuiz = () => {
        const shuffled = shuffleNotes();
        const randomNote = shuffled[Math.floor(Math.random() * NOTE_NAMES.length)];
        setNoteQuizNote(randomNote);
        setNoteQuizShuffled(shuffled);
        setNoteQuizSelected(null);

        setTimeout(() => {
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 50);
    };

    const shuffleArray = <T,>(arr: T[]): T[] => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    const generateTheoryQuestion = () => {
        setTheoryAnswerIndex(null);

        const templateRoll = Math.floor(Math.random() * 16);

        // Helper to get unique wrong choices
        const getWrongChoices = <T,>(pool: T[], correct: T, count: number, extract: (item: T) => string): string[] => {
            const others = pool.filter(item => extract(item) !== extract(correct));
            const shuffled = shuffleArray(others);
            return shuffled.slice(0, count).map(extract);
        };

        let question: TheoryQuestion;

        if (templateRoll < 8) {
            // --- Temporal Sign Templates ---
            const sign = TEMPORAL_SIGNS[Math.floor(Math.random() * TEMPORAL_SIGNS.length)];

            switch (templateRoll) {
                case 0: { // What does this sign do?
                    const wrongDescs = getWrongChoices(TEMPORAL_SIGNS, sign, 3, s => s.descriere);
                    const choices = shuffleArray([sign.descriere, ...wrongDescs]);
                    question = {
                        questionText: `Ce efect are semnul ${sign.nume}?`,
                        glyph: sign.caracter,
                        choices,
                        correctIndex: choices.indexOf(sign.descriere),
                        explanation: `${sign.nume}: ${sign.descriere} ${sign.detalii || ''}`,
                    };
                    break;
                }
                case 1: { // How many beats?
                    const correctBeats = sign.batai === 0.5 ? '½ bătaie' : sign.batai === 0.333 ? '⅓ bătaie' : sign.batai === 0.25 ? '¼ bătaie' : `${sign.batai} bătăi`;
                    const allBeats = [...new Set(TEMPORAL_SIGNS.map(s => s.batai === 0.5 ? '½ bătaie' : s.batai === 0.333 ? '⅓ bătaie' : s.batai === 0.25 ? '¼ bătaie' : `${s.batai} bătăi`))];
                    const wrongBeats = shuffleArray(allBeats.filter(b => b !== correctBeats)).slice(0, 3);
                    const choices = shuffleArray([correctBeats, ...wrongBeats]);
                    question = {
                        questionText: `Câte bătăi durează nota cu semnul ${sign.nume}?`,
                        glyph: sign.caracter,
                        choices,
                        correctIndex: choices.indexOf(correctBeats),
                        explanation: `${sign.nume} face ca nota să dureze ${correctBeats}.`,
                    };
                    break;
                }
                case 2: { // How many neumes affected?
                    const correctAffected = `${sign.affectedNeumes} semn${sign.affectedNeumes > 1 ? 'e' : ''}`;
                    const allAffected = [...new Set(TEMPORAL_SIGNS.map(s => `${s.affectedNeumes} semn${s.affectedNeumes > 1 ? 'e' : ''}`))];
                    const wrongAffected = shuffleArray(allAffected.filter(a => a !== correctAffected)).slice(0, 3);
                    const choices = shuffleArray([correctAffected, ...wrongAffected]);
                    question = {
                        questionText: `Câte semne afectează ${sign.nume}?`,
                        glyph: sign.caracter,
                        choices,
                        correctIndex: choices.indexOf(correctAffected),
                        explanation: `${sign.nume} afectează ${correctAffected}. ${sign.detalii || ''}`,
                    };
                    break;
                }
                case 3: { // Category
                    const correctCat = sign.category === 'augmentation' ? 'Prelungire (Augmentare)' : 'Grăbire (Diviziune)';
                    const wrongCat = sign.category === 'augmentation' ? 'Grăbire (Diviziune)' : 'Prelungire (Augmentare)';
                    const choices = shuffleArray([correctCat, wrongCat]);
                    question = {
                        questionText: `Din ce categorie face parte semnul ${sign.nume}?`,
                        glyph: sign.caracter,
                        choices,
                        correctIndex: choices.indexOf(correctCat),
                        explanation: `${sign.nume} este un semn de ${correctCat}.`,
                    };
                    break;
                }
                case 4: { // Formula
                    const correctFormula = sign.exampleFormula || '';
                    if (!correctFormula) {
                        // fallback to another template
                        return generateTheoryQuestion();
                    }
                    const formulas = TEMPORAL_SIGNS.filter(s => s.exampleFormula).map(s => s.exampleFormula!);
                    const wrongFormulas = shuffleArray(formulas.filter(f => f !== correctFormula)).slice(0, 3);
                    const choices = shuffleArray([correctFormula, ...wrongFormulas]);
                    question = {
                        questionText: `Care este formula ritmică pentru ${sign.nume}?`,
                        glyph: sign.caracter,
                        choices,
                        correctIndex: choices.indexOf(correctFormula),
                        explanation: `${sign.nume}: ${correctFormula}. ${sign.detalii || ''}`,
                    };
                    break;
                }
                case 5: { // Reverse by description
                    const choicesSigns = shuffleArray(TEMPORAL_SIGNS).slice(0, 4);
                    const correctIdx = choicesSigns.findIndex(s => s.id === sign.id);
                    question = {
                        questionText: `Găsește semnul care: ${sign.descriere}`,
                        choices: choicesSigns.map(s => s.caracter),
                        correctIndex: correctIdx,
                        explanation: `${sign.nume}: ${sign.descriere} (${sign.batai} bătăi, afectează ${sign.affectedNeumes} semne)`,
                    };
                    break;
                }
                case 6: { // Reverse by affected neumes
                    const candidates = TEMPORAL_SIGNS.filter(s => s.affectedNeumes === sign.affectedNeumes);
                    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
                    const choicesSigns = shuffleArray(TEMPORAL_SIGNS).slice(0, 4);
                    if (!choicesSigns.find(s => s.id === chosen.id)) {
                        choicesSigns[Math.floor(Math.random() * 4)] = chosen;
                    }
                    const cIdx = choicesSigns.findIndex(s => s.id === chosen.id);
                    question = {
                        questionText: `Găsește semnul care afectează ${chosen.affectedNeumes} semn${chosen.affectedNeumes > 1 ? 'e' : ''}:`,
                        choices: choicesSigns.map(s => s.caracter),
                        correctIndex: cIdx,
                        explanation: `${chosen.nume} afectează ${chosen.affectedNeumes} semne. ${chosen.detalii || ''}`,
                    };
                    break;
                }
                default: { // case 7: Reverse by beat count
                    const candidates2 = TEMPORAL_SIGNS.filter(s => s.batai === sign.batai);
                    const chosen2 = candidates2[Math.floor(Math.random() * candidates2.length)];
                    const beatLabel = chosen2.batai === 0.5 ? '½' : chosen2.batai === 0.333 ? '⅓' : chosen2.batai === 0.25 ? '¼' : `${chosen2.batai}`;
                    const choicesSigns = shuffleArray(TEMPORAL_SIGNS).slice(0, 4);
                    if (!choicesSigns.find(s => s.id === chosen2.id)) {
                        choicesSigns[Math.floor(Math.random() * 4)] = chosen2;
                    }
                    const cIdx = choicesSigns.findIndex(s => s.id === chosen2.id);
                    question = {
                        questionText: `Găsește semnul care face nota să dureze ${beatLabel} bătăi:`,
                        choices: choicesSigns.map(s => s.caracter),
                        correctIndex: cIdx,
                        explanation: `${chosen2.nume}: ${chosen2.descriere}`,
                    };
                    break;
                }
            }
        } else if (templateRoll < 11) {
            // --- Tempo Sign Templates ---
            const tempo = TEMPO_SIGNS[Math.floor(Math.random() * TEMPO_SIGNS.length)];

            if (templateRoll === 8) {
                const wrongDescs = getWrongChoices(TEMPO_SIGNS, tempo, 3, t => t.descriere);
                const choices = shuffleArray([tempo.descriere, ...wrongDescs]);
                question = {
                    questionText: `Ce indică semnul de tempo ${tempo.nume}?`,
                    glyph: tempo.caracter,
                    choices,
                    correctIndex: choices.indexOf(tempo.descriere),
                    explanation: `${tempo.nume} = ${tempo.descriere}.`,
                };
            } else if (templateRoll === 9) {
                const choicesTempos = shuffleArray(TEMPO_SIGNS).slice(0, 4);
                const cIdx = choicesTempos.findIndex(t => t.id === tempo.id);
                question = {
                    questionText: `Găsește semnul de tempo pentru: ${tempo.descriere}`,
                    choices: choicesTempos.map(t => t.caracter),
                    correctIndex: cIdx,
                    explanation: `${tempo.nume} = ${tempo.descriere}.`,
                };
            } else {
                const wrongDescs = getWrongChoices(TEMPO_SIGNS, tempo, 3, t => t.descriere);
                const choices = shuffleArray([tempo.descriere, ...wrongDescs]);
                question = {
                    questionText: `Ce înseamnă ${tempo.nume}?`,
                    choices,
                    correctIndex: choices.indexOf(tempo.descriere),
                    explanation: `${tempo.nume} = ${tempo.descriere}.`,
                };
            }
        } else {
            // --- Combination Rule Templates (fixed) ---
            switch (templateRoll) {
                case 11: {
                    question = {
                        questionText: 'Cum se combină Kentima cu alte semne?',
                        choices: shuffleArray([
                            'Nu apare niciodată singură. Urcă 2 trepte (sub/dreapta semnului de sprijin) sau 3 trepte (deasupra lui).',
                            'Se așează întotdeauna pe Oligon și urcă exact o treaptă.',
                            'Apare singură la început de piesă și indică 2 trepte.',
                            'Se combină doar cu Petasti pentru a urca 4 trepte.',
                        ]),
                        correctIndex: -1,
                        explanation: 'Kentima nu apare niciodată singură. Urcă 2 trepte când e sub sau la dreapta semnului de sprijin (Oligon/Petasti care devine mut) și 3 trepte când e deasupra lui.',
                    };
                    question.correctIndex = question.choices.indexOf(
                        'Nu apare niciodată singură. Urcă 2 trepte (sub/dreapta semnului de sprijin) sau 3 trepte (deasupra lui).'
                    );
                    break;
                }
                case 12: {
                    question = {
                        questionText: 'Ce se întâmplă când Kentemata sunt puse sub un Oligon?',
                        choices: shuffleArray([
                            'Oligonul devine "mut", iar Kentemata urcă o treaptă scurt (moale).',
                            'Oligonul își păstrează funcția și urcă 1 treaptă, Kentemata adaugă încă o treaptă.',
                            'Ambele semne devin mute și nu se cântă.',
                            'Rezultatul este întotdeauna 3 trepte ascendente.',
                        ]),
                        correctIndex: -1,
                        explanation: 'Când Kentemata sunt puse sub un Oligon, Oligonul devine "mut" și Kentemata urcă o treaptă scurt (moale).',
                    };
                    question.correctIndex = question.choices.indexOf(
                        'Oligonul devine "mut", iar Kentemata urcă o treaptă scurt (moale).'
                    );
                    break;
                }
                case 13: {
                    question = {
                        questionText: 'Ce este Isonul în muzica bizantină?',
                        choices: shuffleArray([
                            'Punctul de plecare sau de repaus (ison = egal). Menține treapta curentă.',
                            'Un semn care urcă o treaptă.',
                            'Un semn care coboară o treaptă.',
                            'Un semn temporal de prelungire.',
                        ]),
                        correctIndex: -1,
                        explanation: 'Isonul este punctul de plecare sau de repaus (ison = egal). Menține treapta curentă.',
                    };
                    question.correctIndex = question.choices.indexOf(
                        'Punctul de plecare sau de repaus (ison = egal). Menține treapta curentă.'
                    );
                    break;
                }
                case 14: {
                    question = {
                        questionText: 'Care este "regula de aur" a Gorgonului?',
                        choices: shuffleArray([
                            'Gorgonul afectează semnul pe care se așează ȘI semnul dinainte. Ambele se cântă într-o singură bătaie.',
                            'Gorgonul se așează pe fiecare notă pentru a dubla viteza.',
                            'Gorgonul afectează doar nota pe care se așează.',
                            'Gorgonul se aplică întregii piese și accelerează treptat tempoul.',
                        ]),
                        correctIndex: -1,
                        explanation: 'Regula de aur: Gorgonul afectează semnul pe care se așează și semnul dinainte, ambele cântându-se într-o singură bătaie. Nu se așează niciodată pe Petasti.',
                    };
                    question.correctIndex = question.choices.indexOf(
                        'Gorgonul afectează semnul pe care se așează ȘI semnul dinainte. Ambele se cântă într-o singură bătaie.'
                    );
                    break;
                }
                default: { // case 15
                    question = {
                        questionText: 'Care este efectul combinației Clasma + Gorgon?',
                        choices: shuffleArray([
                            'Prima notă = 1½ timpi, a doua (cu gorgon) = ½ timp. Total 2 timpi.',
                            'Ambele note durează 1 timp fiecare.',
                            'Prima notă durează ½ timp, a doua 1½ timpi.',
                            'Clasma anulează efectul Gorgonului; ambele durează 2 timpi.',
                        ]),
                        correctIndex: -1,
                        explanation: 'Clasma + Gorgon: Clasma cere 2 timpi, gorgonul împarte timpul. Rezultat: prima notă = 1½ timpi, a doua = ½ timp.',
                    };
                    question.correctIndex = question.choices.indexOf(
                        'Prima notă = 1½ timpi, a doua (cu gorgon) = ½ timp. Total 2 timpi.'
                    );
                    break;
                }
            }
        }

        setTheoryQuestion(question);
        setTimeout(() => {
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 50);
    };

    const getNoteCharacter = (noteName: NoteName): string => {
        const noteDef = NOTE_DEFINITIONS.find(n => n.nume === noteName);
        return noteDef ? noteDef.caracter : noteName;
    };

    // Mod activ: 'signs' sau 'notes'
    const [quizMode, setQuizMode] = useState<'signs' | 'notes' | 'theory'>('signs');

    useEffect(() => {
        if (quizMode === 'signs') {
            generateNewSignQuestion();
        } else if (quizMode === 'notes') {
            generateNewNoteQuiz();
        } else {
            generateTheoryQuestion();
        }
    }, [quizMode]);

    useEffect(() => {
        if (directionSelected !== null && phase2Ref.current) {
            setTimeout(() => {
                phase2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }, [directionSelected]);

    useEffect(() => {
        if (stepsSelected !== null && phase3Ref.current) {
            setTimeout(() => {
                phase3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }, [stepsSelected]);

    useEffect(() => {
        if ((nextNoteSelected !== null || noteQuizSelected !== null) && resultRef.current) {
            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }, [nextNoteSelected, noteQuizSelected]);

    const handleDirection = (tip: PsalticSignTip) => {
        if (directionSelected) return;

        setDirectionSelected(tip);
        if (currentQuestion?.tip === tip) {
            setScore(s => s + 1);
        }
        setTotalQuestions(t => t + 1);
    };

    const handleSteps = (steps: number) => {
        if (stepsSelected) return;

        setStepsSelected(steps);
        if (Math.abs(currentQuestion?.valoare || 0) === steps) {
            setScore(s => s + 1);
        }
        setTotalQuestions(t => t + 1);
    };

    const handleNoteSelection = (note: NoteName) => {
        if (noteQuizSelected) return;
        setNoteQuizSelected(note);
        if (note === noteQuizNote) {
            setScore(s => s + 1);
        }
        setTotalQuestions(t => t + 1);
    };

    const handleNextNoteSelection = (note: NoteName) => {
        if (nextNoteSelected) return;
        setNextNoteSelected(note);
        if (note === nextNoteCorrect) {
            setScore(s => s + 1);
        }
        setTotalQuestions(t => t + 1);
    };

    const handleTheoryAnswer = (choiceIndex: number) => {
        if (theoryAnswerIndex !== null) return;
        setTheoryAnswerIndex(choiceIndex);
        if (choiceIndex === theoryQuestion?.correctIndex) {
            setScore(s => s + 1);
        }
        setTotalQuestions(t => t + 1);
    };

    const resetQuiz = () => {
        setScore(0);
        setTotalQuestions(0);
        if (quizMode === 'signs') {
            generateNewSignQuestion();
        } else if (quizMode === 'notes') {
            generateNewNoteQuiz();
        } else {
            generateTheoryQuestion();
        }
    };

    return (
        <div ref={topRef} className="max-w-2xl w-full flex flex-col items-center animate-fade-in scroll-mt-24">
            {/* Selector de mod */}
            <div className="w-full flex gap-2 mb-6">
                <button
                    onClick={() => setQuizMode('signs')}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                        quizMode === 'signs'
                            ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                            : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:border-stone-700'
                    }`}
                >
                    Test de Semne
                </button>
                <button
                    onClick={() => setQuizMode('notes')}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                        quizMode === 'notes'
                            ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                            : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:border-stone-700'
                    }`}
                >
                    Test de Note
                </button>
                <button
                    onClick={() => setQuizMode('theory')}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                        quizMode === 'theory'
                            ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                            : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:border-stone-700'
                    }`}
                >
                    Test de Durată
                </button>
            </div>

            <div className="w-full flex justify-between items-center mb-10 px-6 py-4 bg-black/20 border border-stone-800 rounded-2xl">
                <div className="flex flex-col">
                    <span className="text-stone-500 text-xs uppercase tracking-widest font-bold">Scor curent</span>
                    <span className="text-2xl font-byzantine text-yellow-500">{score} / {totalQuestions}</span>
                </div>
                <button
                    onClick={resetQuiz}
                    className="p-2 text-stone-500 hover:text-stone-300 transition-colors"
                    title="Resetează Quiz"
                >
                    <RotateCcw size={20} />
                </button>
            </div>

            {quizMode === 'signs' ? (
                <div className="w-full bg-stone-900/40 border border-stone-800 rounded-3xl p-10 flex flex-col items-center shadow-2xl relative overflow-hidden">
                    {/* Background Decorative Element */}
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                        <span className="font-psaltica text-9xl">𝁆</span>
                    </div>

                    <div className="w-32 h-32 bg-black/60 rounded-2xl flex items-center justify-center border-2 border-stone-800 mb-10 shadow-inner group transition-all duration-500">
                        <span className="font-psaltica text-7xl text-yellow-400 animate-bounce-subtle cursor-default">
                            {currentQuestion?.caracter}
                        </span>
                    </div>

                    <h3 className="text-stone-400 text-lg mb-6">1. Ce efect are acest semn?</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                        {(['urcare', 'coborare', 'mentinere'] as PsalticSignTip[]).map((tip) => {
                            const isSelected = directionSelected === tip;
                            const isCorrect = currentQuestion?.tip === tip;
                            let buttonClass = "py-4 px-6 rounded-xl border-2 transition-all font-medium text-lg ";

                            if (!directionSelected) {
                                buttonClass += "border-stone-800 bg-stone-900/50 text-stone-300 hover:border-yellow-500/50 hover:bg-stone-800";
                            } else if (isCorrect) {
                                buttonClass += "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
                            } else if (isSelected && !isCorrect) {
                                buttonClass += "border-rose-500/50 bg-rose-500/10 text-rose-400 opacity-80";
                            } else {
                                buttonClass += "border-stone-800 bg-stone-900/20 text-stone-600 opacity-50";
                            }

                            return (
                                <button
                                    key={tip}
                                    onClick={() => handleDirection(tip)}
                                    disabled={directionSelected !== null}
                                    className={buttonClass}
                                >
                                    {tip === 'urcare' ? 'Urcare' : tip === 'coborare' ? 'Coborâre' : 'Menținere'}
                                </button>
                            );
                        })}
                    </div>

                    {directionSelected && (
                        <div ref={phase2Ref} className="mt-8 flex flex-col items-center animate-in slide-in-from-top-4 duration-300 w-full relative z-10 scroll-mt-32">
                            <div className={`flex items-center gap-3 mb-8 ${currentQuestion?.tip === directionSelected ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {currentQuestion?.tip === directionSelected ? (
                                    <>
                                        <CheckCircle2 size={24} />
                                        <span className="text-xl font-medium">Corect! Este {currentQuestion?.nume}</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle size={24} />
                                        <span className="text-xl font-medium">Ups! Era {currentQuestion?.tip === 'urcare' ? 'Urcare' : currentQuestion?.tip === 'coborare' ? 'Coborâre' : 'Menținere'} ({currentQuestion?.nume})</span>
                                    </>
                                )}
                            </div>

                            {currentQuestion?.valoare !== 0 ? (
                                <div className="w-full flex flex-col items-center border-t border-stone-800/50 pt-8">
                                    <h3 className="text-stone-400 text-lg mb-6">
                                        2. Câte trepte {currentQuestion?.tip === 'urcare' ? 'urcă' : 'coboară'}?
                                    </h3>
                                    <div className="flex flex-wrap justify-center gap-3 w-full max-w-lg mb-8">
                                        {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                                            const isSelected = stepsSelected === num;
                                            const correctSteps = Math.abs(currentQuestion?.valoare || 0);
                                            const isCorrect = correctSteps === num;
                                            let btnClass = "w-14 h-14 rounded-xl border-2 transition-all font-bold text-xl flex items-center justify-center ";

                                            if (!stepsSelected) {
                                                btnClass += "border-stone-800 bg-stone-900/50 text-stone-300 hover:border-yellow-500/50 hover:bg-stone-800";
                                            } else if (isCorrect) {
                                                btnClass += "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
                                            } else if (isSelected && !isCorrect) {
                                                btnClass += "border-rose-500/50 bg-rose-500/10 text-rose-400 opacity-80";
                                            } else {
                                                btnClass += "border-stone-800 bg-stone-900/20 text-stone-600 opacity-50";
                                            }

                                            return (
                                                <button
                                                    key={num}
                                                    onClick={() => handleSteps(num)}
                                                    disabled={stepsSelected !== null}
                                                    className={btnClass}
                                                >
                                                    {num}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {stepsSelected && (
                                        <div className="flex flex-col items-center animate-in slide-in-from-top-4 duration-300 w-full mb-2">
                                            <div className={`flex items-center gap-3 mb-6 ${Math.abs(currentQuestion?.valoare || 0) === stepsSelected ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {Math.abs(currentQuestion?.valoare || 0) === stepsSelected ? (
                                                    <>
                                                        <CheckCircle2 size={24} />
                                                        <span className="text-xl font-medium">Corect!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle size={24} />
                                                        <span className="text-xl font-medium">Incorect. Erau {Math.abs(currentQuestion?.valoare || 0)} trepte.</span>
                                                    </>
                                                )}
                                            </div>

                                            {/* Faza 3: Ce notă urmează? */}
                                            <div ref={phase3Ref} className="w-full flex flex-col items-center border-t border-stone-800/50 pt-8 mt-4 scroll-mt-32">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-stone-500 text-[10px] uppercase font-bold mb-1">Pornim de la</span>
                                                        <div className="w-12 h-12 bg-black/40 rounded-lg flex items-center justify-center border border-stone-800">
                                                            <span className="text-xl font-bold text-stone-300">{startNote}</span>
                                                        </div>
                                                    </div>
                                                    <ArrowRight size={16} className="text-stone-700 mt-4" />
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-stone-500 text-[10px] uppercase font-bold mb-1">Semn</span>
                                                        <div className="w-20 h-20 bg-black/60 rounded-xl flex items-center justify-center border border-stone-800 shadow-inner">
                                                            <span className="font-psaltica text-5xl text-yellow-400">
                                                                {currentQuestion?.caracter}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h3 className="text-stone-400 text-lg mb-6">3. Ce notă urmează după acest semn?</h3>
                                                <div className="flex flex-wrap justify-center gap-3 w-full max-w-xl mb-8">
                                                    {nextNoteShuffled.map((note) => {
                                                        const isSelected = nextNoteSelected === note;
                                                        const isCorrect = note === nextNoteCorrect;
                                                        let btnClass = "w-14 h-14 rounded-xl border-2 transition-all font-bold text-xl flex items-center justify-center ";

                                                        if (!nextNoteSelected) {
                                                            btnClass += "border-stone-800 bg-stone-900/50 text-stone-300 hover:border-yellow-500/50 hover:bg-stone-800";
                                                        } else if (isCorrect) {
                                                            btnClass += "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
                                                        } else if (isSelected && !isCorrect) {
                                                            btnClass += "border-rose-500/50 bg-rose-500/10 text-rose-400 opacity-80";
                                                        } else {
                                                            btnClass += "border-stone-800 bg-stone-900/20 text-stone-600 opacity-50";
                                                        }

                                                        return (
                                                            <button
                                                                key={note}
                                                                onClick={() => handleNextNoteSelection(note)}
                                                                disabled={nextNoteSelected !== null}
                                                                className={btnClass}
                                                            >
                                                                {note}
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                                {nextNoteSelected && (
                                                    <div ref={resultRef} className="flex flex-col items-center animate-in slide-in-from-top-4 duration-300 w-full scroll-mt-32">
                                                        <div className={`flex items-center gap-3 mb-6 ${nextNoteSelected === nextNoteCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                            {nextNoteSelected === nextNoteCorrect ? (
                                                                <>
                                                                    <CheckCircle2 size={24} />
                                                                    <span className="text-xl font-medium">Corect! Nota este {nextNoteCorrect}</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <XCircle size={24} />
                                                                    <span className="text-xl font-medium">Incorect. Nota era {nextNoteCorrect}.</span>
                                                                </>
                                                            )}
                                                        </div>
                                                        <button
                                                            onClick={generateNewSignQuestion}
                                                            className="group flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-stone-950 px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-yellow-500/20"
                                                        >
                                                            Următorul semn
                                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div ref={phase3Ref} className="w-full flex flex-col items-center border-t border-stone-800/50 pt-8 mt-4 scroll-mt-32">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex flex-col items-center">
                                            <span className="text-stone-500 text-[10px] uppercase font-bold mb-1">Pornim de la</span>
                                            <div className="w-12 h-12 bg-black/40 rounded-lg flex items-center justify-center border border-stone-800">
                                                <span className="text-xl font-bold text-stone-300">{startNote}</span>
                                            </div>
                                        </div>
                                        <ArrowRight size={16} className="text-stone-700 mt-4" />
                                        <div className="flex flex-col items-center">
                                            <span className="text-stone-500 text-[10px] uppercase font-bold mb-1">Semn</span>
                                            <div className="w-20 h-20 bg-black/60 rounded-xl flex items-center justify-center border border-stone-800 shadow-inner">
                                                <span className="font-psaltica text-5xl text-yellow-400">
                                                    {currentQuestion?.caracter}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-stone-400 text-lg mb-6">2. Ce notă urmează după acest semn?</h3>
                                    <div className="flex flex-wrap justify-center gap-3 w-full max-w-xl mb-8">
                                        {nextNoteShuffled.map((note) => {
                                            const isSelected = nextNoteSelected === note;
                                            const isCorrect = note === nextNoteCorrect;
                                            let btnClass = "w-14 h-14 rounded-xl border-2 transition-all font-bold text-xl flex items-center justify-center ";

                                            if (!nextNoteSelected) {
                                                btnClass += "border-stone-800 bg-stone-900/50 text-stone-300 hover:border-yellow-500/50 hover:bg-stone-800";
                                            } else if (isCorrect) {
                                                btnClass += "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
                                            } else if (isSelected && !isCorrect) {
                                                btnClass += "border-rose-500/50 bg-rose-500/10 text-rose-400 opacity-80";
                                            } else {
                                                btnClass += "border-stone-800 bg-stone-900/20 text-stone-600 opacity-50";
                                            }

                                            return (
                                                <button
                                                    key={note}
                                                    onClick={() => handleNextNoteSelection(note)}
                                                    disabled={nextNoteSelected !== null}
                                                    className={btnClass}
                                                >
                                                    {note}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {nextNoteSelected && (
                                        <div ref={resultRef} className="flex flex-col items-center animate-in slide-in-from-top-4 duration-300 w-full scroll-mt-32">
                                            <div className={`flex items-center gap-3 mb-6 ${nextNoteSelected === nextNoteCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {nextNoteSelected === nextNoteCorrect ? (
                                                    <>
                                                        <CheckCircle2 size={24} />
                                                        <span className="text-xl font-medium">Corect! Nota este {nextNoteCorrect}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle size={24} />
                                                        <span className="text-xl font-medium">Incorect. Nota era {nextNoteCorrect}.</span>
                                                    </>
                                                )}
                                            </div>
                                            <button
                                                onClick={generateNewSignQuestion}
                                                className="group flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-stone-950 px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-yellow-500/20"
                                            >
                                                Următorul semn
                                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : quizMode === 'notes' ? (
                <div className="w-full bg-stone-900/40 border border-stone-800 rounded-3xl p-10 flex flex-col items-center shadow-2xl relative overflow-hidden">
                    {/* Background Decorative Element */}
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                        <span className="font-psaltica text-9xl">𝁆</span>
                    </div>

                    <div className="w-32 h-32 bg-black/60 rounded-2xl flex items-center justify-center border-2 border-stone-800 mb-10 shadow-inner group transition-all duration-500">
                        <span className="font-psaltica text-7xl text-yellow-400 animate-bounce-subtle cursor-default">
                            {noteQuizNote ? getNoteCharacter(noteQuizNote) : ''}
                        </span>
                    </div>

                    <h3 className="text-stone-400 text-lg mb-6">Ce notă este aceasta?</h3>

                    <div className="flex flex-wrap justify-center gap-3 w-full max-w-xl">
                        {noteQuizShuffled.map((note) => {
                            const isSelected = noteQuizSelected === note;
                            const isCorrect = note === noteQuizNote;
                            let btnClass = "w-14 h-14 rounded-xl border-2 transition-all font-bold text-xl flex items-center justify-center ";

                            if (!noteQuizSelected) {
                                btnClass += "border-stone-800 bg-stone-900/50 text-stone-300 hover:border-yellow-500/50 hover:bg-stone-800";
                            } else if (isCorrect) {
                                btnClass += "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
                            } else if (isSelected && !isCorrect) {
                                btnClass += "border-rose-500/50 bg-rose-500/10 text-rose-400 opacity-80";
                            } else {
                                btnClass += "border-stone-800 bg-stone-900/20 text-stone-600 opacity-50";
                            }

                            return (
                                <button
                                    key={note}
                                    onClick={() => handleNoteSelection(note)}
                                    disabled={noteQuizSelected !== null}
                                    className={btnClass}
                                >
                                    {note}
                                </button>
                            );
                        })}
                    </div>

                    {noteQuizSelected && (
                        <div className="flex flex-col items-center animate-in slide-in-from-top-4 duration-300 w-full mt-8">
                            <div className={`flex items-center gap-3 mb-6 ${noteQuizSelected === noteQuizNote ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {noteQuizSelected === noteQuizNote ? (
                                    <>
                                        <CheckCircle2 size={24} />
                                        <span className="text-xl font-medium">Corect!</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle size={24} />
                                        <span className="text-xl font-medium">Incorect. Era {noteQuizNote}.</span>
                                    </>
                                )}
                            </div>
                            <button
                                onClick={generateNewNoteQuiz}
                                className="group flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-stone-950 px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-yellow-500/20"
                            >
                                Următoarea notă
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="w-full bg-stone-900/40 border border-stone-800 rounded-3xl p-10 flex flex-col items-center shadow-2xl relative overflow-hidden">
                    {/* Background Decorative Element */}
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                        <span className="font-psaltica text-9xl">𝁆</span>
                    </div>

                    {theoryQuestion?.glyph && (
                        <div className="w-32 h-32 bg-black/60 rounded-2xl flex items-center justify-center border-2 border-stone-800 mb-8 shadow-inner group transition-all duration-500">
                            <span className="font-psaltica text-7xl text-yellow-400 animate-bounce-subtle cursor-default">
                                {theoryQuestion.glyph}
                            </span>
                        </div>
                    )}

                    <h3 className="text-stone-400 text-lg mb-6 text-center max-w-lg">{theoryQuestion?.questionText}</h3>

                    <div className="flex flex-col gap-3 w-full max-w-xl">
                        {theoryQuestion?.choices.map((choice, idx) => {
                            const isSelected = theoryAnswerIndex === idx;
                            const isCorrect = idx === theoryQuestion.correctIndex;
                            let btnClass = "py-4 px-6 rounded-xl border-2 transition-all font-medium text-left ";

                            if (theoryAnswerIndex === null) {
                                btnClass += "border-stone-800 bg-stone-900/50 text-stone-300 hover:border-yellow-500/50 hover:bg-stone-800";
                            } else if (isCorrect) {
                                btnClass += "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
                            } else if (isSelected && !isCorrect) {
                                btnClass += "border-rose-500/50 bg-rose-500/10 text-rose-400 opacity-80";
                            } else {
                                btnClass += "border-stone-800 bg-stone-900/20 text-stone-600 opacity-50";
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleTheoryAnswer(idx)}
                                    disabled={theoryAnswerIndex !== null}
                                    className={btnClass}
                                >
                                    {choice.length === 1 && choice.charCodeAt(0) >= 0xe000 ? (
                                        <span className="font-psaltica text-3xl">{choice}</span>
                                    ) : (
                                        choice
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {theoryAnswerIndex !== null && (
                        <div className="flex flex-col items-center animate-in slide-in-from-top-4 duration-300 w-full mt-8">
                            <div className={`flex items-center gap-3 mb-4 ${theoryAnswerIndex === theoryQuestion?.correctIndex ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {theoryAnswerIndex === theoryQuestion?.correctIndex ? (
                                    <>
                                        <CheckCircle2 size={24} />
                                        <span className="text-xl font-medium">Corect!</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle size={24} />
                                        <span className="text-xl font-medium">Incorect.</span>
                                    </>
                                )}
                            </div>
                            {theoryQuestion?.explanation && (
                                <p className="text-stone-400 text-sm text-center max-w-lg mb-6 bg-stone-950/50 rounded-xl p-4 border border-stone-800">
                                    {theoryQuestion.explanation}
                                </p>
                            )}
                            <button
                                onClick={generateTheoryQuestion}
                                className="group flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-stone-950 px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-yellow-500/20"
                            >
                                Următoarea întrebare
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>
            )}

            <p className="mt-8 text-stone-500 text-sm text-center italic">
                {quizMode === 'signs'
                    ? 'Sfat: Fiecare etapă corectă (direcție, trepte, notă) îți aduce un punct!'
                    : quizMode === 'notes'
                    ? 'Sfat: Notele sunt Ni, Pa, Vu, Ga, Di, Ke, Zo - se schimbă aleatoriu la fiecare test!'
                    : 'Sfat: Testul acoperă semne temporale, semne de tempo și reguli de combinație!'
                }
            </p>
        </div>
    );
};
