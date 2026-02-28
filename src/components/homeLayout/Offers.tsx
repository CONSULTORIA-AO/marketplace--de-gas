import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import type { GasProduct } from '@/types/index';
import { mockProducts } from '@/data/prodct';

interface OffersSectionProps {
  searchTerm: string;
}

export function OffersSection({ searchTerm }: OffersSectionProps) {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get<GasProduct[]>('/products');
      return response.data;
    },
  });

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.weight.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (isLoading) return <p>Carregando...</p>;

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold leading-tight tracking-tight text-center mb-8 text-[#ff8300]">
        Ofertas Imperdíveis da Semana
      </h2>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500">Nenhum produto encontrado</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            className="bg-secondary/50 border border-glow rounded-xl p-8"
            key={product.id}
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-md"
              data-alt="A standard 13kg LPG gas cylinder"
              style={{ backgroundImage: `url(${product.imageUrl})` }}
            ></div>
            <div className="p-4">
              <p className="text-lg font-bold text-[#ff8300]">{product.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {product.brand}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span className="line-through">De Kz 75,000</span> por
              </p>
              <p className="text-2xl font-bold text-[#ff8300]">
                KZ{product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
