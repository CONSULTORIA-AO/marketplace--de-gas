import { Order, Sub } from '../types/customer';

export const CATEGORIES: string[] = ['Todos'];

export const ORDERS: Order[] = [
  {
    id: 'ORD-001',
    product: 'iPhone 15 Pro 256GB',
    date: '2024-12-01',
    status: 'Entregue',
    price: 180000,
    img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100&q=80',
  },
  {
    id: 'ORD-002',
    product: 'AirPods Pro 2ª Geração',
    date: '2024-12-10',
    status: 'Em trânsito',
    price: 55000,
    img: 'https://images.unsplash.com/photo-1606741965509-717c7e0e57a9?w=100&q=80',
  },
  {
    id: 'ORD-003',
    product: 'Tênis Nike Air Max',
    date: '2024-12-15',
    status: 'Pendente',
    price: 18000,
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80',
  },
];

export const fmt = (n: number): string => `${n.toLocaleString('pt-AO')} Kz`;
