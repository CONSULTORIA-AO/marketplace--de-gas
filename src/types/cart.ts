import { Product } from './customer';
import { GasProduct } from '@/types/product';

export interface CartItem {
  productId: string;
  product: GasProduct;
  quantity: number;
}

export interface CartViewProps {
  cart: CartItem[];
  updateQty: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;
  cartTotal: number;
  onCheckout: () => void;
  onBack: () => void;
}
