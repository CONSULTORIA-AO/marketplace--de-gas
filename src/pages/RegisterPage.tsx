import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { registerSchema, type RegisterFormData } from '@/lib/validations';
import { api } from '@/lib/axios';
import { AuthHeader } from '@/components/layout/AuthHeader';
import { ToastAction } from '@/components/ui/toast';
import { AxiosError } from 'axios';

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
      navigate('/login');
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
    console.log('🟢 Form submit:', data);
    registerMutation.mutate(data);
  };

  return (
    <main className="flex-grow flex flex-col w-full">
      <AuthHeader />

      <div className="flex-grow flex items-center justify-center py-12 px-4 md:px-10 lg:px-20">
        <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Visual Content */}
          <div className="hidden lg:flex flex-col gap-8 pr-12">
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold w-fit">
                <span className="material-symbols-outlined text-sm">
                  local_shipping
                </span>
                Entrega em minutos
              </span>
              <h1 className="text-primary dark:text-white text-5xl font-extrabold leading-[1.1] tracking-tight">
                Seu gás na porta de casa{' '}
                <span className="text-primary">em poucos cliques</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-md">
                Junte-se a milhares de clientes que já economizam tempo e
                dinheiro pedindo seu gás de cozinha pelo nosso marketplace.
              </p>
            </div>
            <div className="w-full relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 shadow-2xl relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#137fec]/20 to-transparent z-10"></div>
                <img
                  alt="Person holding a smartphone to order household services"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  data-alt="Person using a smartphone to order gas delivery"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz07aZ4KegGZkZkh5zxro2Np29AetrXio42EU9o4iAte0Wcp1OVWoPF2tX46r3w4jdx0_JgNsFNXnDquxO_zVRyB72RlKQxzD2V-vOXKqCc7nFpMQq7wA1FHSsFVbd31l3S8pTmk_N7Tro-3NZDjNMz6WjsdArT835PwCslBZXSPqlVhZuiYA5Ufy0IP89ysIpl-RNgpxrwQmz7fS-a-lclFHvCXyhuJXf14P09KJMRXsmTgSrklXR-SBCl-XSBTsMqU2qNxQ3ciQ"
                />
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 dark:bg-background-dark/90 backdrop-blur-sm rounded-xl z-20 border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary p-3 rounded-full text-white">
                      <span className="material-symbols-outlined">
                        verified
                      </span>
                    </div>
                    <div>
                      <p className="text-slate-900 dark:text-white font-bold">
                        Revendedores Autorizados
                      </p>
                      <p className="text-primary dark:text-slate-400 text-sm">
                        Apenas fornecedores certificados pela ANP.
                      </p>
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
                <h2 className="text-slate-900 dark:text-white text-3xl font-bold mb-2">
                  Criar sua conta
                </h2>
                <p className="text-slate-500 dark:text-slate-400">
                  Preencha os dados abaixo para começar.
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Nome Completo */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="name"
                    className="text-primary dark:text-slate-300 text-sm font-semibold"
                  >
                    Nome Completo
                  </Label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                      person
                    </span>
                    <Input
                      id="nomeCliente"
                      {...register('nomeCliente')}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all outline-none"
                      placeholder="Como quer ser chamado?"
                      type="text"
                    />
                    {errors.nomeCliente && (
                      <p className="text-sm text-destructive">
                        {errors.nomeCliente.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* E-mail */}
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="emailCliente"
                      className="text-primary dark:text-slate-300 text-sm font-semibold"
                    >
                      E-mail
                    </Label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                        mail
                      </span>
                      <Input
                        id="emailCliente"
                        {...register('emailCliente')}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all outline-none"
                        placeholder="seu@email.com"
                        type="email"
                      />
                      {errors.emailCliente && (
                        <p className="text-sm text-destructive">
                          {errors.emailCliente.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* WhatsApp/Telefone */}
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="phone"
                      className="text-primary dark:text-slate-300 text-sm font-semibold"
                    >
                      Telefone
                    </Label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                        call
                      </span>
                      <Input
                        id="telefoneCliente"
                        {...register('telefoneCliente')}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all outline-none"
                        placeholder="(244) 000000000"
                        type="tel"
                      />
                      {errors.telefoneCliente && (
                        <p className="text-sm text-destructive">
                          {errors.telefoneCliente.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="phone"
                      className="text-primary dark:text-slate-300 text-sm font-semibold"
                    >
                      Telefone alternativo
                    </Label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                        call
                      </span>
                      <Input
                        id="telefoneClienteAlt"
                        {...register('telefoneClienteAlt')}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all outline-none"
                        placeholder="(244) 000000000"
                        type="tel"
                      />
                      {errors.telefoneClienteAlt && (
                        <p className="text-sm text-destructive">
                          {errors.telefoneClienteAlt.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="local"
                      className="text-primary dark:text-slate-300 text-sm font-semibold"
                    >
                      Endereço da morada
                    </Label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                        map
                      </span>
                      <Input
                        id="enderecoCliente"
                        {...register('enderecoCliente')}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all outline-none"
                        placeholder=""
                        type="text"
                      />
                      {errors.enderecoCliente && (
                        <p className="text-sm text-destructive">
                          {errors.enderecoCliente.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Senha */}
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="password"
                      className="text-primary dark:text-slate-300 text-sm font-semibold"
                    >
                      Senha
                    </Label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                        lock
                      </span>
                      <Input
                        id="senhaCliente"
                        type="password"
                        placeholder=""
                        {...register('senhaCliente')}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all outline-none"
                      />
                      {errors.senhaCliente && (
                        <p className="text-sm text-destructive">
                          {errors.senhaCliente.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-primary dark:text-slate-300 text-sm font-semibold"
                    >
                      Confirmar Senha
                    </Label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                        lock
                      </span>
                      <Input
                        id="confirmar_senha"
                        type="password"
                        placeholder=""
                        {...register('confirmar_senha')}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
                {/* Checkbox Terms */}
                <div className="flex items-start gap-3 py-2">
                  <input
                    className="mt-1 w-5 h-5 hover:cursor-pointer rounded border-slate-300 text-primary focus:ring-primary"
                    id="terms"
                    type="checkbox"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm text-slate-600 dark:text-slate-400 leading-tight"
                  >
                    Eu li e concordo com os{' '}
                    <Link
                      className="text-primary font-semibold hover:underline"
                      to="/termos&politicas"
                    >
                      Termos de Uso
                    </Link>{' '}
                    e a{' '}
                    <Link
                      className="text-primary font-semibold hover:underline"
                      to="/termos&politicas"
                    >
                      Política de Privacidade
                    </Link>
                    .
                  </Label>
                </div>
                {/* Action Button */}
                <Button
                  type="submit"
                  className="w-full h-14 bg-primary text-white text-base font-bold rounded-xl hover:bg-primary/90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  Criar minha conta
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Button>
                {/* Footer Link */}
                <p className="text-center text-slate-600 dark:text-slate-400 text-sm mt-6">
                  Já tem uma conta?{' '}
                  <Link
                    to="/login"
                    className="text-primary hover:underline font-medium"
                  >
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
