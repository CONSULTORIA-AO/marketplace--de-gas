import { PedidosResponse } from '@/types/order';
import { api } from '@/utils/api';

export async function getOrdersByClient(clienteId: number) {
  const response = await api.get<PedidosResponse>(
    `pedidos/cliente/${clienteId}`
  );
  return response?.data?.mensagem;
}
