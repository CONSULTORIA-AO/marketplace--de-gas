'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GasProduct } from '@/types/product';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/hooks/cartstore';
import { useAuthStore } from '@/hooks/auth';
import { ToastAction } from '../ui/toast';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: GasProduct;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const token = useAuthStore((state) => state.session?.token);
  const { toast } = useToast();

  const formattedPrice = product.preco.toLocaleString('pt-AO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  function handleOrder(data: string) {
    if (!data) {
      toast({
        description: (
          <div className="flex items-center gap-4 ">
            <div className="rounded-full w-8 h-8 flex justify-center items-center bg-[fill: rgba(251, 55, 72, 0.16)]"></div>

            <span className="text-[#717F96]">
              Inicie Sessão para fazer a compra
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
      navigate('/iniciar-sessao?redirect=/carrinho');
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer group"
      style={{
        boxShadow: hovered
          ? '0 20px 60px rgba(18,89,195,0.15)'
          : '0 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      {/* Imagem do produto */}
      <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        {product.imagem_produto ? (
          <img
            src={
              product.imagem_produto
                ? `${import.meta.env.VITE_API_URL}images/products${product.imagem_produto}?${Date.now()}`
                : ''
            }
            alt={product.descricao}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <span className="text-7xl opacity-30">🛒</span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4 space-y-3">
        {/* Nome/Descrição */}
        <h3 className="text-gray-800 font-medium text-base leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.descricao}
        </h3>

        {/* Preço */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">
            {formattedPrice} <span className="text-lg">Kz</span>
          </span>
          {product.unidadeMedida && (
            <span className="text-sm text-gray-500">
              /{product.unidadeMedida}
            </span>
          )}
        </div>

        {/* Botões */}
        <div className="flex gap-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 py-3 rounded-lg bg-transparent border border-[#FFA500] text-[#FFA500] text-sm font-semibold hover:bg-[#FFA500]/10 transition-colors"
            onClick={() => {
              addItem(product);
              navigate('/carrinho');
            }}
          >
            Adicionar +
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 py-3 rounded-lg bg-[#FFA500] text-white text-sm font-semibold hover:bg-[#e69500] transition-colors"
            onClick={() => navigate(`/produto/${product.produtoId}`)}
          >
            Ver
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
