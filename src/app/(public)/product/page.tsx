'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FcPhone } from 'react-icons/fc';
import { FaWhatsapp } from 'react-icons/fa';
import { LuMessageCircle } from 'react-icons/lu';
import { Header } from '@/components/layout/header';
import { useNavigate, useParams } from 'react-router-dom';
import { Footer } from '@/components/layout/footer';
import { useProductById } from '@/service/product/product';
import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '@/hooks/cartstore';
import { useAuthStore } from '@/hooks/auth';
import { ToastAction } from '@/components/ui/toast';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

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

    addItem(product.mensagem, qty);

    setCartDone(true);
    setTimeout(() => setCartDone(false), 2000);

    toast({
      title: 'Adicionado!',
      description: `${qty}x ${product?.mensagem?.descricao} no carrinho`,
      duration: 3000,
    });

    // Vai direto para o carrinho
    navigate('/carrinho');
  };

  const handleBuyNow = () => {
    if (!product) return;

    // Adiciona ao carrinho primeiro
    addItem(product.mensagem, qty);

    if (!isAuthenticated) {
      toast({
        description: (
          <div className="flex items-center gap-4 ">
            <div className="rounded-full w-8 h-8 flex justify-center items-center bg-[fill: rgba(251, 55, 72, 0.16)]"></div>

            <span className="text-[#717F96]">
              Inicie Sessão para ver o carrinho e fazer a compra
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
      return;
    }

    // Se já estiver logado, vai direto para checkout
    navigate('/checkout'); // ou '/checkout' se tiveres essa página
  };

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

  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Produto não encontrado
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#f8f9fb]"
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      <Header onSearch={() => {}} />

      {/* ── Product Content ──────────────────────────────────────────────── */}
      <div className="w-full px-4 lg:px-8 py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* LEFT */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-snug mb-1">
                {product?.mensagem?.descricao}
              </h1>
              <span className="text-black">{product.mensagem.empresaDona}</span>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-black text-[#FFA500]">
                  {product?.mensagem?.preco?.toLocaleString('pt-AO')} Kz
                </span>
              </div>

              {/* Gallery */}
              <div className="flex gap-4">
                {/* Main */}
                <div
                  className="flex-1 relative rounded-2xl overflow-hidden bg-gray-50"
                  style={{ minHeight: 380 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={product.mensagem.produtoId}
                      src={`${import.meta.env.VITE_API_URL}/images/products/${product?.mensagem?.imagem_produto}`}
                      alt={product?.mensagem?.descricao}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover absolute inset-0"
                      style={{ minHeight: 380 }}
                    />
                  </AnimatePresence>
                </div>
              </div>
              {/* Qty + Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-4 py-3 text-gray-500 hover:bg-gray-50 font-bold text-lg transition-colors"
                  >
                    −
                  </button>
                  <span className="px-5 py-3 text-sm font-bold text-gray-800 border-x border-gray-200 min-w-[48px] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-4 py-3 text-gray-500 hover:bg-gray-50 font-bold text-lg transition-colors"
                  >
                    +
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-[#FFA500] text-white font-bold text-sm shadow-md hover:bg-[#FFA500] transition-colors"
                >
                  Compre agora
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-xl border-2 border-[#FFA500] text-[#FFA500] font-bold text-sm hover:bg-white transition-colors"
                >
                  {cartDone ? '✓ Adicionado!' : 'Adicionar no Carrinho'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
                  onClick={handleBuyNow}
                >
                  Ver o Carrinho
                </motion.button>
              </div>
            </div>
          </div>

          {/* RIGHT — Seller */}
          <div className="w-full xl:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 xl:sticky xl:top-28">
              {/* Seller avatar */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 mb-3 border-4 border-blue-50">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/images/${product?.mensagem?.vendedor?.logoEmpresa}`}
                    alt="Vendedor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-black text-gray-900 text-base">
                  {product?.mensagem?.vendedor?.nomeEmpresa}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Utilizador desde{' '}
                  {product?.mensagem?.vendedor?.empresa_time
                    ? format(
                        new Date(product.mensagem?.vendedor?.empresa_time),
                        'dd/MM/yyyy HH:mm:ss'
                      )
                    : 'Data não disponível'}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2.5">
                {[
                  {
                    label: product?.mensagem?.vendedor?.telefoneEmpresa,
                    icon: <FcPhone />,
                    primary: true,
                  },
                  { label: 'Whatsapp', icon: <FaWhatsapp />, primary: true },
                  {
                    label: 'Enviar mensagem',
                    icon: <LuMessageCircle />,
                    primary: true,
                  },
                ].map((btn, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-2.5 rounded-xl bg-[#FFA500] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#FFA500] transition-colors shadow-sm"
                  >
                    <span>{btn.icon}</span>
                    <span>{btn.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
