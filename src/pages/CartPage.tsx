import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartstore';
import { Header } from '@/components/layout/Header';
import { ProductsTables } from '@/components/chackoutSummary/ProducsTable';
import { OrderSummary } from '@/components/chackoutSummary/OrderSummary';
import { motion } from 'framer-motion';

export function CartPage() {
  const navigate = useNavigate();
  const { items, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  return (
    <div
      style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        minHeight: '100vh',
      }}
      className="font-display"
    >
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <Header />

        <main className="flex w-full flex-1 justify-center px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex w-full max-w-7xl flex-col gap-8">
            {/* Page title */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap items-end justify-between gap-4"
            >
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em] mb-1"
                  style={{ color: 'rgba(249,115,22,0.7)' }}
                >
                  Gás Rápido
                </p>
                <h1
                  className="text-3xl sm:text-4xl font-black tracking-tight"
                  style={{ color: '#ffffff', letterSpacing: '-0.02em' }}
                >
                  Meu Carrinho
                </h1>
                <p
                  className="text-sm mt-1"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {itemCount === 0
                    ? 'O seu carrinho está vazio.'
                    : `${itemCount} ${itemCount === 1 ? 'item' : 'itens'} no carrinho`}
                </p>
              </div>

              {items.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/produtos')}
                  className="flex items-center gap-2 h-10 px-5 rounded-2xl text-sm font-bold"
                  style={{
                    background: 'transparent',
                    border: '1.5px solid rgba(249,115,22,0.3)',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 16 }}
                  >
                    add
                  </span>
                  Adicionar mais
                </motion.button>
              )}
            </motion.div>

            {/* Empty state */}
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-24 gap-6 rounded-3xl"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1.5px dashed rgba(249,115,22,0.25)',
                }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-24 h-24 rounded-3xl flex items-center justify-center"
                  style={{
                    background: 'rgba(249,115,22,0.08)',
                    border: '2px solid rgba(249,115,22,0.2)',
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 46, color: '#f97316' }}
                  >
                    shopping_cart
                  </span>
                </motion.div>
                <div className="text-center space-y-2">
                  <p className="text-xl font-bold" style={{ color: '#ffffff' }}>
                    Carrinho vazio
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    Adicione produtos para continuar com a compra.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/produtos')}
                  className="flex items-center gap-2 h-12 px-7 rounded-2xl text-sm font-extrabold"
                  style={{
                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                    color: '#ffffff',
                    boxShadow: '0 6px 20px rgba(249,115,22,0.3)',
                    border: 'none',
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 16 }}
                  >
                    storefront
                  </span>
                  Ver Produtos
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="grid grid-cols-1 gap-8 lg:grid-cols-3"
              >
                <div className="lg:col-span-2">
                  <ProductsTables />
                </div>
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <OrderSummary />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer
          className="mt-8 py-8"
          style={{ borderTop: '1px solid rgba(249,115,22,0.15)' }}
        >
          <div className="container mx-auto px-6 text-center">
            <div
              className="flex items-center justify-center gap-2 mb-2"
              style={{ color: '#f97316' }}
            >
              <span className="material-symbols-outlined text-lg">
                local_fire_department
              </span>
              <span className="text-sm font-bold">JáGás</span>
            </div>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              © {new Date().getFullYear()} JáGás Marketplace.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
