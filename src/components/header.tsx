'use client';
import { HeaderProps, Notification } from '@/types/customer';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './icon';
import { ORANJE, WHITE } from '@/constants/costumer';
import { BadgeCount } from './badgeCount';
import { useUserStore } from '@/hooks/customer';
import { useCartStore } from '@/hooks/cartstore';
import { useNavigate } from 'react-router-dom';

export function AuthHeader({
  search,
  setSearch,
  //cartCount,
  favCount,
  onMenu,
}: HeaderProps) {
  const [searchFocus, setFocus] = useState<boolean>(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState<boolean>(false);
  const cliente = useUserStore((state) => state.cliente);
  const [preview, setPreview] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const cartCount = useCartStore((state) => state.getItemCount());
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
        {/* Menu button */}
        <button
          onClick={onMenu}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            flexShrink: 0,
          }}
        >
          <Icon name="menu" color="#374151" />
        </button>

        {/* Logo */}
        <button
          onClick={() => navigate('/produtos')}
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

        {/* Search bar — hidden on mobile, visible on sm+ */}
        <div
          className="hidden sm:flex"
          style={{
            flex: 1,
            alignItems: 'stretch',
            border: `1.5px solid ${searchFocus ? ORANJE : '#E5E7EB'}`,
            borderRadius: 10,
            overflow: 'hidden',
            background: 'white',
            transition: 'border-color .2s',
            minWidth: 0,
          }}
        >
          <div
            style={{
              padding: '0 10px',
              color: '#9CA3AF',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Icon name="search" size={16} />
          </div>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder="Pesquisar produtos"
            className="flex-1 px-3 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 bg-transparent"
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
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Icon name="close" size={14} />
            </button>
          )}
          <button
            onClick={handleSearch}
            style={{
              padding: '0 20px',
              background: ORANJE,
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 700,
              flexShrink: 0,
              whiteSpace: 'nowrap',
              alignSelf: 'stretch',
              borderRadius: 0,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                '#e08e00';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = ORANJE;
            }}
          >
            Procurar
          </button>
        </div>

        {/* Right side actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            position: 'relative',
            flexShrink: 0,
            marginLeft: 'auto',
          }}
        >
          {/* Mobile: search toggle button */}
          <button
            className="flex sm:hidden"
            onClick={() => setMobileSearchOpen((v) => !v)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              color: '#6B7280',
            }}
          >
            <Icon name="search" size={20} />
          </button>

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

          {/* Cart button */}
          <button
            onClick={() => navigate('/carrinho')}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
            }}
          >
            <Icon
              name="cart"
              color={cartCount > 0 ? ORANJE : '#6B7280'}
              size={20}
            />
            {cartCount > 0 && (
              <BadgeCount n={cartCount > 99 ? 99 : cartCount} />
            )}
          </button>

          {/* Checkout button — label hidden on xs, icon+label on sm+ */}
          <button
            onClick={() => navigate('/checkout')}
            title="Finalizar compra"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 10px',
              background: ORANJE,
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 700,
              transition: 'background 0.2s, transform 0.15s',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                '#e08e00';
              (e.currentTarget as HTMLButtonElement).style.transform =
                'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = ORANJE;
              (e.currentTarget as HTMLButtonElement).style.transform =
                'scale(1)';
            }}
          >
            {/* Checkout / bag icon */}
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {/* Label hidden on very small screens */}
            <span className="hidden sm:inline">Finalizar compra</span>
          </button>

          {/* Avatar / profile */}
          <button
            onClick={() => navigate('/perfil')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              flexShrink: 0,
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

      {/* Mobile search bar — expands below header when toggled */}
      {mobileSearchOpen && (
        <div
          className="flex sm:hidden"
          style={{
            padding: '0',
            alignItems: 'stretch',
            border: `1.5px solid ${searchFocus ? ORANJE : '#E5E7EB'}`,
            borderRadius: 10,
            margin: '0 16px 12px',
            overflow: 'hidden',
            background: 'white',
            transition: 'border-color .2s',
          }}
        >
          <div
            style={{
              padding: '0 10px',
              color: '#9CA3AF',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Icon name="search" size={16} />
          </div>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
                setMobileSearchOpen(false);
              }
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder="Pesquisar produtos"
            autoFocus
            style={{
              flex: 1,
              padding: '12px 0',
              border: 'none',
              outline: 'none',
              fontSize: 13,
              color: '#374151',
              background: 'transparent',
              minWidth: 0,
              width: '100%',
              alignSelf: 'stretch',
            }}
          />
          <button
            onClick={() => {
              handleSearch();
              setMobileSearchOpen(false);
            }}
            style={{
              padding: '0 18px',
              background: ORANJE,
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 700,
              borderRadius: 0,
              flexShrink: 0,
              whiteSpace: 'nowrap',
              alignSelf: 'stretch',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                '#e08e00';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = ORANJE;
            }}
          >
            Procurar
          </button>
        </div>
      )}
    </header>
  );
}
