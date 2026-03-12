'use client';
import { fmt } from '@/data/customer';
import { ORANJE } from '@/constants/costumer';
import { Icon } from './icon';
import { OrdersViewProps } from '@/types/customer';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/hooks/auth';
import { getOrdersByClient } from '@/service/order/order.schema';

export function OrdersView({ orders, onBack }: OrdersViewProps) {
  const clienteId = useAuthStore((state) => state.session.user.id);

  const {
    data: ordersdata,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orders', clienteId],
    queryFn: () => getOrdersByClient(clienteId),
  });
  const colors: Record<string, string> = {
    Entregue: '#10B981',
    'Em trânsito': '#3B82F6',
    Pendente: '#F59E0B',
  };

  if (isLoading) {
    return <p>Carregando pedidos...</p>;
  }

  if (error) {
    return <p>Erro ao carregar pedidos.</p>;
  }

  if (!orders || orders.length === 0) {
    return <p>Você ainda não possui pedidos.</p>;
  }

  return (
    <div className="fade-in">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 20,
        }}
      >
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <Icon name="back" color={ORANJE} />
        </button>
        <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>
          Meus Pedidos
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ordersdata.map((o) => (
          <div
            key={o.pedidoCotacaoId}
            style={{
              background: 'white',
              borderRadius: 14,
              padding: 16,
              display: 'flex',
              gap: 14,
              alignItems: 'center',
              border: '1px solid #F3F4F6',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <img
              src={`${import.meta.env.VITE_API_URL}images/products${o.nomeCliente}?${Date.now()}`}
              alt=""
              style={{
                width: 64,
                height: 64,
                objectFit: 'cover',
                borderRadius: 10,
              }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: 13, margin: '0 0 4px' }}>
                Pedido #{o.numero_cotacao.slice(0, 8)}
              </p>
              <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 6px' }}>
                {o.pedidoCotacaoId} ·{' '}
                {new Date(o.pedido_time).toLocaleDateString('pt-pt')}
              </p>
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: 20,
                  background: (colors[o.statusPedido] ?? '#9CA3AF') + '20',
                  color: colors[o.statusPedido] ?? '#9CA3AF',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {o.statusPedido}
              </span>
            </div>
            {o.itens.map((item) => (
              <span key={item.id_itens_pedido}>{item.quantidade}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
