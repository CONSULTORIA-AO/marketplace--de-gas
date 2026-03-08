import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { ApiProductResponse, GasProduct } from '@/types/product';

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
    staleTime: 1000 * 60 * 5, // 5 minutos
    placeholderData: (previousData) => previousData,
  });
}

export function useProductById(id?: string | number) {
  return useQuery<GasProduct>({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) throw new Error('ID do produto não fornecido');

      const response = await api.get(`/produtos/${id}`);
      
      const product = response.data.mensagem;

      return product;
    },
    enabled: !!id,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
}
