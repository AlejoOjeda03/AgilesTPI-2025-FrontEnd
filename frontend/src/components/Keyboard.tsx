// src/components/Keyboard.tsx
import React from "react";

interface Props {
  letrasUsadas: string[];
  onClick: (letra: string) => void;
}

export const Keyboard: React.FC<Props> = ({ letrasUsadas, onClick }) => {
  const letras = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="keyboard" role="group" aria-label="teclado">
      {letras.map((l) => {
        const lower = l.toLowerCase();
        const used = letrasUsadas.includes(lower);
        return (
          <button
            key={l}
            data-cy={`key-${lower}`}           
            className={`key ${used ? "used" : ""}`}
            onClick={() => onClick(lower)}
            disabled={used}
            aria-pressed={used}
            type="button"
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};
