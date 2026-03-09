'use client';
import { HeaderProps, Notification } from '@/types/customer';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './icon';
import { ORANJE, WHITE } from '@/constants/costumer';
import { BadgeCount } from './badgeCount';
import { useUserStore } from '@/hooks/customer';

export function Header({
  search,
  setSearch,
  cartCount,
  favCount,
  onMenu,
  goTo,
}: HeaderProps) {
  const [searchFocus, setFocus] = useState<boolean>(false);
  const cliente = useUserStore((state) => state.cliente);
  const [preview, setPreview] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const avatarSrc =
    preview ??
    cliente?.fotoCliente ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(cliente?.nomeCliente ?? 'U')}&background=f97316&color=000&size=128`;

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'new_item',
      message: 'Novo iPhone 16 chegou à plataforma!',
      time: 'há 12 min',
      read: false,
      icon: 'plus',
    },
    {
      id: 2,
      type: 'payment_success',
      message: 'Pagamento de AirPods Pro confirmado ✓',
      time: 'há 47 min',
      read: true,
      icon: 'check',
    },
    {
      id: 3,
      type: 'subscription_active',
      message: 'Angoverso Premium activado com sucesso!',
      time: 'ontem',
      read: false,
      icon: 'star',
    },
    {
      id: 4,
      type: 'subscription_expired',
      message: 'A sua subscrição Family Plus expirou',
      time: '2 dias atrás',
      read: true,
      icon: 'bell',
    },
    {
      id: 5,
      type: 'new_message',
      message: 'TechStore AO respondeu no chat',
      time: 'há 3 h',
      read: false,
      icon: 'chat',
    },
    {
      id: 6,
      type: 'profile_updated',
      message: 'Os seus dados foram actualizados com sucesso',
      time: 'semana passada',
      read: true,
      icon: 'user',
    },
    {
      id: 7,
      type: 'added_favorite',
      message: 'Samsung Galaxy S24 adicionado aos favoritos',
      time: 'há 1 dia',
      read: true,
      icon: 'heart',
    },
    {
      id: 8,
      type: 'added_cart',
      message: 'MacBook Air M2 adicionado ao carrinho',
      time: 'há 2 h',
      read: false,
      icon: 'cart',
    },
    {
      id: 9,
      type: 'order_status',
      message: 'O seu pedido ORD-003 está em trânsito',
      time: 'há 5 h',
      read: false,
      icon: 'package',
    },
    {
      id: 10,
      type: 'low_stock',
      message: 'Apenas 2 unidades restantes: PlayStation 5',
      time: 'há 30 min',
      read: false,
      icon: 'bell',
    },
  ]);

  const handleSearch = () => {
    setSearch(searchValue.trim());
  };

  //const unreadCount: number = notifications.filter((n) => !n.read).length;
  //const [showNotifications, setShowNotifications] = useState<boolean>(false);

  const markAsRead = (id: number): void => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = (): void => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const notificationRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        //setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type: string): string => {
    const icons: Record<string, string> = {
      new_item: 'plus',
      payment_success: 'check',
      subscription_active: 'star',
      subscription_expired: 'bell',
      new_message: 'chat',
      profile_updated: 'user',
      added_favorite: 'heart',
      added_cart: 'cart',
      order_status: 'package',
      low_stock: 'bell',
    };
    return icons[type] || 'bell';
  };

  return (
    <header
      style={{
        background: 'white',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 300,
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <button
          onClick={onMenu}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
          }}
        >
          <Icon name="menu" color="#374151" />
        </button>
        <button
          onClick={() => goTo('shop')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: ORANJE,
              letterSpacing: -0.5,
            }}
          >
            JaGás
          </span>
        </button>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            border: `1.5px solid ${searchFocus ? ORANJE : '#E5E7EB'}`,
            borderRadius: 10,
            overflow: 'hidden',
            background: 'white',
            transition: 'all .2s',
          }}
        >
          <div style={{ padding: '0 10px', color: '#9CA3AF' }}>
            <Icon name="search" size={16} />
          </div>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder="Pesquisar produtos, categorias..."
            style={{
              flex: 1,
              padding: '9px 0',
              border: 'none',
              outline: 'none',
              fontSize: 13,
              color: '#374151',
              background: 'transparent',
            }}
          />
          {search && (
            <button
              onClick={handleSearch}
              style={{
                padding: '0 10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#9CA3AF',
              }}
            >
              <Icon name="close" size={14} />
            </button>
          )}
          <button
            style={{
              padding: '8px 16px',
              background: ORANJE,
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 700,
            }}
            className="rounded-lg"
          >
            Procurar
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            position: 'relative',
          }}
        >
          {/*  <div ref={notificationRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
              }}
            >
              <Icon
                name="bell"
                color={unreadCount > 0 ? ORANJE : '#6B7280'}
                size={20}
              />
              {unreadCount > 0 && <BadgeCount n={unreadCount} />}
            </button>

            {showNotifications && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  width: 320,
                  maxHeight: 420,
                  background: 'white',
                  borderRadius: 12,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  border: '1px solid #E5E7EB',
                  overflow: 'hidden',
                  zIndex: 1000,
                  marginTop: 8,
                }}
              >
                <div
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #E5E7EB',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: WHITE,
                  }}
                >
                  <span
                    style={{ fontWeight: 700, fontSize: 14, color: ORANJE }}
                  >
                    Notificações
                  </span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      style={{
                        fontSize: 12,
                        color: ORANJE,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Marcar todas como lidas
                    </button>
                  )}
                </div>
                <div style={{ maxHeight: 340, overflowY: 'auto' }}>
                  {notifications.length === 0 ? (
                    <div
                      style={{
                        padding: '40px 20px',
                        textAlign: 'center',
                        color: '#9CA3AF',
                        fontSize: 13,
                      }}
                    >
                      Nenhuma notificação ainda
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markAsRead(notif.id)}
                        style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid #F3F4F6',
                          background: notif.read ? 'white' : WHITE + '80',
                          cursor: 'pointer',
                          transition: 'background 0.15s',
                        }}
                      >
                        <div style={{ display: 'flex', gap: 12 }}>
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: 10,
                              background: WHITE,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <Icon
                              name={getNotificationIcon(notif.type)}
                              size={18}
                              color={ORANJE}
                            />
                          </div>
                          <div style={{ flex: 1 }}>
                            <p
                              style={{
                                fontSize: 13,
                                fontWeight: notif.read ? 400 : 600,
                                margin: 0,
                                lineHeight: 1.4,
                              }}
                            >
                              {notif.message}
                            </p>
                            <p
                              style={{
                                fontSize: 11,
                                color: '#9CA3AF',
                                margin: '4px 0 0',
                              }}
                            >
                              {notif.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div
                  style={{
                    padding: '12px 16px',
                    borderTop: '1px solid #E5E7EB',
                    textAlign: 'center',
                  }}
                >
                  <button
                    onClick={() => setShowNotifications(false)}
                    style={{
                      color: ORANJE,
                      fontSize: 13,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Ver todas as notificações
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => goTo('favorites')}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
            }}
          >
            <Icon
              name="heart"
              color={favCount > 0 ? '#EF4444' : '#6B7280'}
              size={20}
            />
            {favCount > 0 && <BadgeCount n={favCount} />}
          </button>*/}
          <button
            onClick={() => goTo('cart')}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
            }}
          >
            <Icon name="cart" color="#6B7280" size={20} />
            {cartCount > 0 && <BadgeCount n={cartCount} />}
          </button>
          <button
            onClick={() => goTo('profile')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                overflow: 'hidden',
                border: `2px solid ${ORANJE}`,
              }}
            >
              <img
                src={avatarSrc}
                alt={cliente?.nomeCliente}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
