import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { GasProduct } from '@/types/product';

export interface CartItem {
  productId: string;
  product: GasProduct;
  quantity: number;
}

interface CartState {
  items: CartItem[];

  addItem: (product: GasProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  getTotal: () => number;
  getItemCount: () => number;
}

const CART_STORAGE_KEY = 'jagas-cart';

/* =========================
   Cookie Storage
========================= */

const cookieStorage = {
  getItem: (name: string) => {
    if (typeof document === 'undefined') return null;

    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`));

    return match ? decodeURIComponent(match.split('=')[1]) : null;
  },

  setItem: (name: string, value: string) => {
    if (typeof document === 'undefined') return;

    const date = new Date();
    date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
  },

  removeItem: (name: string) => {
    if (typeof document === 'undefined') return;

    document.cookie = `${name}=; Max-Age=0; path=/`;
  },
};

/* =========================
   Zustand Store
========================= */

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) =>
        set((state) => {
          const productId = String(product.produtoId);

          const existing = state.items.find(
            (item) => item.productId === productId
          );

          let newItems: CartItem[];

          if (existing) {
            newItems = state.items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newItems = [...state.items, { productId, product, quantity }];
          }

          return { items: newItems };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.product.preco * item.quantity,
          0
        ),

      getItemCount: () =>
        get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => cookieStorage),
    }
  )
);
