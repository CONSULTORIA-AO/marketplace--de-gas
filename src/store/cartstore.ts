import { create } from 'zustand';
import { CartItem, GasProduct } from '@/types/index';
import { mockCartItems } from "@/data/gas-products";


interface CartState {
  items: CartItem[];
  addItem: (product: GasProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => {
  // Carregar carrinho do localStorage
  const storedCart = localStorage.getItem('cart');
  //const initialCart = storedCart ? JSON.parse(storedCart) : mockCartItems;

  let initialCart: CartItem[] = [];

  if (storedCart) {
    const parsed = JSON.parse(storedCart);
    initialCart = parsed.length > 0 ? parsed : mockCartItems;
  } else {
    initialCart = mockCartItems;
  }

  return {
    items: initialCart,
    
    addItem: (product, quantity = 1) => {
      set((state) => {
        const existingItem = state.items.find(
          (item) => item.productId === product.id
        );

        let newItems;
        if (existingItem) {
          newItems = state.items.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [
            ...state.items,
            { productId: product.id, product, quantity },
          ];
        }

        localStorage.setItem('cart', JSON.stringify(newItems));
        return { items: newItems };
      });
    },
    
    removeItem: (productId) => {
      set((state) => {
        const newItems = state.items.filter(
          (item) => item.productId !== productId
        );
        localStorage.setItem('cart', JSON.stringify(newItems));
        return { items: newItems };
      });
    },
    
    updateQuantity: (productId, quantity) => {
      set((state) => {
        if (quantity <= 0) {
          const newItems = state.items.filter(
            (item) => item.productId !== productId
          );
          localStorage.setItem('cart', JSON.stringify(newItems));
          return { items: newItems };
        }

        const newItems = state.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
        localStorage.setItem('cart', JSON.stringify(newItems));
        return { items: newItems };
      });
    },
    
    clearCart: () => {
      localStorage.removeItem('cart');
      set({ items: [] });
    },
    
    getTotal: () => {
      return get().items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },
    
    getItemCount: () => {
      return get().items.reduce((count, item) => count + item.quantity, 0);
    },
  };
});