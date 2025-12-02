import React, { useEffect, useState } from "react";
import { EstadoJuego } from "./types";
import { nuevaPartida, ingresarLetra } from "./api/ahorcadoApi";
import { HangmanDrawing } from "./components/HangmanDrawing";
import { Keyboard } from "./components/Keyboard";
import { WordDisplay } from "./components/WordDisplay";
import "./index.css";

const App: React.FC = () => {
  const [estado, setEstado] = useState<EstadoJuego>({
    palabra_oculta: "",
    palabra: "",
    letras_correctas: [],
    letras_incorrectas: [],
    estado: null,
    errores: 0,
  });

  useEffect(() => {
    nuevaPartida().then(setEstado);
  }, []);

  const handleLetra = async (letra: string) => {
    const nuevoEstado = await ingresarLetra(letra);
    setEstado(nuevoEstado);
  };

  const handleReiniciar = async () => {
    const nuevo = await nuevaPartida();
    setEstado(nuevo);
  };

  const errores = estado.letras_incorrectas?.length || 0;

  const mostrarEstado = estado.estado === "ganaste" || estado.estado === "perdiste";

  return (
    <div className="container">
      <h1 className="title">El Juego Del Ahorcado</h1>

      <HangmanDrawing errores={errores} />

      <WordDisplay palabraOculta={estado.palabra_oculta || ""} />

      <Keyboard
        letrasUsadas={[...(estado.letras_correctas || []), ...(estado.letras_incorrectas || [])]}
        onClick={handleLetra}
      />

    {mostrarEstado && (
      <>
        <p className={`estado ${estado.estado || ""}`}>
          Estado: {estado.estado?.toUpperCase()}
        </p>

        {estado.estado === "perdiste" && estado.palabra && (
          <p className="palabra-revelada">
            La palabra era: <strong>{estado.palabra.toUpperCase()}</strong>
          </p>
        )}

        <button className="reiniciar" onClick={handleReiniciar}>
          Volver a Jugar
        </button>
      </>
    )}

    </div>
  );
};

export default App;
