'use client';

import { ORANJE, WHITE } from '@/constants/costumer';
import { Icon } from '@/components/icon';
import { useState } from 'react';
import { View } from '@/types/customer';
import { fmt } from '@/data/customer';
import { useNavigate, useParams } from 'react-router-dom';
import { useCartStore } from '@/hooks/cartstore';
import { useToast } from '@/hooks/use-toast';
import { GasProduct } from '@/types/product';
import { Sidebar } from '@/components/sidebar';
import { AuthHeader } from '@/components/header';
import { useProductById } from '@/service/product/product';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductDetail() {
  const { id } = useParams();
  const [qty, setQty] = useState<number>(1);
  const navigate = useNavigate();
  const { addItem, clearCart } = useCartStore();
  const [view, setView] = useState<View>('produtos');
  const [favorites, setFavorites] = useState<GasProduct[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sidebarOpen, setSidebar] = useState<boolean>(false);

  const { data: product, isLoading, isError, error } = useProductById(id);
  //const isFav: boolean = favorites.some((f) => f.produtoId === product.produtoId);
  addItem(product.mensagem, qty);

  const sellerButtons: { label: string; icon: string; action?: () => void }[] =
    [
      { label: product?.mensagem.vendedor?.telefoneEmpresa, icon: 'phone' },
      { label: 'WhatsApp', icon: 'chat' },
      { label: 'Enviar mensagem', icon: 'send' },
      //{
      //label: 'Chat com vendedor',
      //icon: 'chat',
      // action: () => onChat(product),
      //},
    ];

  const handleCheckout = async () => {
    navigate('/checkout');
    clearCart();
  };

  const handleBack = () => navigate(-1);

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
          <Skeleton className="h-7 w-32 rounded-md" />
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
              gap: 10,
            }}
          >
            <Skeleton className="w-24 h-24 rounded-full" />
            <Skeleton className="h-5 w-40 rounded-md" />
            <Skeleton className="h-4 w-52 rounded-md" />
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-3 w-36 rounded-md" />
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
          <Skeleton className="h-5 w-44 rounded-md mb-5" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
              gap: 14,
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-3 w-28 rounded mb-2" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
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

      <AuthHeader
        search={search}
        setSearch={setSearch}
        //cartCount={cartCount}
        favCount={favorites.length}
        onMenu={() => setSidebar(true)}
      />
      <div className="fade-in">
        <button
          onClick={handleBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: ORANJE,
            fontWeight: 600,
            fontSize: 14,
            marginBottom: 16,
          }}
        >
          <Icon name="back" size={16} color={ORANJE} /> Voltar
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
              gap: 20,
            }}
          >
            {/* Gallery */}
            <div
              style={{
                background: 'white',
                borderRadius: 16,
                padding: 16,
                border: '1px solid #F3F4F6',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  borderRadius: 12,
                  overflow: 'hidden',
                  height: 320,
                  marginBottom: 12,
                }}
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}images/products/${product?.mensagem?.imagem_produto}`}
                  alt={product?.mensagem?.descricao}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/*<button
                onClick={() => toggleFav(product)}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.95)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon
                  name="heart"
                  size={18}
                  color={isFav ? '#EF4444' : '#9CA3AF'}
                />
              </button>*/}
              </div>
            </div>

            {/* Info */}
            <div
              style={{
                background: 'white',
                borderRadius: 16,
                padding: 20,
                border: '1px solid #F3F4F6',
              }}
            >
              <h1
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#111',
                  margin: '6px 0 8px',
                }}
              >
                {product?.mensagem?.descricao}
              </h1>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <span style={{ fontSize: 28, fontWeight: 900, color: ORANJE }}>
                  {fmt(product?.mensagem?.preco)}
                </span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: '#6B7280',
                  lineHeight: 1.6,
                  marginBottom: 16,
                }}
              >
                Produto de qualidade com garantia de satisfação, pronto para
                entrega
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}
                >
                  Quantidade:
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1.5px solid #E5E7EB',
                    borderRadius: 8,
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    style={{
                      padding: '8px 14px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#374151',
                      fontSize: 18,
                    }}
                  >
                    −
                  </button>
                  <span
                    style={{
                      padding: '8px 16px',
                      fontWeight: 700,
                      fontSize: 15,
                      borderLeft: '1px solid #E5E7EB',
                      borderRight: '1px solid #E5E7EB',
                    }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => Math.max(1, q + 1))}
                    style={{
                      padding: '8px 14px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#374151',
                      fontSize: 18,
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                <button
                  onClick={() => {
                    if (product?.mensagem) {
                      addItem(product.mensagem, qty);
                    }
                  }}
                  style={{
                    padding: '13px',
                    borderRadius: 10,
                    border: `2px solid ${ORANJE}`,
                    background: WHITE,
                    color: ORANJE,
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: 'pointer',
                  }}
                >
                  Adicionar ao Carrinho
                </button>
                <button
                  onClick={() => {
                    if (product?.mensagem) {
                      addItem(product.mensagem, qty);
                      handleCheckout();
                    }
                  }}
                  style={{
                    padding: '13px',
                    borderRadius: 10,
                    border: 'none',
                    background: ORANJE,
                    color: 'white',
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: 'pointer',
                  }}
                >
                  Comprar Agora
                </button>
              </div>
            </div>

            {/* Seller Card */}
            <div
              style={{
                background: 'white',
                borderRadius: 16,
                padding: 20,
                border: '1px solid #F3F4F6',
              }}
            >
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 14,
                  color: '#111',
                }}
              >
                Sobre o Vendedor
              </h3>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: `2px solid ${ORANJE}`,
                  }}
                >
                  <img
                    src={product.mensagem?.imagem_produto}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>
                    {product?.mensagem?.empresaDona}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {sellerButtons.map((btn, i) => (
                  <button
                    key={i}
                    onClick={btn.action}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      padding: '10px',
                      borderRadius: 10,
                      background: ORANJE,
                      border: 'none',
                      color: 'white',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <Icon name={btn.icon} size={15} color="white" />
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews */}
        </div>
      </div>
    </div>
  );
}
