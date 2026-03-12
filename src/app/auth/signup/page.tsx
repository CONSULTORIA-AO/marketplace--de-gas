'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackGroundImage from '@/assets/botja.png';
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
import { LiaEyeSolid } from 'react-icons/lia';
import { FaRegEyeSlash } from 'react-icons/fa';

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
            <div className="flex items-center gap-4">
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

  // Helper: border color by focus
  const borderStyle = (field: string) => ({
    borderBottomColor: focused === field ? '#FFA500' : '#C0C0C0',
    borderBottomWidth: focused === field ? 2 : 1,
  });

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      {/* ── LEFT SIDE ─────────────────────────────────────────────────────── */}
      <div className="flex-[1.1] bg-white flex flex-col relative w-full">
        {/* Back button */}
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

        {/* Form area */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-16 pb-10 pt-16 w-full mx-auto"
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
            {/* Nome */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + 1 * 0.08 }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Seu nome completo"
                {...register('nomeCliente')}
                onFocus={() => setFocused('nome')}
                onBlur={() => setFocused(null)}
                className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b transition-colors"
                style={borderStyle('nome')}
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#FFA500]"
                animate={{ width: focused === 'nome' ? '100%' : '0%' }}
                transition={{ duration: 0.25 }}
              />
              {errors.nomeCliente && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.nomeCliente.message}
                </p>
              )}
            </motion.div>

            {/* Email */}
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
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b transition-colors"
                style={borderStyle('email')}
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#FFA500]"
                animate={{ width: focused === 'email' ? '100%' : '0%' }}
                transition={{ duration: 0.25 }}
              />
              {errors.emailCliente && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.emailCliente.message}
                </p>
              )}
            </motion.div>

            {/* Telefone */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + 3 * 0.08 }}
              className="relative"
            >
              <input
                type="tel"
                placeholder="Seu telefone"
                {...register('telefoneCliente')}
                onFocus={() => setFocused('tel')}
                onBlur={() => setFocused(null)}
                className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b transition-colors"
                style={borderStyle('tel')}
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#FFA500]"
                animate={{ width: focused === 'tel' ? '100%' : '0%' }}
                transition={{ duration: 0.25 }}
              />
              {errors.telefoneCliente && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.telefoneCliente.message}
                </p>
              )}
            </motion.div>

            {/* Telefone alternativo */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + 4 * 0.08 }}
              className="relative"
            >
              <input
                type="tel"
                placeholder="Seu telefone alternativo"
                {...register('telefoneClienteAlt')}
                onFocus={() => setFocused('telAlt')}
                onBlur={() => setFocused(null)}
                className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b transition-colors"
                style={borderStyle('telAlt')}
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#FFA500]"
                animate={{ width: focused === 'telAlt' ? '100%' : '0%' }}
                transition={{ duration: 0.25 }}
              />
              {errors.telefoneClienteAlt && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.telefoneClienteAlt.message}
                </p>
              )}
            </motion.div>

            {/* Endereço */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + 5 * 0.08 }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Seu endereço"
                {...register('enderecoCliente')}
                onFocus={() => setFocused('endereco')}
                onBlur={() => setFocused(null)}
                className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b transition-colors"
                style={borderStyle('endereco')}
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#FFA500]"
                animate={{ width: focused === 'endereco' ? '100%' : '0%' }}
                transition={{ duration: 0.25 }}
              />
              {errors.enderecoCliente && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.enderecoCliente.message}
                </p>
              )}
            </motion.div>

            {/* Senha */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + 6 * 0.08 }}
              className="relative"
            >
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Digite a sua senha"
                {...register('senhaCliente')}
                onFocus={() => setFocused('senha')}
                onBlur={() => setFocused(null)}
                className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b transition-colors"
                style={borderStyle('senha')}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-0 bottom-2 text-gray-400 hover:cursor-pointer bg-transparent hover:text-gray-600 text-xs"
                tabIndex={-1}
              >
                {showPass ? <LiaEyeSolid /> : <FaRegEyeSlash />}
              </button>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#FFA500]"
                animate={{ width: focused === 'senha' ? '100%' : '0%' }}
                transition={{ duration: 0.25 }}
              />
              {errors.senhaCliente && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.senhaCliente.message}
                </p>
              )}
            </motion.div>

            {/* Confirmar senha */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + 7 * 0.08 }}
              className="relative"
            >
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Digite novamente a senha"
                {...register('confirmar_senha')}
                onFocus={() => setFocused('confirmar')}
                onBlur={() => setFocused(null)}
                className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b transition-colors"
                style={borderStyle('confirmar')}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-0 bottom-2 text-gray-400 hover:cursor-pointer bg-transparent hover:text-gray-600 text-xs"
                tabIndex={-1}
              >
                {showConfirm ? <LiaEyeSolid /> : <FaRegEyeSlash />}
              </button>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#FFA500]"
                animate={{ width: focused === 'confirmar' ? '100%' : '0%' }}
                transition={{ duration: 0.25 }}
              />
              {errors.confirmar_senha && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmar_senha.message}
                </p>
              )}
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
            disabled={registerMutation.isPending}
            className="mt-10 w-full py-4 hover:cursor-pointer rounded-lg bg-[#FFA500] hover:bg-[#FFA500] text-white font-bold text-base shadow-md transition-colors"
          >
            {registerMutation.isPending ? 'Criando conta...' : 'Criar conta'}
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
              Fazer login
            </span>
          </motion.p>
        </form>
      </div>

      {/* ── RIGHT SIDE ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="hidden md:block w-[42%] flex-shrink-0 relative overflow-hidden"
      >
        <img
          src={BackGroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Tint overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(200, 146, 30, 0.42)' }}
        />
      </motion.div>
    </div>
  );
}
