import { motion } from 'framer-motion';
import { Mail, Phone, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  recoveryContactSchema,
  type RecoveryContactFormData,
} from '@/lib/validations';
import { api } from '@/lib/axios';
import { ToastAction } from '../ui/toast';
import { useToast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';
import { useUserStore } from '@/store/userIfo';

interface ContactInputStepProps {
  method: 'email' | 'sms';
  onSubmit: (contact: string) => void;
  onBack: () => void;
}

const ContactInputStep = ({
  method,
  onSubmit,
  onBack,
}: ContactInputStepProps) => {
  const { toast } = useToast();
  const setEntidade = useUserStore((state) => state.setEntidade);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryContactFormData>({
    resolver: zodResolver(recoveryContactSchema),
  });

  const submitHandler = async (data: RecoveryContactFormData) => {
    try {
      const response = await api.post('/clientes/codigo-seguranca/pedir', {
        emailCliente: data.contact,
        canal: method === 'email' ? 'E-mail' : 'SMS',
      });
      setEntidade(response.data.info.entidade);

      toast({
        description: (
          <div className="flex items-center gap-4 bg-white">
            <span className="text-[#717F96]">{response.data.mensagem}</span>
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

      onSubmit(data.contact);
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
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full gradient-primary flex items-center justify-center mb-4">
          {method === 'email' ? (
            <Mail className="w-7 h-7 sm:w-9 sm:h-9 text-primary" />
          ) : (
            <Phone className="w-7 h-7 sm:w-9 sm:h-9 text-primary" />
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
          {method === 'email' ? 'Insira seu E-mail' : 'Insira seu Telefone'}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          {method === 'email'
            ? 'Enviaremos um código de verificação para o seu e-mail'
            : 'Enviaremos um código de verificação via SMS'}
        </p>
      </div>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div className="space-y-2">
          <Input
            type={method === 'email' ? 'email' : 'tel'}
            placeholder={
              method === 'email' ? 'seu@email.com' : '+244 943 558 106'
            }
            {...register('contact')}
            className="h-12 sm:h-14 text-sm sm:text-base px-4 rounded-xl border text-primary"
          />
          {errors.contact && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-xs sm:text-sm"
            >
              {errors.contact.message}
            </motion.p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={onBack}
            className="flex-1 h-12 sm:h-14 rounded-xl text-sm sm:text-base bg-blue-500 hover:bg-blue-600 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            type="submit"
            className="flex-1 h-12 sm:h-14 rounded-xl text-white text-sm sm:text-base hover:opacity-90 transition-opacity bg-primary hover:bg-orange-500"
          >
            Enviar Código
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactInputStep;
