'use client';

import { ORANJE } from '@/constants/costumer';
import { Icon } from './icon';
import { ProductCard } from './productCard';
import { FavoritesViewProps } from '@/types/customer';

export function FavoritesView({
  favorites,
  addToCart,
  toggleFav,
  onProductClick,
  onBack,
}: FavoritesViewProps) {
  return (
    <div className="fade-in">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 20,
        }}
      >
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <Icon name="back" color={ORANJE} />
        </button>
        <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>
          Favoritos ({favorites.length})
        </h2>
      </div>
      {favorites.length === 0 ? (
        <div
          style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF' }}
        >
          <Icon name="heart" size={48} color="#D1D5DB" />
          <p style={{ marginTop: 12 }}>Nenhum favorito ainda</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
            gap: 16,
          }}
        >
          {favorites.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              addToCart={addToCart}
              toggleFav={toggleFav}
              isFav={true}
              onClick={() => onProductClick(p)}
              onPayNow={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}
