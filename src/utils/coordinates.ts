/**
 * Função que verifica se a latitude é valida
 * @param latitude valor da latitude
 */
export const isValidLatitude = (latitude: string): boolean => {
  const lat = parseFloat(latitude);
  return !isNaN(lat) && lat >= -90 && lat <= 90;
};

/**
 * Função que verifica se a longitude é valida
 * @param longitude valor da longitude
 * @returns
 */
export const isValidLongitude = (longitude: string): boolean => {
  const long = parseFloat(longitude);
  return !isNaN(long) && long >= -180 && long <= 180;
};
