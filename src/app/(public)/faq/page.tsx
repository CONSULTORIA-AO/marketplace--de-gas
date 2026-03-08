import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  MessageCircleQuestion,
  Zap,
  Shield,
  Settings,
  CreditCard,
  Users,
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'Como posso criar minha conta?',
    answer:
      "Para criar sua conta, basta clicar no botão 'Cadastrar' no canto superior direito da página. Preencha seus dados pessoais, confirme seu e-mail e pronto! Você terá acesso completo à plataforma em poucos minutos.",
    icon: <Users className="w-5 h-5" />,
    category: 'Conta',
  },
  {
    id: '2',
    question: 'Quais são os métodos de pagamento aceitos?',
    answer:
      'Aceitamos cartões de crédito (Visa, Mastercard, Elo, American Express), PIX, boleto bancário e transferência bancária. Todos os pagamentos são processados de forma segura com criptografia de ponta a ponta.',
    icon: <CreditCard className="w-5 h-5" />,
    category: 'Pagamentos',
  },
  {
    id: '3',
    question: 'A plataforma é segura?',
    answer:
      'Sim! Utilizamos as mais avançadas tecnologias de segurança, incluindo criptografia SSL de 256 bits, autenticação de dois fatores (2FA) e monitoramento 24/7 contra atividades suspeitas. Seus dados estão sempre protegidos.',
    icon: <Shield className="w-5 h-5" />,
    category: 'Segurança',
  },
  {
    id: '4',
    question: 'Como funciona o suporte técnico?',
    answer:
      'Nosso suporte técnico está disponível 24 horas por dia, 7 dias por semana. Você pode nos contatar via chat ao vivo, e-mail ou telefone. O tempo médio de resposta é de apenas 5 minutos para o chat e 2 horas para e-mail.',
    icon: <Settings className="w-5 h-5" />,
    category: 'Suporte',
  },
  {
    id: '5',
    question: 'Posso cancelar a qualquer momento?',
    answer:
      'Absolutamente! Não há contratos de fidelidade. Você pode cancelar sua assinatura a qualquer momento diretamente pelo painel de controle. O acesso permanece ativo até o final do período já pago.',
    icon: <Zap className="w-5 h-5" />,
    category: 'Planos',
  },
  {
    id: '6',
    question: 'Existe um plano gratuito disponível?',
    answer:
      'Sim! Oferecemos um plano gratuito com funcionalidades essenciais para você testar a plataforma. Você pode fazer upgrade para um plano premium a qualquer momento para desbloquear recursos avançados e suporte prioritário.',
    icon: <Zap className="w-5 h-5" />,
    category: 'Planos',
  },
];

const AccordionItem = ({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <div
        className={`rounded-xl border transition-all duration-300 overflow-hidden ${
          isOpen
            ? 'border-primary/50 bg-card shadow-lg shadow-primary/5'
            : 'border-border bg-card/50 hover:border-primary/30 hover:bg-card'
        }`}
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-4 p-5 md:p-6 text-left cursor-pointer"
        >
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
              isOpen
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground group-hover:text-primary'
            }`}
          >
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-medium uppercase tracking-wider text-primary mb-1 block">
              {item.category}
            </span>
            <h3 className="text-foreground font-semibold text-base md:text-lg leading-tight">
              {item.question}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isOpen
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground'
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="px-5 md:px-6 pb-5 md:pb-6 pl-[4.75rem] md:pl-[5.25rem]">
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div
      className="min-h-screen bg-background"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
          >
            <MessageCircleQuestion className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">
              Central de Ajuda
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
          >
            Perguntas <span className="text-primary">Frequentes</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Encontre respostas rápidas para as dúvidas mais comuns sobre nossa
            plataforma.
          </motion.p>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex flex-col gap-3">
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <AccordionItem
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center p-8 rounded-2xl border border-border bg-card/50"
        >
          <p
            className="text-muted-foreground mb-1"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Não encontrou o que procurava?
          </p>
          <a href="#" className="text-primary font-semibold hover:underline">
            Entre em contato com nosso suporte →
          </a>
        </motion.div>
      </div>
    </div>
  );
}