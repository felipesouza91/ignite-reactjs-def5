import { format, parse } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

format(new Date(), "'Hoje é' eeee", {
  locale: ptBR,
});

export const formatDate = (date: string): string => {
  return format(new Date(date), 'dd MMM yyyy', { locale: ptBR });
};
