import { useEffect } from "react";
import { useRecoilState } from "recoil";
import useForecastData from "../hooks/useForecastData";
import { latitudeLongitudeState } from "../state/latitudeLongitudeState";
import { validateForecastToStore } from "../utils/validateForecastToStore";
import { Navigate } from "react-router-dom";
import Card from "./Card";

/**
 * Componente para exibir card de previsão do tempo atual.
 */
const CurrentForecast = () => {
  const [coordinates] = useRecoilState(latitudeLongitudeState);
  const { forecastData, isLoading, fetchForecast } = useForecastData({
    ...coordinates,
    callback: () => validateForecastToStore(coordinates),
  });

  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {
      fetchForecast();
    }
  }, [coordinates]);

  if (coordinates.latitude && coordinates.longitude) {
    return <Card {...forecastData!} isLoading={isLoading} isCurrent />;
  }

  return <Navigate to="/" />;
};

export default CurrentForecast;
