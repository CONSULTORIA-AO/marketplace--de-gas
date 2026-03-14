'use client';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/hooks/auth';
import { getOrdersByClient } from '@/service/order/order.schema';
import { AuthHeader } from '@/components/header';
import { useState } from 'react';
import { View } from '@/types/customer';
import { GasProduct } from '@/types/product';
import { Sidebar } from '@/components/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { SmartHeader } from '@/components/layout/smartHeader';
import { useProductById } from '@/service/product/product';

export function OrdersView() {
  const clienteId = useAuthStore((state) => state.session.user.id);
  const [searchChat, setSearchChat] = useState<string>('');
  const [view, setView] = useState<View>('produtos');
  const [favorites, setFavorites] = useState<GasProduct[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sidebarOpen, setSidebar] = useState<boolean>(false);

  const {
    data: ordersdata,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orders', clienteId],
    queryFn: () => getOrdersByClient(clienteId),
  });

  console.log("vendo o que o pedido traz:", ordersdata)

  //const productItem = ordersdata

  //const { data: product, isError } = useProductById(id);
  

  const colors: Record<string, string> = {
    Entregue: '#10B981',
    'Em trânsito': '#3B82F6',
    Pendente: '#F59E0B',
  };

  if (isLoading) {
    return (
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20,
          }}
        >
          <Skeleton className="h-[22px] w-32 rounded-md" />
        </div>

        {/* Avatar card */}
        <div
          style={{
            background: 'white',
            borderRadius: 16,
            padding: 24,
            marginBottom: 16,
            border: '1px solid #F3F4F6',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {/* Spinner + avatar skeleton */}
            <div style={{ position: 'relative', width: 96, height: 96 }}>
              {/* Anel girante */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '3px solid #f97316',
                  borderTopColor: 'transparent',
                  animation: 'spin 0.9s linear infinite',
                }}
              />
              {/* Skeleton do avatar dentro */}
              <div
                style={{
                  position: 'absolute',
                  inset: 10,
                  borderRadius: '50%',
                  overflow: 'hidden',
                }}
              >
                <Skeleton className="w-full h-full rounded-full" />
              </div>
            </div>

            <Skeleton className="h-[18px] w-40 rounded-lg" />
            <Skeleton className="h-[14px] w-52 rounded-lg" />
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-3 w-36 rounded-lg" />
          </div>
        </div>

        {/* Form card */}
        <div
          style={{
            background: 'white',
            borderRadius: 16,
            padding: 24,
            border: '1px solid #F3F4F6',
          }}
        >
          <Skeleton className="h-4 w-44 rounded-md mb-5" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
              gap: 14,
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-[11px] w-28 rounded mb-2" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
            <Skeleton className="h-10 w-full rounded-xl self-end" />
          </div>
        </div>

        {/* Keyframe para o spinner — injeta uma vez */}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return <p>Erro ao carregar pedidos.</p>;
  }

  return (
    <div>
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 400, display: 'flex' }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
            }}
            onClick={() => setSidebar(false)}
          />
          <Sidebar
            favorites={favorites.length}
            close={() => setSidebar(false)}
            currentView={view}
          />
        </div>
      )}
      <SmartHeader
        search={search}
        setSearch={setSearch}
        onMenu={() => setSidebar(true)}
        onSearch={(term) => setSearch(term)}
      />

      <div className="fade-in">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20,
          }}
        >
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
                src={`${import.meta.env.VITE_API_URL}images/products/${o.pedidoCotacaoId}`}
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
                  Pedido {o.pedidoCotacaoId}
                </p>
                <p
                  style={{ fontSize: 12, color: '#6B7280', margin: '0 0 6px' }}
                >
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
    </div>
  );
}
