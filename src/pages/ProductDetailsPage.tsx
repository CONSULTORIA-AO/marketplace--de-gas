import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { ProductInfo } from '@/components/products/productDetails/ProductInfo';
import { SupplierInfo } from '@/components/products/productDetails/Supplier';
import { AboutProduct } from '@/components/products/productDetails/AboutProduct';
import { Reviews } from '@/components/products/productDetails/Reviews';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { mockGasProducts } from '@/data/gas-products';
import { useState } from 'react';

export function ProductDetailsPage() {
  const { id } = useParams();
  const product = mockGasProducts.find((p) => p.id === id);

  const [activeTab, setActiveTab] = useState<
    'description' | 'specs' | 'reviews'
  >('description');

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <div className="font-display">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-8 py-12">
            <ProductInfo product={product} />
            <div className="mt-20">
              <div className="border-b border-slate-100 dark:border-slate-800 shadow-sm mb-12">
                <nav className="flex gap-12 overflow-x-auto">
                  <Button
                    onClick={() => setActiveTab('description')}
                    className={`pb-6 border-b-4 ${
                      activeTab === 'description'
                        ? 'border-[#137fec] text-[#137fec] font-bold'
                        : 'border-transparent text-text-secondary font-semibold hover:text-text-[#137fec]'
                    } text-lg whitespace-nowrap transition-colors`}
                  >
                    Descrição Geral
                  </Button>

                  <Button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-6 border-b-4 ${
                      activeTab === 'specs'
                        ? 'border-[#137fec] text-[#137fec] font-bold'
                        : 'border-transparent text-text-secondary font-semibold hover:text-text-[#137fec]'
                    } text-lg whitespace-nowrap transition-colors`}
                  >
                    Especificações Técnicas
                  </Button>

                  <Button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-6 border-b-4 ${
                      activeTab === 'reviews'
                        ? 'border-[#137fec] text-[#137fec] font-bold'
                        : 'border-transparent text-text-secondary font-semibold hover:text-text-[#137fec]'
                    } text-lg whitespace-nowrap transition-colors`}
                  >
                    Avaliações ({product.reviewCount})
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
        <footer className="bg-white border-t border-border-soft py-12 border-border-light dark:border-border-dark border border-slate-100 dark:border-slate-800">
          <div className="container mx-auto px-8 text-center">
            <div className="flex items-center justify-center gap-2 text-[#137fec] mb-6 opacity-50">
              <span className="material-symbols-outlined text-2xl">
                local_fire_department
              </span>
              <h2 className="text-lg font-bold tracking-tight">Gás Rápido</h2>
            </div>
            <p className="text-sm text-text-secondary font-medium">
              © 2024 Gás Rápido Marketplace. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
