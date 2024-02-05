import { fetchWeatherApi } from "openmeteo";
import { useState, useMemo, useCallback } from "react";
import ForecastCard from "../components/ForecastCard";
import { Coordinates } from "../state/latitudeLongitudeState";

/**
 * Parâmetros para a função useForecastData.
 */
interface useForecastDataParams extends Coordinates {
  callback?: () => void;
}

/**
 * Hook personalizado para obter dados de previsão do tempo com base nas coordenadas fornecidas.
 * @param longitude Longitude da localização para a qual deseja-se obter a previsão do tempo.
 * @param latitude Latitude da localização para a qual deseja-se obter a previsão do tempo.
 * @param callback Função de retorno de chamada opcional a ser executada após a obtenção dos dados de previsão do tempo.
 * @returns Um objeto contendo os dados de previsão do tempo, uma função para buscar novos dados e um indicador de carregamento.
 */
const useForecastData = ({
  longitude,
  latitude,
  callback,
}: useForecastDataParams) => {
  const [forecastData, setForecastData] = useState<ForecastCard | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const params = useMemo(
    () => ({
      latitude,
      longitude,
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "is_day",
        "weather_code",
        "wind_speed_10m",
      ],
    }),
    [latitude, longitude]
  );

  const fetchForecast = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];
      const utcOffsetSeconds = response.utcOffsetSeconds();
      const current = response.current()!;
      const weatherData = {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: Math.floor(current.variables(0)!.value()),
        relativeHumidity2m: current.variables(1)!.value(),
        apparentTemperature: Math.floor(current.variables(2)!.value()),
        isDay: current.variables(3)!.value(),
        weatherCode: current.variables(4)!.value(),
        windSpeed10m: current.variables(5)!.value().toFixed(2),
        latitude,
        longitude,
      };

      setForecastData(weatherData);
      callback?.();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [params, latitude, longitude, callback]);

  return { forecastData, fetchForecast, isLoading };
};

export default useForecastData;
