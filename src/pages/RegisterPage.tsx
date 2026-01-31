import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { registerSchema, type RegisterFormData } from '@/lib/validations';
import { api } from '@/lib/axios';
import { Loader2 } from 'lucide-react';

export function RegisterPage() {
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
      const { confirmPassword, ...registerData } = data;
      const response = await api.post('/auth/register', registerData);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: 'Cadastro realizado!',
        description: 'Verifique seu email para ativar sua conta.',
      });
      navigate('/login');
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Erro no cadastro',
        description: error.response?.data?.message || 'Erro ao criar conta',
      });
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <main className="flex-grow flex flex-col w-full">
      <header className="flex items-center justify-between px-4 md:px-10 lg:px-20 py-6">
        <div className="flex items-center gap-4 text-primary">
          <div className="size-8">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
            </svg>
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Gás Marketplace</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <Link className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" to="/">Início</Link>
            <Link className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" to="/">Preços</Link>
          </div>
          <Button 
            onClick={() => navigate('/login')}
            className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#137fec] text-white text-sm font-bold tracking-tight hover:bg-[#137fec]/90 transition-all">
            <span>Entrar</span>
          </Button>
        </div>
      </header>
      <div className="flex-grow flex items-center justify-center py-12 px-4 md:px-10 lg:px-20">
        <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Visual Content */}
          <div className="hidden lg:flex flex-col gap-8 pr-12">
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold w-fit">
                <span className="material-symbols-outlined text-sm">local_shipping</span>
                Entrega em minutos
              </span>
              <h1 className="text-slate-900 dark:text-white text-5xl font-extrabold leading-[1.1] tracking-tight">
                Seu gás na porta de casa <span className="text-primary">em poucos cliques</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-md">
                Junte-se a milhares de clientes que já economizam tempo e dinheiro pedindo seu gás de cozinha pelo nosso marketplace.
              </p>
            </div>
        <div className="w-full relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>
            <img alt="Person holding a smartphone to order household services" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Person using a smartphone to order gas delivery" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz07aZ4KegGZkZkh5zxro2Np29AetrXio42EU9o4iAte0Wcp1OVWoPF2tX46r3w4jdx0_JgNsFNXnDquxO_zVRyB72RlKQxzD2V-vOXKqCc7nFpMQq7wA1FHSsFVbd31l3S8pTmk_N7Tro-3NZDjNMz6WjsdArT835PwCslBZXSPqlVhZuiYA5Ufy0IP89ysIpl-RNgpxrwQmz7fS-a-lclFHvCXyhuJXf14P09KJMRXsmTgSrklXR-SBCl-XSBTsMqU2qNxQ3ciQ"/>
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 dark:bg-background-dark/90 backdrop-blur-sm rounded-xl z-20 border border-white/20">
              <div className="flex items-center gap-4">
                <div className="bg-primary p-3 rounded-full text-white">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-bold">Revendedores Autorizados</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Apenas fornecedores certificados pela ANP.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right Side: Registration Form */}
      <div className="flex flex-col items-center lg:items-start">
        <div className="w-full max-w-[520px] bg-white dark:bg-slate-900 p-8 lg:p-10 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
          <div className="mb-8">
            <h2 className="text-slate-900 dark:text-white text-3xl font-bold mb-2">Criar sua conta</h2>
            <p className="text-slate-500 dark:text-slate-400">Preencha os dados abaixo para começar.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Nome Completo */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Nome Completo</Label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">person</span>
                  <Input 
                   id="name"
                   {...register('name')}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" placeholder="Como quer ser chamado?" type="text"/>
                    {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* E-mail */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">E-mail</Label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                      <Input 
                        id="email"
                        {...register('email')}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" placeholder="seu@email.com" type="email"/>
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    {/* WhatsApp/Telefone */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">WhatsApp / Telefone</Label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">call</span>
                        <Input 
                          id="phone"
                          {...register('phone')}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" placeholder="(00) 00000-0000" type="tel"/>
                          {errors.phone && (
                            <p className="text-sm text-destructive">{errors.phone.message}</p>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Senha */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Senha</Label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          {...register('password')} className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"/>
                          {errors.password && (
                            <p className="text-sm text-destructive">{errors.password.message}</p>
                          )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="confirmPassword" className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Confirmar Senha</Label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          {...register('confirmPassword')} className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" />
                      </div>
                    </div>
                  </div>
                  {/* Checkbox Terms */}
                  <div className="flex items-start gap-3 py-2">
                    <input className="mt-1 w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" id="terms" type="checkbox"/>
                    <Label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400 leading-tight">
                      Eu li e concordo com os <a className="text-primary font-semibold hover:underline" href="#">Termos de Uso</a> e a <a className="text-primary font-semibold hover:underline" href="#">Política de Privacidade</a>.
                    </Label>
                  </div>
                  {/* Action Button */}
                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-[#137fec] text-white text-base font-bold rounded-xl hover:bg-[#137fec]/90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
                        Criar minha conta
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Button>
                  {/* Footer Link */}
                  <p className="text-center text-slate-600 dark:text-slate-400 text-sm mt-6">
                    Já tem uma conta?{' '} <Link to="/login" className="text-primary    hover:underline font-medium">
                      Faça login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
  </main>
  );
}