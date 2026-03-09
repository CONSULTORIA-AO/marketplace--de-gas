'use client';

import { ProductCardProps } from '@/types/customer';
import { useState } from 'react';
//import { Icon } from './icon';
import { Stars } from './star';
import { ORANJE, WHITE } from '@/constants/costumer';
import { fmt } from '@/data/customer';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/hooks/auth';
import { useCartStore } from '@/hooks/cartstore';
import { api } from '@/utils/api';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { AxiosError } from 'axios';

export function ProductCard({
  product,
  addToCart,
  //toggleFav,
  isFav,
  onClick,
  onPayNow,
}: ProductCardProps) {
  const clienteId = useAuthStore((state) => state.session.user.id);
  const { items, clearCart } = useCartStore();
  const [hov, setHov] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const discount: number = product.preco
    ? Math.round((1 - product.preco / product.preco) * 100)
    : 0;

  const handleCheckout = async () => {
    try {
      const payload = {
        clienteIdPedido: clienteId,
        itens: items.map((item) => ({
          produto_id: item.product.produtoId,
          quantidade: item.quantity,
        })),
      };

      const response = await api.post('/pedidos', payload);

      clearCart();

      toast({
        description: (
          <div className="flex items-center gap-4 bg-white">
            <span className="text-[#717F96]">{response.data?.mensagem}</span>
          </div>
        ),
        action: (
          <ToastAction
            altText="close"
            className="shadow-none border-none text-[#717F96] hover:bg-transparent"
          >
            .
          </ToastAction>
        ),
        className:
          'border-l-4 border-l-[#ff8300] border-t-0 border-b-0 border-r-0',
      });
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast({
          description: (
            <div className="flex items-center gap-4 ">
              <div className="rounded-full w-8 h-8 flex justify-center items-center bg-[fill: rgba(251, 55, 72, 0.16)]"></div>

              <span className="text-[#717F96]">
                {error?.response?.data.mensagem}
              </span>
            </div>
          ),
          action: (
            <ToastAction
              altText="close"
              className="shadow-none border-none text-[#717F96] hover:bg-transparent"
            >
              .
            </ToastAction>
          ),
          className:
            'border-l-4 border-l-[#FB3748] border-t-0 border-b-0 border-r-0',
        });
      }
    }
  };

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
              handleCheckout();
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
