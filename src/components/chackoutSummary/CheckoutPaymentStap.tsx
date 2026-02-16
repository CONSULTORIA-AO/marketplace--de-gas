import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Building2,
  CreditCard,
  Banknote,
  QrCode,
  Wallet,
  ChevronRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'multicaixa_express',
    label: 'Multicaixa Express',
    description: 'Pagamento via app Multicaixa Express',
    icon: <QrCode className="h-5 w-5" />,
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
    description: 'Pagamento com cartão na entrega',
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    id: 'pagamento_dinheiro',
    label: 'Dinheiro na Entrega',
    description: 'Pagar em dinheiro ao receber',
    icon: <Banknote className="h-5 w-5" />,
  },
];

interface PaymentMethodSelectorProps {
  selected: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
  phone: string;
  onPhoneChange: (value: string) => void;
}

export function CheckoutPaymentStep({
  selected,
  onSelect,
  phone,
  onPhoneChange,
}: PaymentMethodSelectorProps) {
  const needsPhone =
    selected === 'multicaixa_express' || selected === 'unitel_money';
  const needsBankInfo = selected === 'transferencia_bancaria';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="border border-border p-4 sm:p-6 space-y-4 dark:bg-surface-dark rounded-xl border-border-light dark:border-border-dark shadow-xl dark:text-white focus:outline-0 focus:ring-1  border-slate-200 dark:border-slate-700"
    >
      <h2 className="text-lg font-semibold text-foreground">
        Método de Pagamento
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {paymentOptions.map((option) => {
          const isSelected = selected === option.id;
          return (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(option.id)}
              className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-colors dark:bg-surface-dark border-border-light dark:border-border-dark shadow-md dark:text-white focus:outline-0 focus:ring-1 border-slate-200 dark:border-slate-700${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border bg-background hover:border-muted-foreground/30'
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {option.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${isSelected ? 'text-foreground' : 'text-foreground'}`}
                >
                  {option.label}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {option.description}
                </p>
              </div>
              {isSelected && (
                <ChevronRight className="h-4 w-4 text-primary shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {needsPhone && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 overflow-hidden"
          >
            <Label htmlFor="phone" className="text-sm text-foreground">
              Número de telefone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="9XX XXX XXX"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              className="bg-background dark:bg-surface-dark rounded-xl border-border-light dark:border-border-dark p-4 shadow-md dark:text-white focus:outline-0 focus:ring-1 border border-slate-200 dark:border-slate-700"
              maxLength={12}
            />
          </motion.div>
        )}

        {needsBankInfo && (
          <motion.div
            key="bank"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 overflow-hidden rounded-lg bg-secondary/50 p-4"
          >
            <p className="text-sm font-medium text-foreground">
              Dados para transferência:
            </p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Banco:</span> BAI
                - Banco Angolano de Investimentos
              </p>
              <p>
                <span className="font-medium text-foreground">IBAN:</span> AO06
                0040 0000 1234 5678 9012 3
              </p>
              <p>
                <span className="font-medium text-foreground">Titular:</span>{' '}
                GásExpress Angola, Lda
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Após a transferência, envie o comprovativo para confirmar o
              pedido.
            </p>
          </motion.div>
        )}

        {selected === 'referencia_multicaixa' && (
          <motion.div
            key="ref"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 overflow-hidden rounded-lg bg-secondary/50 p-4"
          >
            <p className="text-sm font-medium text-foreground">
              Referência de pagamento:
            </p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Entidade:</span>{' '}
                00123
              </p>
              <p>
                <span className="font-medium text-foreground">Referência:</span>{' '}
                456 789 012
              </p>
              <p>
                <span className="font-medium text-foreground">Montante:</span>{' '}
                Valor total do pedido
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Dirija-se a qualquer ATM Multicaixa e selecione "Pagamentos por
              Referência".
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
