import React from "react";

interface Props {
  errores: number;
}

export const HangmanDrawing: React.FC<Props> = ({ errores }) => {
  return (
    <div className="hangman-drawing">
      <svg width="200" height="250">
        {/* Base */}
        <line x1="10" y1="240" x2="150" y2="240" stroke="black" strokeWidth="4" />
        <line x1="50" y1="240" x2="50" y2="20" stroke="black" strokeWidth="4" />
        <line x1="50" y1="20" x2="130" y2="20" stroke="black" strokeWidth="4" />
        <line x1="130" y1="20" x2="130" y2="50" stroke="black" strokeWidth="4" />

        {/* Cabeza */}
        {errores > 0 && <circle cx="130" cy="70" r="20" stroke="black" strokeWidth="3" fill="none" />}
        {/* Cuerpo */}
        {errores > 1 && <line x1="130" y1="90" x2="130" y2="150" stroke="black" strokeWidth="3" />}
        {/* Brazos */}
        {errores > 2 && <line x1="130" y1="100" x2="110" y2="130" stroke="black" strokeWidth="3" />}
        {errores > 3 && <line x1="130" y1="100" x2="150" y2="130" stroke="black" strokeWidth="3" />}
        {/* Piernas */}
        {errores > 4 && <line x1="130" y1="150" x2="110" y2="190" stroke="black" strokeWidth="3" />}
        {errores > 5 && <line x1="130" y1="150" x2="150" y2="190" stroke="black" strokeWidth="3" />}
      </svg>
    </div>
  );
};
