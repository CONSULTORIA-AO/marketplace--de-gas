'use client';
import { fmt } from '@/data/customer';
import { ORANJE } from '@/constants/costumer';
import { Icon } from './icon';
import { CartViewProps } from '@/types/cart';
import { useCartStore } from '@/hooks/cartstore';
import { useNavigate } from 'react-router-dom';

export function CartView({
  cart,
  updateQty,
  removeItem,
  cartTotal,
  onCheckout,
  onBack,
}: CartViewProps) {
  const { clearCart } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    navigate('/checkout');
  };

  return (
    <div className="fade-in">
      {/* Header da página */}
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
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111', margin: 0 }}>
          Carrinho ({cart.length})
        </h2>
      </div>

      {cart.length === 0 ? (
        <div
          style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF' }}
        >
          <Icon name="cart" size={48} color="#D1D5DB" />
          <p style={{ marginTop: 12, fontSize: 15 }}>
            O seu carrinho está vazio
          </p>
        </div>
      ) : (
        <>
          {/* Layout: lista de itens + resumo lado a lado em md+, empilhados em mobile */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
              alignItems: 'start',
            }}
          >
            {/* Lista de itens */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cart.map((item) => (
                <div
                  key={item.productId}
                  style={{
                    background: 'white',
                    borderRadius: 14,
                    padding: 14,
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center',
                    border: '1px solid #F3F4F6',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Imagem */}
                  <img
                    src={`${import.meta.env.VITE_API_URL}images/products/${item?.product?.imagem_produto}`}
                    alt={item.product.descricao}
                    style={{
                      width: 64,
                      height: 64,
                      objectFit: 'cover',
                      borderRadius: 10,
                      flexShrink: 0,
                    }}
                  />

                  {/* Info — cresce e trunca */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        marginBottom: 4,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.product.descricao}
                    </p>
                    <p
                      style={{
                        color: '#FFA500',
                        fontWeight: 700,
                        fontSize: 15,
                        margin: 0,
                      }}
                    >
                      {fmt(item.product.preco)}
                    </p>
                  </div>

                  {/* Quantidade + remover */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      flexShrink: 0,
                    }}
                  >
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
                        onClick={() => updateQty(item.productId, -1)}
                        style={{
                          padding: '6px 10px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: 16,
                        }}
                      >
                        −
                      </button>
                      <span
                        style={{
                          padding: '6px 12px',
                          fontWeight: 700,
                          fontSize: 14,
                          borderLeft: '1px solid #E5E7EB',
                          borderRight: '1px solid #E5E7EB',
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.productId, +1)}
                        style={{
                          padding: '6px 10px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: 16,
                        }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 4,
                      }}
                    >
                      <Icon name="close" size={16} color="#EF4444" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo — sticky em desktop, normal em mobile */}
            <div
              style={{
                background: 'white',
                borderRadius: 14,
                padding: 20,
                border: '1px solid #F3F4F6',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                position: 'sticky',
                top: 80,
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>
                Resumo
              </h3>

              {cart.map((i) => (
                <div
                  key={i.productId}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 12,
                    color: '#6B7280',
                    marginBottom: 6,
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                    }}
                  >
                    {i.product.descricao} x{i.quantity}
                  </span>
                  <span style={{ fontWeight: 600, flexShrink: 0 }}>
                    {fmt(i.product.preco * i.quantity)}
                  </span>
                </div>
              ))}

              <div
                style={{
                  borderTop: '1px solid #E5E7EB',
                  marginTop: 12,
                  paddingTop: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 800,
                  fontSize: 16,
                }}
              >
                <span>Total</span>
                <span style={{ color: '#FFA500' }}>{fmt(cartTotal)}</span>
              </div>

              <button
                onClick={() => {
                  handleCheckout();
                  onCheckout;
                }}
                style={{
                  width: '100%',
                  marginTop: 16,
                  padding: '13px',
                  borderRadius: 10,
                  background: '#FFA500',
                  border: 'none',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = '#e08e00')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = '#FFA500')
                }
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}