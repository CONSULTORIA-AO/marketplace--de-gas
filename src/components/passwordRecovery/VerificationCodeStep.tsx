import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import {
  verificationCodeSchema,
  VerificationCodeFormData,
} from '@/lib/validations';
import { api } from '@/lib/axios';
import { AxiosError } from 'axios';
import { ToastAction } from '../ui/toast';
import { useUserStore } from '@/store/userIfo';

interface VerificationCodeStepProps {
  contact: string;
  method: 'email' | 'sms';
  onVerifySuccess: (code: string) => void;
  onBack: () => void;
  onResend: () => void;
}

const VerificationCodeStep = ({
  contact,
  method,
  onVerifySuccess,
  onBack,
  onResend,
}: VerificationCodeStepProps) => {
  const { toast } = useToast();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const entidade = useUserStore((state) => state.cliente.clienteId);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<VerificationCodeFormData>({
    resolver: zodResolver(verificationCodeSchema),
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    clearErrors('codigo_seguranca');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullCode = newCode.join('');
    setValue('codigo_seguranca', fullCode);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split('').forEach((digit, index) => {
      if (index < 6) newCode[index] = digit;
    });

    setCode(newCode);
    setValue('codigo_seguranca', newCode.join(''));
  };

  const onSubmit = async (data: VerificationCodeFormData) => {
    try {
      await api.post('/clientes/codigo-seguranca/autenticar', {
        codigo_seguranca: data.codigo_seguranca,
        entidade: entidade,
      });

      toast({
        description: (
          <div className="flex items-center gap-4 bg-white">
            <span className="text-[#717F96]">Enviado com sucesso!</span>
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
          'border-l-4 border-l-[#ff8300] border-t-0 border-b-0 border-r-0',
      });

      onVerifySuccess(data.codigo_seguranca);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast({
          description: (
            <div className="flex items-center gap-4 ">
              <div className="rounded-full w-8 h-8 flex justify-center items-center bg-[fill: rgba(251, 55, 72, 0.16)]"></div>

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
            'border-l-4 border-l-[#FB3748] border-t-0 border-b-0 border-r-0',
        });
      }
    }
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    onResend();
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const maskContact = () => {
    if (method === 'email') {
      const [user, domain] = contact.split('@');
      return `${user.slice(0, 2)}***@${domain}`;
    }
    return `***${contact.slice(-4)}`;
  };

  const isCodeComplete = code.every((digit) => digit !== '');

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
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full gradient-primary flex items-center justify-center mb-4"
        >
          <span className="text-2xl sm:text-3xl">🔐</span>
        </motion.div>
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
          Código de Verificação
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Insira o código enviado para{' '}
          <span className="font-medium text-foreground">{maskContact()}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-center gap-2 sm:gap-3">
          {code.map((digit, index) => (
            <motion.input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 text-center text-lg sm:text-xl md:text-2xl font-semibold rounded-xl border-2 border-primary bg-card bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          ))}
        </div>

        {errors.codigo_seguranca && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-destructive text-center text-xs sm:text-sm"
          >
            {errors.codigo_seguranca.message}
          </motion.p>
        )}

        <Button
          type="submit"
          disabled={!isCodeComplete || isSubmitting}
          className="w-full h-12 rounded-xl bg-orange-600 hover:bg-primary text-white disabled:opacity-50"
        >
          {isSubmitting ? 'Validando...' : 'Validar Código'}
        </Button>
      </form>

      <div className="text-center">
        {canResend ? (
          <button
            onClick={handleResend}
            className="text-primary hover:underline text-sm sm:text-base inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reenviar código
          </button>
        ) : (
          <p className="text-muted-foreground text-sm sm:text-base">
            Reenviar em{' '}
            <span className="font-semibold text-foreground">{countdown}s</span>
          </p>
        )}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        className="w-full h-12 sm:h-14 rounded-xl text-sm sm:text-base border-0 bg-blue-600 hover:bg-blue-700 text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>
    </motion.div>
  );
};

export default VerificationCodeStep;
