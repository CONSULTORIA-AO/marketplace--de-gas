import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function ProductSpolier({
  filters,
  sortBy,
  setSortBy,
  currentPage,
  setCurrentPage,
}) {
  const itemsPerPage = 6;

  const products = [
    {
      id: 1,
      name: 'SuperGás - GLP 13kg',
      type: 'GLP13',
      price: 95,
      rating: 4.8,
      reviews: 125,
      location: 'Centro',
      image: 'URL_1',
    },
    {
      id: 2,
      name: 'Gás Rápido - GLP 13kg',
      type: 'GLP13',
      price: 92.5,
      rating: 4.9,
      reviews: 210,
      location: 'Zona Sul',
      image: 'URL_2',
    },
    {
      id: 3,
      name: 'Chama Azul - GLP 13kg',
      type: 'GLP13',
      price: 98,
      rating: 4.5,
      reviews: 88,
      location: 'Centro',
      image: 'URL_3',
    },
    {
      id: 4,
      name: 'Gás Express - Gás Natural',
      type: 'NATURAL',
      price: 110,
      rating: 4.7,
      reviews: 45,
      location: 'Zona Norte',
      image: 'URL_4',
    },
    {
      id: 5,
      name: 'TopGás - GLP 13kg',
      type: 'GLP13',
      price: 94,
      rating: 4.6,
      reviews: 150,
      location: 'Centro',
      image: 'URL_5',
    },
    {
      id: 6,
      name: 'Distribuidora Veloz - GLP 45kg',
      type: 'GLP45',
      price: 350,
      rating: 4.9,
      reviews: 30,
      location: 'Industrial',
      image: 'URL_6',
    },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 🔎 Tipo de gás
    if (filters.gasTypes.length > 0) {
      result = result.filter((p) => filters.gasTypes.includes(p.type));
    }

    // 💰 Preço
    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    // 📍 Localização
    if (filters.location) {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // ⭐ Rating
    result = result.filter((p) => p.rating >= filters.minRating);

    // 📊 Ordenação
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === 'price') {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === 'relevance') {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-1">
          <p className="text-4xl font-black text-slate-900 dark:text-white">
            Encontre o Gás Ideal para Você
          </p>
          <p className="text-base text-slate-500 dark:text-slate-400">
            Exibindo {filteredProducts.length} resultados
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Ordenar por:
          </span>

          <Button
            onClick={() => setSortBy('rating')}
            className={`h-9 rounded-lg ${
              sortBy === 'rating'
                ? 'bg-[#137fec]/20 text-[#137fec]'
                : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            Melhor Classificado
          </Button>

          <Button
            onClick={() => setSortBy('price')}
            className={`h-9 rounded-lg ${
              sortBy === 'price'
                ? 'bg-[#137fec]/20 text-[#137fec]'
                : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            Menor Preço
          </Button>

          <Button
            onClick={() => setSortBy('relevance')}
            className={`h-9 rounded-lg ${
              sortBy === 'relevance'
                ? 'bg-[#137fec]/20 text-[#137fec]'
                : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            Mais Relevante
          </Button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-500 hover:shadow-lg dark:bg-slate-900 animate-fade-in"
          >
            <Link to={`/produto/${product.id}`}>
              <div className="relative">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                  style={{
                    backgroundImage: `url(${product.image})`,
                  }}
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs font-bold text-white">
                  <span className="material-symbols-outlined text-sm">
                    star
                  </span>
                  <span>{product.rating}</span>
                </div>
              </div>
            </Link>

            <div className="flex flex-1 flex-col p-4">
              <div className="flex-1">
                <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  {product.name}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {product.reviews} avaliações
                </p>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <p className="text-xl font-black text-slate-900 dark:text-white">
                  KZ {product.price.toFixed(2)}
                </p>

                <Button className="flex h-9 items-center justify-center gap-2 rounded-lg bg-[#137fec] px-4 text-sm font-bold text-white transition-opacity hover:opacity-90">
                  <span className="material-symbols-outlined text-base">
                    add_shopping_cart
                  </span>
                  Adicionar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINAÇÃO */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2 p-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`flex size-10 items-center justify-center rounded-lg ${
                currentPage === i + 1
                  ? 'bg-[#137fec] text-white'
                  : 'text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
