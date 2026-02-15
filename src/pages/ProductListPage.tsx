import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';

import { ProductListAside } from '@/components/products/productList/ProductListAside';
import { ProductSpolier } from '@/components/products/productList/ProductSpolier';

export function ProductListPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark font-display">
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <main className="container mx-auto flex-grow px-4 py-8 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            <ProductListAside />
            <ProductSpolier />
          </div>
        </main>
      </div>
    </div>
  );
}
