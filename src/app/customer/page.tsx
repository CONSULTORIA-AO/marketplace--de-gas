'use client';

import { CATEGORIES } from '@/data/customer';
import { View } from '@/types/customer';
import { useState } from 'react';
import { ShopView } from './_components/shopView';
import { AuthHeader } from '../../components/header';
import { Sidebar } from '../../components/sidebar';
import { ORANJE } from '@/constants/costumer';
import { GasProduct } from '@/types/product';
import { useProducts } from '@/service/product/product';
import { useCartStore } from '@/hooks/cartstore';
import { Skeleton } from '@/components/ui/skeleton';

export default function Customer() {
  const [view, setView] = useState<View>('produtos');
  const [sidebarOpen, setSidebar] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<GasProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<GasProduct | null>(
    null
  );
  const [notification, setNotification] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [activeCategory, setCategory] = useState<string>('Todos');
  const [sortBy, setSort] = useState<string>('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const addItem = useCartStore((state) => state.addItem);
  const total = useCartStore((state) => state.getTotal());

  // Busca os produtos com React Query
  const { data, isLoading, isError, error } = useProducts();

  if (isLoading) {
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

  // Filtra localmente (client-side) com base no searchTerm
  const filtered = (data?.mensagem || []).filter(
    (product: GasProduct) =>
      product.descricao.toLowerCase().includes(search.toLowerCase()) ||
      product.unidadeMedida.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product: GasProduct, qty: number = 1): void => {
    addItem(product, qty);
    notify(`"${product.descricao}" adicionado ao carrinho ✓`);
  };

  const toggleFav = (product: GasProduct): void => {
    setFavorites((prev) =>
      prev.find((i) => i.produtoId === product.produtoId)
        ? prev.filter((i) => i.produtoId !== product.produtoId)
        : [...prev, product]
    );
  };

  const notify = (msg: string): void => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI',system-ui,sans-serif",
        background: '#F0F4FF',
        minHeight: '100vh',
      }}
    >
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 9999,
            background: ORANJE,
            color: 'white',
            padding: '12px 20px',
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(18,89,195,0.3)',
            animation: 'slideIn .3s ease',
          }}
        >
          {notification}
        </div>
      )}

      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 400, display: 'flex' }}
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

      <AuthHeader
        search={search}
        setSearch={setSearch}
        //cartCount={cartCount}
        favCount={favorites.length}
        onMenu={() => setSidebar(true)}
      />

      <div
        style={{ maxWidth: 1400, margin: '0 auto', padding: '16px 16px 80px' }}
      >
        <ShopView
          products={filtered}
          categories={CATEGORIES}
          activeCategory={activeCategory}
          setCategory={setCategory}
          sortBy={sortBy}
          setSort={setSort}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
          addToCart={addToCart}
          toggleFav={toggleFav}
          favorites={favorites}
          onProductClick={(p) => {
            setSelectedProduct(p);
            setView('detalhes-productos');
          }}
        />
      </div>

      <style>{`
        @keyframes slideIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .fade-in{animation:fadeIn .35s ease}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:#f1f1f1}
        ::-webkit-scrollbar-thumb{background:#1259C3;border-radius:4px}
        input:focus,select:focus,textarea:focus{outline:none;border-color:#1259C3!important;box-shadow:0 0 0 3px rgba(18,89,195,0.12)}
      `}</style>
    </div>
  );
}
