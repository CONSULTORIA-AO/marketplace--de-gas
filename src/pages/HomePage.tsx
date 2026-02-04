import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderHome } from '@/components/homeLayout/Header';
import { useCartStore } from '@/store/cartstore';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/lib/axios';
import type { GasProduct } from '@/types/index';
import { Footer } from '@/components/layout/Footer';
import { OffersSection } from '@/components/homeLayout/Offers';
import { HeroSection } from "@/components/homeLayout/HeroSection";
import { CategorySection } from "@/components/homeLayout/Category";
import { HowWorkSection } from "@/components/homeLayout/HowWork";

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
            <HeaderHome />
            <main className="flex-1">
              <HeroSection />
              <div className="container mx-auto px-4 py-16">
                <OffersSection />
                <CategorySection />
                <HowWorkSection />
              </div>
            </main>
          </div>
      </div>
      <Footer />
    </div>
  );
}