export type View =
  | "shop"
  | "productDetail"
  | "cart"
  | "payment"
  | "favorites"
  | "orders"
  | "chat"
  | "profile"
  | "settings"
  | "subs";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number | null;
  img: string;
  rating: number;
  reviews: number;
  freeShipping: boolean;
  badge: string | null;
  seller: string;
  sellerImg: string;
  stock: number;
}

export interface CartItem extends Product {
  qty: number;
}

export interface Order {
  id: string;
  product: string;
  date: string;
  status: string;
  price: number;
  img: string;
}

export interface Sub {
  id: number;
  name: string;
  price: string;
  desc: string;
  color: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  avatar: string;
  memberSince: string;
  plan: string;
}

export interface ChatMessage {
  from: "seller" | "user";
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

export interface BadgeCountProps { n: number; }

export interface StarsProps {
  rating: number;
  small?: boolean;
}

export interface HeaderProps {
  search: string;
  setSearch: (v: string) => void;
  cartCount: number;
  favCount: number;
  onMenu: () => void;
  goTo: (v: View) => void;
  view: View;
}

export interface SidebarProps {
  user: User;
  cart: number;
  favorites: number;
  goTo: (v: View) => void;
  close: () => void;
  currentView: View;
}

export interface BottomNavProps {
  view: View;
  goTo: (v: View) => void;
  cartCount: number;
}

export interface ShopViewProps {
  products: Product[];
  categories: string[];
  activeCategory: string;
  setCategory: (c: string) => void;
  sortBy: string;
  setSort: (s: string) => void;
  priceRange: [number, number];
  setPriceRange: (r: [number, number]) => void;
  filterOpen: boolean;
  setFilterOpen: (v: boolean) => void;
  addToCart: (p: Product) => void;
  toggleFav: (p: Product) => void;
  favorites: Product[];
  onProductClick: (p: Product) => void;
  onPayNow: (p: Product) => void;
}

export interface ProductCardProps {
  product: Product;
  addToCart: (p: Product) => void;
  toggleFav: (p: Product) => void;
  isFav: boolean;
  onClick: () => void;
  onPayNow: (p: Product) => void;
}

export interface ProductDetailProps {
  product: Product;
  addToCart: (p: Product, qty?: number) => void;
  toggleFav: (p: Product) => void;
  favorites: Product[];
  onChat: (p: Product) => void;
  onPayNow: (p: Product) => void;
  onBack: () => void;
}

export interface CartViewProps {
  cart: CartItem[];
  updateQty: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  cartTotal: number;
  onCheckout: () => void;
  onBack: () => void;
}

export interface PaymentItem {
  name: string;
  price: number;
}

export interface PaymentViewProps {
  item: PaymentItem;
  cart: CartItem[] | null;
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
  favorites: Product[];
  addToCart: (p: Product) => void;
  toggleFav: (p: Product) => void;
  onProductClick: (p: Product) => void;
  onBack: () => void;
}

export interface OrdersViewProps {
  orders: Order[];
  onBack: () => void;
}

export interface MessagesViewProps {
  onBack: () => void;
}

export interface ProfileViewProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  onBack: () => void;
}

export interface SettingsViewProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  onBack: () => void;
  notify: (msg: string) => void;
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
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  notify: (msg: string) => void;
  onBack: () => void;
}

export interface CustomSub {
  name: string;
  email: string;
  prefs: string;
}