// src/components/WordDisplay.tsx
import React from "react";

interface Props {
  palabraOculta: string;
}

export const WordDisplay: React.FC<Props> = ({ palabraOculta }) => {
  return (
    <div className="word-display">
      {palabraOculta.split("").map((c, i) => (
        <span key={i} className="letter">
          {c === " " ? "\u00A0" : c} {/* espacio para que no se vea aplastado */}
        </span>
      ))}
    </div>
  );
};
