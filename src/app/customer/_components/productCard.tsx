'use client';

import { ProductCardProps } from '@/types/customer';
import { useState } from 'react';
//import { Icon } from './icon';
import { Stars } from './star';
import { ORANJE, WHITE } from '@/constants/costumer';
import { fmt } from '@/data/customer';
import { useNavigate } from 'react-router-dom';

export function ProductCard({
  product,
  addToCart,
  //toggleFav,
  isFav,
  onClick,
  onPayNow,
}: ProductCardProps) {
  const [hov, setHov] = useState<boolean>(false);
  const navigate = useNavigate();
  const discount: number = product.preco
    ? Math.round((1 - product.preco / product.preco) * 100)
    : 0;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'white',
        borderRadius: 16,
        overflow: 'hidden',
        border: `1.5px solid ${hov ? '#FFA500' : '#F3F4F6'}`,
        boxShadow: hov
          ? '0 16px 40px rgba(18,89,195,0.14)'
          : '0 2px 8px rgba(0,0,0,0.05)',
        transform: hov ? 'translateY(-4px)' : 'none',
        transition: 'all .25s',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          position: 'relative',
          height: 180,
          overflow: 'hidden',
          background: '#F9FAFB',
        }}
        onClick={onClick}
      >
        <img
          src={product.imagem_produto}
          alt={product.imagem_produto}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform .4s',
            transform: hov ? 'scale(1.06)' : 'scale(1)',
          }}
        />
        {/*product.ativo && (
          <span
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              padding: '3px 8px',
              borderRadius: 6,
              background: '#EF4444',
              color: 'white',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            {product.ativo}
          </span>
        )*/}
        {discount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: 8,
              right: 40,
              padding: '3px 7px',
              borderRadius: 6,
              background: '#10B981',
              color: 'white',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            -{discount}%
          </span>
        )}
      </div>
      <div style={{ padding: 12 }}>
        <p
          onClick={onClick}
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#111',
            marginBottom: 6,
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.descricao}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 6,
            marginBottom: 10,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 900, color: ORANJE }}>
            {fmt(product.preco)}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            style={{
              flex: 1,
              padding: '8px 0',
              borderRadius: 8,
              background: WHITE,
              border: `1.5px solid ${ORANJE}`,
              color: ORANJE,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            + Carrinho
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/pagamento/${product.produtoId}`);
            }}
            style={{
              flex: 1,
              padding: '8px 0',
              borderRadius: 8,
              background: ORANJE,
              border: 'none',
              color: 'white',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
