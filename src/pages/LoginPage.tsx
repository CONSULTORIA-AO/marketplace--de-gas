import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import {  Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { loginSchema, type LoginFormData } from '@/lib/validations';
import { useAuthStore } from '@/store/authStrore';
import { api } from '@/lib/axios';
import type { AuthResponse } from '@/types/index';

export function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await api.post<AuthResponse>('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast({
        title: 'Login realizado!',
        description: `Bem-vindo de volta, ${data.user.name}!`,
      });
      navigate('/produtos');
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Erro no login',
        description: error.response?.data?.message || 'Credenciais inválidas',
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <main className="bg-background-light min-h-screen flex flex-col font-display text-text-main">
      <header 
        className="flex items-center justify-between whitespace-nowrap border-b border-border-light px-10 py-4 bg-white border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 text-primary">
          <div className="size-8">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_6_543)">
              <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
              </g>
              <defs>
              <clipPath id="clip0_6_543"><rect fill="white" height="48" width="48"></rect></clipPath>
              </defs>
            </svg>
          </div>
          <h2 className="text-text-main text-xl font-bold leading-tight tracking-[-0.015em]">GasMarket</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <Link className="text-slate-800 text-sm font-medium leading-normal hover:text-slate-900 transition-colors" to="/">Início</Link>
            <Link className="text-text-main text-sm font-medium leading-normal hover:text-primary transition-colors" to="/">Preços</Link>
          </div>
          <Button 
            onClick={() => navigate('/cadastro')}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-[#137fec] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#137fec]/90 transition-all shadow-sm">
            <span className="truncate">Criar uma conta</span>
          </Button>
        </div>
      </header>
      <div 
        className="flex-1 flex overflow-hidden">
        <div 
          className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjlFUsqNGOCH6_e8soroFKCJ3EsGK-JHIFDSHMW7R4WoK3pem47iT9vtCRHwzbNy0AmW8yEF0GWntQjGnfHmMIis_g4NsL-Bpgb9_qiS7yKDReRqmlQr8KB9htI4lboiRGbsWwdU23-ubJw9OuoQEjjQwVhLQSgKHXlY3dQY628BkaxdA1qziN8Y7ycSQI1pfqNgnuKda2JGsEFUnv-p519OQV9XRG6Vb3diBkuGESKPrwUao4wyBbwbTUoNfk-REFoayxNOFrLGk")' }}>

          <div className="absolute inset-0 flex flex-col justify-center px-20">
            <h1 className="text-white text-5xl font-bold leading-tight mb-6">Sua energia, <br/>ao seu alcance.</h1>

            <p className="text-white/95 text-xl max-w-md leading-relaxed">O marketplace mais completo para compra de gás residencial e comercial. Rápido, seguro e transparente.</p>
        
            <div className="mt-12 flex gap-4">
              <div 
                className="flex items-center gap-3 bg-white/20 backdrop-blur-lg rounded-xl p-4 border border-white/30 shadow-lg">
                <span className="material-symbols-outlined text-white">local_shipping</span>
                <span className="text-white font-semibold">Entrega Expressa</span>
              </div>
              <div 
                className="flex items-center gap-3 bg-white/20 backdrop-blur-lg rounded-xl p-4 border border-white/30 shadow-lg">
                <span className="material-symbols-outlined text-white">verified_user</span>
                <span className="text-white font-semibold">Segurança Total</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background-light">
          <div 
            className="w-full max-w-[480px] space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
          <div className="text-center lg:text-left">
            <h2 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight mb-2">Bem-vindo de volta!</h2>
            <p className="text-slate-500 dark:text-slate-400 text-base">Acesse sua conta para pedir seu gás de forma rápida.</p>
        </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 text-sm font-semibold leading-normal">E-mail</Label>
            <Input
              id="email"
              {...register('email')}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-1 border border-slate-200 dark:border-slate-700 bg-white focus:border-primary h-14 placeholder:text-slate-500/60 p-[15px] text-base font-normal leading-normal transition-all" placeholder="seu@email.com" type="email"/>
            {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
          </div>
          <div className="flex flex-col gap-2 relative">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" 
                className="text-slate-700 dark:text-slate-300 text-sm font-semibold leading-normal">Senha</Label>
              <Link className="text-primary text-sm font-semibold hover:underline" to="/recuperar-senha">Esqueceu a senha?</Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              {...register('password')}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-1 border border-slate-200 dark:border-slate-700 bg-white focus:border-primary h-14 placeholder:text-slate-500/60 p-[15px] text-base font-normal leading-normal transition-all" placeholder="••••••••" type="password"/>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              <Button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors">
                <span className="material-symbols-outlined">visibility</span>
              </Button>
            </div>
          </div>
          <div className="flex justify-end">
            <Link 
              to="/recuperar-senha" 
              className="text-sm text-primary hover:underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>
          <Button 
            type="submit" 
            disabled={loginMutation.isPending}
            className="w-full h-14 bg-[#137fec] text-white text-base font-bold rounded-xl hover:bg-[#137fec]/90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
            {loginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : 
              <>
                na conta
                Entrar
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </>
              
            }
          </Button>
         <div className="flex items-center gap-4 py-2">
            <div className="h-px bg-border-light flex-1"></div>
              <span className="text-text-muted text-[10px] font-bold uppercase tracking-[0.1em]">ou continue com</span>
              <div className="h-px bg-border-light flex-1"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                className="flex items-center justify-center gap-3 h-14 rounded-xl border border-border-light bg-white text-text-main font-semibold hover:bg-slate-50 transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
                </svg>
                  Google
              </Button>
              <Button 
                className="flex items-center justify-center gap-3 h-14 rounded-xl border border-border-light bg-white text-text-main font-semibold hover:bg-slate-50 transition-all">
                <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
                    Facebook
              </Button>
            </div>
            <p className="text-center text-text-muted text-sm pt-4">
              Não tem uma conta?{' '}
              <Link to="/cadastro" className="ext-primary font-bold hover:underline ml-1">
                Crie sua conta agora
              </Link>
              </p>
        </form>
      </div>
    </div>
    </div>
  </main>
  );
}