import { Header } from '@/components/layout/header';
import { Shield, FileText } from 'lucide-react';

const TermsPrivacity = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
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
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Termos de Uso
              </h2>
            </div>

            <div className="space-y-8 text-muted-foreground leading-relaxed">
              <div className="p-6 rounded-2xl border border-glow bg-card/30">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  1. Aceitação dos Termos
                </h3>
                <p>
                  Ao acessar e utilizar os serviços da GásEnergia, você concorda
                  com estes Termos de Uso. Caso não concorde com qualquer
                  disposição, solicitamos que não utilize nossos serviços. O uso
                  continuado constitui aceitação integral destes termos.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-glow bg-card/30">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  2. Serviços Oferecidos
                </h3>
                <p>
                  A GásEnergia fornece serviços de distribuição de gás
                  liquefeito de petróleo (GLP) para residências, comércios e
                  indústrias, incluindo entrega, instalação, manutenção
                  preventiva e consultoria de segurança. A disponibilidade dos
                  serviços pode variar conforme a região.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-glow bg-card/30">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  3. Responsabilidades do Usuário
                </h3>
                <p>
                  O usuário compromete-se a fornecer informações verdadeiras e
                  atualizadas, utilizar os serviços de acordo com a legislação
                  vigente, garantir condições seguras para a entrega e
                  armazenamento do gás, e comunicar imediatamente qualquer
                  irregularidade ou vazamento.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-glow bg-card/30">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  4. Preços e Pagamentos
                </h3>
                <p>
                  Os preços dos produtos e serviços são informados no momento da
                  solicitação e podem sofrer alterações sem aviso prévio. O
                  pagamento deve ser realizado conforme as condições acordadas
                  no ato da compra. Aceitamos diversas formas de pagamento,
                  incluindo PIX, cartão e dinheiro.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-glow bg-card/30">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  5. Limitação de Responsabilidade
                </h3>
                <p>
                  A GásEnergia não se responsabiliza por danos decorrentes do
                  uso inadequado dos produtos, instalações realizadas por
                  terceiros não autorizados, ou casos de força maior. Nossa
                  responsabilidade limita-se ao valor do serviço contratado.
                </p>
              </div>
            </div>
          </section>

          {/* Política de Privacidade */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Política de Privacidade
              </h2>
            </div>

            <div className="space-y-8 text-muted-foreground leading-relaxed">
              <div className="p-6 rounded-2xl border border-glow bg-card/30">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  1. Dados Coletados
                </h3>
                <p>
                  Coletamos informações pessoais como nome, endereço, telefone e
                  e-mail necessárias para a prestação dos nossos serviços. Dados
                  de navegação como cookies e endereço IP também podem ser
                  coletados para melhorar a experiência do usuário.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-glow bg-card/30">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  2. Uso das Informações
                </h3>
                <p>
                  Suas informações são utilizadas exclusivamente para processar
                  pedidos e entregas, entrar em contato sobre serviços
                  solicitados, enviar comunicações relevantes (com seu
                  consentimento), melhorar nossos serviços e cumprir obrigações
                  legais.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-glow bg-card/30">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  3. Compartilhamento de Dados
                </h3>
                <p>
                  Não vendemos, alugamos ou compartilhamos suas informações
                  pessoais com terceiros para fins de marketing. Dados podem ser
                  compartilhados apenas com parceiros logísticos para efetuar
                  entregas e com autoridades quando exigido por lei.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-glow bg-card/30">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  4. Segurança dos Dados
                </h3>
                <p>
                  Empregamos medidas técnicas e organizacionais adequadas para
                  proteger seus dados pessoais contra acesso não autorizado,
                  alteração, divulgação ou destruição. Utilizamos criptografia e
                  protocolos de segurança atualizados.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-glow bg-card/30">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  5. Seus Direitos (LGPD)
                </h3>
                <p>
                  Conforme a Lei Geral de Proteção de Dados (LGPD), você tem
                  direito a acessar, corrigir, excluir ou solicitar a
                  portabilidade dos seus dados pessoais. Para exercer seus
                  direitos, entre em contato conosco pelo e-mail
                  privacidade@gasenergia.com.br.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-glow bg-card/30">
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  6. Atualizações desta Política
                </h3>
                <p>
                  Esta política pode ser atualizada periodicamente. Recomendamos
                  a consulta regular desta página. Alterações significativas
                  serão comunicadas por meio dos nossos canais oficiais. Última
                  atualização: Fevereiro de 2026.
                </p>
              </div>
            </div>
          </section>

          {/* Back link */}
          <div className="mt-16 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
            >
              ← Voltar para a página inicial
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsPrivacity;