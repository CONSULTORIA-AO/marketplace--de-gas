'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GasProduct } from '@/types/product';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/hooks/cartstore';
import { ToastAction } from '../ui/toast';
import { useToast } from '@/hooks/use-toast';
import { useProductById } from '@/service/product/product';

interface ProductCardProps {
  product: GasProduct;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { data: productItem, isLoading } = useProductById(product.produtoId);

  const formattedPrice = product.preco.toLocaleString('pt-AO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer group flex flex-col"
      style={{
        boxShadow: hovered
          ? '0 20px 60px rgba(18,89,195,0.15)'
          : '0 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      {/* Imagem do produto */}
      <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center flex-shrink-0">
        {product.imagem_produto ? (
          <img
            src={`${import.meta.env.VITE_API_URL}images/products/${product.imagem_produto}`}
            alt={product.descricao}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <span className="text-5xl sm:text-7xl opacity-30">🛒</span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 gap-2">
        {/* Nome/Descrição */}
        <div>
            <h3 className="text-gray-800 font-medium text-sm sm:text-base leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.descricao}
        </h3>

        {/* Fornecedor */}
        <span className="text-gray-500 text-xs sm:text-sm truncate">
          {productItem?.vendedor?.nomeEmpresa}
        </span>
        </div>
        

        {/* Preço */}
        <div className="flex items-baseline gap-1 flex-wrap">
          <span className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight">
            {formattedPrice}
          </span>
          <span className="text-sm sm:text-lg font-bold text-gray-900">Kz</span>
        </div>

        {/* Botões — empurrados para o fundo do card */}
        <div className="flex gap-2 mt-auto pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 py-2 sm:py-3 rounded-lg bg-transparent border border-[#FFA500] text-[#FFA500] text-xs sm:text-sm font-semibold hover:bg-[#FFA500]/10 transition-colors"
            onClick={() => {
              addItem(product);
            }}
          >
            Adicionar +
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 py-2 sm:py-3 rounded-lg bg-[#FFA500] text-white text-xs sm:text-sm font-semibold hover:bg-[#e69500] transition-colors"
            onClick={() => navigate(`/produto/${product.produtoId}`)}
          >
            Ver
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
