import { create } from 'zustand';
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

const loadCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveCart = (items: CartItem[]) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const useCartStore = create<CartState>((set, get) => ({
  items: loadCart(),

  addItem: (product, quantity = 1) => {
    set((state) => {
      const productId = String(product.produtoId);
      const existing = state.items.find((item) => item.productId === productId);

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
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    set((state) => {
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
      (sum, item) => sum + item.product.preco * item.quantity,
      0
    );
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
}));
