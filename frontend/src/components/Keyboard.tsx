import React from "react";

interface Props {
  letrasUsadas: string[];
  onClick: (letra: string) => void;
}

export const Keyboard: React.FC<Props> = ({ letrasUsadas, onClick }) => {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="keyboard">
      {letras.map((l) => (
        <button
          key={l}
          className={`key ${letrasUsadas.includes(l.toLowerCase()) ? "used" : ""}`}
          onClick={() => onClick(l.toLowerCase())}
          disabled={letrasUsadas.includes(l.toLowerCase())}
        >
          {l}
        </button>
      ))}
    </div>
  );
};
