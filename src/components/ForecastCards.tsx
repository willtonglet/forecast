import { Coordinates } from "../state/latitudeLongitudeState";
import CurrentForecast from "./CurrentForecast";
import ForecastCard from "./ForecastCard";
import styles from "./ForecastCards.module.css";

/**
 * Componente para exibir os cartões de previsão do tempo.
 */
const ForecastCards = () => {
  const storageCoordinates: Coordinates[] = JSON.parse(
    localStorage.getItem("forecastCoordinates") as string
  );

  return (
    <div className={styles.forecastCards}>
      <div className={styles.current}>
        <CurrentForecast />
      </div>
      {storageCoordinates?.map((card) => (
        <ForecastCard
          key={`${card.latitude}-${card.longitude}`}
          latitude={card.latitude}
          longitude={card.longitude}
        />
      ))}
    </div>
  );
};

export default ForecastCards;
