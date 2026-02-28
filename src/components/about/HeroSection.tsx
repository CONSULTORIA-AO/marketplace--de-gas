import heroImage from "@/assets/hero-gas.jpg";
import { Flame, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Infraestrutura de distribuição de gás ao pôr do sol"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, hsla(220, 20%, 7%, 0.4) 0%, hsla(220, 20%, 7%, 0.97) 100%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow bg-secondary/50 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Flame className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Líder em distribuição de gás</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-800 leading-tight mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          Energia que{" "}
          <span className="text-gradient">move</span>
          <br />
          o seu negócio
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          Fornecimento confiável de gás para residências, comércios e indústrias.
          Rede de agências em todo o país com atendimento de excelência.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <Button variant="default" size="lg" className="text-base font-semibold shadow-[var(--shadow-warm)]">
            <Flame className="w-5 h-5 mr-2" />
            Solicitar Orçamento
          </Button>
          <Button variant="outline" size="lg" className="text-base font-semibold border-glow">
            Encontrar Agência
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <ArrowDown className="w-5 h-5 text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
