import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Função para formatar data como "dd 'de' MMMM 'de' yyyy 'às' HH:mm"
 * @param date data a ser formatada
 */
export function formatDate(date: Date): string {
  return format(date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
}
