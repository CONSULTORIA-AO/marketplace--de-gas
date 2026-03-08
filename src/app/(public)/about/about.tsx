import { Flame } from 'lucide-react';

const stats = [
  { value: '25+', label: 'Anos de experiência' },
  { value: '200+', label: 'Agências no país' },
  { value: '1M+', label: 'Clientes atendidos' },
  { value: '99.8%', label: 'Taxa de satisfação' },
];

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-widest">
              Sobre Nós
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">
              Tradição e inovação em{' '}
              <span className="text-gradient">energia</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Há mais de 25 anos no mercado, somos referência em fornecimento e
              distribuição de gás. Nossa rede de agências cobre todo o
              território nacional, garantindo abastecimento rápido e seguro para
              milhões de clientes.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Investimos constantemente em tecnologia, segurança e treinamento
              para oferecer o melhor serviço do setor. Cada agência é equipada
              com infraestrutura moderna e equipe altamente capacitada.
            </p>
            <div className="inline-flex items-center gap-2 text-primary font-medium">
              <Flame className="w-5 h-5" />
              <span>Certificação ISO 9001 e ISO 14001</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card-gradient border border-glow rounded-xl p-8 text-center animate-pulse-glow"
              >
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
