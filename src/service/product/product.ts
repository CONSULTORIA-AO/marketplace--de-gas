import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import {
  ApiProductResponse,
  GasProduct,
} from '@/types/product';

export function useProducts(searchTerm?: string) {
  return useQuery<ApiProductResponse>({
    queryKey: ['products', searchTerm],
    queryFn: async () => {
      const params = searchTerm
        ? `?search=${encodeURIComponent(searchTerm)}`
        : '';
      const response = await api.get<ApiProductResponse>(`/produtos${params}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });
}

export function useProductsByIds(ids: number[]) {
  const uniqueIds = [...new Set(ids)];

  return useQuery<GasProduct[]>({
    queryKey: ['products-by-ids', uniqueIds],
    queryFn: async () => {
      // Rota /produtos/:id retorna mensagem:{} vazio — usa a lista completa e filtra
      const response = await api.get<ApiProductResponse>('/produtos');
      const allProducts: GasProduct[] = response.data.mensagem;
      return allProducts.filter((p) => uniqueIds.includes(p.produtoId));
    },
    enabled: uniqueIds.length > 0,
    staleTime: 1000 * 60 * 5,
  });
}