// src/api/ahorcadoApi.ts
import axios from "axios";
import { EstadoJuego } from "../types";

const api = axios.create({
  baseURL: "https://ahorcado-agiles-u1qj.onrender.com",
});

export const nuevaPartida = async (
  palabra?: string
): Promise<EstadoJuego> => {
  const res = await api.post<EstadoJuego>(
    `/nueva_partida?palabra=${palabra || "perro"}`
  );
  return res.data;
};

export const ingresarLetra = async (letra: string): Promise<EstadoJuego> => {
  const res = await api.post<EstadoJuego>(`/letra?letra=${letra}`);
  return res.data;
};

export const ingresarPalabra = async (palabra: string): Promise<EstadoJuego> => {
  const res = await api.post<EstadoJuego>(`/palabra?palabra=${palabra}`);
  return res.data;
};

export const obtenerEstado = async (): Promise<EstadoJuego> => {
  const res = await api.get<EstadoJuego>(`/estado`);
  return res.data;
};