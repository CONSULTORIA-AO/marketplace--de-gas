'use client';
import { ORANJE, ORANJE_DARK, WHITE } from '@/constants/costumer';
import { Icon } from './icon';
import { SidebarProps } from '@/types/customer';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/hooks/auth';
import { useUserStore } from '@/hooks/customer';
import { useCartStore } from '@/hooks/cartstore';
import { useState } from 'react';
import { items } from '@/constants/routes';
import { format } from 'date-fns';

export function Sidebar({ favorites, close, currentView }: SidebarProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const cliente = useUserStore((state) => state.cliente);
  const cartCount = useCartStore((state) => state.getItemCount());
  const [preview] = useState<string | null>(null);

  const avatarSrc =
    preview ??
    cliente?.fotoCliente ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      cliente?.nomeCliente ?? 'U'
    )}&background=f97316&color=000&size=128`;

  const handleLogout = () => {
    logout();
    navigate('/iniciar-sessao');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        width: 280,
        background: 'white',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
        overflowY: 'auto',
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: `linear-gradient(135deg,${ORANJE},${ORANJE_DARK})`,
          padding: '24px 20px 20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <span style={{ color: 'white', fontWeight: 900, fontSize: 20 }}>
            JaGás
          </span>

          <button
            onClick={close}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: 8,
              padding: 6,
              cursor: 'pointer',
            }}
          >
            <Icon name="close" color="white" size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid rgba(255,255,255,0.5)',
            }}
          >
            <img
              src={avatarSrc}
              alt={cliente?.nomeCliente}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div>
            <p
              style={{
                color: 'white',
                fontWeight: 700,
                fontSize: 14,
                margin: 0,
              }}
            >
              {cliente?.nomeCliente}
            </p>

            <p
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: 11,
                margin: 0,
              }}
            >
              {cliente?.criado_em
                ? format(new Date(cliente.criado_em), 'dd/MM/yyyy')
                : ''}
            </p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <div style={{ flex: 1, padding: '8px 0' }}>
        {items.map(({ icon, label, path }) => {
          const active = isActive(path);
          return (
            <button
              key={path}
              onClick={() => {
                navigate(path);
                close?.();
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '13px 20px',
                background: active ? WHITE : 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                borderLeft: active
                  ? `3px solid ${ORANJE}`
                  : '3px solid transparent',
                transition: 'all .15s',
              }}
            >
              <Icon
                name={icon}
                color={active ? ORANJE : '#6B7280'}
                size={18}
              />

              <span
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontWeight: active ? 700 : 500,
                  color: active ? ORANJE : '#374151',
                }}
              >
                {label}
              </span>

              {path === '/carrinho' && cartCount > 0 && (
                <span
                  style={{
                    minWidth: 20,
                    height: 20,
                    borderRadius: 999,
                    background: ORANJE,
                    color: 'white',
                    fontSize: 11,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 5px',
                    lineHeight: 1,
                  }}
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* LOGOUT */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #F3F4F6' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 0',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Icon name="logout" color="#EF4444" size={18} />
          <span style={{ fontSize: 14, color: '#EF4444', fontWeight: 600 }}>
            Terminar Sessão
          </span>
        </button>
      </div>
    </div>
  );
}