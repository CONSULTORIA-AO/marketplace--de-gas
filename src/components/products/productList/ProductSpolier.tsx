import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import type { ApiProductResponse, GasProduct } from '@/types/index'; // ajusta o caminho se necessário

interface ProductSpolierProps {
  filters: {
    minPrice: number;
    maxPrice: number;
    gasTypes: string[];
    location: string;
    minRating: number;
  };
  sortBy: 'price' | 'rating' | 'relevance';
  setSortBy: (value: 'price' | 'rating' | 'relevance') => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export function ProductSpolier({
  filters,
  sortBy,
  setSortBy,
  currentPage,
  setCurrentPage,
}: ProductSpolierProps) {
  const { data, isLoading, isError, error } = useQuery<ApiProductResponse>({
    queryKey: ['products', currentPage],
    queryFn: async () => {
      const response = await api.get<ApiProductResponse>('/produtos', {
        params: {
          pagina: currentPage,
          limite: 6,
        },
      });
      return response.data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // Produtos e paginação
  const products = useMemo(() => data?.mensagem ?? [], [data]);
  const totalPages = data?.registros?.paginas ?? 1;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filtro de preço (o único ativo por agora)
    if (filters.minPrice > 0 || filters.maxPrice < Infinity) {
      result = result.filter((p) => {
        const precoNum = Number(p.preco);
        return (
          (filters.minPrice === 0 || precoNum >= filters.minPrice) &&
          (filters.maxPrice === Infinity || precoNum <= filters.maxPrice)
        );
      });
    }

    // Ordenação
    if (sortBy === 'price') {
      result.sort((a, b) => Number(a.preco) - Number(b.preco));
    }
    // Outras ordenações quando tiveres dados
    // else if (sortBy === 'rating') { ... }

    return result;
  }, [products, filters, sortBy]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-80 rounded-xl border bg-muted/40 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>Erro ao carregar produtos</p>
        <p className="text-sm text-muted-foreground mt-2">
          {error instanceof Error
            ? error.message
            : 'Tente novamente mais tarde'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      {/* Cabeçalho */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-foreground sm:text-3xl">
            Encontre o Gás Ideal para Você
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filteredProducts.length === 0
              ? 'Nenhum produto encontrado'
              : `Exibindo ${filteredProducts.length} de ${products.length} resultados`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Ordenar por:</span>
          {[
            { key: 'price', label: 'Menor Preço' },
            { key: 'rating', label: 'Melhor Classificado' },
            { key: 'relevance', label: 'Mais Relevante' },
          ].map((opt) => (
            <Button
              key={opt.key}
              variant="ghost"
              size="sm"
              onClick={() => setSortBy(opt.key as 'price' | 'rating')}
              className={`rounded-lg border text-xs transition-all duration-300 sm:text-sm ${
                sortBy === opt.key
                  ? 'border-primary bg-primary/15 text-primary'
                  : 'border-border bg-secondary text-secondary-foreground hover:border-primary/50 hover:text-primary'
              }`}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Grid de Produtos */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">
            Nenhum produto corresponde aos filtros selecionados
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              // Aqui podes chamar clearFilters se tiveres acesso
              window.location.reload(); // ou resetar filtros
            }}
          >
            Limpar filtros
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.produtoId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
            >
              <Link to={`/produto/${product.produtoId}`}>
                <div className="relative h-48 overflow-hidden bg-secondary/50">
                  {product.imagem_produto &&
                  product.imagem_produto !== 'padrao.png' ? (
                    <img
                      src={product.imagem_produto}
                      alt={product.descricao}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground/50">
                      <span className="text-6xl opacity-30">🪫</span>
                    </div>
                  )}

                  <div className="absolute right-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                    {product.ativo === '1' ? 'Disponível' : 'Indisponível'}
                  </div>
                </div>
              </Link>

              <div className="p-5">
                <h3 className="font-['Space_Grotesk'] text-lg font-semibold text-foreground line-clamp-2">
                  {product.descricao}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Empresa #{product.empresaDona}</span>
                  <span>•</span>
                  <span>{product.unidadeMedida}</span>
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {Number(product.preco).toLocaleString('pt-AO')} Kz
                  </span>
                  <Button size="sm" className="rounded-full">
                    🛒 Adicionar
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex justify-center gap-3 flex-wrap"
        >
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ←
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="icon"
              onClick={() => setCurrentPage(page)}
              className={
                currentPage === page ? 'bg-primary text-primary-foreground' : ''
              }
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            →
          </Button>
        </motion.div>
      )}
    </div>
  );
}
