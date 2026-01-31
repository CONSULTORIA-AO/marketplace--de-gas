import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CreditCard, MapPin, Clock, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/Label';
import { useToast } from '@/components/ui/use-toast';
import { checkoutSchema, type CheckoutFormData } from '@/lib/validations';
import { useCartStore } from '@/store/cartstore';
import { api } from '@/lib/axios';
import { Header } from '@/components/layout/Header';
import type { Address, Order } from '@/types/index';
import { Input } from '@/components/ui/input';

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
    <div className="font-display text-slate-700">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
    <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-3 lg:gap-12">
    <main className="lg:col-span-2">
    <nav className="flex items-center gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
    <div className="flex items-center gap-2 px-4 py-2 bg-step-active rounded-full border border-blue-100">
    <span className="flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full text-xs font-bold">1</span>
    <span className="text-primary font-semibold text-sm whitespace-nowrap">Entrega</span>
    </div>
    <div className="h-px w-8 bg-border-gray"></div>
    <div className="flex items-center gap-2 px-4 py-2 bg-step-inactive rounded-full border border-transparent">
    <span className="flex items-center justify-center w-6 h-6 bg-gray-300 text-white rounded-full text-xs font-bold">2</span>
    <span className="text-gray-500 font-medium text-sm whitespace-nowrap">Pagamento</span>
    </div>
    <div className="h-px w-8 bg-border-gray"></div>
    <div className="flex items-center gap-2 px-4 py-2 bg-step-inactive rounded-full border border-transparent">
    <span className="flex items-center justify-center w-6 h-6 bg-gray-300 text-white rounded-full text-xs font-bold">3</span>
    <span className="text-gray-500 font-medium text-sm whitespace-nowrap">Confirmação</span>
    </div>
    </nav>
    <div className="mb-12">
    <div className="mb-8">
    <h1 className="text-slate-900 text-3xl font-extrabold leading-tight tracking-tight mb-2">Onde você quer receber seu gás?</h1>
    <p className="text-slate-500 text-base">Preencha o endereço para localizarmos o revendedor mais próximo.</p>
    </div>
    <div className="bg-white p-6 sm:p-10 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-border-gray">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
  
    <div className="sm:col-span-2">
    <Label className="flex flex-col w-full">
    <span className="text-slate-700 text-sm font-semibold mb-2">Endereço (Rua/Avenida)</span>
    <Input className="form-input block w-full rounded-lg border-border-gray bg-white text-slate-900 focus:border-primary focus:ring-primary/20 h-12 px-4 text-base transition-all" type="text" value="Avenida Brasil"/>
    </Label>
    </div>
    <div className="sm:col-span-1">
    <Label className="flex flex-col w-full">
    <span className="text-slate-700 text-sm font-semibold mb-2">Número</span>
    <Input className="form-input block w-full rounded-lg border-border-gray bg-white text-slate-900 focus:border-primary focus:ring-primary/20 h-12 px-4 text-base transition-all" type="text" value="123"/>
    </Label>
    </div>
    <div className="sm:col-span-1">
    <Label className="flex flex-col w-full">
    <span className="text-slate-700 text-sm font-semibold mb-2">Complemento (Opcional)</span>
    <Input className="form-input block w-full rounded-lg border-border-gray bg-white text-slate-900 focus:border-primary focus:ring-primary/20 h-12 px-4 text-base transition-all" type="text" value="Apto 4B"/>
    </Label>
    </div>
    <div className="sm:col-span-2">
    <Label className="flex flex-col w-full">
    <span className="text-slate-700 text-sm font-semibold mb-2">Bairro</span>
    <Input className="form-input block w-full rounded-lg border-border-gray bg-white text-slate-900 focus:border-primary focus:ring-primary/20 h-12 px-4 text-base transition-all" type="text" value="Centro"/>
    </Label>
    </div>
    <div className="sm:col-span-1">
    <Label className="flex flex-col w-full">
    <span className="text-slate-700 text-sm font-semibold mb-2">Cidade</span>
    <Input className="form-input block w-full rounded-lg border-border-gray bg-white text-slate-900 focus:border-primary focus:ring-primary/20 h-12 px-4 text-base transition-all" type="text" value="São Paulo"/>
    </Label>
    </div>
    <div className="sm:col-span-1">
    <Label className="flex flex-col w-full">
    <span className="text-slate-700 text-sm font-semibold mb-2">Estado</span>
    <select className="form-select block w-full rounded-lg border-border-gray bg-white text-slate-900 focus:border-primary focus:ring-primary/20 h-12 px-4 text-base transition-all">
    <option selected={true} value="SP">São Paulo (SP)</option>
    <option value="RJ">Rio de Janeiro (RJ)</option>
    <option value="MG">Minas Gerais (MG)</option>
    </select>
    </Label>
    </div>
    </div>
    </div>
    </div>
    <div className="opacity-50 grayscale-[0.5]">
    <div className="mb-6 flex items-center gap-3">
    <div className="h-px flex-1 bg-border-gray"></div>
    <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Próxima Etapa</span>
    <div className="h-px flex-1 bg-border-gray"></div>
    </div>
    <div className="bg-slate-50 border border-dashed border-slate-300 p-8 rounded-xl flex flex-col items-center justify-center text-center">
    <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">payments</span>
    <h2 className="text-slate-400 font-bold text-lg">Pagamento</h2>
    <p className="text-slate-400 text-sm">Disponível após confirmar o endereço</p>
    </div>
    </div>
    </main>
    <aside className="lg:col-span-1 mt-12 lg:mt-0">
    <div className="sticky top-8">
    <div className="bg-white p-6 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-border-gray">
    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
    <span className="material-symbols-outlined text-primary">shopping_basket</span>
      Resumo do Pedido
    </h2>
    <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
    <div className="w-16 h-16 flex-shrink-0 bg-accent-pastel rounded-lg p-2 flex items-center justify-center">
    <img alt="Botijão de Gás P13" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLBhMwhmRO0RyVWWqCxZ_CVEy0dEaTxCva39M6CTGFp-lJHGgeeUSyf7yrScRJQGjiUfDytzEZZRbmcGXZwSq4Gp-5BWZP7PvKDQVJPbj6zkTh_8wju9dlgwEzWd7lYpkNTbWkrXABqy03vKAOYKHuOg_DTjgMPm-PjlHHq8B0anz2gZmEjgvQWqfZuGrJUz7R_CLJ41U8XmZhco9JEkI3ZsnLCF9Wf0DTnM8x13m6os16qxWtHnH63lDhtHw2FSY4yNRdJ9l9CqI"/>
    </div>
    <div className="flex-1">
    <p className="font-bold text-slate-800 text-sm">Botijão de Gás P13</p>
    <p className="text-xs text-slate-500 font-medium">Quantidade: 1</p>
    </div>
    <p className="font-bold text-slate-900 text-sm whitespace-nowrap">R$ 110,00</p>
    </div>
    <div className="py-6 space-y-4 border-b border-slate-100">
    <div className="flex justify-between text-sm">
    <p className="text-slate-500">Subtotal</p>
    <p className="font-semibold text-slate-800">R$ 110,00</p>
    </div>
    <div className="flex justify-between text-sm">
    <p className="text-slate-500">Taxa de entrega</p>
    <p className="font-semibold text-green-600">R$ 5,00</p>
    </div>
    </div>
    <div className="flex justify-between items-center pt-6 mb-8">
    <div>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Total Link pagar</p>
    <p className="text-3xl font-black text-primary">R$ 115,00</p>
    </div>
    </div>
    <Button className="w-full bg-primary text-white font-bold py-4 px-6 rounded-lg hover:bg-[#00427c] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
      Continuar para Pagamento
      <span className="material-symbols-outlined text-xl">arrow_forward</span>
    </Button>
    <div className="mt-6 space-y-3">
    <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
    <span className="material-symbols-outlined text-sm">verified_user</span>
    <span>Checkout 100% Seguro</span>
    </div>
    <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 py-2 rounded-lg">
    <span className="material-symbols-outlined text-sm">schedule</span>
    <span>Entrega em até 45 minutos</span>
    </div>
    </div>
    </div>
    <div className="mt-4 p-4 text-center">
    <p className="text-xs text-slate-400">Precisa de ajuda com seu pedido?</p>
    <Link className="text-xs font-bold text-primary hover:underline" to="#">Fale com nosso suporte</Link>
    </div>
    </div>
    </aside>
    </div>
    </div>
    </div>
  );
}