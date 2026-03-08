'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FcPhone } from 'react-icons/fc';
import { FaWhatsapp } from 'react-icons/fa';
import { LuMessageCircle } from 'react-icons/lu';
import { Header } from '@/components/layout/header';
import { useParams, useNavigate } from 'react-router-dom';
import { Footer } from '@/components/layout/footer';
import { useProductById } from '@/service/product/product';
import { useCartStore } from '@/hooks/cartstore';
import { useAuthStore } from '@/hooks/auth';
import { useToast } from '@/hooks/use-toast';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: product, isLoading, isError, error } = useProductById(id);
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const [qty, setQty] = useState(1);
  const [cartDone, setCartDone] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;

    addItem(product, qty);

    setCartDone(true);
    setTimeout(() => setCartDone(false), 2000);

    toast({
      title: "Adicionado!",
      description: `${qty}x ${product.descricao} no carrinho`,
      duration: 3000,
    });

    // Vai direto para o carrinho
    navigate('/carrinho');
  };

  const handleBuyNow = () => {
    if (!product) return;

    // Adiciona ao carrinho primeiro
    addItem(product, qty);

    if (!isAuthenticated) {
      toast({
        title: "Atenção",
        description: "Inicie sessão para finalizar a compra",
        variant: "destructive",
      });
      navigate("/iniciar-sessao?redirect=/carrinho");
      return;
    }

    // Se já estiver logado, vai direto para checkout
    navigate('/carrinho'); // ou '/checkout' se tiveres essa página
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (isError || !product) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">Produto não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Header onSearch={() => {}} />

      {/* Breadcrumb, etc. — mantém igual */}

      <div className="w-full px-4 lg:px-8 py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* LEFT - Galeria e descrição */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-snug mb-1">
                {product.descricao}
              </h1>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-black text-[#FFA500]">
                  {product.preco.toLocaleString('pt-AO')} Kz
                </span>
              </div>

              {/* Imagem principal */}
              <div className="mt-6">
                <div className="relative rounded-2xl overflow-hidden bg-gray-50" style={{ height: 480 }}>
                  <img
                    src={
                      product.imagem_produto
                        ? `${import.meta.env.VITE_API_URL}/images/products${product.imagem_produto.startsWith('/') ? '' : '/'}${product.imagem_produto}`
                        : "https://via.placeholder.com/600x600?text=Sem+Imagem"
                    }
                    alt={product.descricao}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/600x600?text=Imagem+Indisponível";
                    }}
                  />
                </div>
              </div>

              {/* Quantidade e botões */}
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-4 py-3 text-gray-500 hover:bg-gray-50 font-bold text-lg transition-colors"
                  >
                    −
                  </button>
                  <span className="px-5 py-3 text-sm font-bold text-gray-800 border-x border-gray-200 min-w-[48px] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="px-4 py-3 text-gray-500 hover:bg-gray-50 font-bold text-lg transition-colors"
                  >
                    +
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-xl border-2 border-[#FFA500] text-[#FFA500] font-bold text-sm hover:bg-[#FFA500]/10 transition-colors"
                >
                  {cartDone ? '✓ Adicionado!' : 'Adicionar no Carrinho'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBuyNow}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-[#FFA500] text-white font-bold text-sm shadow-md hover:bg-[#e69500] transition-colors"
                >
                  Comprar agora
                </motion.button>
              </div>
            </div>
          </div>

          {/* RIGHT — Seller e info */}
          {/* mantém igual */}
        </div>
      </div>

      <Footer />
    </div>
  );
}