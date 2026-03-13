export const CATEGORIES: string[] = ['Todos'];

export const fmt = (n?: number): string => {
  if (typeof n !== 'number' || isNaN(n)) return '0 Kz';
  return `${n.toLocaleString('pt-AO')} Kz`;
};