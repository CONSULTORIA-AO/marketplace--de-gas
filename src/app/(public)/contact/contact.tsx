import { Phone, Mail, MapPin, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useState } from 'react';
import { useProducts } from '@/service/product/product';
import { GasProduct } from '@/types/product';

const ContactSection = () => {
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
    <div>
      <Header onSearch={(term) => setSearchTerm(term)} />
      <section className="relative bg-white p-10 md:p-16 overflow-hidden">
        {/* Glow effect */}
        <div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, hsl(32, 95%, 55%), transparent)',
          }}
        />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-widest">
              Fale Conosco
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">
              Pronto para <span className="text-gradient">começar?</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Entre em contato com nossa equipe e descubra a melhor solução em
              gás para sua necessidade.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Telefone</div>
                  <div className="font-medium">978106999</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">E-mail</div>
                  <div className="font-medium">jagas@geral.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Sede</div>
                  <div className="font-medium">Luanda/Angola</div>
                </div>
              </div>
            </div>
          </div>

          <form className="bg-secondary/50 border border-glow rounded-xl p-8">
            <div className="space-y-5">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  E-mail
                </label>
                <input
                  type="email"
                  className="w-full bg-background border border-glow rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Seu e-mail"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Telefone
                </label>
                <input
                  type="tel"
                  className="w-full bg-background border border-glow rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="(+244) 943558106"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Mensagem
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-background border border-glow rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  placeholder="Como podemos ajudar?"
                />
              </div>
              <Button
                className="w-full rounded-lg text-white hover:bg-[#FFA500] bg-[#FFA500] font-semibold shadow-[var(--shadow-warm)]"
                size="lg"
              >
                Enviar Mensagem
              </Button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactSection;
