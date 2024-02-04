import { atom } from "recoil";

/**
 * Interface com o tipo relativo a latitude e longitude
 */
export interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}

/**
 * Estado Recoil para armazenar as coordenadas de latitude e longitude.
 */
export const latitudeLongitudeState = atom<Coordinates>({
  key: "latitudeLongitudeState",
  default: {
    latitude: null,
    longitude: null,
  },
});
