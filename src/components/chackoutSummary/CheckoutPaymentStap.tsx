import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Building2,
  CreditCard,
  Banknote,
  QrCode,
  Wallet,
} from 'lucide-react';

export type PaymentMethod =
  | 'multicaixa_express'
  | 'transferencia_bancaria'
  | 'referencia_multicaixa'
  | 'tpa_pos'
  | 'pagamento_dinheiro'
  | 'unitel_money';

interface PaymentOption {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'multicaixa_express',
    label: 'Multicaixa Express',
    description: 'Pagamento via app Multicaixa',
    icon: <QrCode className="h-5 w-5" />,
    badge: 'Popular',
  },
  {
    id: 'unitel_money',
    label: 'Unitel Money',
    description: 'Pagamento via Unitel Money',
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    id: 'transferencia_bancaria',
    label: 'Transferência Bancária',
    description: 'Transferência via banco angolano',
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    id: 'referencia_multicaixa',
    label: 'Referência Multicaixa',
    description: 'Pagar no ATM com referência',
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: 'tpa_pos',
    label: 'TPA / POS',
    description: 'Cartão na entrega',
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    id: 'pagamento_dinheiro',
    label: 'Dinheiro na Entrega',
    description: 'Pagar em dinheiro ao receber',
    icon: <Banknote className="h-5 w-5" />,
  },
];

interface Props {
  selected: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
  phone: string;
  onPhoneChange: (value: string) => void;
}

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1.5px solid rgba(249,115,22,0.25)',
  borderRadius: 14,
  color: '#ffffff',
  height: 48,
  padding: '0 16px',
  fontSize: 14,
  fontWeight: 500,
  outline: 'none',
  width: '100%',
};

export function CheckoutPaymentStep({
  selected,
  onSelect,
  phone,
  onPhoneChange,
}: Props) {
  const needsPhone =
    selected === 'multicaixa_express' || selected === 'unitel_money';
  const needsBankInfo = selected === 'transferencia_bancaria';
  const needsRef = selected === 'referencia_multicaixa';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl p-7 sm:p-9 space-y-7"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1.5px solid rgba(249,115,22,0.3)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: 'rgba(249,115,22,0.15)',
            border: '1px solid rgba(249,115,22,0.35)',
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ color: '#f97316', fontSize: 20 }}
          >
            payments
          </span>
        </div>
        <div>
          <h2 className="text-lg font-extrabold" style={{ color: '#ffffff' }}>
            Método de Pagamento
          </h2>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Escolha como pretende pagar
          </p>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background:
            'linear-gradient(90deg, rgba(249,115,22,0.4), transparent)',
        }}
      />

      {/* Payment grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {paymentOptions.map((option, i) => {
          const isSelected = selected === option.id;
          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(option.id)}
              className="flex items-center gap-3 p-4 rounded-2xl text-left relative overflow-hidden transition-all"
              style={{
                background: isSelected
                  ? 'rgba(249,115,22,0.12)'
                  : 'rgba(255,255,255,0.03)',
                border: `1.5px solid ${isSelected ? '#f97316' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: isSelected
                  ? '0 0 20px rgba(249,115,22,0.15)'
                  : 'none',
              }}
            >
              {/* Glow on select */}
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, rgba(249,115,22,0.2), transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />
              )}

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: isSelected ? '#f97316' : 'rgba(255,255,255,0.07)',
                  color: isSelected ? '#000' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.2s',
                }}
              >
                {option.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p
                    className="text-sm font-bold truncate"
                    style={{
                      color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {option.label}
                  </p>
                  {option.badge && (
                    <span
                      className="text-xs font-bold px-1.5 py-0.5 rounded-lg flex-shrink-0"
                      style={{
                        background: 'rgba(249,115,22,0.2)',
                        color: '#f97316',
                        fontSize: 10,
                      }}
                    >
                      {option.badge}
                    </span>
                  )}
                </div>
                <p
                  className="text-xs truncate mt-0.5"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  {option.description}
                </p>
              </div>

              {/* Check */}
              {isSelected && (
                <span
                  className="material-symbols-outlined flex-shrink-0"
                  style={{ color: '#f97316', fontSize: 18 }}
                >
                  check_circle
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Conditional extra info */}
      <AnimatePresence mode="wait">
        {needsPhone && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden space-y-3"
          >
            <div
              className="p-5 rounded-2xl space-y-4"
              style={{
                background: 'rgba(249,115,22,0.06)',
                border: '1px solid rgba(249,115,22,0.2)',
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                Número de Telefone
              </p>
              <input
                type="tel"
                placeholder="9XX XXX XXX"
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value)}
                maxLength={12}
                style={inputStyle}
              />
              <p
                className="text-xs"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                Será enviado um pedido de pagamento para este número.
              </p>
            </div>
          </motion.div>
        )}

        {needsBankInfo && (
          <motion.div
            key="bank"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className="p-5 rounded-2xl space-y-3"
              style={{
                background: 'rgba(249,115,22,0.06)',
                border: '1px solid rgba(249,115,22,0.2)',
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                Dados Bancários
              </p>
              {[
                {
                  label: 'Banco',
                  value: 'BAI — Banco Angolano de Investimentos',
                },
                { label: 'IBAN', value: 'AO06 0040 0000 1234 5678 9012 3' },
                { label: 'Titular', value: 'GásExpress Angola, Lda' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-xs font-bold font-mono"
                    style={{ color: '#ffffff' }}
                  >
                    {value}
                  </span>
                </div>
              ))}
              <p
                className="text-xs pt-1"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Após a transferência, envie o comprovativo para confirmar o
                pedido.
              </p>
            </div>
          </motion.div>
        )}

        {needsRef && (
          <motion.div
            key="ref"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className="p-5 rounded-2xl space-y-3"
              style={{
                background: 'rgba(249,115,22,0.06)',
                border: '1px solid rgba(249,115,22,0.2)',
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                Referência de Pagamento
              </p>
              {[
                { label: 'Entidade', value: '00123' },
                { label: 'Referência', value: '456 789 012' },
                { label: 'Montante', value: 'Valor total do pedido' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-xs font-bold font-mono"
                    style={{ color: '#ffffff' }}
                  >
                    {value}
                  </span>
                </div>
              ))}
              <p
                className="text-xs pt-1"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Dirija-se a qualquer ATM Multicaixa e selecione "Pagamentos por
                Referência".
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
