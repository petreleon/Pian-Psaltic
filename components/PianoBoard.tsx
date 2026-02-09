import React, { useMemo, useState } from 'react';
import { generateKeyboardMap } from '../constants';
import { Key } from './Key';
import { audioEngine } from '../services/audioEngine';

interface PianoBoardProps {
  glasId: number;
  baseFreq: number;
}

export const PianoBoard: React.FC<PianoBoardProps> = ({ glasId, baseFreq }) => {
  const [activeKeys, setActiveKeys] = useState<number[]>([]);

  // Memoize the keyboard structure so it only recalculates when glas changes
  const keys = useMemo(() => generateKeyboardMap(glasId), [glasId]);

  const handleNoteStart = (index: number, noteCents: number) => {
    setActiveKeys(prev => [...prev, index]);
    
    // Calculate Frequency: Base * 2^(cents/1200)
    const frequency = baseFreq * Math.pow(2, noteCents / 1200);
    audioEngine.playTone(frequency, index, 'triangle');
  };

  const handleNoteEnd = (index: number) => {
    setActiveKeys(prev => prev.filter(k => k !== index));
    audioEngine.stopTone(index);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-x-auto pb-8 custom-scrollbar">
      {/* Decorative top bar */}
      <div className="h-4 bg-gradient-to-r from-yellow-900 via-yellow-700 to-yellow-900 rounded-t-lg border-b-2 border-yellow-950 opacity-80 mb-0.5"></div>
      
      {/* Keyboard Bed */}
      <div className="inline-flex bg-stone-800 p-2 pt-0 rounded-b-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-t border-stone-600">
        <div className="flex space-x-1 sm:space-x-1.5">
          {keys.map((note, index) => (
            <div key={`${note.name}-${index}`} className="flex flex-col items-center">
              <Key 
                note={note}
                isActive={activeKeys.includes(index)}
                onMouseDown={() => handleNoteStart(index, note.centsFromBase)}
                onMouseUp={() => handleNoteEnd(index)}
              />
              <div className="mt-2 text-[10px] text-stone-500 font-mono">
                {note.centsFromBase > 0 ? '+' : ''}{Math.round(note.centsFromBase)}¢
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-center text-stone-500 mt-6 text-sm">
        Click și ține apăsat pentru sunet. <br/>
        Tastele roșii indică tonica glasului (Isos).
      </p>
    </div>
  );
};