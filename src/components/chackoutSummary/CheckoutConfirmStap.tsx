import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface CheckoutConfirmStepProps {
  orderId?: number | null;
}

export function CheckoutConfirmStep({ orderId }: CheckoutConfirmStepProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="rounded-3xl p-10 sm:p-14 text-center space-y-8"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1.5px solid rgba(74,222,128,0.3)',
        boxShadow:
          '0 8px 60px rgba(74,222,128,0.08), 0 0 0 1px rgba(74,222,128,0.05)',
      }}
    >
      {/* Animated check */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: 0.15,
          type: 'spring',
          stiffness: 200,
          damping: 15,
        }}
        className="flex items-center justify-center mx-auto w-24 h-24 rounded-3xl"
        style={{
          background: 'rgba(74,222,128,0.1)',
          border: '2px solid rgba(74,222,128,0.35)',
          boxShadow: '0 0 40px rgba(74,222,128,0.15)',
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 52, color: '#4ade80' }}
        >
          check_circle
        </span>
      </motion.div>

      {/* Texts */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <h2
          className="text-2xl sm:text-3xl font-black tracking-tight"
          style={{ color: '#ffffff', letterSpacing: '-0.02em' }}
        >
          Pedido Confirmado!
        </h2>
        {orderId && (
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl mx-auto"
            style={{
              background: 'rgba(249,115,22,0.1)',
              border: '1px solid rgba(249,115,22,0.3)',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 15, color: '#f97316' }}
            >
              receipt
            </span>
            <span className="text-sm font-bold" style={{ color: '#f97316' }}>
              Pedido #{orderId}
            </span>
          </div>
        )}
        <p
          className="text-base leading-relaxed max-w-sm mx-auto"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          O seu pedido foi recebido e está a ser processado. Entrega em até{' '}
          <strong style={{ color: 'rgba(255,255,255,0.85)' }}>
            45 minutos
          </strong>
          .
        </p>
      </motion.div>

      {/* Timeline preview */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-2 flex-wrap"
      >
        {[
          { icon: 'check_circle', label: 'Confirmado', done: true },
          { icon: 'autorenew', label: 'Preparando', done: false },
          { icon: 'local_shipping', label: 'A Caminho', done: false },
          { icon: 'home', label: 'Entregue', done: false },
        ].map(({ icon, label, done }, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: done
                    ? 'rgba(74,222,128,0.15)'
                    : 'rgba(255,255,255,0.04)',
                  border: `1.5px solid ${done ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 16,
                    color: done ? '#4ade80' : 'rgba(255,255,255,0.2)',
                  }}
                >
                  {icon}
                </span>
              </div>
              <span
                className="text-xs font-semibold"
                style={{
                  color: done
                    ? 'rgba(255,255,255,0.7)'
                    : 'rgba(255,255,255,0.2)',
                }}
              >
                {label}
              </span>
            </div>
            {i < 3 && (
              <div
                className="w-6 h-0.5 mb-4 rounded-full"
                style={{
                  background: done ? '#4ade80' : 'rgba(255,255,255,0.08)',
                }}
              />
            )}
          </div>
        ))}
      </motion.div>

      {/* Info cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left"
      >
        {[
          {
            icon: 'schedule',
            label: 'Tempo de entrega',
            value: 'Até 45 minutos',
          },
          { icon: 'support_agent', label: 'Suporte', value: 'Disponível 24h' },
        ].map(({ icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-3 p-4 rounded-2xl"
            style={{
              background: 'rgba(249,115,22,0.05)',
              border: '1px solid rgba(249,115,22,0.15)',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ color: '#f97316', fontSize: 20 }}
            >
              {icon}
            </span>
            <div>
              <p
                className="text-xs"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {label}
              </p>
              <p className="text-sm font-bold" style={{ color: '#ffffff' }}>
                {value}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/pedidos')}
          className="flex items-center justify-center gap-2 h-12 px-7 rounded-2xl text-sm font-extrabold"
          style={{
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            color: '#ffffff',
            boxShadow: '0 6px 20px rgba(249,115,22,0.3)',
            border: 'none',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
            receipt_long
          </span>
          Ver Meus Pedidos
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/produtos')}
          className="flex items-center justify-center gap-2 h-12 px-7 rounded-2xl text-sm font-bold"
          style={{
            background: 'transparent',
            border: '1.5px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
            storefront
          </span>
          Continuar Comprando
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
