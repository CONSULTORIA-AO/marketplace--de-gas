import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { privacySections, termsSections } from '@/constants/termos';
import { useProducts } from '@/service/product/product';
import { GasProduct } from '@/types/product';
import { Shield, FileText } from 'lucide-react';
import { useState } from 'react';

const TermsPrivacity = () => {
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
    <div className="min-h-screen bg-background text-foreground">
      <Header onSearch={(term) => setSearchTerm(term)} />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Termos de Uso &{' '}
              <span className="bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
                Política de Privacidade
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sua confiança é nossa prioridade. Leia atentamente os termos que
              regem o uso dos nossos serviços.
            </p>
          </div>

          {/* Termos de Uso */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#FFA500]" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Termos de Uso
              </h2>
            </div>

            <div className="space-y-8 text-muted-foreground leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {termsSections.map((section) => (
                  <div
                    key={section.id}
                    className={`p-6 rounded-2xl border border-glow ${section.bgClass}`}
                  >
                    <h3
                      className={`font-display text-lg font-semibold ${section.textClass} mb-3`}
                    >
                      {section.title}
                    </h3>
                    <p className={section.textClass}>{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Política de Privacidade */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#FFA500]" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Política de Privacidade
              </h2>
            </div>

            <div className="space-y-8 text-muted-foreground leading-relaxed">
              {privacySections.map((section) => (
                <div
                  key={section.id}
                  className={`p-6 rounded-2xl border border-glow ${section.bgClass}`}
                >
                  <h3
                    className={`font-display text-lg font-semibold ${section.textClass} mb-3`}
                  >
                    {section.title}
                  </h3>
                  <p className={section.textClass}>{section.content}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPrivacity;
