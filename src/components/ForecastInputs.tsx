import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {
  Coordinates,
  latitudeLongitudeState,
} from "../state/latitudeLongitudeState";
import { isValidLatitude, isValidLongitude } from "../utils/coordinates";
import styles from "./ForecastInputs.module.css";

/**
 * Componente de entrada para inserir as coordenadas de latitude e longitude.
 */
const ForecastInputs = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const navigate = useNavigate();
  const setCoordinates = useSetRecoilState(latitudeLongitudeState);
  const invalidLongitude = useMemo(
    () => !isValidLongitude(longitude),
    [longitude]
  );
  const invalidLatitude = useMemo(() => !isValidLatitude(latitude), [latitude]);

  const handleAddForecast = useCallback(() => {
    if (invalidLatitude) {
      return;
    }

    if (invalidLongitude) {
      return;
    }

    const newCoordinates: Coordinates = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
    setCoordinates(newCoordinates);
    navigate("/forecast");
  }, [
    invalidLatitude,
    invalidLongitude,
    latitude,
    longitude,
    navigate,
    setCoordinates,
  ]);

  return (
    <div className={styles.inputs}>
      <div className={styles.input}>
        <input
          type="number"
          id="latitude"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        {invalidLatitude && latitude && (
          <span className={styles.error}>Latitude incorreta</span>
        )}
      </div>
      <div className={styles.input}>
        <input
          type="number"
          id="longitude"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        {invalidLongitude && longitude && (
          <span className={styles.error}>Longitude incorreta</span>
        )}
      </div>
      <button
        onClick={handleAddForecast}
        disabled={invalidLongitude || invalidLatitude}
      >
        Pesquisar Clima
      </button>
    </div>
  );
};

export default ForecastInputs;
