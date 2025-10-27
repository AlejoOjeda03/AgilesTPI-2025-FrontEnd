
export interface EstadoJuego {
    palabra: string;
    palabra_oculta: string;
    errores: number;
    letras_correctas: string[];
    letras_incorrectas: string[];
    estado: string | null;
  }
  