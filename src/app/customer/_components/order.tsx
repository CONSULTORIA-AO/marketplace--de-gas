'use client';
import { fmt } from '@/data/customer';
import { ORANJE } from '@/constants/costumer';
import { Icon } from './icon';
import { OrdersViewProps } from '@/types/customer';

export function OrdersView({ orders, onBack }: OrdersViewProps) {
  const colors: Record<string, string> = {
    Entregue: '#10B981',
    'Em trânsito': '#3B82F6',
    Pendente: '#F59E0B',
  };
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
        {orders.map((o) => (
          <div
            key={o.id}
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
              src={o.img}
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
                {o.product}
              </p>
              <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 6px' }}>
                {o.id} · {o.date}
              </p>
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: 20,
                  background: (colors[o.status] ?? '#9CA3AF') + '20',
                  color: colors[o.status] ?? '#9CA3AF',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {o.status}
              </span>
            </div>
            <span style={{ fontWeight: 800, color: ORANJE, fontSize: 15 }}>
              {fmt(o.price)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
