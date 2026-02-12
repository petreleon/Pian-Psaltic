import React, { useState, useEffect } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { PianoBoard } from './components/PianoBoard';
import { BookOpen } from 'lucide-react';
import { audioEngine } from './services/audioEngine';
import { GLASURI, BASE_NOTE_FREQUENCIES } from './constants'; // Import constants
import { TermsModal } from './components/TermsModal';

const App: React.FC = () => {
  const [currentGlas, setCurrentGlas] = useState<number>(1);
  const [baseFreq, setBaseFreq] = useState<number>(293.66); // Default Pa (Glas 1 Start)
  const [octave, setOctave] = useState<number>(0); // -1 (Low), 0 (Mid), 1 (High)
  const [volume, setVolume] = useState<number>(0.5);

  // Update audio engine volume when state changes
  useEffect(() => {
    audioEngine.setVolume(volume);
  }, [volume]);

  // Update Base Frequency when Glas changes
  useEffect(() => {
    const selectedGlas = GLASURI.find(g => g.id === currentGlas);
    if (selectedGlas && BASE_NOTE_FREQUENCIES[selectedGlas.baseNote]) {
      setBaseFreq(BASE_NOTE_FREQUENCIES[selectedGlas.baseNote]);
    }
  }, [currentGlas]);

  // Calculate the actual frequency sent to the board based on the octave shift
  const effectiveFreq = baseFreq * Math.pow(2, octave);

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]">

      {/* Header */}
      <header className="w-full bg-gradient-to-b from-stone-900 to-[#1a1a1a] border-b border-stone-800 shadow-lg py-8 px-4 mb-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-byzantine text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 mb-2 drop-shadow-sm">
            Pian Psaltic
          </h1>
          <p className="text-stone-400 text-sm max-w-md mx-auto flex items-center justify-center gap-2">
            <BookOpen size={16} />
            Instrument virtual pentru studiul glasurilor bizantine
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 flex flex-col items-center flex-1">

        <ControlPanel
          currentGlasId={currentGlas}
          setGlasId={setCurrentGlas}
          baseFreq={baseFreq}
          setBaseFreq={setBaseFreq}
          octave={octave}
          setOctave={setOctave}
          volume={volume}
          setVolume={setVolume}
        />

        <PianoBoard
          glasId={currentGlas}
          baseFreq={effectiveFreq}
        />

        <TermsModal />

      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-stone-600 text-xs mt-12">
        <p>© 2024 Unealtă Psaltică Digitală.</p>
        <p className="mt-1">Intervalele sunt aproximate pentru redare web (72 morii / scară).</p>
      </footer>
    </div>
  );
};

export default App;