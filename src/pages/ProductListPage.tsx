import { Header } from '@/components/Header';

import { ProductListAside } from '@/components/products/productList/ProductListAside';
import { ProductSpolier } from '@/components/products/productList/ProductSpolier';
import { useState } from 'react';

export function ProductListPage() {
  const [filters, setFilters] = useState({
    gasTypes: ['GLP13'],
    minPrice: 90,
    maxPrice: 120,
    location: '',
    minRating: 0,
  });

  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'relevance'>(
    'rating'
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Sempre que filtro mudar → resetar página
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display">
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <main className="container mx-auto flex-grow px-4 py-8 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            <ProductListAside filters={filters} setFilters={setFilters} />
            <ProductSpolier
              filters={filters}
              sortBy={sortBy}
              setSortBy={setSortBy}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
