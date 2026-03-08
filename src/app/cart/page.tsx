'use client';

import { useAuthStore } from '@/hooks/auth';
import { useCartStore } from '@/hooks/cartstore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartView } from '../customer/_components/cartView';
import { Header } from '@/components/layout/header';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotal, getItemCount } =
    useCartStore();
  const token = useAuthStore((state) => state.session?.token);
  const [searchTerm, setSearchTerm] = useState('');

  const cartTotal = getTotal();
  const itemCount = getItemCount();

  const handleBack = () => navigate(-1);

  const handleCheckout = () => {
    if (!token) {
      toast({
        description: (
          <div className="flex items-center gap-4 ">
            <div className="rounded-full w-8 h-8 flex justify-center items-center bg-[fill: rgba(251, 55, 72, 0.16)]"></div>

            <span className="text-[#717F96]">
              Inicie Sessão para fazer a compra
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
      navigate('/iniciar-sessao?redirect=/carrinho');
      return;
    }

    toast({
      description: (
        <div className="flex items-center gap-4 ">
          <div className="rounded-full w-8 h-8 flex justify-center items-center bg-[fill: rgba(251, 55, 72, 0.16)]"></div>

          <span className="text-[#717F96]">Vá para pedidos.</span>
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
      className: `border-l-4 border-l-[#FFA500] border-t-0 border-b-0 border-r-0`,
    });
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Faça login para ver o seu carrinho
          </h2>
          <p className="text-gray-600 mb-8">
            Para adicionar produtos e finalizar a compra, é necessário estar
            logado.
          </p>
          <button
            onClick={() => navigate('/iniciar-sessao')}
            className="w-full py-4 bg-[#FFA500] text-white font-bold rounded-xl hover:bg-[#e69500] transition-colors"
          >
            Entrar na conta
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Ainda não tem conta?{' '}
            <button
              onClick={() => navigate('/cadastrar')}
              className="text-[#FFA500] font-medium hover:underline"
            >
              Criar conta
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={(term) => setSearchTerm(term)} />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <CartView
          cart={items}
          updateQty={(productId, delta) => {
            const current = items.find((i) => i.productId === productId);
            if (current) {
              updateQuantity(productId, current.quantity + delta);
            }
          }}
          removeItem={removeItem}
          cartTotal={cartTotal}
          onCheckout={handleCheckout}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}
