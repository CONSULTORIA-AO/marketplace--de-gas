'use client';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, Check, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { type RecoveryAccout, recoveryAccount } from '@/schema/customer.schema';
import { ToastAction } from '@/components/ui/toast';
import { api } from '@/utils/api';
//import { useUserStore } from '@/store/userIfo';

interface NewPasswordStepProps {
  onSubmit: (password: string) => void;
  onBack: () => void;
}

const NewPasswordStep = ({ onSubmit, onBack }: NewPasswordStepProps) => {
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    watch,
    formState: { errors: passwordErrors },
  } = useForm<RecoveryAccout>({
    resolver: zodResolver(recoveryAccount),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  //const entidade = useUserStore((state) => state.cliente.clienteId);

  const password = watch('newPassword') || '';
  const confirmPassword = watch('confirmPassword') || '';

  const requirements = [
    { label: 'Mínimo 8 caracteres', valid: password.length >= 8 },
    { label: 'Uma letra maiúscula', valid: /[A-Z]/.test(password) },
    { label: 'Uma letra minúscula', valid: /[a-z]/.test(password) },
    { label: 'Um número', valid: /[0-9]/.test(password) },
    {
      label: 'Um caractere especial',
      valid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const allRequirementsMet = requirements.every((req) => req.valid);

  async function onSubmitPassword(data: RecoveryAccout) {
    try {
      const response = await api.patch(`/recuperar-conta`, {
        senha: data.newPassword,
        confirmar_senha: data.confirmPassword,
      });
      toast({
        description: (
          <div className="flex items-center gap-4 ">
            <div className="rounded-full w-8 h-8 flex justify-center items-center"></div>
            <span className="text-blue-500">{response.data.mensagem}</span>
          </div>
        ),
        action: (
          <ToastAction
            altText="close"
            className="shadow-none border-none text-[#f2f4f8] hover:bg-transparent"
          >
            .
          </ToastAction>
        ),
        className:
          'border-l-4 border-l-blue-500 border-t-0 border-r-0 border-b-0',
      });
      resetPassword();
      onSubmit(data.newPassword);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          description: (
            <div className="flex items-center gap-4 ">
              <div className="rounded-full w-8 h-8 flex justify-center items-center bg-[fill: rgba(251, 55, 72, 0.16)"></div>
              <span className="text-[#717F96]">
                {error?.response?.data.mensagem}
              </span>
            </div>
          ),
          action: (
            <ToastAction
              altText="close"
              className="shadow-none border-none text-[#717F96] hover:bg-transparent"
            >
              .
            </ToastAction>
          ),
          className:
            'border-l-4 border-l-[#FB3748] border-t-0 border-r-0 border-b-0',
        });
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full gradient-blue-500 flex items-center justify-center mb-4"
        >
          <span className="text-2xl sm:text-3xl">🔒</span>
        </motion.div>
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-500">
          Nova Senha
        </h2>
        <p className="text-sm sm:text-base text-blue-500">
          Crie uma senha forte para proteger sua conta
        </p>
      </div>

      <form
        onSubmit={handleSubmitPassword(onSubmitPassword)}
        className="space-y-4"
      >
        <div className="space-y-3">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Nova senha"
              {...registerPassword('newPassword')}
              className="h-12 sm:h-14 text-black text-sm sm:text-base px-4 pr-12 rounded-xl border-2 focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:text-black transition-colors cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirmar senha"
              {...registerPassword('confirmPassword')}
              className="h-12 sm:h-14 text-black text-sm sm:text-base px-4 pr-12 rounded-xl border-2 focus:border-primary focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-black transition-colors cursor-pointer"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="bg-card bg-white text-blue-500 rounded-xl p-4 border border-border">
          <p className="text-xs sm:text-sm font-medium text-foreground mb-3">
            Requisitos da senha:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {requirements.map((req, index) => (
              <motion.div
                key={req.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-2"
              >
                {req.valid ? (
                  <Check className="w-4 h-4 text-success flex-shrink-0" />
                ) : (
                  <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
                <span
                  className={`text-xs sm:text-sm ${
                    req.valid ? 'text-success' : 'text-muted-foreground'
                  }`}
                >
                  {req.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {passwordErrors.newPassword?.message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-destructive text-center text-xs sm:text-sm"
          >
            {passwordErrors.newPassword.message}
          </motion.p>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={onBack}
            className="flex-1 h-12 sm:h-14 rounded-xl text-sm sm:text-base bg-green-500 hover:bg-green-700 text-white cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            type="submit"
            disabled={!allRequirementsMet || password !== confirmPassword}
            className="flex-1 h-12 sm:h-14 rounded-xl gradient-[#137fec] text-[#137fec]-foreground text-sm sm:text-base hover:opacity-90 transition-opacity disabled:opacity-50 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer"
          >
            Redefinir Senha
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default NewPasswordStep;
