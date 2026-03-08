import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GasProduct } from '@/types';

export interface CartItem {
  productId: string;
  quantity: number;
  product: GasProduct;
}

interface CartStore {
  items: CartItem[];

  addItem: (product: GasProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  getTotal: () => number;
  getItemCount: () => number;
  getSubtotal: () => number;
}

const DELIVERY_FEE = 500;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const id = String(
          product.produtoId ?? product.produtoId ?? product.descricao
        );
        set((state) => {
          const existing = state.items.find((i) => i.productId === id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { productId: id, quantity, product }],
          };
        });
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () =>
        get().items.reduce(
          (acc, item) => acc + item.product.preco * item.quantity,
          0
        ),

      getTotal: () => get().getSubtotal() + DELIVERY_FEE,

      getItemCount: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),
    }),
    {
      name: 'gas-rapido-cart', // chave no localStorage
      partialize: (state) => ({ items: state.items }), // só persiste os itens
    }
  )
);

export { DELIVERY_FEE };
