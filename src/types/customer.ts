import { CartItem } from './cart';
import { GasProduct } from './product';

export type View =
  | 'produtos'
  | 'detalhes-productos'
  | 'carrinho'
  | 'checkout'
  | 'favoritos'
  | 'pedidos'
  | 'chat'
  | 'perfil'
  | 'definicoes'
  | 'subscricoes';

export interface Sub {
  id: number;
  name: string;
  price: string;
  desc: string;
  color: string;
}

export interface ChatMessage {
  from: 'seller' | 'user';
  text: string;
  time: string;
}

export interface Conversation {
  id: number;
  seller: { name: string; img: string };
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: ChatMessage[];
}

export interface Notification {
  id: number;
  type: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
}

export interface ReviewItem {
  name: string;
  rating: number;
  comment: string;
  date: string;
}
export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  [key: string]: unknown;
}

export interface BadgeCountProps {
  n: number;
}

export interface StarsProps {
  rating: number;
  small?: boolean;
}

export interface HeaderProps {
  search: string;
  setSearch: (v: string) => void;
  //cartCount: number;
  favCount: number;
  onMenu: () => void;
}

export interface SidebarProps {
  //cart: number;
  favorites: number;
  close: () => void;
  currentView: View;
}

export interface BottomNavProps {
  view: View;
  cartCount: number;
}

export interface ShopViewProps {
  products: GasProduct[];
  categories: string[];
  activeCategory: string;
  setCategory: (c: string) => void;
  sortBy: string;
  setSort: (s: string) => void;
  priceRange: [number, number];
  setPriceRange: (r: [number, number]) => void;
  filterOpen: boolean;
  setFilterOpen: (v: boolean) => void;
  addToCart: (p: GasProduct) => void;
  toggleFav: (p: GasProduct) => void;
  favorites: GasProduct[];
  onProductClick: (p: GasProduct) => void;
}

export interface ProductCardProps {
  product: GasProduct;
  addToCart: (p: GasProduct) => void;
  //toggleFav: (p: GasProduct) => void;
  isFav: boolean;
  onClick: () => void;
}

export interface PaymentItem {
  descricao: string;
  prec0: number;
}

export interface PaymentViewProps {
  onSuccess: () => void;
  onBack: () => void;
}

export interface PaymentMethod {
  id: string;
  label: string;
  desc: string;
  icon: string;
  color: string;
}

export interface PaymentForm {
  phone: string;
  ref: string;
  card: string;
  expiry: string;
  cvv: string;
  name: string;
  iban: string;
}

export interface FieldProps {
  label: string;
  placeholder: string;
  icon: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}

export interface FavoritesViewProps {
  favorites: GasProduct[];
  addToCart: (p: GasProduct) => void;
  toggleFav: (p: GasProduct) => void;
  onProductClick: (p: GasProduct) => void;
  onBack: () => void;
}

export interface PasswordForm {
  current: string;
  next: string;
  confirm: string;
}

export interface NotifSettings {
  email: boolean;
  sms: boolean;
  promo: boolean;
  orders: boolean;
}

export interface PrivacySettings {
  showProfile: boolean;
  shareData: boolean;
}

export interface CardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

export interface SubscriptionsViewProps {
  subs: Sub[];
  notify: (msg: string) => void;
  onBack: () => void;
}

export interface CustomSub {
  name: string;
  email: string;
  prefs: string;
}
