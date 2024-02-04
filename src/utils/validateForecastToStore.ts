import { Coordinates } from "../state/latitudeLongitudeState";
import { removeDuplicates } from "./removeduplicates";

/**
 * Função que verfica se existem coordenadas salvas na localStorage
 * @param coordinates coordenadas de latitude e longitude
 */
export function validateForecastToStore(coordinates: Coordinates) {
  const savedForecastCoordinates = localStorage.getItem("forecastCoordinates");

  if (savedForecastCoordinates) {
    try {
      const parsedCoordinates = JSON.parse(savedForecastCoordinates);
      if (Array.isArray(parsedCoordinates)) {
        localStorage.setItem(
          "forecastCoordinates",
          JSON.stringify(removeDuplicates([coordinates, ...parsedCoordinates]))
        );
      } else {
        console.error("O valor recuperado do localStorage não é uma matriz.");
      }
    } catch (error) {
      console.error("Erro ao fazer a análise do JSON:", error);
    }
  } else {
    localStorage.setItem("forecastCoordinates", JSON.stringify([coordinates]));
  }
}
