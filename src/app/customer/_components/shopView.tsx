'use client';
import { ProductCard } from '@/app/customer/_components/productCard';
import { Icon } from './icon';
import { ORANJE, WHITE } from '@/constants/costumer';
import { ShopViewProps } from '@/types/customer';

export function ShopView({
  products,
  categories,
  activeCategory,
  setCategory,
  sortBy,
  setSort,
  priceRange,
  setPriceRange,
  filterOpen,
  setFilterOpen,
  addToCart,
  toggleFav,
  favorites,
  onProductClick,
  onPayNow,
}: ShopViewProps) {
  return (
    <div className="fade-in">
      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 8,
          marginBottom: 16,
          scrollbarWidth: 'none',
        }}
      >
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              flexShrink: 0,
              padding: '8px 18px',
              borderRadius: 20,
              border: `1.5px solid ${activeCategory === c ? ORANJE : '#E5E7EB'}`,
              background: activeCategory === c ? ORANJE : 'white',
              color: activeCategory === c ? 'white' : '#374151',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all .15s',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 16,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: 13, color: '#6B7280', flex: 1 }}>
          {products.length} produtos encontrados
        </span>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            borderRadius: 8,
            border: `1.5px solid ${filterOpen ? ORANJE : '#E5E7EB'}`,
            background: filterOpen ? WHITE : 'white',
            color: filterOpen ? ORANJE : '#374151',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Icon
            name="filter"
            size={14}
            color={filterOpen ? ORANJE : '#374151'}
          />{' '}
          Filtros
        </button>
        <select
          value={sortBy}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1.5px solid #E5E7EB',
            fontSize: 13,
            color: '#374151',
            background: 'white',
            cursor: 'pointer',
          }}
        >
          <option value="relevance">Relevância</option>
          <option value="price-asc">Preço: menor</option>
          <option value="price-desc">Preço: maior</option>
        </select>
      </div>

      {products.length === 0 ? (
        <div
          style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF' }}
        >
          <Icon name="search" size={40} color="#D1D5DB" />
          <p style={{ marginTop: 12 }}>Nenhum produto encontrado</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
            gap: 16,
          }}
        >
          {products.map((p) => (
            <ProductCard
              key={p.produtoId}
              product={p}
              addToCart={addToCart}
              //toggleFav={toggleFav}
              isFav={favorites.some((f) => f.produtoId === p.produtoId)}
              onClick={() => onProductClick(p)}
              onPayNow={onPayNow}
            />
          ))}
        </div>
      )}
    </div>
  );
}
