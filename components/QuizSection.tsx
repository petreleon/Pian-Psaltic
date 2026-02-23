import React, { useState, useEffect, useRef } from 'react';
import { PSALTIC_SIGNS, PsalticSign, PsalticSignTip } from '../constants/psalticData';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';

export const QuizSection: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState<PsalticSign | null>(null);
    const [score, setScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const topRef = useRef<HTMLDivElement>(null);
    const phase2Ref = useRef<HTMLDivElement>(null);

    // Phase 1
    const [directionSelected, setDirectionSelected] = useState<PsalticSignTip | null>(null);
    // Phase 2
    const [stepsSelected, setStepsSelected] = useState<number | null>(null);

    const generateNewQuestion = () => {
        const randomIndex = Math.floor(Math.random() * PSALTIC_SIGNS.length);
        setCurrentQuestion(PSALTIC_SIGNS[randomIndex]);
        setDirectionSelected(null);
        setStepsSelected(null);

        setTimeout(() => {
            if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 50);
    };

    useEffect(() => {
        generateNewQuestion();
    }, []);

    useEffect(() => {
        if (directionSelected !== null && phase2Ref.current) {
            setTimeout(() => {
                phase2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }, [directionSelected]);

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

    const resetQuiz = () => {
        setScore(0);
        setTotalQuestions(0);
        generateNewQuestion();
    };

    if (!currentQuestion) return null;

    return (
        <div ref={topRef} className="max-w-2xl w-full flex flex-col items-center animate-fade-in scroll-mt-24">
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

            <div className="w-full bg-stone-900/40 border border-stone-800 rounded-3xl p-10 flex flex-col items-center shadow-2xl relative overflow-hidden">
                {/* Background Decorative Element */}
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <span className="font-psaltica text-9xl">𝁆</span>
                </div>

                <div className="w-32 h-32 bg-black/60 rounded-2xl flex items-center justify-center border-2 border-stone-800 mb-10 shadow-inner group transition-all duration-500">
                    <span className="font-psaltica text-7xl text-yellow-400 animate-bounce-subtle cursor-default">
                        {currentQuestion.caracter}
                    </span>
                </div>

                <h3 className="text-stone-400 text-lg mb-6">1. Ce efect are acest semn?</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    {(['urcare', 'coborare', 'mentinere'] as PsalticSignTip[]).map((tip) => {
                        const isSelected = directionSelected === tip;
                        const isCorrect = currentQuestion.tip === tip;
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
                        <div className={`flex items-center gap-3 mb-8 ${currentQuestion.tip === directionSelected ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {currentQuestion.tip === directionSelected ? (
                                <>
                                    <CheckCircle2 size={24} />
                                    <span className="text-xl font-medium">Corect! Este {currentQuestion.nume}</span>
                                </>
                            ) : (
                                <>
                                    <XCircle size={24} />
                                    <span className="text-xl font-medium">Ups! Era {currentQuestion.tip === 'urcare' ? 'Urcare' : currentQuestion.tip === 'coborare' ? 'Coborâre' : 'Menținere'} ({currentQuestion.nume})</span>
                                </>
                            )}
                        </div>

                        {currentQuestion.valoare !== 0 ? (
                            <div className="w-full flex flex-col items-center border-t border-stone-800/50 pt-8">
                                <h3 className="text-stone-400 text-lg mb-6">
                                    2. Câte trepte {currentQuestion.tip === 'urcare' ? 'urcă' : 'coboară'}?
                                </h3>
                                <div className="flex flex-wrap justify-center gap-3 w-full max-w-lg mb-8">
                                    {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                                        const isSelected = stepsSelected === num;
                                        const correctSteps = Math.abs(currentQuestion.valoare);
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
                                        <div className={`flex items-center gap-3 mb-6 ${Math.abs(currentQuestion.valoare) === stepsSelected ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {Math.abs(currentQuestion.valoare) === stepsSelected ? (
                                                <>
                                                    <CheckCircle2 size={24} />
                                                    <span className="text-xl font-medium">Corect!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle size={24} />
                                                    <span className="text-xl font-medium">Incorect. Erau {Math.abs(currentQuestion.valoare)} trepte.</span>
                                                </>
                                            )}
                                        </div>
                                        <button
                                            onClick={generateNewQuestion}
                                            className="group flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-stone-950 px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-yellow-500/20"
                                        >
                                            Următorul semn
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={generateNewQuestion}
                                className="group flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-stone-950 px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-yellow-500/20 mt-4"
                            >
                                Următorul semn
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        )}
                    </div>
                )}
            </div>

            <p className="mt-8 text-stone-500 text-sm text-center italic">
                Sfat: Fiecare etapă corectă (direcție, trepte) îți aduce un punct vizualizat în Scor curent!
            </p>
        </div>
    );
};
