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
}

export function CheckoutMain({
  step,
  form,
  onNext,
  onPrev,
}: CheckoutMainProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  );

  const phone = form.watch('phone') || '';

  const handleSelectPayment = (method: PaymentMethod) => {
    setSelectedMethod(method);
    form.setValue('paymentMethod', method);
  };

  const handlePhoneChange = (value: string) => {
    form.setValue('phone', value);
  };
  const steps = [
    { label: 'Entrega', component: <CheckoutFirstStap /> },
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
    { label: 'Confirmação', component: <CheckoutConfirmStep /> },
  ];

  return (
    <main className="lg:col-span-2">
      {/* Nav steps */}
      <nav className="flex items-center gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {steps.map((s, idx) => {
          const stepNum = idx + 1;
          const isActive = step === stepNum;
          return (
            <div key={s.label} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
                  isActive
                    ? 'bg-blue-100 border-blue-200'
                    : 'bg-gray-200 border-transparent'
                }`}
              >
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-white'
                  }`}
                >
                  {stepNum}
                </span>
                <span
                  className={`font-semibold text-sm whitespace-nowrap ${
                    isActive ? 'text-blue-600' : 'text-gray-500 font-medium'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="h-px w-8 bg-border-gray"></div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Step content with animation */}
      <div className="mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {steps[step - 1].component}
          </motion.div>
        </AnimatePresence>

        {/* Próxima etapa / Placeholder */}
        {step < steps.length && (
          <div className="opacity-50 grayscale-[0.5] mt-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border-gray"></div>
              <span className="text-slate-900 text-sm font-bold uppercase tracking-widest">
                Próxima Etapa
              </span>
              <div className="h-px flex-1 bg-border-gray"></div>
            </div>
            <div className="bg-slate-50 border border-dashed border-slate-300 p-8 rounded-xl flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">
                {step === 1 ? 'payments' : step === 2 ? 'check_circle' : ''}
              </span>
              <h2 className="font-bold text-lg text-black">
                {step === 1 ? 'Pagamento' : step === 2 ? 'Confirmação' : ''}
              </h2>
              <p className="text-black text-sm">
                {step === 1
                  ? 'Disponível após confirmar o endereço'
                  : step === 2
                    ? 'Disponível após o pagamento'
                    : ''}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navegação */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onPrev}
          disabled={step === 1}
          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={() => onNext(form.getValues())}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {step === steps.length ? 'Finalizar' : 'Próximo'}
        </button>
      </div>
    </main>
  );
}
