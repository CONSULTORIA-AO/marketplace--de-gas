'use client';

import { CATEGORIES, ORDERS, SUBS } from '@/data/customer';
import {  View } from '@/types/customer';
import { useState } from 'react';
//import { BottomNav } from './_components/buttonNav';
import { SubscriptionsView } from './_components/subscription';
import { SettingsView } from './_components/settings';
import { ProfileView } from './_components/profile';
import { MessagesView } from './_components/message';
import { OrdersView } from './_components/order';
import { FavoritesView } from './_components/favorites';
import { PaymentView } from './_components/paymentView';
import { CartView } from './_components/cartView';
import { ProductDetail } from './_components/productDeails';
import { ShopView } from './_components/shopView';
import { Header } from './_components/header';
import { Sidebar } from './_components/sidebar';
import { ORANJE } from '@/constants/costumer';
import { GasProduct } from '@/types/product';
import { useProducts } from '@/service/product/product';

export default function Customer() {
  const [view, setView] = useState<View>('shop');
  const [sidebarOpen, setSidebar] = useState<boolean>(false);
  const [cart, setCart] = useState<GasProduct[]>([]);
  const [favorites, setFavorites] = useState<GasProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<GasProduct | null>(null);
  const [chatSeller, setChatSeller] = useState<GasProduct | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [paymentItem, setPaymentItem] = useState<GasProduct | 'cart' | null>(null);

  const [search, setSearch] = useState<string>('');
  const [activeCategory, setCategory] = useState<string>('Todos');
  const [sortBy, setSort] = useState<string>('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  
    // Busca os produtos com React Query
    const { data, isLoading, isError, error } = useProducts();
  
    // Filtra localmente (client-side) com base no searchTerm
    const filtered = (data?.mensagem || []).filter(
      (product: GasProduct) =>
        product.descricao.toLowerCase().includes(search.toLowerCase()) ||
        product.unidadeMedida.toLowerCase().includes(search.toLowerCase())
    );

  const addToCart = (product: GasProduct, qty: number = 1): void => {
    setCart((prev) => {
      const existing = prev.find((i) => i.produtoId === product.produtoId);
      if (existing)
        return prev.map((i) =>
          i.produtoId === product.produtoId ? { ...i, qty: i.preco + qty } : i
        );
      return [...prev, { ...product, qty }];
    });
    notify(`"${product.descricao}" adicionado ao carrinho ✓`);
  };

  const removeFromCart = (id: number): void =>
    setCart((prev) => prev.filter((i) => i.produtoId !== id));

  const updateQty = (id: number, delta: number): void =>
    setCart((prev) =>
      prev
        .map((i) =>
          i.produtoId === id ? { ...i, qty: Math.max(1, i.preco + delta) } : i
        )
        .filter((i) => i.preco > 0)
    );

  const cartTotal: number = cart.reduce((s, i) => s + i.preco * i.preco, 0);
  const cartCount: number = cart.reduce((s, i) => s + i.preco, 0);

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

  const goTo = (v: View, extra?: () => void): void => {
    setView(v);
    if (extra) extra();
    setSidebar(false);
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
            cart={cartCount}
            favorites={favorites.length}
            goTo={goTo}
            close={() => setSidebar(false)}
            currentView={view}
          />
        </div>
      )}

      <Header
        search={search}
        setSearch={setSearch}
        cartCount={cartCount}
        favCount={favorites.length}
        onMenu={() => setSidebar(true)}
        goTo={goTo}
        view={view}
      />

      <div
        style={{ maxWidth: 1400, margin: '0 auto', padding: '16px 16px 80px' }}
      >
        {view === 'shop' && (
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
              setView('productDetail');
            }}
            onPayNow={(p) => {
              setPaymentItem(p);
              setView('payment');
            }}
          />
        )}
        {view === 'productDetail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            addToCart={addToCart}
            toggleFav={toggleFav}
            favorites={favorites}
            onChat={(p) => {
              setChatSeller(p);
              setView('chat');
            }}
            onPayNow={(p) => {
              setPaymentItem(p);
              setView('payment');
            }}
            onBack={() => setView('shop')}
          />
        )}
        {view === 'cart' && (
          <CartView
            cart={cart}
            updateQty={updateQty}
            removeFromCart={removeFromCart}
            cartTotal={cartTotal}
            onCheckout={() => {
              setPaymentItem('cart');
              setView('payment');
            }}
            onBack={() => setView('shop')}
          />
        )}
        {/*view === 'payment' && paymentItem && (
          <PaymentView
            item={
              paymentItem === 'cart'
                ? { descricao: `${cartCount} itens no carrinho`, preco: cartTotal }
                : paymentItem
            }
            cart={paymentItem === 'cart' ? cart : null}
            onSuccess={() => {
              if (paymentItem === 'cart') setCart([]);
              notify('Pagamento efectuado com sucesso! ✓');
              setView('orders');
            }}
            onBack={() =>
              setView(paymentItem === 'cart' ? 'cart' : 'productDetail')
            }
          />
        )}
        {view === 'favorites' && (
          <FavoritesView
            favorites={favorites}
            addToCart={addToCart}
            toggleFav={toggleFav}
            onProductClick={(p) => {
              setSelectedProduct(p);
              setView('productDetail');
            }}
            onBack={() => setView('shop')}
          />
        )*/}
        {view === 'orders' && (
          <OrdersView orders={ORDERS} onBack={() => setView('shop')} />
        )}
        {/*view === 'chat' && <MessagesView onBack={() => setView('shop')} />*/}
        {view === 'profile' && (
          <ProfileView
            onBack={() => setView('shop')}
          />
        )}
        {view === 'settings' && (
          <SettingsView
            onBack={() => setView('shop')}
            notify={notify}
          />
        )}
        {/*view === 'subs' && (
          <SubscriptionsView
            subs={SUBS}
            user={user}
            setUser={setUser}
            notify={notify}
            onBack={() => setView('shop')}
          />
        )*/}
      </div>

      {/*<BottomNav view={view} goTo={goTo} cartCount={cartCount} />*/}

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
