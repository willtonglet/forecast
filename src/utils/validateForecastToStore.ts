import { Coordinates } from "../state/latitudeLongitudeState";
import { removeDuplicates } from "./removeduplicates";

// Chave de armazenamento para as coordenadas do forecast
const FORECAST_STORAGE_KEY = "forecastCoordinates";

// Recupera as coordenadas do forecast do localStorage
export const savedForecastCoordinates =
  localStorage.getItem(FORECAST_STORAGE_KEY);

// Função para validar e armazenar as coordenadas do forecast
export function validateForecastToStore(coordinates: Coordinates) {
  if (savedForecastCoordinates) {
    try {
      const parsedCoordinates = JSON.parse(savedForecastCoordinates);
      if (Array.isArray(parsedCoordinates)) {
        localStorage.setItem(
          FORECAST_STORAGE_KEY,
          JSON.stringify(removeDuplicates([coordinates, ...parsedCoordinates]))
        );
      } else {
        console.error("O valor recuperado do localStorage não é uma matriz.");
      }
    } catch (error) {
      console.error("Erro ao fazer a análise do JSON:", error);
    }
  } else {
    localStorage.setItem(FORECAST_STORAGE_KEY, JSON.stringify([coordinates]));
  }
}
