/**
 * Função que retorna a legenda do clima de acordo com o código do tempo
 * @param weatherCode código de tempo que a api retorna
 */
export function weatherCodeResolver(weatherCode?: number): string {
  switch (weatherCode) {
    case 0:
      return "Céu limpo";
    case 1:
    case 2:
    case 3:
      return "Principalmente claro, parcialmente nublado e encoberto";
    case 45:
    case 48:
      return "Névoa e névoa com formação de orvalho";
    case 51:
    case 53:
    case 55:
      return "Chuvisco: Intensidade leve, moderada e densa";
    case 56:
    case 57:
      return "Chuvisco congelante: Intensidade leve e densa";
    case 61:
    case 63:
    case 65:
      return "Chuva: Intensidade leve, moderada e forte";
    case 66:
    case 67:
      return "Chuva congelante: Intensidade leve e forte";
    case 71:
    case 73:
    case 75:
      return "Neve: Intensidade leve, moderada e forte";
    case 77:
      return "Grãos de neve";
    case 80:
    case 81:
    case 82:
      return "Chuvas: Intensidade leve, moderada e violenta";
    case 85:
    case 86:
      return "Neve com queda leve e pesada";
    case 95:
      return "Tempestade: Intensidade leve ou moderada";
    case 96:
    case 99:
      return "Tempestade com queda leve e granizo pesado";
    default:
      return "Tipo de clima desconhecido";
  }
}
