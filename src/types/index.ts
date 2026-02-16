// Tipos de usuário e autenticação
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
}

export interface ResetPasswordData {
  email: string;
}

export interface ActivateAccountData {
  token: string;
}

// Tipos de endereço
export interface Address {
  id: string;
  userId: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

// Tipos de produto/gás
export interface GasProduct {
  id: string;
  name: string;
  description: string;
  weight: string; // Ex: "13kg", "20kg", "45kg"
  price: number;
  imageUrl: string;
  stock: number;
  brand: string;
  category: string;
  rating: number;
  reviewCount: number;
}

// Tipos de carrinho
export interface CartItem {
  productId: string;
  product: GasProduct;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Tipos de pedido
export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface OrderItem {
  productId: string;
  product: GasProduct;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  address: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  deliveryDate?: string;
}

// Tipos de avaliação
export interface Review {
  id: string;
  orderId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Tipos de checkout
export interface CheckoutData {
  addressId: string;
  paymentMethod: 'credit_card' | 'debit_card' | 'pix' | 'money';
  deliveryTime: 'morning' | 'afternoon' | 'evening';
}

export type OrderStatusType =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type MockOrder = {
  id: string;
  status: OrderStatusType;
  total: number;
  createdAt: string;
};
