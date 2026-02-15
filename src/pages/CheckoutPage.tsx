import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { checkoutSchema, type CheckoutFormData } from '@/lib/validations';
import { useCartStore } from '@/store/cartstore';
import { api } from '@/lib/axios';
import { Header } from '@/components/Header';
import type { Address, Order } from '@/types/index';
import { CheckoutMain } from '@/components/chackoutSummary/CheckoutMain';
import { Aside } from '@/components/chackoutSummary/Aside';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, getTotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  // Buscar endereços do usuário
  const { data: addresses } = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const response = await api.get<Address[]>('/addresses');
      return response.data;
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: async (data: CheckoutFormData) => {
      const response = await api.post<Order>('/orders', {
        ...data,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      });
      return response.data;
    },
    onSuccess: (order) => {
      clearCart();
      toast({
        title: 'Pedido realizado com sucesso!',
        description: `Seu pedido #${order.id} foi confirmado.`,
      });
      navigate('/pedidos');
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao finalizar pedido',
        description: error.response?.data?.message || 'Tente novamente',
      });
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    checkoutMutation.mutate(data);
  };

  const selectedAddressId = watch('addressId');
  const selectedAddress = addresses?.find(
    (addr) => addr.id === selectedAddressId
  );

  return (
    <div className="font-display text-slate-700">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-3 lg:gap-12">
          <CheckoutMain />
          <Aside />
        </div>
      </div>
    </div>
  );
}
