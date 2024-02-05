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
 * @param latitude Latitude da localização associada ao cartão.
 * @param longitude Longitude da localização associada ao cartão.
 * @param isDay Indica se é dia (1) ou noite (0).
 * @param temperature2m Temperatura atual em graus Celsius.
 * @param time Timestamp representando o momento da previsão.
 * @param weatherCode Código do tempo.
 * @param onClickReload Função de retorno de chamada a ser executada quando o botão de carregar for clicado.
 * @param isLoading Indica se o cartão está carregando.
 * @param isCurrent Indica se o cartão representa a previsão do tempo atual.
 */
const Card = ({
  latitude,
  longitude,
  isDay,
  temperature2m,
  time,
  weatherCode,
  onClickReload,
  isLoading,
  isCurrent = false,
}: Card) => {
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
      <span>{weatherCodeResolver(weatherCode)}</span>
    </div>
  );
};

export default Card;
