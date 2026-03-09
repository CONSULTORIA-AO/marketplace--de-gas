'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaRegEyeSlash, LiaEyeSolid } from '@/constants/icons';
import { Button } from '@/components/ui/button';
import BackgoundImage from '@/assets/wallpaper.jpg';
import { useToast } from '@/hooks/use-toast';
import {
  registerSchema,
  type RegisterFormData,
} from '@/schema/customer.schema';
import { api } from '@/utils/api';
import { ToastAction } from '@/components/ui/toast';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function SignUp() {
  const router = useNavigate();
  const [focused, setFocused] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await api.post('/clientes', data);
      return response.data;
    },
    onSuccess: () => {
      toast({
        description: (
          <div className="flex items-center gap-4 bg-white">
            <span className="text-[#717F96]">Conta criada com sucesso!</span>
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
      navigate('/iniciar-sessao');
    },
    onError: (error: unknown) => {
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
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      {/* ── LEFT SIDE ─────────────────────────────────────────────────────── */}
      <div className="flex-[1.1] bg-white flex flex-col relative">
        {/* Form area */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-center px-16 pb-10"
          style={{ maxWidth: 520 }}
        >
          {/* Logo + subtitle */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-black text-[#FFA500] mb-2"
          >
            JaGás
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-500 text-base mb-10"
          >
            Crie conta
          </motion.p>

          {/* Fields */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + 1 * 0.08 }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Seu completo"
                {...register('nomeCliente')}
                className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b transition-colors"
              />
              {/* Show/hide password toggle */}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + 2 * 0.08 }}
              className="relative"
            >
              <input
                type="email"
                placeholder="Seu e-mail"
                {...register('emailCliente')}
                className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b transition-colors"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + 2 * 0.08 }}
              className="relative"
            >
              <input
                type="tel"
                placeholder="Seu telefone"
                {...register('telefoneCliente')}
                className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b transition-colors"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + 2 * 0.08 }}
              className="relative"
            >
              <input
                type="tel"
                placeholder="Seu telefone alternativo"
                {...register('telefoneClienteAlt')}
                className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b transition-colors"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + 2 * 0.08 }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Seu endereço"
                {...register('enderecoCliente')}
                className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b transition-colors"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + 2 * 0.08 }}
              className="relative"
            >
              <input
                type="password"
                placeholder="Digite a sua senha"
                {...register('senhaCliente')}
                className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b transition-colors"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + 2 * 0.08 }}
              className="relative"
            >
              <input
                type="password"
                placeholder="Digite novamente a senha"
                {...register('confirmar_senha')}
                className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b transition-colors"
              />
            </motion.div>
          </div>

          {/* Submit button */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            whileHover={{ backgroundColor: '#FFA500', scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-10 w-full py-4 hover:cursor-pointer rounded-lg bg-[#FFA500] hover:bg-[#FFA500] text-white font-bold text-base shadow-md transition-colors"
          >
            Criar conta
          </motion.button>

          {/* Login link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-5 text-center text-sm text-gray-700"
          >
            Tem uma conta?{' '}
            <span
              className="text-[#FFA500] font-medium cursor-pointer hover:underline"
              onClick={() => router('/iniciar-sessao')}
            >
              Acessar conta
            </span>
          </motion.p>
        </form>
      </div>

      {/* ── RIGHT SIDE — blue gradient ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="w-[42%] flex-shrink-0 relative overflow-hidden"
      >
        <img
          className="absolute inset-0 bg-cover bg-center h-full"
          src={BackgoundImage}
        />
        {/* Blue tint overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(200, 146, 30, 0.42)' }}
        />
      </motion.div>
    </div>
  );
}
