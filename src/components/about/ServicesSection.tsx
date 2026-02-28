import { Truck, Building2, Factory, ShieldCheck, Clock, MapPin } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Entrega Residencial",
    description: "Gás de cozinha entregue na sua porta com rapidez e segurança.",
  },
  {
    icon: Building2,
    title: "Fornecimento Comercial",
    description: "Soluções sob medida para restaurantes, hotéis e comércios.",
  },
  {
    icon: Factory,
    title: "Gás Industrial",
    description: "Abastecimento contínuo para operações industriais de grande porte.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança Certificada",
    description: "Todos os processos seguem rigorosas normas de segurança.",
  },
  {
    icon: Clock,
    title: "Atendimento 24h",
    description: "Suporte emergencial disponível 24 horas por dia, 7 dias por semana.",
  },
  {
    icon: MapPin,
    title: "Rede de Agências",
    description: "Mais de 200 agências espalhadas por todo o território nacional.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-widest">Nossos Serviços</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Soluções completas em <span className="text-gradient">gás</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Do residencial ao industrial, oferecemos a melhor infraestrutura de distribuição de gás do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card-gradient border border-glow rounded-xl p-8 hover:border-primary/40 transition-all duration-500 hover:shadow-[var(--glow-primary)]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
