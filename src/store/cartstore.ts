import { create } from 'zustand';
import { CartItem, GasProduct } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: GasProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CART_STORAGE_KEY = 'cart';

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);

    if (!stored) return [];

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item) =>
        item &&
        item.product &&
        typeof item.product.preco === 'number' &&
        typeof item.quantity === 'number'
    );
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export const useCartStore = create<CartState>((set, get) => ({
  items: loadCart(),

  addItem: (product, quantity = 1) => {
    set((state) => {
      const productId = String(product.produtoId);

      const existingItem = state.items.find(
        (item) => item.productId === productId
      );

      let newItems: CartItem[];

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          {
            productId,
            product,
            quantity,
          },
        ];
      }

      saveCart(newItems);

      return { items: newItems };
    });
  },

  removeItem: (productId) => {
    set((state) => {
      const newItems = state.items.filter(
        (item) => item.productId !== productId
      );

      saveCart(newItems);

      return { items: newItems };
    });
  },

  updateQuantity: (productId, quantity) => {
    set((state) => {
      if (quantity <= 0) {
        const newItems = state.items.filter(
          (item) => item.productId !== productId
        );

        saveCart(newItems);

        return { items: newItems };
      }

      const newItems = state.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );

      saveCart(newItems);

      return { items: newItems };
    });
  },

  clearCart: () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    set({ items: [] });
  },

  getTotal: () => {
    return get().items.reduce(
      (total, item) => total + (item.product?.preco ?? 0) * item.quantity,
      0
    );
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
}));
