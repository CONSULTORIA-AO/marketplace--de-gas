import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { CartItem } from '@/types/index';

interface AsideProps {
  step: number;
  cartItems: CartItem[];
}

const DELIVERY_FEE = 500;

export function Aside({ step, cartItems }: AsideProps) {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.preco,
    0
  );
  const total = subtotal + DELIVERY_FEE;

  return (
    <aside className="lg:col-span-1 mt-10 lg:mt-0">
      <div className="sticky top-8 space-y-4">
        {/* Main summary card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
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
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(249,115,22,0.15)',
                border: '1px solid rgba(249,115,22,0.35)',
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: '#f97316', fontSize: 18 }}
              >
                shopping_basket
              </span>
            </div>
            <h2
              className="text-base font-extrabold"
              style={{ color: '#ffffff' }}
            >
              Resumo do Pedido
            </h2>
          </div>

          {/* Items */}
          <div className="px-6 py-4 space-y-3">
            {cartItems.length === 0 ? (
              <p
                className="text-sm text-center py-4"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Carrinho vazio
              </p>
            ) : (
              cartItems.map((item) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 py-3"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {/* Product image / placeholder */}
                  <div
                    className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: 'rgba(249,115,22,0.08)',
                      border: '1px solid rgba(249,115,22,0.2)',
                    }}
                  >
                    {item.product.imagem_produto ? (
                      <img
                        src={item.product.imagem_produto}
                        alt={item.product.descricao}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span
                        className="material-symbols-outlined"
                        style={{ color: '#f97316', fontSize: 22 }}
                      >
                        local_fire_department
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-bold truncate"
                      style={{ color: '#ffffff' }}
                    >
                      {item.product.descricao}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className="text-xs px-2 py-0.5 rounded-lg font-bold"
                        style={{
                          background: 'rgba(249,115,22,0.12)',
                          color: '#f97316',
                        }}
                      >
                        ×{item.quantity}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: 'rgba(255,255,255,0.4)' }}
                      >
                        KZ {item.product.preco.toLocaleString('pt-AO')} / un.
                      </span>
                    </div>
                  </div>

                  <p
                    className="text-sm font-black flex-shrink-0"
                    style={{ color: '#ffffff' }}
                  >
                    KZ{' '}
                    {(item.product.preco * item.quantity).toLocaleString(
                      'pt-AO'
                    )}
                  </p>
                </motion.div>
              ))
            )}
          </div>

          {/* Financial breakdown */}
          <div className="px-6 pb-4 space-y-3">
            <div style={{ height: 1, background: 'rgba(249,115,22,0.15)' }} />
            {[
              { label: 'Subtotal', value: subtotal, accent: false },
              {
                label: 'Taxa de entrega',
                value: DELIVERY_FEE,
                accent: false,
                icon: 'local_shipping',
              },
            ].map(({ label, value, icon }) => (
              <div key={label} className="flex justify-between items-center">
                <span
                  className="text-sm flex items-center gap-1.5"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  {icon && (
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 14, color: '#4ade80' }}
                    >
                      {icon}
                    </span>
                  )}
                  {label}
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  KZ {value.toLocaleString('pt-AO')}
                </span>
              </div>
            ))}
            <div style={{ height: 1, background: 'rgba(249,115,22,0.15)' }} />

            {/* Total */}
            <div className="flex justify-between items-center pt-1">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
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
              {step === 3 && (
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                  style={{
                    background: 'rgba(74,222,128,0.1)',
                    border: '1px solid rgba(74,222,128,0.3)',
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 14, color: '#4ade80' }}
                  >
                    check_circle
                  </span>
                  <span
                    className="text-xs font-bold"
                    style={{ color: '#4ade80' }}
                  >
                    Pago
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Trust badges */}
          <div className="px-6 pb-6 space-y-2">
            <div
              className="flex items-center justify-center gap-2 py-2.5 rounded-2xl"
              style={{
                background: 'rgba(74,222,128,0.06)',
                border: '1px solid rgba(74,222,128,0.15)',
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 15, color: '#4ade80' }}
              >
                schedule
              </span>
              <span className="text-xs font-bold" style={{ color: '#4ade80' }}>
                Entrega em até 45 minutos
              </span>
            </div>
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
              <span className="text-xs font-medium">Checkout 100% Seguro</span>
            </div>
          </div>
        </motion.div>

        {/* Help link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-2"
        >
          <p
            className="text-xs mb-1"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Precisa de ajuda com o seu pedido?
          </p>
          <Link
            to="#"
            className="text-xs font-bold hover:underline"
            style={{ color: '#f97316' }}
          >
            Fale com o nosso suporte
          </Link>
        </motion.div>
      </div>
    </aside>
  );
}
