import { Phone, Mail, MapPin, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  return (
    <section id="contato" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="relative bg-card-gradient border border-glow rounded-2xl p-10 md:p-16 overflow-hidden">
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
                    <div className="text-sm text-muted-foreground">
                      Telefone
                    </div>
                    <div className="font-medium">0800 123 4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">E-mail</div>
                    <div className="font-medium">contato@gasenergia.com.br</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Sede</div>
                    <div className="font-medium">São Paulo, SP — Brasil</div>
                  </div>
                </div>
              </div>
            </div>

            <form className="bg-secondary/50 border border-glow rounded-xl p-8">
              <div className="space-y-5">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">
                    Nome
                  </label>
                  <input
                    className="w-full bg-background border border-glow rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">
                    Telefone
                  </label>
                  <input
                    className="w-full bg-background border border-glow rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="(00) 00000-0000"
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
                  className="w-full font-semibold shadow-[var(--shadow-warm)]"
                  size="lg"
                >
                  <Flame className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
