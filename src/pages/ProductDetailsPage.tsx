import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { ProductInfo } from '@/components/products/productDetails/ProductInfo';
import { SupplierInfo } from '@/components/products/productDetails/Supplier';
import { AboutProduct } from '@/components/products/productDetails/AboutProduct';
import { Reviews } from '@/components/products/productDetails/Reviews';

import { useParams } from 'react-router-dom';
import { mockGasProducts } from '@/data/gas-products';

export function ProductDetailsPage() {
  const { id } = useParams();
  const product = mockGasProducts.find((p) => p.id === id);

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
              <div className="border-b border-border-soft mb-12">
                <nav className="flex gap-12 overflow-x-auto">
                  <Button className="pb-6 border-b-4 border-[#137fec] text-[#137fec] font-bold text-lg whitespace-nowrap">
                    Descrição Geral
                  </Button>

                  <Button className="pb-6 border-b-4 border-transparent text-text-secondary font-semibold text-lg hover:text-text-[#137fec] whitespace-nowrap transition-colors">
                    Especificações Técnicas
                  </Button>

                  <Button className="pb-6 border-b-4 border-transparent text-text-secondary font-semibold text-lg hover:text-text-[#137fec] whitespace-nowrap transition-colors">
                    Avaliações (128)
                  </Button>
                </nav>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-10">
                  <AboutProduct />
                  <Reviews />
                </div>
                <SupplierInfo />
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
