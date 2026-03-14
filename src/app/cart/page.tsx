'use client';

import { useAuthStore } from '@/hooks/auth';
import { useCartStore } from '@/hooks/cartstore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartView } from '../../components/cartView';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { View } from '@/types/customer';
import { GasProduct } from '@/types/product';
import { Sidebar } from '@/components/sidebar';
import { SmartHeader } from '@/components/layout/smartHeader';

export default function CartPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const token = useAuthStore((state) => state.session?.token);
  const [search, setSearch] = useState<string>('');
  const [view, setView] = useState<View>('produtos');
  const [favorites, setFavorites] = useState<GasProduct[]>([]);
  const [sidebarOpen, setSidebar] = useState<boolean>(false);

  const cartTotal = getTotal();
  const handleBack = () => navigate(-1);

  const handleCheckout = () => {
    toast({
      description: (
        <div className="flex items-center gap-4">
          <div className="rounded-full w-8 h-8 flex justify-center items-center bg-[fill: rgba(251, 55, 72, 0.16)]"></div>
          <span className="text-[#717F96]">
            Se não tiver acesso, faça login e vá para checkout.
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
      className: `border-l-4 border-l-[#FFA500] border-t-0 border-b-0 border-r-0`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {token && sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 400, display: 'flex' }}
        >
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }}
            onClick={() => setSidebar(false)}
          />
          <Sidebar
            favorites={favorites.length}
            close={() => setSidebar(false)}
            currentView={view}
          />
        </div>
      )}

      <SmartHeader
        search={search}
        setSearch={setSearch}
        onMenu={() => setSidebar(true)}
        onSearch={(term) => setSearch(term)}
      />

      {/* Padding responsivo: compacto em mobile, generoso em desktop */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
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