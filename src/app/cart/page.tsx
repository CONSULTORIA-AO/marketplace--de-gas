'use client';

import { useAuthStore } from '@/hooks/auth';
import { useCartStore } from '@/hooks/cartstore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartView } from '../../components/cartView';
import { Header } from '@/components/layout/header';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { View } from '@/types/customer';
import { GasProduct } from '@/types/product';
import { Sidebar } from '@/components/sidebar';
import { AuthHeader } from '@/components/header';
import { Skeleton } from '@/components/ui/skeleton';

export default function CartPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotal, getItemCount } =
    useCartStore();
  const token = useAuthStore((state) => state.session?.token);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<View>('produtos');
  const [favorites, setFavorites] = useState<GasProduct[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sidebarOpen, setSidebar] = useState<boolean>(false);

  const cartTotal = getTotal();

  const handleBack = () => navigate(-1);

  if (!cartTotal) {
    return (
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <Skeleton className="h-[22px] w-32 rounded-md" />
        </div>
  
        {/* Avatar card */}
        <div
          style={{
            background: 'white',
            borderRadius: 16,
            padding: 24,
            marginBottom: 16,
            border: '1px solid #F3F4F6',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
  
            {/* Spinner + avatar skeleton */}
            <div style={{ position: 'relative', width: 96, height: 96 }}>
              {/* Anel girante */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '3px solid #f97316',
                  borderTopColor: 'transparent',
                  animation: 'spin 0.9s linear infinite',
                }}
              />
              {/* Skeleton do avatar dentro */}
              <div
                style={{
                  position: 'absolute',
                  inset: 10,
                  borderRadius: '50%',
                  overflow: 'hidden',
                }}
              >
                <Skeleton className="w-full h-full rounded-full" />
              </div>
            </div>
  
            <Skeleton className="h-[18px] w-40 rounded-lg" />
            <Skeleton className="h-[14px] w-52 rounded-lg" />
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-3 w-36 rounded-lg" />
          </div>
        </div>
  
        {/* Form card */}
        <div
          style={{
            background: 'white',
            borderRadius: 16,
            padding: 24,
            border: '1px solid #F3F4F6',
          }}
        >
          <Skeleton className="h-4 w-44 rounded-md mb-5" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
              gap: 14,
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-[11px] w-28 rounded mb-2" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
            <Skeleton className="h-10 w-full rounded-xl self-end" />
          </div>
        </div>
  
        {/* Keyframe para o spinner — injeta uma vez */}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const handleCheckout = () => {
    toast({
      description: (
        <div className="flex items-center gap-4 ">
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
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 400,
            display: 'flex',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
            }}
            onClick={() => setSidebar(false)}
          />

          <Sidebar
            favorites={favorites.length}
            close={() => setSidebar(false)}
            currentView={view}
          />
        </div>
      )}

      {/* HEADER */}
      {token ? (
        <AuthHeader
          search={search}
          setSearch={setSearch}
          favCount={favorites.length}
          onMenu={() => setSidebar(true)}
        />
      ) : (
        <Header onSearch={(term) => setSearchTerm(term)} />
      )}
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
