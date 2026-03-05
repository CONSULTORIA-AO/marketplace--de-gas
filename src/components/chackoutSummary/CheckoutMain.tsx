import { AnimatePresence, motion } from 'framer-motion';
import type { UseFormReturn } from 'react-hook-form';
import type { CheckoutFormData } from '@/lib/validations';
import { CheckoutFirstStap } from './CheckoutFirstStap';
import { CheckoutPaymentStep } from './CheckoutPaymentStap';
import { CheckoutConfirmStep } from './CheckoutConfirmStap';
import { useState } from 'react';

export type PaymentMethod =
  | 'multicaixa_express'
  | 'transferencia_bancaria'
  | 'referencia_multicaixa'
  | 'tpa_pos'
  | 'pagamento_dinheiro'
  | 'unitel_money';

interface CheckoutMainProps {
  step: number;
  form: UseFormReturn<CheckoutFormData>;
  onNext: (data?: CheckoutFormData) => void;
  onPrev: () => void;
  isSubmitting?: boolean;
  completedOrderId?: number | null;
}

const STEP_META = [
  { label: 'Entrega', icon: 'location_on' },
  { label: 'Pagamento', icon: 'payments' },
  { label: 'Confirmação', icon: 'check_circle' },
];

const NEXT_STEP_PREVIEW = [
  {
    icon: 'payments',
    title: 'Pagamento',
    desc: 'Disponível após confirmar o endereço',
  },
  {
    icon: 'check_circle',
    title: 'Confirmação',
    desc: 'Disponível após selecionar o pagamento',
  },
];

export function CheckoutMain({
  step,
  form,
  onNext,
  onPrev,
  isSubmitting = false,
  completedOrderId,
}: CheckoutMainProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  );
  const phone = form.watch('phone') || '';

  const handleSelectPayment = (method: PaymentMethod) => {
    setSelectedMethod(method);
    form.setValue('paymentMethod', method);
  };

  const handlePhoneChange = (value: string) => form.setValue('phone', value);

  const steps = [
    {
      label: 'Entrega',
      component: <CheckoutFirstStap form={form} />,
    },
    {
      label: 'Pagamento',
      component: (
        <CheckoutPaymentStep
          selected={selectedMethod}
          onSelect={handleSelectPayment}
          phone={phone}
          onPhoneChange={handlePhoneChange}
        />
      ),
    },
    {
      label: 'Confirmação',
      component: <CheckoutConfirmStep orderId={completedOrderId} />,
    },
  ];

  const canProceed = () => {
    if (step === 2 && !selectedMethod) return false;
    return true;
  };

  return (
    <main className="lg:col-span-2">
      {/* ── Step nav ── */}
      <nav className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
        {STEP_META.map((s, idx) => {
          const num = idx + 1;
          const isActive = step === num;
          const isDone = step > num;
          return (
            <div key={s.label} className="flex items-center gap-2">
              <div
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl transition-all"
                style={{
                  background: isActive
                    ? 'rgba(249,115,22,0.15)'
                    : isDone
                      ? 'rgba(74,222,128,0.1)'
                      : 'rgba(255,255,255,0.04)',
                  border: `1.5px solid ${
                    isActive
                      ? 'rgba(249,115,22,0.5)'
                      : isDone
                        ? 'rgba(74,222,128,0.3)'
                        : 'rgba(255,255,255,0.1)'
                  }`,
                }}
              >
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black"
                  style={{
                    background: isActive
                      ? '#f97316'
                      : isDone
                        ? '#4ade80'
                        : 'rgba(255,255,255,0.1)',
                    color:
                      isActive || isDone ? '#000' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {isDone ? (
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 13 }}
                    >
                      check
                    </span>
                  ) : (
                    num
                  )}
                </div>
                <span
                  className="text-sm font-bold whitespace-nowrap"
                  style={{
                    color: isActive
                      ? '#f97316'
                      : isDone
                        ? '#4ade80'
                        : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {s.label}
                </span>
              </div>
              {idx < STEP_META.length - 1 && (
                <div
                  className="h-px w-6 flex-shrink-0 rounded-full"
                  style={{
                    background:
                      step > idx + 1 ? '#4ade80' : 'rgba(255,255,255,0.1)',
                  }}
                />
              )}
            </div>
          );
        })}
      </nav>

      {/* ── Step content ── */}
      <div className="mb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.28 }}
          >
            {steps[step - 1].component}
          </motion.div>
        </AnimatePresence>

        {/* Next step preview */}
        {step < steps.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 opacity-40"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-px flex-1"
                style={{ background: 'rgba(249,115,22,0.2)' }}
              />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                Próxima Etapa
              </span>
              <div
                className="h-px flex-1"
                style={{ background: 'rgba(249,115,22,0.2)' }}
              />
            </div>
            <div
              className="p-6 rounded-2xl flex flex-col items-center justify-center text-center"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px dashed rgba(249,115,22,0.2)',
              }}
            >
              <span
                className="material-symbols-outlined text-4xl mb-2"
                style={{ color: 'rgba(249,115,22,0.3)' }}
              >
                {NEXT_STEP_PREVIEW[step - 1]?.icon}
              </span>
              <h2
                className="font-bold text-base"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {NEXT_STEP_PREVIEW[step - 1]?.title}
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                {NEXT_STEP_PREVIEW[step - 1]?.desc}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Navigation buttons ── */}
      {step < 3 && (
        <div className="flex justify-between items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={onPrev}
            disabled={step === 1}
            className="flex items-center gap-2 px-6 h-12 rounded-2xl text-sm font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: 'transparent',
              border: '1.5px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 16 }}
            >
              arrow_back
            </span>
            Voltar
          </motion.button>

          <motion.button
            whileHover={{ scale: canProceed() ? 1.02 : 1 }}
            whileTap={{ scale: canProceed() ? 0.97 : 1 }}
            type="button"
            onClick={() => onNext(form.getValues())}
            disabled={!canProceed() || isSubmitting}
            className="flex items-center gap-2 px-8 h-12 rounded-2xl text-sm font-extrabold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: canProceed()
                ? 'linear-gradient(135deg, #f97316, #ea580c)'
                : 'rgba(255,255,255,0.08)',
              color: canProceed() ? '#ffffff' : 'rgba(255,255,255,0.3)',
              boxShadow: canProceed()
                ? '0 6px 20px rgba(249,115,22,0.3)'
                : 'none',
              border: 'none',
            }}
          >
            {isSubmitting ? (
              <>
                <span
                  className="material-symbols-outlined animate-spin"
                  style={{ fontSize: 16 }}
                >
                  autorenew
                </span>
                A processar…
              </>
            ) : (
              <>
                {step === 2 ? 'Finalizar Pedido' : 'Próximo'}
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 16 }}
                >
                  {step === 2 ? 'check_circle' : 'arrow_forward'}
                </span>
              </>
            )}
          </motion.button>
        </div>
      )}
    </main>
  );
}
