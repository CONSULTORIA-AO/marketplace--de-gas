'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactInputStep from '@/app/auth/recoverpassword/_components/contact';
import VerificationCodeStep from '@/app/auth/recoverpassword/_components/verify';
import { toast } from 'sonner';
import RecoveryMethodStep from './_components/method';
import NewPasswordStep from './_components/newPassword';
import SuccessStep from './_components/sucess';
import { Link, useNavigate } from 'react-router-dom';

const steps = ['Método', 'Contato', 'Código', 'Senha', 'Sucesso'];

const PasswordRecoveryFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [method, setMethod] = useState<'email' | 'sms' | null>(null);
  const [contact, setContact] = useState('');
  const navigate = useNavigate();

  const handleSelectMethod = (selectedMethod: 'email' | 'sms') => {
    setMethod(selectedMethod);
    setCurrentStep(2);
  };

  const handleContactSubmit = (contactValue: string) => {
    setContact(contactValue);
    setCurrentStep(3);
    toast.success(
      `Código enviado para ${method === 'email' ? 'seu e-mail' : 'seu telefone'}!`
    );
  };

  const handleVerify = (code: string) => {
    // Simulate verification
    setCurrentStep(4);
    toast.success('Código verificado com sucesso!');
  };

  const handleResendCode = () => {
    toast.success('Novo código enviado!');
  };

  const handlePasswordSubmit = (password: string) => {
    // Simulate password update
    setCurrentStep(5);
  };

  const handleComplete = () => {
    // Reset and redirect to login
    setCurrentStep(1);
    setMethod(null);
    setContact('');
    toast.success('Redirecionando para login...');
  };

  const goBack = () => {
    if (currentStep === 2) {
      setMethod(null);
    }
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="min-h-screen w-ful flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#FFA500] hover:cursor-pointer transition-colors duration-200 group z-10"
      >
        <svg
          className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>Voltar</span>
      </motion.button>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-border border-border-light text-white"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <RecoveryMethodStep onSelectMethod={handleSelectMethod} />
              )}
              {currentStep === 2 && method && (
                <ContactInputStep
                  method={method}
                  onSubmit={handleContactSubmit}
                  onBack={goBack}
                />
              )}
              {currentStep === 3 && method && (
                <VerificationCodeStep
                  contact={contact}
                  method={method}
                  onVerifySuccess={handleVerify}
                  onBack={goBack}
                  onResend={handleResendCode}
                />
              )}
              {currentStep === 4 && (
                <NewPasswordStep
                  onSubmit={handlePasswordSubmit}
                  onBack={goBack}
                />
              )}
              {currentStep === 5 && <SuccessStep onComplete={handleComplete} />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs sm:text-sm text-muted-foreground mt-6"
        >
          Lembrou sua senha?{' '}
          <Link
            to="/iniciar-sessao"
            className="text-[#FFA500] cursor-pointer hover:underline font-medium"
          >
            Fazer login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default PasswordRecoveryFlow;
