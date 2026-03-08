'use client';
import { ORANJE } from '@/constants/costumer';
import { BadgeCount } from './badgeCount';
import { Icon } from './icon';
import { BottomNavProps, View } from '@/types/customer';

export function BottomNav({ view, goTo, cartCount }: BottomNavProps) {
  const items: { icon: string; label: string; v: View; badge?: number }[] = [
    { icon: 'home', label: 'Início', v: 'shop' },
    { icon: 'heart', label: 'Favoritos', v: 'favorites' },
    { icon: 'cart', label: 'Carrinho', v: 'cart', badge: cartCount },
    { icon: 'package', label: 'Pedidos', v: 'orders' },
    { icon: 'user', label: 'Perfil', v: 'profile' },
  ];
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        borderTop: '1px solid #E5E7EB',
        display: 'flex',
        zIndex: 200,
        boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
      }}
    >
      {items.map(({ icon, label, v, badge }) => (
        <button
          key={v}
          onClick={() => goTo(v)}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 0',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <Icon name={icon} color={view === v ? ORANJE : '#9CA3AF'} size={20} />
          <span
            style={{
              fontSize: 10,
              marginTop: 2,
              color: view === v ? ORANJE : '#9CA3AF',
              fontWeight: view === v ? 700 : 400,
            }}
          >
            {label}
          </span>
          {badge != null && badge > 0 && <BadgeCount n={badge} />}
        </button>
      ))}
    </div>
  );
}
