'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  recoveryContactSchema,
  type RecoveryContactFormData,
} from '@/schema/customer.schema';
import { api } from '@/utils/api';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';
import { useUserStore } from '@/hooks/customer';

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
      console.log("Resposta da api:", response.data?.info.entidade)
    setEntidade(response.data?.info.entidade);

      toast({
        description: (
          <div className="flex items-center gap-4 bg-white">
            <span className="text-[#FFA500]">{response.data.mensagem}</span>
          </div>
        ),
        action: (
          <ToastAction
            altText="close"
            className="shadow-none border-none text-primary hover:bg-transparent"
          >
            .
          </ToastAction>
        ),
        className:
          'border-l-4 border-l-[#FFA500] border-t-0 border-b-0 border-r-0',
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
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full gradient-[#FFA500] flex items-center justify-center mb-4">
          {method === 'email' ? (
            <Mail className="w-7 h-7 sm:w-9 sm:h-9 text-[#FFA500]" />
          ) : (
            <Phone className="w-7 h-7 sm:w-9 sm:h-9 text-[#FFA500]" />
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-[#FFA500]">
          {method === 'email' ? 'Insira seu E-mail' : 'Insira seu Telefone'}
        </h2>
        <p className="text-sm sm:text-base text-[#FFA500]">
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
            className="h-12 sm:h-14 text-sm sm:text-base px-4 rounded-xl border focus:border-[#FFA500] focus:ring-[#FFA500] text-black cursor-pointer"
          />
          {errors.contact && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs sm:text-sm"
            >
              {errors.contact.message}
            </motion.p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={onBack}
            className="flex-1 h-12 sm:h-14 rounded-lg text-sm sm:text-base bg-[#FFA500] hover:bg-orange-600 text-white cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            type="submit"
            className="flex-1 h-12 sm:h-14 rounded-lg gradient-[#137fec] text-white text-sm sm:text-base hover:opacity-90 cursor-pointer text-white transition-opacity bg-green-500 hover:bg-green-600"
          >
            Enviar Código
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactInputStep;
