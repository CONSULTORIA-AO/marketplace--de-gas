import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCartStore, DELIVERY_FEE } from '@/store/cart_store';

export function OrderSummary() {
  const navigate = useNavigate();
  const { items, getSubtotal, getTotal, getItemCount } = useCartStore();

  const subtotal = getSubtotal();
  const total = getTotal();
  const itemCount = getItemCount();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-3xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1.5px solid rgba(249,115,22,0.3)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
      }}
    >
      {/* Header */}
      <div
        className="px-6 pt-6 pb-4 flex items-center gap-3"
        style={{ borderBottom: '1px solid rgba(249,115,22,0.15)' }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{
            background: 'rgba(249,115,22,0.15)',
            border: '1px solid rgba(249,115,22,0.35)',
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ color: '#f97316', fontSize: 16 }}
          >
            receipt_long
          </span>
        </div>
        <h3 className="text-base font-extrabold" style={{ color: '#ffffff' }}>
          Resumo do Pedido
        </h3>
      </div>

      <div className="p-6 space-y-5">
        {/* Line items */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span
              className="text-sm"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              KZ {subtotal.toLocaleString('pt-AO')}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span
              className="text-sm flex items-center gap-1.5"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 14, color: '#4ade80' }}
              >
                local_shipping
              </span>
              Taxa de Entrega
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              KZ {DELIVERY_FEE.toLocaleString('pt-AO')}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background:
              'linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)',
          }}
        />

        {/* Total */}
        <div className="flex justify-between items-end">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Total
            </p>
            <p
              className="text-3xl font-black"
              style={{ color: '#f97316', letterSpacing: '-0.02em' }}
            >
              KZ {total.toLocaleString('pt-AO')}
            </p>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
            style={{
              background: 'rgba(74,222,128,0.08)',
              border: '1px solid rgba(74,222,128,0.2)',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 13, color: '#4ade80' }}
            >
              schedule
            </span>
            <span className="text-xs font-bold" style={{ color: '#4ade80' }}>
              ~45 min
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 pt-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/checkout')}
            disabled={items.length === 0}
            className="w-full h-13 rounded-2xl text-base font-extrabold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              height: 52,
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              color: '#ffffff',
              boxShadow: '0 6px 20px rgba(249,115,22,0.35)',
              border: 'none',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18 }}
            >
              bolt
            </span>
            Finalizar Compra
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/produtos')}
            className="w-full h-12 rounded-2xl text-sm font-bold flex items-center justify-center gap-2"
            style={{
              background: 'transparent',
              border: '1.5px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 16 }}
            >
              storefront
            </span>
            Continuar Comprando
          </motion.button>
        </div>

        {/* Trust badges */}
        <div className="space-y-2 pt-1">
          <div
            className="flex items-center justify-center gap-2"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 14 }}
            >
              verified_user
            </span>
            <span className="text-xs font-medium">Compra 100% Segura</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: 'lock', label: 'Encriptado' },
              { icon: 'replay', label: 'Suporte 24h' },
              { icon: 'verified', label: 'Certificado' },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 py-2 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 15, color: 'rgba(249,115,22,0.6)' }}
                >
                  {icon}
                </span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
