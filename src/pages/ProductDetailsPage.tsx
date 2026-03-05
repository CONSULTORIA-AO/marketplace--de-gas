import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { ProductInfo } from '@/components/products/productDetails/ProductInfo';
import { SupplierInfo } from '@/components/products/productDetails/Supplier';
import { AboutProduct } from '@/components/products/productDetails/AboutProduct';
import { Reviews } from '@/components/products/productDetails/Reviews';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { GasProduct } from '@/types/index';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

const globalStyles = `
  :root {
    --primary: #f97316 !important;
    --primary-foreground: #ffffff !important;
    --ring: #f97316 !important;
    --border: #f97316 !important;
  }

  /* Replace all blue shades with orange */
  [class*="text-blue"],
  [class*="text-primary"] {
    color: #f97316 !important;
  }

  [class*="border-blue"],
  [class*="border-primary"] {
    border-color: #f97316 !important;
  }

  [class*="bg-blue"],
  [class*="bg-primary"] {
    background-color: #f97316 !important;
  }

  /* Cards and white surfaces transparent */
  [class*="bg-white"],
  [class*="bg-card"],
  [class*="bg-background"],
  [class*="bg-slate-50"],
  [class*="bg-slate-100"],
  [class*="bg-gray-50"],
  [class*="bg-gray-100"] {
    background-color: transparent !important;
  }

  .card, [class*="card"] {
    background-color: transparent !important;
    border-color: #f97316 !important;
  }

  /* All text white by default */
  p, span, h1, h2, h3, h4, h5, h6, label, li, td, th {
    color: #ffffff;
  }

  a {
    color: #f97316 !important;
  }

  /* Inputs transparent with orange border */
  input, textarea, select {
    background-color: transparent !important;
    border-color: #f97316 !important;
    color: #ffffff !important;
  }

  /* Badges/tags */
  [class*="badge"],
  [class*="tag"],
  [class*="chip"] {
    background-color: rgba(249, 115, 22, 0.15) !important;
    color: #f97316 !important;
    border-color: #f97316 !important;
  }

  /* Stars / ratings */
  [class*="star"],
  [class*="rating"] {
    color: #f97316 !important;
  }

  /* Dividers */
  hr, [class*="divider"], [class*="separator"] {
    border-color: rgba(249, 115, 22, 0.3) !important;
  }

  /* Scrollbar */
  ::-webkit-scrollbar-track { background: #000000; }
  ::-webkit-scrollbar-thumb { background: #f97316; border-radius: 4px; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
`;

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [activeTab, setActiveTab] = useState<
    'description' | 'specs' | 'reviews'
  >('description');

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<GasProduct>({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await api.get(`/produtos/${id}`);
      return response.data.mensagem;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <>
        <style>{globalStyles}</style>
        <div
          className="flex justify-center py-20"
          style={{ backgroundColor: '#000000' }}
        >
          <p style={{ color: '#ffffff' }}>Carregando produto...</p>
        </div>
      </>
    );
  }

  if (isError || !product) {
    return (
      <>
        <style>{globalStyles}</style>
        <div
          className="flex justify-center py-20"
          style={{ backgroundColor: '#000000' }}
        >
          <p style={{ color: '#ff4444' }}>Produto não encontrado</p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{globalStyles}</style>
      <div
        className="font-display"
        style={{ backgroundColor: '#000000', color: '#ffffff' }}
      >
        <div
          className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden"
          style={{ backgroundColor: '#000000' }}
        >
          <Header />
          <main className="flex-1">
            <div className="container mx-auto px-8 py-12">
              <ProductInfo product={product} />
              <div className="mt-20">
                <div
                  className="border-b shadow-sm mb-12"
                  style={{ borderColor: '#f97316' }}
                >
                  <nav className="flex gap-12 overflow-x-auto">
                    <Button
                      onClick={() => setActiveTab('description')}
                      className={`pb-6 border-b-4 text-lg whitespace-nowrap transition-colors`}
                      style={{
                        borderBottomColor:
                          activeTab === 'description'
                            ? 'transparent'
                            : 'transparent',
                        color:
                          activeTab === 'description' ? '#f97316' : '#ffffff',
                        fontWeight: activeTab === 'description' ? '700' : '600',
                        background: 'transparent',
                      }}
                    >
                      Descrição Geral
                    </Button>

                    <Button
                      onClick={() => setActiveTab('specs')}
                      className={`pb-6 border-b-4 text-lg whitespace-nowrap transition-colors`}
                      style={{
                        borderBottomColor:
                          activeTab === 'specs' ? '#f97316' : 'transparent',
                        color: activeTab === 'specs' ? '#f97316' : '#ffffff',
                        fontWeight: activeTab === 'specs' ? '700' : '600',
                        background: 'transparent',
                      }}
                    >
                      Especificações Técnicas
                    </Button>
                  </nav>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="contents"
                    >
                      {activeTab === 'description' && (
                        <>
                          <div className="lg:col-span-2 space-y-10">
                            <AboutProduct />
                            <Reviews />
                          </div>
                          <SupplierInfo />
                        </>
                      )}

                      {activeTab === 'specs' && (
                        <>
                          <div className="lg:col-span-2">
                            <SupplierInfo />
                          </div>
                        </>
                      )}

                      {activeTab === 'reviews' && (
                        <>
                          <div className="lg:col-span-2 flex">
                            <Reviews />
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </main>
          <footer
            className="py-12"
            style={{
              backgroundColor: '#000000',
              borderTop: '1px solid #f97316',
            }}
          >
            <div className="container mx-auto px-8 text-center">
              <div
                className="flex items-center justify-center gap-2 mb-6"
                style={{ color: '#f97316' }}
              >
                <span className="material-symbols-outlined text-2xl">
                  local_fire_department
                </span>
                <h2 className="text-lg font-bold tracking-tight">Gás Rápido</h2>
              </div>
              <p
                className="text-sm font-medium"
                style={{ color: '#ffffff', opacity: 0.7 }}
              >
                © 2024 Gás Rápido Marketplace. Todos os direitos reservados.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
