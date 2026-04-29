import React from 'react';
import { PSALTIC_SIGNS, TEMPORAL_SIGNS, TEMPO_SIGNS } from '../constants/psaltic';
import { ChevronUp, ChevronDown, Minus, Clock, Zap, Hourglass } from 'lucide-react';

export const TheorySection: React.FC = () => {
    const getTipIcon = (tip: string) => {
        switch (tip) {
            case 'urcare': return <ChevronUp className="text-emerald-500" size={16} />;
            case 'coborare': return <ChevronDown className="text-rose-500" size={16} />;
            default: return <Minus className="text-sky-500" size={16} />;
        }
    };

    const getTipLabel = (tip: string) => {
        switch (tip) {
            case 'urcare': return 'Urcare';
            case 'coborare': return 'Coborâre';
            default: return 'Menținere';
        }
    };

    return (
        <div className="max-w-5xl w-full animate-fade-in pb-12">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-byzantine text-yellow-500 mb-4">Teoria Semnelor Psaltice</h2>
                <p className="text-stone-400 max-w-2xl mx-auto">
                    Muzica bizantină folosește semne descriptive pentru a indica intervalele melodice.
                    Spre deosebire de notația liniară, aici fiecare semn indică o schimbare față de nota precedentă.
                </p>
            </div>

            {/* Tablou General Section */}
            <div className="mb-16 bg-stone-900/40 border border-stone-800 rounded-2xl p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <span className="font-psaltica text-9xl">𝁆</span>
                </div>

                <h3 className="text-xl font-byzantine text-center text-yellow-500/90 mb-8 border-b border-stone-800 pb-4">
                    Tabloul general al semnelor vocalice
                </h3>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 lg:px-8">
                    {/* Descendente */}
                    <div className="flex-1 w-full space-y-4">
                        <h4 className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-6 border-l-2 border-rose-500 pl-3">Descendente</h4>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between group">
                                <span className="text-stone-400 text-sm flex items-center gap-3">
                                    <span className="font-psaltica text-2xl text-yellow-500/80">𝁑</span>
                                    Epistrof
                                </span>
                                <span className="text-stone-500 text-xs font-medium">- 1 treaptă</span>
                            </div>
                            <div className="flex items-center justify-between group">
                                <span className="text-stone-400 text-sm flex items-center gap-3">
                                    <span className="font-psaltica text-2xl text-yellow-500/80">𝁓</span>
                                    Iporoi
                                </span>
                                <span className="text-stone-500 text-xs font-medium">- 2 trepte consecutiv</span>
                            </div>
                            <div className="flex items-center justify-between group">
                                <span className="text-stone-400 text-sm flex items-center gap-3">
                                    <span className="font-psaltica text-2xl text-yellow-500/80">𝁕</span>
                                    Elafron
                                </span>
                                <span className="text-stone-500 text-xs font-medium">- 2 trepte prin salt</span>
                            </div>
                            <div className="flex items-center justify-between group">
                                <span className="text-stone-400 text-sm flex items-center gap-3">
                                    <span className="font-psaltica text-2xl text-yellow-500/80">{'\uE026'}</span>
                                </span>
                                <span className="text-stone-500 text-xs font-medium">- 3 trepte</span>
                            </div>
                            <div className="flex items-center justify-between group border-b border-stone-800/50 pb-2">
                                <span className="text-stone-400 text-sm flex items-center gap-3">
                                    <span className="font-psaltica text-2xl text-yellow-500/80">𝁖</span>
                                    Hamili
                                </span>
                                <span className="text-stone-500 text-xs font-medium">- 4 trepte</span>
                            </div>
                            <div className="flex items-center justify-between group">
                                <span className="text-stone-400 text-sm flex items-center gap-3">
                                    <span className="font-psaltica text-2xl text-yellow-500/80">{'\uE028'}</span>
                                </span>
                                <span className="text-stone-500 text-xs font-medium">- 5 trepte</span>
                            </div>
                            <div className="flex items-center justify-between group">
                                <span className="text-stone-400 text-sm flex items-center gap-3">
                                    <span className="font-psaltica text-2xl text-yellow-500/80">{'\uE029'}</span>
                                </span>
                                <span className="text-stone-500 text-xs font-medium">- 6 trepte</span>
                            </div>
                            <div className="flex items-center justify-between group">
                                <span className="text-stone-400 text-sm flex items-center gap-3">
                                    <span className="font-psaltica text-2xl text-yellow-500/80">{'\uE02A'}</span>
                                </span>
                                <span className="text-stone-500 text-xs font-medium">- 7 trepte</span>
                            </div>
                        </div>
                    </div>

                    {/* Ison (Center) */}
                    <div className="flex flex-col items-center px-8 border-x border-stone-800/50 py-4">
                        <span className="font-psaltica text-6xl text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">𝁆</span>
                        <span className="text-yellow-500 font-bold mt-2">Ison</span>
                        <span className="text-stone-500 text-[10px] uppercase tracking-tighter mt-1 italic">Egalitate (0)</span>
                    </div>

                    {/* Ascendente */}
                    <div className="flex-1 w-full space-y-4">
                        <h4 className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-6 border-r-2 border-emerald-500 pr-3 text-right">Ascendente</h4>

                        <div className="space-y-3">
                            {/* 1 treaptă */}
                            <div className="flex flex-col gap-1 border-b border-stone-800/50 pb-2">
                                <div className="flex items-center justify-between group text-right">
                                    <span className="text-stone-500 text-xs font-medium">+ 1 treaptă neaccentuată</span>
                                    <span className="text-stone-400 text-sm flex items-center justify-end gap-3">
                                        <span className="font-psaltica text-2xl text-yellow-500/80">𝁇</span>
                                    </span>
                                </div>
                                <div className="flex items-center justify-between group text-right">
                                    <span className="text-stone-500 text-xs font-medium">+ 1 treaptă accentuată</span>
                                    <span className="text-stone-400 text-sm flex items-center justify-end gap-3">
                                        <span className="font-psaltica text-2xl text-yellow-500/80">𝁉</span>
                                    </span>
                                </div>
                                <div className="flex items-center justify-between group text-right">
                                    <span className="text-stone-500 text-xs font-medium">+ 1 treaptă moale</span>
                                    <span className="text-stone-400 text-sm flex items-center justify-end gap-3">
                                        <span className="font-psaltica text-2xl text-yellow-500/80">𝁎</span>
                                    </span>
                                </div>
                            </div>

                            {/* 2 trepte */}
                            <div className="flex flex-col gap-1 border-b border-stone-800/50 pb-2">
                                <div className="flex items-center justify-between group text-right">
                                    <span className="text-stone-500 text-xs font-medium">+ 2 trepte (consecutiv)</span>
                                    <span className="text-stone-400 text-sm flex items-center justify-end gap-3">
                                        <span className="font-psaltica text-2xl text-yellow-500/80">{'\uE082'}</span>
                                    </span>
                                </div>
                                <div className="flex items-center justify-between group text-right">
                                    <span className="text-stone-500 text-xs font-medium">+ 2 trepte (prin salt - dreapta)</span>
                                    <span className="text-stone-400 text-sm flex items-center justify-end gap-3">
                                        <span className="font-psaltica text-2xl text-yellow-500/80">{'\uE002'}</span>
                                    </span>
                                </div>
                                <div className="flex items-center justify-between group text-right">
                                    <span className="text-stone-500 text-xs font-medium">+ 2 trepte (prin salt - jos)</span>
                                    <span className="text-stone-400 text-sm flex items-center justify-end gap-3">
                                        <span className="font-psaltica text-2xl text-yellow-500/80">{'\uE003'}</span>
                                    </span>
                                </div>
                            </div>

                            {/* 3 trepte */}
                            <div className="flex flex-col gap-1 border-b border-stone-800/50 pb-2">
                                <div className="flex items-center justify-between group text-right">
                                    <span className="text-stone-500 text-xs font-medium">+ 3 trepte (neaccentuat)</span>
                                    <span className="text-stone-400 text-sm flex items-center justify-end gap-3">
                                        <span className="font-psaltica text-2xl text-yellow-500/80">{'\uE004'}</span>
                                    </span>
                                </div>
                                <div className="flex items-center justify-between group text-right">
                                    <span className="text-stone-500 text-xs font-medium">+ 3 trepte (accentuat)</span>
                                    <span className="text-stone-400 text-sm flex items-center justify-end gap-3">
                                        <span className="font-psaltica text-2xl text-yellow-500/80">{'\uE043'}</span>
                                    </span>
                                </div>
                            </div>

                            {/* 4 trepte */}
                            <div className="flex flex-col gap-1 border-b border-stone-800/50 pb-2">
                                <div className="flex items-center justify-between group text-right">
                                    <span className="text-stone-500 text-xs font-medium">+ 4 trepte (neaccentuat)</span>
                                    <span className="text-stone-400 text-sm flex items-center justify-end gap-3">
                                        <span className="font-psaltica text-2xl text-yellow-500/80">{'\uE005'}</span>
                                    </span>
                                </div>
                                <div className="flex items-center justify-between group text-right">
                                    <span className="text-stone-500 text-xs font-medium">+ 4 trepte (accentuat)</span>
                                    <span className="text-stone-400 text-sm flex items-center justify-end gap-3">
                                        <span className="font-psaltica text-2xl text-yellow-500/80">{'\uE044'}</span>
                                    </span>
                                </div>
                            </div>

                            {/* 5 trepte */}
                            <div className="flex flex-col gap-1 border-b border-stone-800/50 pb-2">
                                <div className="flex items-center justify-between group text-right">
                                    <span className="text-stone-500 text-xs font-medium">+ 5 trepte (neaccentuat)</span>
                                    <span className="text-stone-400 text-sm flex items-center justify-end gap-3">
                                        <span className="font-psaltica text-2xl text-yellow-500/80">{'\uE006'}</span>
                                    </span>
                                </div>
                                <div className="flex items-center justify-between group text-right">
                                    <span className="text-stone-500 text-xs font-medium">+ 5 trepte (accentuat)</span>
                                    <span className="text-stone-400 text-sm flex items-center justify-end gap-3">
                                        <span className="font-psaltica text-2xl text-yellow-500/80">{'\uE045'}</span>
                                    </span>
                                </div>
                            </div>

                            {/* 6 trepte */}
                            <div className="flex flex-col gap-1 border-b border-stone-800/50 pb-2">
                                <div className="flex items-center justify-between group text-right">
                                    <span className="text-stone-500 text-xs font-medium">+ 6 trepte (neaccentuat)</span>
                                    <span className="text-stone-400 text-sm flex items-center justify-end gap-3">
                                        <span className="font-psaltica text-2xl text-yellow-500/80">{'\uE007'}</span>
                                    </span>
                                </div>
                                <div className="flex items-center justify-between group text-right">
                                    <span className="text-stone-500 text-xs font-medium">+ 6 trepte (accentuat)</span>
                                    <span className="text-stone-400 text-sm flex items-center justify-end gap-3">
                                        <span className="font-psaltica text-2xl text-yellow-500/80">{'\uE046'}</span>
                                    </span>
                                </div>
                            </div>

                            {/* 7 trepte */}
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between group text-right">
                                    <span className="text-stone-500 text-xs font-medium">+ 7 trepte (neaccentuat)</span>
                                    <span className="text-stone-400 text-sm flex items-center justify-end gap-3">
                                        <span className="font-psaltica text-2xl text-yellow-500/80">{'\uE008'}</span>
                                    </span>
                                </div>
                                <div className="flex items-center justify-between group text-right">
                                    <span className="text-stone-500 text-xs font-medium">+ 7 trepte (accentuat)</span>
                                    <span className="text-stone-400 text-sm flex items-center justify-end gap-3">
                                        <span className="font-psaltica text-2xl text-yellow-500/80">{'\uE047'}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PSALTIC_SIGNS.map((sign) => (
                    <div
                        key={sign.id}
                        className="bg-stone-900/50 border border-stone-800 rounded-xl p-6 hover:border-yellow-500/30 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-stone-100 group-hover:text-yellow-500 transition-colors">
                                    {sign.nume}
                                </span>
                                <div className="flex items-center gap-1.5 mt-1">
                                    {getTipIcon(sign.tip)}
                                    <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
                                        {getTipLabel(sign.tip)} ({sign.valoare > 0 ? `+${sign.valoare}` : sign.valoare})
                                    </span>
                                </div>
                            </div>
                            <div className="w-16 h-16 bg-black/40 rounded-lg flex items-center justify-center border border-stone-800 shadow-inner group-hover:bg-black/60 transition-colors">
                                <span className="font-psaltica text-4xl text-yellow-200 group-hover:scale-110 transition-transform">
                                    {sign.caracter}
                                </span>
                            </div>
                        </div>
                        <p className="text-stone-300 text-sm leading-relaxed mb-2">
                            {sign.descriere}
                        </p>
                        {sign.detalii && (
                            <p className="text-stone-500 text-xs italic border-t border-stone-800/50 pt-2">
                                {sign.detalii}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-12 p-8 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl">
                <h3 className="text-xl font-byzantine text-yellow-500/80 mb-3">Principii și Combinații:</h3>
                <ul className="space-y-3 text-stone-400 text-sm">
                    <li className="flex gap-2">
                        <span className="text-yellow-500 font-bold">•</span>
                        <span><strong>Kentima (<span className="font-psaltica text-lg">𝁏</span>)</strong> nu apare niciodată singură. Ea urcă 2 sau 3 trepte astfel: urcă <strong>2 trepte</strong> când este așezată sub sau la dreapta semnului de sprijin (Oligon/Petasti - care devine mut) și urcă <strong>3 trepte</strong> când este așezată deasupra lui (adunându-și valoarea cu el).</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-yellow-500 font-bold">•</span>
                        <span><strong>Kentemata (<span className="font-psaltica text-lg">𝁎</span>)</strong> pot fi puse sub un Oligon; în acest caz Oligonul devine "mut", iar Kentemata urcă o treaptă scurt.</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-yellow-500 font-bold">•</span>
                        <span>Isonul (<span className="font-psaltica text-lg">𝁆</span>) este punctul de plecare sau de repaus (ison = egal).</span>
                    </li>
                </ul>
            </div>

            {/* TEMPORAL THEORY SECTION */}
            <div className="mt-16 mb-10 text-center">
                <h2 className="text-3xl font-byzantine text-yellow-500 mb-4">Timpul în Muzica Bizantină</h2>
                <p className="text-stone-400 max-w-2xl mx-auto">
                    Semnele temporale modifică durata neumelor cantabile. 
                    Spre deosebire de semnele melodice care schimbă înălțimea, acestea controlează ritmul și viteza.
                </p>
            </div>

            {/* Gorgon Example - Key Concept */}
            <div className="mb-12 bg-gradient-to-r from-stone-900/60 to-stone-800/40 border border-yellow-500/20 rounded-2xl p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <Zap className="text-yellow-500" size={80} />
                </div>
                
                <h3 className="text-xl font-byzantine text-center text-yellow-500/90 mb-6">
                    Cum funcționează Gorgonul
                </h3>
                
                <div className="flex flex-col items-center gap-6">
                    {/* Before Gorgon */}
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <div className="flex gap-2 justify-center mb-2">
                                <span className="font-psaltica text-5xl text-stone-300">𝁆</span>
                                <span className="font-psaltica text-5xl text-stone-300">𝁆</span>
                            </div>
                            <p className="text-stone-500 text-sm">Două Isonuri normale</p>
                            <p className="text-stone-600 text-xs">1 chronos fiecare</p>
                        </div>
                    </div>
                    
                    <div className="text-stone-500">
                        <ChevronDown size={24} />
                    </div>
                    
                    {/* With Gorgon - only on the SECOND ison */}
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <div className="flex gap-2 justify-center mb-2 items-start">
                                <div className="flex flex-col items-center">
                                    <span className="font-psaltica text-5xl text-stone-300">𝁆</span>
                                    {/* NO gorgon on first ison */}
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-psaltica text-5xl text-stone-300">𝁆</span>
                                    <span className="font-psaltica text-2xl text-rose-400">{'\uE0F0'}</span>
                                </div>
                            </div>
                            <p className="text-rose-400 text-sm font-medium">Același grup CU Gorgon</p>
                            <p className="text-stone-600 text-xs">Gorgonul e doar pe a doua notă, dar afectează AMBELE</p>
                        </div>
                    </div>
                    
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 max-w-lg text-center">
                        <p className="text-stone-300 text-sm">
                            <strong className="text-yellow-500">Regula de aur:</strong> Gorgonul afectează <strong>semnul pe care se așează și semnul dinainte</strong>. 
                            Aici e doar pe a doua notă, dar scurtează ambele!
                        </p>
                    </div>
                </div>
            </div>

            {/* Clasma + Gorgon - Formula Corectă (Ionascu p.37) */}
            <div className="mb-12 bg-gradient-to-r from-stone-900/60 to-stone-800/40 border border-rose-500/20 rounded-2xl p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <span className="font-psaltica text-8xl text-rose-500">𝁆´</span>
                </div>
                
                <h3 className="text-xl font-byzantine text-center text-rose-500/90 mb-6">
                    Clasma Următă de Gorgon
                </h3>
                
                <div className="flex flex-col items-center gap-4 mb-6">
                    <p className="text-stone-400 text-sm max-w-lg text-center">
                        După Ionascu (p.37): Clasma cere 2 timpi, gorgonul împarte timpul în jumătăți.
                        Rezultat: prima notă = 1½ timpi, a doua = ½ timp.
                    </p>
                </div>
                
                <div className="flex justify-center items-center gap-4 mb-6">
                    <div className="flex flex-col items-center">
                        <span className="font-psaltica text-4xl text-stone-300">𝁆</span>
                        <span className="font-psaltica text-xl text-sky-400">{'\uE0D0'}</span>
                        <span className="text-stone-500 text-xs mt-1">Ga (clasma)</span>
                    </div>
                    <span className="text-stone-500 text-2xl">+</span>
                    <div className="flex flex-col items-center">
                        <span className="font-psaltica text-4xl text-stone-300">𝁇</span>
                        <span className="font-psaltica text-xl text-rose-400">{'\uE0F0'}</span>
                        <span className="text-stone-500 text-xs mt-1">Di (gorgon, urcă 1)</span>
                    </div>
                    <span className="text-stone-500 text-2xl">=</span>
                    <div className="flex flex-col items-center text-center">
                        <span className="text-stone-300 text-sm font-medium">2 timpi total</span>
                        <span className="text-stone-500 text-xs">1½ + ½</span>
                    </div>
                </div>
                
                <div className="max-w-md mx-auto bg-stone-950/50 rounded-xl p-4 border border-stone-800">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-rose-400 font-bold text-sm">Timp 1:</span>
                        <span className="text-stone-300 text-sm">Ga singur — 1 timp întreg</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-rose-400 font-bold text-sm">Timp 2:</span>
                        <span className="text-stone-300 text-sm">Ga + Di la ridicare — ½ + ½</span>
                    </div>
                </div>
                
                <p className="text-center text-stone-500 text-xs mt-4 max-w-lg mx-auto">
                    <em>"Vom bate de două ori și la ridicarea de mână cântăm nota cu gorgonul."</em> — Ionascu
                </p>
            </div>

            {/* Temporal Signs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Augmentation Column */}
                <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6 border-b border-stone-800 pb-4">
                        <Hourglass className="text-sky-500" size={24} />
                        <h3 className="text-lg font-byzantine text-sky-500">Prelungire Temporală</h3>
                        <span className="text-xs bg-sky-500/10 text-sky-400 px-2 py-1 rounded">Augmentare</span>
                    </div>
                    
                    <div className="space-y-4">
                        {TEMPORAL_SIGNS.filter(s => s.category === 'augmentation').map(sign => (
                            <div key={sign.id} className="flex items-center justify-between group p-3 rounded-lg hover:bg-stone-800/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-center w-12">
                                        <span className="font-psaltica text-3xl text-stone-300">{sign.caracter}</span>
                                    </div>
                                    <div>
                                        <p className="text-stone-200 font-medium">{sign.nume}</p>
                                        <p className="text-stone-500 text-xs">{sign.descriere}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-sky-400 font-mono text-sm">×{sign.batai}</span>
                                    <p className="text-stone-600 text-[10px]">{sign.detalii}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Division Column */}
                <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6 border-b border-stone-800 pb-4">
                        <Zap className="text-rose-500" size={24} />
                        <h3 className="text-lg font-byzantine text-rose-500">Grăbire Temporală</h3>
                        <span className="text-xs bg-rose-500/10 text-rose-400 px-2 py-1 rounded">Diviziune</span>
                    </div>
                    
                    <div className="space-y-4">
                        {TEMPORAL_SIGNS.filter(s => s.category === 'division').map(sign => (
                            <div key={sign.id} className="flex items-center justify-between group p-3 rounded-lg hover:bg-stone-800/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-center w-12">
                                        <span className="font-psaltica text-3xl text-stone-300">{sign.caracter}</span>
                                    </div>
                                    <div>
                                        <p className="text-stone-200 font-medium">{sign.nume}</p>
                                        <p className="text-stone-500 text-xs">{sign.descriere}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-rose-400 font-mono text-sm">÷{1/sign.batai}</span>
                                    <p className="text-stone-600 text-[10px]">{sign.detalii}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tempo (Agogi) Section */}
            <div className="mb-12 bg-stone-900/40 border border-stone-800 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                    <Clock className="text-emerald-500" size={24} />
                    <h3 className="text-xl font-byzantine text-emerald-500/90">Semne de Tempo (Agogi)</h3>
                </div>
                
                <p className="text-stone-400 text-sm mb-6">
                    Semnele de tempo (agogi) controlează viteza generală a piesei, spre deosebire de semnele temporale 
                    care modifică durata neumelor individuale.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {TEMPO_SIGNS.map((tempo) => (
                        <div key={tempo.id} className="bg-stone-950/50 rounded-lg p-4 text-center border border-stone-800/50 hover:border-emerald-500/30 transition-colors">
                            <span className="font-psaltica text-3xl text-stone-300 block mb-2">{tempo.caracter}</span>
                            <p className="text-stone-300 text-sm font-medium">{tempo.nume}</p>
                            <p className="text-stone-600 text-xs">{tempo.descriere}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Formula Summary */}
            <div className="bg-gradient-to-r from-yellow-500/5 to-stone-900/40 border border-yellow-500/10 rounded-2xl p-8">
                <h3 className="text-xl font-byzantine text-yellow-500/80 mb-4 text-center">Formula Temporală</h3>
                <div className="flex flex-wrap justify-center items-center gap-4 text-stone-300">
                    <div className="bg-stone-950/60 px-4 py-3 rounded-lg border border-stone-800">
                        <span className="text-stone-500 text-xs block mb-1">Neumă cantabilă</span>
                        <span className="font-psaltica text-2xl">𝁆</span>
                    </div>
                    <span className="text-yellow-500 text-xl">+</span>
                    <div className="bg-stone-950/60 px-4 py-3 rounded-lg border border-stone-800">
                        <span className="text-stone-500 text-xs block mb-1">Semn temporal</span>
                        <span className="font-psaltica text-2xl">{'\uE0F0'}</span>
                    </div>
                    <span className="text-yellow-500 text-xl">=</span>
                    <div className="bg-yellow-500/10 px-4 py-3 rounded-lg border border-yellow-500/20">
                        <span className="text-yellow-500 text-xs block mb-1">Rezultat</span>
                        <span className="text-stone-200">Durata modificată</span>
                    </div>
                </div>
                <p className="text-center text-stone-500 text-sm mt-4">
                    Semnele temporale se aplică <strong>grupului întreg</strong> de neume, modificând durata fiecăreia în mod egal.
                </p>
            </div>
        </div>
    );
};
