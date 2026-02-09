import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound } from "lucide-react";
import RecoveryMethodStep from "@/components/passwordRecovery/RecoveryMethodStep";
import ContactInputStep from "@/components/passwordRecovery/ContactInputStep";
import VerificationCodeStep from "@/components/passwordRecovery/VerificationCodeStep";
import NewPasswordStep from "@/components/passwordRecovery/NewPasswordStep";
import SuccessStep from "@/components/passwordRecovery/SuccessStep";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const steps = ["Método", "Contato", "Código", "Senha", "Sucesso"];

const PasswordRecoveryFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [method, setMethod] = useState<"email" | "sms" | null>(null);
  const [contact, setContact] = useState("");

  const handleSelectMethod = (selectedMethod: "email" | "sms") => {
    setMethod(selectedMethod);
    setCurrentStep(2);
  };

  const handleContactSubmit = (contactValue: string) => {
    setContact(contactValue);
    setCurrentStep(3);
    toast.success(
      `Código enviado para ${method === "email" ? "seu e-mail" : "seu telefone"}!`
    );
  };

  const handleVerify = (code: string) => {
    // Simulate verification
    setCurrentStep(4);
    toast.success("Código verificado com sucesso!");
  };

  const handleResendCode = () => {
    toast.success("Novo código enviado!");
  };

  const handlePasswordSubmit = (password: string) => {
    // Simulate password update
    setCurrentStep(5);
  };

  const handleComplete = () => {
    // Reset and redirect to login
    setCurrentStep(1);
    setMethod(null);
    setContact("");
    toast.success("Redirecionando para login...");
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-lg border-border-light dark:border-border-dark border border-slate-100 dark:border-slate-900 shadow-xl"
      >
        {/* Logo/Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl gradient-[#137fec] shadow-glow mb-3">
            <KeyRound className="w-7 h-7 sm:w-8 sm:h-8 text-[#137fec]" />
          </div>
          <h1 className="text-lg sm:text-xl font-semibold text-[#137fec]">
            Recuperação de Senha
          </h1>
        </motion.div>

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
                  onVerify={handleVerify}
                  onBack={goBack}
                  onResend={handleResendCode}
                />
              )}
              {currentStep === 4 && (
                <NewPasswordStep onSubmit={handlePasswordSubmit} onBack={goBack} />
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
          Lembrou sua senha?{" "}
          <Link to="/login" className="text-[#137fec] hover:underline font-medium">
            Fazer login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default PasswordRecoveryFlow;
