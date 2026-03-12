import { Header } from '@/components/layout/header';
import HeroSection from '@/app/(public)/about/hero';
import ServicesSection from '@/app/(public)/services/service';
import AboutSection from '@/app/(public)/about/about';
import { useState } from 'react';
import { useProducts } from '@/service/product/product';
import { GasProduct } from '@/types/product';
import { Footer } from '@/components/layout/footer';

const About = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Busca os produtos com React Query
  const { data, isLoading, isError, error } = useProducts();

  // Filtra localmente (client-side) com base no searchTerm
  const filteredProducts = (data?.mensagem || []).filter(
    (product: GasProduct) =>
      product.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.unidadeMedida.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={(term) => setSearchTerm(term)} />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <Footer />
      </main>
    </div>
  );
};

export default About;
