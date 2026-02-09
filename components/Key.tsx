import React from 'react';
import { NoteDefinition } from '../types';

interface KeyProps {
  note: NoteDefinition;
  onMouseDown: () => void;
  onMouseUp: () => void;
  isActive: boolean;
}

const westernMap: Record<string, string> = {
  'Ni': 'Do',
  'Pa': 'Re',
  'Vu': 'Mi',
  'Ga': 'Fa',
  'Di': 'Sol',
  'Ke': 'La',
  'Zo': 'Si'
};

export const Key: React.FC<KeyProps> = ({ note, onMouseDown, onMouseUp, isActive }) => {
  // Styles for the keys
  // Base style
  const baseStyle = "relative flex flex-col justify-end items-center pb-4 border-b-4 border-r border-l border-gray-900 rounded-b-lg transition-all duration-100 select-none cursor-pointer shadow-lg";
  
  // Dimensions
  // We make them tall and relatively narrow, like organ or psaltic diagrams
  const dims = "h-48 w-12 sm:h-64 sm:w-16"; 
  
  // Colors
  // "Clapă roșie" for the tonic (Isokratima)
  // Others: Bone/Ivory color
  // Active state: Darker/Pressed effect
  
  let bgClass = "bg-[#f5f5dc]"; // Beige/Ivory
  let textClass = "text-gray-800";
  let borderClass = "border-gray-400";
  
  if (note.isTonic && note.octaveOffset === 0) {
    // The main Tonic (Start of Glas)
    bgClass = isActive ? "bg-red-800" : "bg-red-700";
    textClass = "text-white font-bold";
    borderClass = "border-red-900";
  } else if (note.isTonic) {
     // Octaves of tonic
     bgClass = isActive ? "bg-red-300" : "bg-red-100";
     textClass = "text-red-900 font-bold";
  } else {
    // Normal Keys
    bgClass = isActive ? "bg-[#d4d4b0]" : "bg-[#f5f5dc]";
  }

  // Visual cues for octave (sub/peste)
  const isLower = note.octaveOffset < 0;
  const isHigher = note.octaveOffset > 0;
  
  return (
    <div
      className={`${baseStyle} ${dims} ${bgClass} ${borderClass} transform ${isActive ? 'translate-y-1 shadow-none' : '-translate-y-0'}`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={(e) => { e.preventDefault(); onMouseDown(); }}
      onTouchEnd={(e) => { e.preventDefault(); onMouseUp(); }}
    >
      {/* Visual marker for extended range */}
      <div className="absolute top-2 text-[10px] opacity-50 font-sans">
        {isLower && <span className="text-blue-600">▼</span>}
        {isHigher && <span className="text-orange-600">▲</span>}
      </div>

      {/* Note Name */}
      <div className="flex flex-col items-center">
        <span className={`font-byzantine text-lg sm:text-xl ${textClass}`}>
          {note.label}
          {note.isTonic && note.octaveOffset === 0 ? '' : (note.octaveOffset !== 0 ? (note.octaveOffset > 0 ? "'" : ",") : "")}
        </span>
        
        {/* Western Mapping Label */}
        <span className={`text-[10px] uppercase font-bold mt-0.5 opacity-60 ${note.isTonic && note.octaveOffset === 0 ? 'text-red-100' : 'text-stone-600'}`}>
          {westernMap[note.name]}
        </span>
      </div>
      
      {/* Decorative dot for tonic */}
      {note.isTonic && note.octaveOffset === 0 && (
         <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1 shadow-sm"></div>
      )}
    </div>
  );
};