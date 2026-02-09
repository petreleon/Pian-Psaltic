import React from 'react';
import { GLASURI } from '../constants';
import { Settings, Music, Mic2, ArrowDown, ArrowUp, Minus, Volume2 } from 'lucide-react';

interface ControlPanelProps {
  currentGlasId: number;
  setGlasId: (id: number) => void;
  baseFreq: number;
  setBaseFreq: (freq: number) => void;
  octave: number;
  setOctave: (octave: number) => void;
  volume: number;
  setVolume: (vol: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ 
  currentGlasId, 
  setGlasId,
  baseFreq,
  setBaseFreq,
  octave,
  setOctave,
  volume,
  setVolume
}) => {
  
  // Presets mapping Ni=Do (Natural Scale)
  const FREQ_PRESETS = [
    { label: 'Ni (Do) - 261.63Hz', val: 261.63 },
    { label: 'Pa (Re) - 293.66Hz', val: 293.66 },
    { label: 'Vu (Mi) - 329.63Hz', val: 329.63 },
    { label: 'Ga (Fa) - 349.23Hz', val: 349.23 },
    { label: 'Di (Sol) - 392.00Hz', val: 392.00 },
    { label: 'Ke (La) - 440.00Hz', val: 440.00 },
    { label: 'Zo (Si) - 493.88Hz', val: 493.88 },
  ];

  const currentGlas = GLASURI.find(g => g.id === currentGlasId);
  const effectiveFreq = baseFreq * Math.pow(2, octave);

  return (
    <div className="bg-stone-900 text-stone-200 p-6 rounded-xl shadow-2xl mb-8 w-full max-w-4xl border border-stone-700">
      <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
        
        {/* Glas Selector */}
        <div className="flex-1 w-full">
          <label className="flex items-center gap-2 text-gold-400 mb-2 font-bold uppercase tracking-wider text-sm">
            <Music className="w-4 h-4 text-yellow-500" />
            Selectare Glas
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {GLASURI.map(g => (
              <button
                key={g.id}
                onClick={() => setGlasId(g.id)}
                className={`p-2 rounded border text-sm font-medium transition-colors
                  ${currentGlasId === g.id 
                    ? 'bg-red-800 border-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]' 
                    : 'bg-stone-800 border-stone-700 hover:bg-stone-700 text-stone-400'
                  }`}
              >
                {g.name}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-stone-500 italic h-4">
            {currentGlas?.description}
          </p>
        </div>

        {/* Pitch & Octave Selector */}
        <div className="w-full md:w-auto min-w-[280px] bg-stone-950/30 p-4 rounded-lg border border-stone-800">
           <label className="flex items-center gap-2 text-gold-400 mb-3 font-bold uppercase tracking-wider text-sm">
            <Settings className="w-4 h-4 text-yellow-500" />
            Setări Sunet
          </label>
          
          <div className="flex flex-col gap-4">
            {/* Base Note Selector */}
            <div>
              <span className="text-xs text-stone-500 mb-1 block">Notă de referință (Bază)</span>
              <select 
                value={baseFreq}
                onChange={(e) => setBaseFreq(Number(e.target.value))}
                className="w-full bg-stone-800 border border-stone-600 rounded p-2 text-stone-200 focus:border-red-500 focus:outline-none text-sm"
              >
                {FREQ_PRESETS.map((p) => (
                  <option key={p.val} value={p.val}>{p.label}</option>
                ))}
              </select>
            </div>

            {/* Octave Selector */}
            <div>
              <span className="text-xs text-stone-500 mb-1 block">Registru (Octavă)</span>
              <div className="flex bg-stone-800 rounded border border-stone-600 p-1">
                <button 
                  onClick={() => setOctave(-1)}
                  className={`flex-1 flex items-center justify-center py-1.5 rounded text-xs font-bold transition-all ${octave === -1 ? 'bg-red-900 text-white shadow-sm' : 'text-stone-400 hover:bg-stone-700'}`}
                  title="Octavă Joasă"
                >
                  <ArrowDown size={14} className="mr-1" /> Jos
                </button>
                <button 
                  onClick={() => setOctave(0)}
                  className={`flex-1 flex items-center justify-center py-1.5 rounded text-xs font-bold transition-all ${octave === 0 ? 'bg-stone-600 text-white shadow-sm' : 'text-stone-400 hover:bg-stone-700'}`}
                  title="Octavă Medie"
                >
                  <Minus size={14} className="mr-1" /> Mediu
                </button>
                <button 
                  onClick={() => setOctave(1)}
                  className={`flex-1 flex items-center justify-center py-1.5 rounded text-xs font-bold transition-all ${octave === 1 ? 'bg-orange-800 text-white shadow-sm' : 'text-stone-400 hover:bg-stone-700'}`}
                  title="Octavă Înaltă"
                >
                  <ArrowUp size={14} className="mr-1" /> Sus
                </button>
              </div>
            </div>

            {/* Volume Selector */}
            <div>
              <span className="text-xs text-stone-500 mb-1 flex items-center gap-1"><Volume2 size={12}/> Volum</span>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-yellow-600"
              />
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
             <span className="flex items-center gap-1"><Mic2 className="w-3 h-3 text-stone-500"/> Ieșire: <span className="text-yellow-500 font-mono">{Math.round(effectiveFreq)} Hz</span></span>
             <span>Ref: {currentGlas?.baseNote}</span>
          </div>
        </div>

      </div>
    </div>
  );
};