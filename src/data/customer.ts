import { useUserStore } from '@/hooks/customer';

export const CATEGORIES: string[] = ['Todos'];
export const cliente = useUserStore((state) => state.cliente);

export const fmt = (n: number): string => `${n.toLocaleString('pt-AO')} Kz`;

export const formattedDate = cliente?.criado_em
  ? new Intl.DateTimeFormat('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(cliente.criado_em))
  : '';
