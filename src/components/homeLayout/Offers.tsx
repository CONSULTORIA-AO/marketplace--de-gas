import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import type { ApiResponse } from '@/types/index';

interface OffersSectionProps {
  searchTerm: string;
}

export function OffersSection({ searchTerm }: OffersSectionProps) {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get<ApiResponse>(
        'produtos?pagina=1&limite=20'
      );
      return response.data.mensagem;
    },
  });

  const filteredProducts = products.filter((product) =>
    product.descricao.toLowerCase().includes(searchTerm.toLowerCase())
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
            key={product.produtoId}
          >
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-md"
              data-alt="A standard 13kg LPG gas cylinder"
              style={{ backgroundImage: `url(${product.imagem_produto})` }}
            ></div>
            <div className="p-4">
              <p className="text-lg font-bold text-[#ff8300]">
                {product.descricao}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {product.empresaDona}
              </p>
              <p className="text-2xl font-bold text-[#ff8300]">
                KZ{product.preco.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
