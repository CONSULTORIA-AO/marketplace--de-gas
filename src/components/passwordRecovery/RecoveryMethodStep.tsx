import { motion } from 'framer-motion';
import { Mail, Smartphone } from 'lucide-react';

interface RecoveryMethodStepProps {
  onSelectMethod: (method: 'email' | 'sms') => void;
}

const RecoveryMethodStep = ({ onSelectMethod }: RecoveryMethodStepProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
          Recuperar Senha
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Escolha como deseja receber o código de verificação
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
        <motion.button
          onClick={() => onSelectMethod('email')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-4 sm:p-5 rounded-xl border-0 bg-card-primary bg-primary text-white hover:shadow-glow transition-all duration-300 flex items-center gap-4 dark:border-border-dark border-slate-100 dark:border-slate-900 hover:text-white"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 bg-[#fff] text-primary">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">
              E-mail
            </h3>
            <p className="text-xs sm:text-sm text-gray-50">
              Receba o código no seu endereço de e-mail
            </p>
          </div>
        </motion.button>

        <motion.button
          onClick={() => onSelectMethod('sms')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-4 sm:p-5 rounded-xl border-0 hover:shadow-glow transition-all duration-300 flex items-center gap-4 text-white bg-card-primary bg-primary"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 bg-[#fff] text-primary">
            <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <div className="text-left text-white">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">
              SMS
            </h3>
            <p className="text-xs sm:text-sm text-white">
              Receba o código via mensagem de texto
            </p>
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default RecoveryMethodStep;
