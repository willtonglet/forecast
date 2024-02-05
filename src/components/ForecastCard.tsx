import useForecastData from "../hooks/useForecastData";
import { Coordinates } from "../state/latitudeLongitudeState";
import Card from "./Card";

/**
 * Props para o componente ForecastCard.
 */
interface ForecastCard extends Coordinates {
  time?: Date;
  temperature2m?: number;
  isDay?: number;
  weatherCode?: number;
  relativeHumidity2m?: number;
  apparentTemperature?: number;
  windSpeed10m?: string;
}

/**
 * Componente para renderizar um cartão de previsão do tempo com base em coordenadas de latitude e longitude.
 * @param latitude Latitude da localização associada ao cartão de previsão.
 * @param longitude Longitude da localização associada ao cartão de previsão.
 */
const ForecastCard = ({ latitude, longitude }: ForecastCard) => {
  const { forecastData, isLoading, fetchForecast } = useForecastData({
    latitude,
    longitude,
  });

  if (forecastData) {
    return <Card {...forecastData} />;
  }

  return (
    <Card
      onClickReload={fetchForecast}
      latitude={latitude}
      longitude={longitude}
      isLoading={isLoading}
    />
  );
};

export default ForecastCard;
