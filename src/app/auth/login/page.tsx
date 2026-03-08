'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LiaEyeSolid } from 'react-icons/lia';
import { FaRegEyeSlash } from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';
import { loginSchema, type LoginFormData } from '@/schema/customer.schema';
import { useAuthStore } from '@/hooks/auth';
import { AxiosError } from 'axios';
import { ToastAction } from '@/components/ui/toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from "@/service/customer/auth";
import BackegroundImage from "@/assets/wallpaper.jpg";

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const { mutate, isPending } = useAuth({
    onSuccess: (data) => {
      setAuth(data.info, data.mensagem);
      toast({
        description: (
          <div className="flex items-center gap-4 bg-white">
            <span className="text-[#717F96]">Login realizado com sucesso!</span>
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

      navigate('/produtos');
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };


  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      {/* ── LEFT SIDE ───────────────────────────────────────────────────── */}
      <div className="flex-[1.1] bg-white flex flex-col relative">
        {/* Top label */}

        {/* Form centered */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-center px-16 pb-10"
          style={{ maxWidth: 540 }}
        >
          {/* Logo */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-black text-[#FFA500] mb-10"
          >
            Jagás
          </motion.h1>

          {/* Welcome */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-lg mb-10"
          >
            bem-vindo/a à JaGás
          </motion.p>

          {/* Email field */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative mb-7"
          >
            <input
              type="email"
              placeholder="Email"
              {...register('emailCliente')}
              onFocus={() => setFocused('email')}
              className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b"
              style={{
                borderBottomColor: focused === 'email' ? '#FFA500' : '#C0C0C0',
                borderBottomWidth: focused === 'email' ? 2 : 1,
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-[#FFA500]"
              animate={{ width: focused === 'email' ? '100%' : '0%' }}
              transition={{ duration: 0.25 }}
            />
          </motion.div>

          {/* Password field */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="relative mb-2"
          >
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              {...register('senhaCliente')}
              onFocus={() => setFocused('password')}
              className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b"
              style={{
                borderBottomColor:
                  focused === 'password' ? '#1FFA500' : '#C0C0C0',
                borderBottomWidth: focused === 'password' ? 2 : 1,
              }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-0 bottom-2 text-gray-400 hover:cursor-pointer bg-transparent hover:bg-transparen hover:text-gray-600 text-xs"
              tabIndex={-1}
            >
              {showPass ? <LiaEyeSolid /> : <FaRegEyeSlash />}
            </button>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-[#FFA500]"
              animate={{ width: focused === 'password' ? '100%' : '0%' }}
              transition={{ duration: 0.25 }}
            />
          </motion.div>

          {/* Forgot password */}
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.34 }}
            className="flex justify-end mb-8"
            href="/recoverpassword"
          >
            <span className="text-sm text-[#FFA500] cursor-pointer hover:underline">
              Esqueceu a senha?
            </span>
          </motion.a>

          {/* Login button */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ backgroundColor: '#FFA500', scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isPending}
            className="w-full py-4 rounded-lg bg-[#FFA500] hover:bg-[#FFA500] text-white font-bold text-base shadow-md transition-colors mb-8"
          >
            {isPending ? 'Acessando...' : 'Iniciar sessão'}
          </motion.button>

          {/* Divider "ou" */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.48 }}
            className="flex items-center gap-4 mb-7"
          >
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm font-bold text-gray-500">ou</span>
            <div className="flex-1 h-px bg-gray-200" />
          </motion.div>

          {/* Google sign-in */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.54 }}
            whileHover={{ backgroundColor: '#f5f5f5', scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium transition-colors mb-7 shadow-sm"
          >
            {/* Google G logo */}
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            Acessar com google
          </motion.button>

          {/* Register link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm text-gray-700"
          >
            Novo na JaGás?{' '}
            <span
              className="text-[#FFA500] font-medium cursor-pointer hover:underline"
              onClick={() => navigate('/cadastro')}
            >
              Criar conta
            </span>
          </motion.p>
        </form>
      </div>

      {/* ── RIGHT SIDE — photo with blue overlay ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="w-[42%] flex-shrink-0 relative overflow-hidden"
      >
        <img
          className="absolute inset-0 bg-cover bg-center h-full"
          src={BackegroundImage}
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
