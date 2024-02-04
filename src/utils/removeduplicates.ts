import { Coordinates } from "../state/latitudeLongitudeState";

/**
 * Função que elimina objetos duplicados no array de coordenadas
 * @param arr Array de objetos de coordenadas de latitude e longitude
 */
export const removeDuplicates = (arr: Coordinates[]): Coordinates[] => {
  const uniqueMap: { [key: string]: Coordinates } = {};
  arr.forEach((coord) => {
    const key = `${coord.latitude},${coord.longitude}`;
    uniqueMap[key] = coord;
  });
  return Object.values(uniqueMap);
};
