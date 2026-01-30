import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CreditCard, MapPin, Clock, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { checkoutSchema, type CheckoutFormData } from '@/lib/validations';
import { useCartStore } from '@/store/cartstore';
import { api } from '@/lib/axios';
import { Header } from '@/components/layout/Header';
import type { Address, Order } from '@/types/index';

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
        items: items.map(item => ({
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
  const selectedAddress = addresses?.find(addr => addr.id === selectedAddressId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de Checkout */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Passo 1: Endereço de Entrega */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    1. Endereço de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {addresses?.map((address) => (
                    <label
                      key={address.id}
                      className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        value={address.id}
                        {...register('addressId')}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-medium">
                          {address.street}, {address.number}
                        </p>
                        {address.complement && (
                          <p className="text-sm text-gray-600">{address.complement}</p>
                        )}
                        <p className="text-sm text-gray-600">
                          {address.neighborhood} - {address.city}/{address.state}
                        </p>
                        <p className="text-sm text-gray-600">CEP: {address.zipCode}</p>
                        {address.isDefault && (
                          <span className="inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            Endereço padrão
                          </span>
                        )}
                      </div>
                    </label>
                  ))}
                  {errors.addressId && (
                    <p className="text-sm text-destructive">{errors.addressId.message}</p>
                  )}
                </CardContent>
              </Card>

              {/* Passo 2: Forma de Pagamento */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    2. Forma de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { value: 'credit_card', label: 'Cartão de Crédito' },
                    { value: 'debit_card', label: 'Cartão de Débito' },
                    { value: 'pix', label: 'PIX' },
                    { value: 'money', label: 'Dinheiro' },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        value={method.value}
                        {...register('paymentMethod')}
                      />
                      <span className="font-medium">{method.label}</span>
                    </label>
                  ))}
                  {errors.paymentMethod && (
                    <p className="text-sm text-destructive">{errors.paymentMethod.message}</p>
                  )}
                </CardContent>
              </Card>

              {/* Passo 3: Horário de Entrega */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    3. Horário de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { value: 'morning', label: 'Manhã (8h - 12h)' },
                    { value: 'afternoon', label: 'Tarde (12h - 18h)' },
                    { value: 'evening', label: 'Noite (18h - 22h)' },
                  ].map((time) => (
                    <label
                      key={time.value}
                      className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        value={time.value}
                        {...register('deliveryTime')}
                      />
                      <span className="font-medium">{time.label}</span>
                    </label>
                  ))}
                  {errors.deliveryTime && (
                    <p className="text-sm text-destructive">{errors.deliveryTime.message}</p>
                  )}
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={checkoutMutation.isPending}
              >
                {checkoutMutation.isPending ? 'Processando...' : 'Confirmar Pedido'}
              </Button>
            </form>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-medium">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">R$ {getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxa de Entrega</span>
                    <span className="font-medium text-green-600">Grátis</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      R$ {getTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}