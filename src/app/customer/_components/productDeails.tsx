'use client';

import { ORANJE, WHITE } from '@/constants/costumer';
import { Stars } from './star';
import { Icon } from './icon';
import { useState } from 'react';
import { ProductDetailProps, ReviewItem } from '@/types/customer';
import { fmt } from '@/data/customer';

export function ProductDetail({
  product,
  addToCart,
  toggleFav,
  favorites,
  onChat,
  onPayNow,
  onBack,
}: ProductDetailProps) {
  const [qty, setQty] = useState<number>(1);
  const [activeImg, setActiveImg] = useState<number>(0);
  const [review, setReview] = useState<{ rating: number; comment: string }>({
    rating: 5,
    comment: '',
  });
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      name: 'Maria S.',
      rating: 5,
      comment: 'Excelente produto! Chegou rápido.',
      date: '2024-11-20',
    },
    {
      name: 'Pedro A.',
      rating: 4,
      comment: 'Muito bom, recomendo!',
      date: '2024-11-15',
    },
  ]);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const isFav: boolean = favorites.some((f) => f.id === product.id);
  const imgs: string[] = [product.img, product.img, product.img];
  const discount: number = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  const submitReview = (): void => {
    if (!review.comment.trim()) return;
    setReviews((prev) => [
      {
        name: 'Você',
        rating: review.rating,
        comment: review.comment,
        date: new Date().toLocaleDateString('pt-AO'),
      },
      ...prev,
    ]);
    setShowReviewForm(false);
    setReview({ rating: 5, comment: '' });
  };

  const sellerButtons: { label: string; icon: string; action?: () => void }[] =
    [
      { label: '+244 934 444 555', icon: 'phone' },
      { label: 'WhatsApp', icon: 'chat' },
      { label: 'Enviar mensagem', icon: 'send' },
      {
        label: 'Chat com vendedor',
        icon: 'chat',
        action: () => onChat(product),
      },
    ];

  return (
    <div className="fade-in">
      <button
        onClick={onBack}
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
                src={imgs[activeImg]}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {discount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    padding: '4px 10px',
                    borderRadius: 8,
                    background: '#EF4444',
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  -{discount}%
                </span>
              )}
              <button
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
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {imgs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 8,
                    overflow: 'hidden',
                    border: `2px solid ${activeImg === i ? ORANJE : '#E5E7EB'}`,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <img
                    src={imgs[i]}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </button>
              ))}
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
            <span style={{ fontSize: 12, color: ORANJE, fontWeight: 600 }}>
              {product.category}
            </span>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: '#111',
                margin: '6px 0 8px',
              }}
            >
              {product.name}
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 12,
              }}
            >
              <Stars rating={product.rating} />
              <span style={{ fontSize: 12, color: '#6B7280' }}>
                ({product.reviews.toLocaleString()} avaliações)
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 10,
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 28, fontWeight: 900, color: ORANJE }}>
                {fmt(product.price)}
              </span>
              {product.oldPrice && (
                <span
                  style={{
                    fontSize: 16,
                    color: '#9CA3AF',
                    textDecoration: 'line-through',
                  }}
                >
                  {fmt(product.oldPrice)}
                </span>
              )}
            </div>
            {product.freeShipping && (
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: 20,
                  background: '#D1FAE5',
                  color: '#065F46',
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                Frete grátis
              </span>
            )}
            <p
              style={{
                fontSize: 13,
                color: '#6B7280',
                lineHeight: 1.6,
                marginBottom: 16,
              }}
            >
              Produto de alta qualidade com garantia de satisfação. Entrega
              segura em todo Angola. Stock limitado — garanta o seu agora.
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
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
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
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
              <span style={{ fontSize: 12, color: '#10B981' }}>
                ({product.stock} em stock)
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={() => addToCart(product, qty)}
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
                onClick={() => onPayNow(product)}
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
                  src={product.sellerImg}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>
                  {product.seller}
                </p>
                <Stars rating={5} small />
                <p
                  style={{ fontSize: 11, color: '#6B7280', margin: '2px 0 0' }}
                >
                  Membro desde 2023
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
        <div
          style={{
            background: 'white',
            borderRadius: 16,
            padding: 20,
            border: '1px solid #F3F4F6',
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
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#111',
                margin: 0,
              }}
            >
              Avaliações ({reviews.length})
            </h3>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                background: ORANJE,
                border: 'none',
                color: 'white',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              + Avaliar
            </button>
          </div>

          {showReviewForm && (
            <div
              style={{
                background: WHITE,
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                border: `1px solid ${ORANJE}20`,
              }}
            >
              <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>
                A sua avaliação
              </p>
              <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setReview((r) => ({ ...r, rating: s }))}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 24,
                    }}
                  >
                    {s <= review.rating ? '⭐' : '☆'}
                  </button>
                ))}
              </div>
              <textarea
                value={review.comment}
                onChange={(e) =>
                  setReview((r) => ({ ...r, comment: e.target.value }))
                }
                placeholder="Partilhe a sua experiência com este produto..."
                style={{
                  width: '100%',
                  minHeight: 80,
                  padding: 10,
                  borderRadius: 8,
                  border: '1.5px solid #E5E7EB',
                  fontSize: 13,
                  resize: 'vertical',
                  boxSizing: 'border-box',
                }}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button
                  onClick={submitReview}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 8,
                    background: ORANJE,
                    border: 'none',
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Publicar
                </button>
                <button
                  onClick={() => setShowReviewForm(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    background: 'white',
                    border: '1px solid #E5E7EB',
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {reviews.map((r, i) => (
              <div
                key={i}
                style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: 12 }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: ORANJE,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 13, margin: 0 }}>
                      {r.name}
                    </p>
                    <p style={{ fontSize: 11, color: '#9CA3AF', margin: 0 }}>
                      {r.date}
                    </p>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <Stars rating={r.rating} small />
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: '#374151',
                    marginLeft: 42,
                    lineHeight: 1.5,
                  }}
                >
                  {r.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
