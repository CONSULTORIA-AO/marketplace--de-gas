import type { GasProduct } from '@/types';
import botijaLaranja from '@/assets/botijas/laranja-1.png';
import botijaCompridaCinza from '@/assets/botijas/comprida-cinza.jpg';
import botijaBaixinha from '@/assets/botijas/pequena-cinzenta.png';
import botijaGrande from '@/assets/botijas/grande-azul.png';

export const mockProducts: GasProduct[] = [
  {
    id: '1',
    name: 'Botijão GLP 13kg',
    description: 'Botijão de gás residencial para uso doméstico',
    weight: '13kg',
    price: 99.9,
    imageUrl: botijaLaranja,
    stock: 20,
    brand: 'Fornecedor A',
    category: 'Residencial',
    rating: 4.6,
    reviewCount: 120,
  },
  {
    id: '2',
    name: 'Botijão GLP 13kg',
    description: 'Gás de cozinha com entrega rápida',
    weight: '13kg',
    price: 105,
    imageUrl: botijaCompridaCinza,
    stock: 15,
    brand: 'Fornecedor B',
    category: 'Residencial',
    rating: 4.4,
    reviewCount: 98,
  },
  {
    id: '3',
    name: 'Cilindro GLP 45kg',
    description: 'Ideal para restaurantes e uso industrial',
    weight: '45kg',
    price: 425,
    imageUrl: botijaGrande,
    stock: 5,
    brand: 'Fornecedor C',
    category: 'Industrial',
    rating: 4.8,
    reviewCount: 64,
  },
  {
    id: '4',
    name: 'Botijão GLP 13kg',
    description: 'Botijão compacto com excelente custo-benefício',
    weight: '13kg',
    price: 102.5,
    imageUrl: botijaBaixinha,
    stock: 18,
    brand: 'Fornecedor D',
    category: 'Residencial',
    rating: 4.5,
    reviewCount: 110,
  },
];
