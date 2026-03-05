import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { checkoutSchema, type CheckoutFormData } from '@/lib/validations';
import { useCartStore } from '@/store/cartstore';
import { api } from '@/lib/axios';
import { Header } from '@/components/layout/Header';
import { CheckoutMain } from '@/components/chackoutSummary/CheckoutMain';
import { Aside } from '@/components/chackoutSummary/Aside';
import { motion } from 'framer-motion';
import { ToastAction } from '@/components/ui/toast';
import { AxiosError } from 'axios';
import { useUserStore } from '@/store/userIfo';

export function CheckoutPage() {
  const { toast } = useToast();
  const { items, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [completedOrderId, setCompletedOrderId] = useState<number | null>(null);
  const entidade = useUserStore((state) => state.cliente.clienteId);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const checkoutMutation = useMutation({
    mutationFn: async (data: CheckoutFormData) => {
      // Monta o payload conforme estrutura esperada pela API
      const payload = {
        clienteId: entidade,
        metodoPagamento: data.paymentMethod,
        telefone: data.phone ?? null,
        endereco: {
          rua: data.street,
          numero: data.number,
          complemento: data.complement ?? null,
          bairro: data.neighborhood,
          cidade: data.city,
          provincia: data.province,
        },
        itens: items.map((item) => ({
          produto_id: item.productId,
          quantidade: item.quantity,
          preco_unitario: item.product.preco,
          preco_total: item.product.preco * item.quantity,
        })),
      };
      const response = await api.post('/pedidos', payload);
      return response.data;
    },
    onSuccess: (data) => {
      const orderId = data?.mensagem?.pedidoCotacaoId ?? data?.pedidoCotacaoId;
      setCompletedOrderId(orderId);
      clearCart();
      setStep(3);
      toast({
        title: 'Pedido realizado com sucesso!',
        description: orderId
          ? `Pedido #${orderId} confirmado.`
          : 'Compra concluída!',
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast({
          description: (
            <div className="flex items-center gap-4 ">
              <div className="rounded-full w-8 h-8 flex justify-center items-center bg-[fill: rgba(251, 55, 72, 0.16)]"></div>

              <span className="text-[#717F96]">
                {error?.response?.data.mensagem}
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
      }
    },
  });

  const handleNextStep = (data?: CheckoutFormData) => {
    if (step === 1 && data) {
      setStep(2);
    } else if (step === 2) {
      checkoutMutation.mutate(form.getValues());
    }
  };

  const handlePrevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div
      style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        minHeight: '100vh',
      }}
      className="font-display"
    >
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto"
        >
          {/* Page title */}
          <div className="mb-8">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-1"
              style={{ color: 'rgba(249,115,22,0.7)' }}
            >
              Gás Rápido
            </p>
            <h1
              className="text-3xl font-black tracking-tight"
              style={{ color: '#ffffff', letterSpacing: '-0.02em' }}
            >
              Finalizar Compra
            </h1>
          </div>

          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            <CheckoutMain
              step={step}
              form={form}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
              isSubmitting={checkoutMutation.isPending}
              completedOrderId={completedOrderId}
            />
            <Aside step={step} cartItems={items} />
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer
        className="mt-16 py-8"
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
            <span className="text-sm font-bold">Gás Rápido</span>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © 2024 Gás Rápido Marketplace. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
