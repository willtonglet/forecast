import clsx from "clsx";
import { formatDate } from "../utils/formatDate";
import { weatherCodeResolver } from "../utils/weatherCodeResolver";
import styles from "./Card.module.css";
import ForecastCard from "./ForecastCard";

/**
 * Props para o componente Card.
 */
interface Card extends ForecastCard {
  onClickReload?: () => void;
  isLoading?: boolean;
  isCurrent?: boolean;
}

/**
 * Componente para renderizar um cartão de previsão do tempo.
 */
const Card = ({
  latitude,
  longitude,
  isDay,
  temperature2m,
  time,
  weatherCode,
  apparentTemperature,
  windSpeed10m,
  relativeHumidity2m,
  onClickReload,
  isLoading,
  isCurrent = false,
}: Card) => {
  if (isLoading) {
    return <div className={styles.card}>Carregando...</div>;
  }

  if (!time && !isDay && !temperature2m && !weatherCode && !isCurrent) {
    return (
      <div className={styles.card}>
        <h2 className={styles.latLon}>
          Latitude: {latitude}
          <br />
          Longitude: {longitude}
        </h2>
        <button
          className={styles.reload}
          onClick={onClickReload}
          disabled={isLoading}
        >
          {isLoading ? "...Carregando" : "Recarregar"}
        </button>
      </div>
    );
  }

  return (
    <div className={clsx(styles.card, isDay === 1 ? styles.day : styles.night)}>
      <div>
        {time && <span className={styles.date}>{formatDate(time)}</span>}
        <h2 className={styles.latLon}>
          Latitude: {latitude}
          <br />
          Longitude: {longitude}
        </h2>
      </div>
      <h3 className={clsx(styles.degrees, isCurrent && styles.current)}>
        {temperature2m}°
      </h3>
      <div>
        <span>Sensação de {apparentTemperature}°</span>
        <br />
        <span>{weatherCodeResolver(weatherCode)}</span>
        <br />
        <span>Ventos a {windSpeed10m}km/h</span>
        <br />
        Umidade em {relativeHumidity2m}%
      </div>
    </div>
  );
};

export default Card;
