import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cartstore';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/lib/axios';
import type { GasProduct } from '@/types/index';
import { Footer } from '@/components/layout/Footer';
import { Label } from '@/components/ui/label';

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get<GasProduct[]>('/products');
      return response.data;
    },
  });

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product: GasProduct) => {
    addItem(product, 1);
    toast({
      title: 'Produto adicionado!',
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  return (
        
    <div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
    <div className="layout-container flex h-full grow flex-col">

    <header className="sticky top-0 z-50 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark border border-slate-100 dark:border-slate-800">
    <div className="container mx-auto px-4">
    <div className="flex h-16 items-center justify-between">
    <div className="flex items-center gap-4">
    <span className="material-symbols-outlined text-primary text-3xl">local_fire_department</span>
    <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">GásMarket</h2>
    </div>
    <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
    <Link className="hover:text-primary" to="/">Início</Link>
    <Link className="hover:text-primary" to="#offers">Ofertas</Link>
    <Link className="hover:text-primary" to="#about">Sobre Nós</Link>
    </nav>
    <div className="flex items-center gap-2">
    <Button onClick={() => navigate('/login')} className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 text-primary dark:bg-primary/30 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/30 dark:hover:bg-primary/40">
    <span className="truncate">Entrar</span>
    </Button>
    <Button onClick={() => navigate('/cadastro')} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-secondary hover:bg-[]/90 text-white text-sm font-bold leading-normal tracking-[0.015em]">
    <span className="truncate">Cadastre-se</span>
    </Button>
    <Button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark hover:bg-gray-200 dark:hover:bg-gray-700">
    <span className="material-symbols-outlined text-xl">shopping_cart</span>
    </Button>
    </div>
    </div>
    </div>
    </header>
    <main className="flex-1">

    <section className="relative">
    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" data-alt="Blue flame from a gas stove burner in a dark kitchen." style={{backgroundImage: "linear-gradient(rgba(0, 82, 155, 0.7), rgba(0, 82, 155, 0.9)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuALMb_Ip87kWDBLPX9SiJphca8iOKpKqIeR4c1QJY7jA6Aa86Ysvrb11NmelFs5_aD5vs0z6GdJz6Jqk9HCkED441hTVIdtpAjneCxX3MNVW0p2QrmaK8NPy1qyR4Cso1seZBF3_3WzhefosV7-3cKJtEqm7qYmcSyex8ZzxIifmMQZk9psKEkVVNEWgf-3tkI8RPhAznJyTlta4PG9Zjq07liIkX1GygSH4cj0VUM3MF4RkwPQfjmBaRBApuGxDr4pxPUj7zb9qQ0');"}}></div>
    <div className="relative container mx-auto px-4 py-24 sm:py-32 flex flex-col items-center justify-center text-center">
    <div className="flex flex-col gap-4 max-w-3xl">
    <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
      O gás que você precisa, com o melhor preço da sua região
    </h1>
    <h2 className="text-white/90 text-lg font-normal leading-normal sm:text-xl">
      Encontre, compare e compre gás de forma rápida e segura.
      </h2>
    </div>
    <div className="mt-8 w-full max-w-2xl ">
    <Label className="flex flex-col h-14 w-full">
      <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-lg border border-slate-100 dark:border-slate-800">
        <div className="text-gray-500 flex bg-card-light items-center justify-center pl-4 rounded-l-xl border-y border-l border-border-light border border-slate-100 dark:border-slate-800">
          <span className="material-symbols-outlined">search</span>
        </div>
        <Input 
          type='text'
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-text-light focus:outline-0 focus:ring-2 focus:ring-primary h-full placeholder:text-gray-500 px-4 border-y border-border-light bg-card-light text-base border-slate-100 dark:border-slate-800" placeholder="Buscar por produto ou fornecedor" value=""/>
    <div className="flex items-center justify-center rounded-r-xl border-y border-r border-border-light bg-card-light pr-2 border border-slate-100 dark:border-slate-800">
    <Button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-[#137fec] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#137fec]/90 ">
    <span className="truncate">Buscar</span>
    </Button>
    </div>
    </div>
    </Label>
    </div>
    </div>
    </section>
    <div className="container mx-auto px-4 py-16">

    <section className="mb-16">
    <h2 className="text-3xl font-bold leading-tight tracking-tight text-center mb-8">Ofertas Imperdíveis da Semana</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="flex flex-col gap-3 rounded-xl bg-card-light dark:bg-card-dark shadow-md overflow-hidden transition-transform hover:-translate-y-1">
    <div className="w-full bg-center bg-no-repeat aspect-square bg-cover" data-alt="A standard 13kg LPG gas cylinder" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGSo2nz8C0cXbdDN3A2mFMvhdUkHnWCrbMh3IqOyKGUUCzzJBrPBCwxk9r7ZtMbLxTRbFrQnqwgqjF_q2siSBejC_J5e5pBn790Xy11GUUYyrkTBk8JumAEkLaoiE3v3QYb0R51w9H6yrrXuJITrCBMtIPDQOLbxuXuOZam66lb3lH0FcO5LdZJZdq569A_gmEuxADh-SXCVkNVev5X_IdkX5j1dFPwyj71Ay-xeTJ9KuZHX8x_syh27GlySgdqw6BMqGH7a3gJrA');"}}></div>
    <div className="p-4">
    <p className="text-lg font-bold">Botijão GLP 13kg</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">Fornecedor A</p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1"><span className="line-through">De R$110,00</span> por</p>
    <p className="text-2xl font-bold text-secondary">R$99,90</p>
    </div>
    </div>
    <div className="flex flex-col gap-3 rounded-xl bg-card-light dark:bg-card-dark shadow-md overflow-hidden transition-transform hover:-translate-y-1">
    <div className="w-full bg-center bg-no-repeat aspect-square bg-cover" data-alt="A standard 13kg LPG gas cylinder" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDN5_1a_yl0uGROXRg0eVLPucq-xmccCrV-aDWSuh6qBv5daJD8k3rEBcbE97gOagDJ08iItGYYaEiZotPItRliR3zMIDpo4agcjs3PT0Q5HZ2XsFi4O6l6jyktp6XfvEGUym0IiTDscL57bGpOEIf-j0nMQRmnS955iwN8jS_xRLPxbbus85HW0BBRirl4hVcCWrQbvbX00SIN8ulPdPLZ45Jj9_9xmOBF1cja_yd886bKlGq2GBSodRzw6SPY8DXS-0MsqwLjQas');"}}></div>
    <div className="p-4">
    <p className="text-lg font-bold">Botijão GLP 13kg</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">Fornecedor B</p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1"><span className="line-through">De R$115,00</span> por</p>
    <p className="text-2xl font-bold text-secondary">R$105,00</p>
    </div>
    </div>
    <div className="flex flex-col gap-3 rounded-xl bg-card-light dark:bg-card-dark shadow-md overflow-hidden transition-transform hover:-translate-y-1">
    <div className="w-full bg-center bg-no-repeat aspect-square bg-cover" data-alt="A larger 45kg industrial gas cylinder" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAghgmvUcxIjvvQtl9RFqCtM3hyoyGvSXAzB1fLinrUEGlWpzw86RK-FOV7RFK7KpxhFPXiNeU-GDFHOexmW00fuxxh1XDW549wOopjT8cwR3jHSUSwisldy-NX7TFDYcf512Ji7I6Y-V4VRc3DlvzKXuKPj1DMPHB8HDLCyRM50WuHST08AzS9hqippCPPG_r3sde0Q1ZJa4Clz7OtXFpFXE0ZU2fQstJRvocDTjZ_23Ew9QSj-eUZYQ2P5IBGphQ1-P3VIqkdgYM');"}}></div>
    <div className="p-4">
    <p className="text-lg font-bold">Cilindro GLP 45kg</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">Fornecedor C</p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1"><span className="line-through">De R$450,00</span> por</p>
    <p className="text-2xl font-bold text-secondary">R$425,00</p>
    </div>
    </div>
    <div className="flex flex-col gap-3 rounded-xl bg-card-light dark:bg-card-dark shadow-md overflow-hidden transition-transform hover:-translate-y-1">
    <div className="w-full bg-center bg-no-repeat aspect-square bg-cover" data-alt="A standard 13kg LPG gas cylinder" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCxUUle_cUMo-yW3By88_uo3kMz2CfZ6ABc3IGKgkqe537x-1LhitPrt9kqKH1PFOf7a6yf3eil6ChKDoKs8QmcWLWhSigDPXYJQrWklahVo3neuAG7QbxD_ePsU7fGyMrbyO769uCOtqLPNq5XUqH0vxW1MEiMBDlIsKjLTfvkPoXnCA4yrVvBFxE5fFBhwHmxYkImwJWnQdsx8itYyXUxC-abCm9iXjb8kiR89b-BmLNS9bA8t4x9VFC1eGQ7qnVJbg7_cXULO90');"}}></div>
    <div className="p-4">
    <p className="text-lg font-bold">Botijão GLP 13kg</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">Fornecedor D</p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1"><span className="line-through">De R$112,00</span> por</p>
    <p className="text-2xl font-bold text-secondary">R$102,50</p>
    </div>
    </div>
    </div>
    </section>

    <section className="mb-16">
    <h2 className="text-3xl font-bold leading-tight tracking-tight text-center mb-8">Navegue por Categoria</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
    <Link className="group flex flex-col items-center gap-4 p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md text-center hover:bg-primary/10 dark:hover:bg-primary/20" to="#">
    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 group-hover:bg-primary text-primary group-hover:text-white transition-colors">
    <span className="material-symbols-outlined text-4xl">propane_tank</span>
    </div>
    <p className="text-lg font-bold">Gás de Cozinha (GLP)</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">O tradicional para residências e pequenos comércios.</p>
    </Link>
    <Link className="group flex flex-col items-center gap-4 p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md text-center hover:bg-primary/10 dark:hover:bg-primary/20" to="#">
    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 group-hover:bg-primary text-primary group-hover:text-white transition-colors">
    <span className="material-symbols-outlined text-4xl">gas_meter</span>
    </div>
    <p className="text-lg font-bold">Gás Natural (GN)</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">Soluções para condomínios e indústrias com gás encanado.</p>
    </Link>
    <Link className="group flex flex-col items-center gap-4 p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-md text-center hover:bg-primary/10 dark:hover:bg-primary/20" to="#">
    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 group-hover:bg-primary text-primary group-hover:text-white transition-colors">
    <span className="material-symbols-outlined text-4xl">factory</span>
    </div>
    <p className="text-lg font-bold">Cilindros Industriais</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">Cilindros de alta capacidade para uso industrial e comercial.</p>
    </Link>
    </div>
    </section>

    <section>
    <h2 className="text-3xl font-bold leading-tight tracking-tight text-center mb-8">Como Funciona</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
    <div className="flex flex-col items-center">
    <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-secondary/20 text-secondary">
    <span className="material-symbols-outlined text-4xl">search</span>
    </div>
    <h3 className="text-lg font-bold mb-2">1. Busque</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">Informe o produto que você precisa e sua localização.</p>
    </div>
    <div className="flex flex-col items-center">
    <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-secondary/20 text-secondary">
    <span className="material-symbols-outlined text-4xl">compare_arrows</span>
    </div>
    <h3 className="text-lg font-bold mb-2">2. Compare</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">Veja as ofertas dos melhores fornecedores da sua região.</p>
    </div>
    <div className="flex flex-col items-center">
    <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-secondary/20 text-secondary">
    <span className="material-symbols-outlined text-4xl">shopping_bag</span>
    </div>
    <h3 className="text-lg font-bold mb-2">3. Compre</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">Escolha a melhor opção e pague com segurança na plataforma.</p>
    </div>
    <div className="flex flex-col items-center">
    <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-secondary/20 text-secondary">
    <span className="material-symbols-outlined text-4xl">local_shipping</span>
    </div>
    <h3 className="text-lg font-bold mb-2">4. Receba</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">Aguarde a entrega rápida no seu endereço.</p>
    </div>
    </div>
    </section>
    </div>
    </main>
    </div>
    </div>
    <Footer />
    </div>
  );
}