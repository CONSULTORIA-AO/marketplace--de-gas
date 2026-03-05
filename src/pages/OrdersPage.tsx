import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { ClientOrder } from '@/components/order/ClientOrder';
import { ClientOrderHistory } from '@/components/order/ClientOrderHistory';
import { OrderDetails } from '@/components/order/OrderDetails';

export function OrdersPage() {
  const navigate = useNavigate();
  const [selectedPedidoId, setSelectedPedidoId] = useState<number | null>(null);

  return (
    <div
      style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        minHeight: '100vh',
      }}
    >
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden font-display">
        <Header />

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* ── Título da página ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-wrap items-start justify-between gap-4"
            >
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-[0.2em] mb-1"
                  style={{ color: 'rgba(249,115,22,0.7)' }}
                >
                  Gás Rápido
                </p>
                <h1
                  className="text-3xl sm:text-4xl font-black tracking-tight leading-tight"
                  style={{ color: '#ffffff', letterSpacing: '-0.02em' }}
                >
                  Meus Pedidos
                </h1>
                <p
                  className="text-sm mt-1"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  Acompanhe e gerencie seus pedidos de gás.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/produtos')}
                className="flex items-center gap-2 h-11 px-5 rounded-2xl text-sm font-extrabold transition-all mt-1"
                style={{
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  color: '#ffffff',
                  boxShadow: '0 6px 20px rgba(249,115,22,0.3)',
                  border: 'none',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18 }}
                >
                  add_circle
                </span>
                Novo Pedido
              </motion.button>
            </motion.div>

            {/* ── Cards de estatísticas ── */}
            <ClientOrder />

            {/* ── Divisor ── */}
            <div
              style={{
                height: 1,
                background:
                  'linear-gradient(90deg, rgba(249,115,22,0.3), transparent)',
              }}
            />

            {/* ── Tabela + detalhe ── */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <ClientOrderHistory
                onSelectOrder={(id) => setSelectedPedidoId(id)}
                selectedOrderId={selectedPedidoId}
              />

              {selectedPedidoId !== null && (
                <OrderDetails pedidoId={selectedPedidoId} />
              )}
            </div>
          </div>
        </main>

        {/* ── Footer ── */}
        <footer
          className="py-10 mt-8"
          style={{
            borderTop: '1px solid rgba(249,115,22,0.2)',
            backgroundColor: '#000000',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div
              className="flex items-center justify-center gap-2 mb-3"
              style={{ color: '#f97316' }}
            >
              <span className="material-symbols-outlined text-xl">
                local_fire_department
              </span>
              <h2 className="text-base font-bold tracking-tight">Gás Rápido</h2>
            </div>
            <p
              className="text-xs font-medium"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              © 2024 Gás Rápido Marketplace. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
