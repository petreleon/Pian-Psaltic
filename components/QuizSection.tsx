import React, { useState, useEffect, useRef } from 'react';
import { PSALTIC_SIGNS, NOTE_DEFINITIONS, PsalticSign, PsalticSignTip, NoteName } from '../constants/psalticData';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { NOTE_NAMES } from '../constants';

// Helper pentru amestecarea notelor
const shuffleNotes = (): NoteName[] => {
    const notes = [...NOTE_NAMES];
    for (let i = notes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [notes[i], notes[j]] = [notes[j], notes[i]];
    }
    return notes;
};

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

    const getNoteCharacter = (noteName: NoteName): string => {
        const noteDef = NOTE_DEFINITIONS.find(n => n.nume === noteName);
        return noteDef ? noteDef.caracter : noteName;
    };

    // Mod activ: 'signs' sau 'notes'
    const [quizMode, setQuizMode] = useState<'signs' | 'notes'>('signs');

    useEffect(() => {
        if (quizMode === 'signs') {
            generateNewSignQuestion();
        } else {
            generateNewNoteQuiz();
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

    const resetQuiz = () => {
        setScore(0);
        setTotalQuestions(0);
        if (quizMode === 'signs') {
            generateNewSignQuestion();
        } else {
            generateNewNoteQuiz();
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
            ) : (
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
            )}

            <p className="mt-8 text-stone-500 text-sm text-center italic">
                {quizMode === 'signs'
                    ? 'Sfat: Fiecare etapă corectă (direcție, trepte, notă) îți aduce un punct!'
                    : 'Sfat: Notele sunt Ni, Pa, Vu, Ga, Di, Ke, Zo - se schimbă aleatoriu la fiecare test!'
                }
            </p>
        </div>
    );
};
