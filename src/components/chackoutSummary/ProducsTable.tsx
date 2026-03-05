import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartstore';

export function ProductsTables() {
  const { items, updateQuantity, removeItem } = useCartStore();

  const handleIncrease = (productId: string, currentQty: number) => {
    updateQuantity(productId, currentQty + 1);
  };

  const handleDecrease = (productId: string, currentQty: number) => {
    if (currentQty <= 1) {
      removeItem(productId);
      return;
    }
    updateQuantity(productId, currentQty - 1);
  };

  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1.5px solid rgba(249,115,22,0.25)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center gap-3"
        style={{ borderBottom: '1px solid rgba(249,115,22,0.15)' }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{
            background: 'rgba(249,115,22,0.15)',
            border: '1px solid rgba(249,115,22,0.35)',
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ color: '#f97316', fontSize: 16 }}
          >
            shopping_cart
          </span>
        </div>
        <h2 className="text-base font-extrabold" style={{ color: '#ffffff' }}>
          Itens do Carrinho
        </h2>
        <span
          className="ml-auto text-xs font-bold px-2.5 py-1 rounded-xl"
          style={{ background: 'rgba(249,115,22,0.12)', color: '#f97316' }}
        >
          {items.length} {items.length === 1 ? 'item' : 'itens'}
        </span>
      </div>

      {/* Table header — desktop only */}
      <div
        className="hidden sm:grid grid-cols-12 px-6 py-3 text-xs font-bold uppercase tracking-widest"
        style={{
          color: 'rgba(255,255,255,0.25)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="col-span-5">Produto</div>
        <div className="col-span-2 text-center">Preço</div>
        <div className="col-span-3 text-center">Quantidade</div>
        <div className="col-span-2 text-right">Subtotal</div>
      </div>

      {/* Items */}
      <div
        className="divide-y"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -60, height: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="px-6 py-5"
            >
              {/* Mobile layout */}
              <div className="flex gap-4 sm:hidden">
                <div
                  className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: 'rgba(249,115,22,0.06)',
                    border: '1px solid rgba(249,115,22,0.2)',
                  }}
                >
                  {item.product.imagem_produto ? (
                    <img
                      src={item.product.imagem_produto}
                      className="w-full h-full object-contain"
                      alt=""
                    />
                  ) : (
                    <span
                      className="material-symbols-outlined"
                      style={{ color: '#f97316', fontSize: 24 }}
                    >
                      local_fire_department
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <p
                    className="text-sm font-bold truncate"
                    style={{ color: '#ffffff' }}
                  >
                    {item.product.descricao}
                  </p>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: '#f97316' }}
                  >
                    KZ {item.product.preco.toLocaleString('pt-AO')}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <QtyButton
                        onClick={() =>
                          handleDecrease(item.productId, item.quantity)
                        }
                        icon="remove"
                      />
                      <span
                        className="w-8 text-center text-sm font-black"
                        style={{ color: '#ffffff' }}
                      >
                        {item.quantity}
                      </span>
                      <QtyButton
                        onClick={() =>
                          handleIncrease(item.productId, item.quantity)
                        }
                        icon="add"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-sm font-black"
                        style={{ color: '#ffffff' }}
                      >
                        KZ{' '}
                        {(item.product.preco * item.quantity).toLocaleString(
                          'pt-AO'
                        )}
                      </span>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                        style={{
                          background: 'rgba(248,113,113,0.1)',
                          border: '1px solid rgba(248,113,113,0.25)',
                        }}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ color: '#f87171', fontSize: 15 }}
                        >
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop layout */}
              <div className="hidden sm:grid grid-cols-12 items-center gap-4">
                {/* Product */}
                <div className="col-span-5 flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: 'rgba(249,115,22,0.06)',
                      border: '1px solid rgba(249,115,22,0.2)',
                    }}
                  >
                    {item.product.imagem_produto ? (
                      <img
                        src={item.product.imagem_produto}
                        className="w-full h-full object-contain"
                        alt=""
                      />
                    ) : (
                      <span
                        className="material-symbols-outlined"
                        style={{ color: '#f97316', fontSize: 24 }}
                      >
                        local_fire_department
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-sm font-bold"
                      style={{ color: '#ffffff' }}
                    >
                      {item.product.descricao}
                    </p>
                    {item.product.empresaDona && (
                      <p
                        className="text-xs mt-0.5 truncate"
                        style={{ color: 'rgba(255,255,255,0.35)' }}
                      >
                        {item.product.empresaDona}
                      </p>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    KZ {item.product.preco.toLocaleString('pt-AO')}
                  </span>
                </div>

                {/* Quantity */}
                <div className="col-span-3 flex items-center justify-center gap-2">
                  <QtyButton
                    onClick={() =>
                      handleDecrease(item.productId, item.quantity)
                    }
                    icon="remove"
                  />
                  <span
                    className="w-10 text-center text-sm font-black rounded-xl py-1"
                    style={{
                      color: '#ffffff',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {item.quantity}
                  </span>
                  <QtyButton
                    onClick={() =>
                      handleIncrease(item.productId, item.quantity)
                    }
                    icon="add"
                  />
                </div>

                {/* Subtotal + delete */}
                <div className="col-span-2 flex items-center justify-end gap-3">
                  <span
                    className="text-sm font-black"
                    style={{ color: '#f97316' }}
                  >
                    KZ{' '}
                    {(item.product.preco * item.quantity).toLocaleString(
                      'pt-AO'
                    )}
                  </span>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      background: 'rgba(248,113,113,0.1)',
                      border: '1px solid rgba(248,113,113,0.2)',
                    }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ color: '#f87171', fontSize: 15 }}
                    >
                      delete
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Quantity button helper ──────────────────────────────────────
function QtyButton({ onClick, icon }: { onClick: () => void; icon: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
      style={{
        background: 'rgba(249,115,22,0.1)',
        border: '1px solid rgba(249,115,22,0.3)',
        color: '#f97316',
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
        {icon}
      </span>
    </motion.button>
  );
}
