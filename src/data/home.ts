import {
  FaTshirt,
  FaBuilding,
  FaPills,
  FaShoePrints,
  FaCar,
} from "react-icons/fa";
import {
  MdToys,
} from "react-icons/md";
import { Categorys, Testimonial } from '@/types/home';
import { Product } from "@/types/product";

export interface Slide {
  title: string;
  subtitle: string;
  cta: string;
  bg: string;
  accent: string;
  emoji: string; 
}

export interface NavItem {
  label: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro 256GB",
    price: "AOA 7.499",
    img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80",
  },
  {
    id: 2,
    name: "MacBook Air M2 8GB",
    price: "AOA 9.899",
    img: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&q=80",
  },
  {
    id: 3,
    name: "Samsung Galaxy S24",
    price: "AOA 4.299",
    img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80",
  },
  {
    id: 4,
    name: "AirPods Pro 2ª Geração",
    price: "AOA 1.899",
    img: "https://images.unsplash.com/photo-1606741965509-717c7e0e57a9?w=400&q=80",
  },
  {
    id: 5,
    name: 'Smart TV 65" 4K QLED',
    price: "AOA 3.799",
    img: "https://images.unsplash.com/photo-1593640408182-31c228e78b8a?w=400&q=80",
  },
  {
    id: 6,
    name: "PlayStation 5 + 2 Controles",
    price: "AOA 4.599",
    img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80",
  },
  {
    id: 7,
    name: "Tênis Nike Air Max 270",
    price: "AOA 599",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  },
  {
    id: 8,
    name: "Tênis Nike Air Max 270",
    price: "AOA 599",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  }
];

export const navItems: NavItem[] = [
  { label: "Saúde" },
  { label: "Hospitalidade e Turismo" },
  { label: "Supermercado" },
  { label: "Lojas Industriais" },
  { label: "Stands" },
  { label: "Prestação de Serviços" },
];

export const categories: Categorys[] = [
  {
    label: "Roupas",
    emoji: FaTshirt,
    bg: "#F5E6D3",
  },
  {
    label: "Imobiliária",
    emoji: FaBuilding,
    bg: "#E8E8E8",
  },
  {
    label: "Farmácias",
    emoji: FaPills,
    bg: "#E8D5F0",
  },
  {
    label: "Sapatos",
    emoji: FaShoePrints,
    bg: "#D5C9B8",
  },
  {
    label: "Brinquedos",
    emoji: MdToys,
    bg: "#FFF3CD",
  },
  {
    label: "Carros",
    emoji: FaCar,
    bg: "#FFE0CC",
  },
];

export const footerCategories = [
  "Imóveis",
  "Eletrodomésticos",
  "Filmes e Séries",
  "Tecnologia",
  "Telemóveis",
  "Moda",
  "Veículos",
  "Móveis",
  "Serviços",
  "Empregos",
  "Jogos",
  "Educação"
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Imaculada Tomás",
    comment: "A plataforma facilitou completamente nossa compra de gás. A comunicação com os pais melhorou drasticamente e conseguimos automatizar processos que antes tomavam horas do nosso tempo. Recomendo fortemente!",
    avatar: "AS",
  },
  {
    id: 2,
    name: "Romeu Tomás",
    comment: "Implementamos a solução há 6 meses e os resultados são impressionantes. A gestão de produtos ficou muito mais organizada e os relatórios automáticos nos poupam muito trabalho. Excelente investimento!",
    avatar: "CM",
  },
  {
    id: 3,
    name: "Maria Simas",
    comment: "Como venddor, posso dizer que esta plataforma facilitou enormemente meu trabalho diário.",
    avatar: "MS",
  },
  {
    id: 4,
    name: "Romeu Cajamba",
    comment: "A inclusão digital que a plataforma proporciona é notável. Conseguimos envolver mais os compradores. Uma solução completa e moderna.",
    avatar: "JO",
  }
];