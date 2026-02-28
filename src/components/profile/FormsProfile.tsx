import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useState } from 'react';
import {
  profileSchema,
  type ProfileFormData,
  type PasswordProfileFormData,
  passwordProfileSchema,
} from '@/lib/validations';
import { ToastAction } from '../ui/toast';
import { useAuthStore } from '@/store/authStrore';
import { api } from '@/lib/axios';
import { useUserStore } from '@/store/userIfo';

export function FormsProfile() {
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const entidade = useAuthStore((state) => state.session.user.id);
  const cliente = useUserStore((state) => state.cliente);
  const { toast } = useToast();

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm<PasswordProfileFormData>({
    resolver: zodResolver(passwordProfileSchema),
  });

  async function onSubmitProfile(data: ProfileFormData) {
    try {
      setLoadingProfile(true);

      const response = await api.patch(`clientes/${entidade}`, {
        emailCliente: data.emailCliente,
        nomeCliente: data.nomeCliente,
        telefoneCliente: data.telefoneCliente,
        telefoneClienteAlt: data.telefoneClienteAlt,
        enderecoCliente: cliente.enderecoCliente,
      });

      toast({
        description: (
          <div className="flex items-center gap-4 ">
            <div className="rounded-full w-8 h-8 flex justify-center items-center"></div>
            <span className="text-[#ff8300]">{response.data.mensagem}</span>
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
          'border-l-4 border-l-[#ff8300] border-t-0 border-b-0 border-r-0',
      });
    } catch (error) {
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
    } finally {
      setLoadingProfile(false);
    }
  }

  async function onSubmitPassword(data: PasswordProfileFormData) {
    try {
      setLoadingPassword(true);

      const response = await api.patch(`clientes/${entidade}/alterar-senha`, {
        senha_actual: data.currentPassword,
        senha: data.newPassword,
        confirmar_senha: data.confirmPassword,
      });
      toast({
        description: (
          <div className="flex items-center gap-4 ">
            <div className="rounded-full w-8 h-8 flex justify-center items-center"></div>
            <span className="text-[#ff8300]">{response.data.mensagem}</span>
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
          'border-l-4 border-l-[#ff8300] border-t-0 border-r-0 border-b-0',
      });
      resetPassword();
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
    } finally {
      setLoadingPassword(false);
    }
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10 mt-2">
      <form
        onSubmit={handleSubmitProfile(onSubmitProfile)}
        className="bg-white border border-border-color rounded-xl p-8 shadow-sm border-gray-900/10"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-50 rounded-lg">
            <span className="material-symbols-outlined text-[#137fec]">
              edit_note
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Informações Pessoais
          </h2>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-1.5">
            <Label
              htmlFor="name"
              className="text-sm font-semibold text-slate-600"
            >
              Nome Completo
            </Label>
            <Input
              {...registerProfile('nomeCliente')}
              className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-[#137fec] focus:bg-white transition-all"
              type="text"
            />
            {profileErrors.nomeCliente && (
              <p className="text-red-500 text-xs mt-1">
                {profileErrors.nomeCliente.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-slate-600"
            >
              E-mail
            </Label>
            <Input
              {...registerProfile('emailCliente')}
              className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-[#137fec] focus:bg-white transition-all"
              type="email"
            />
            {profileErrors.emailCliente && (
              <p className="text-red-500 text-xs mt-1">
                {profileErrors.emailCliente.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-1 gap-1.5">
              <Label
                htmlFor="tel"
                className="text-sm font-semibold text-slate-600"
              >
                Telefone
              </Label>
              <Input
                {...registerProfile('telefoneCliente')}
                className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-[#137fec] focus:bg-white transition-all"
                type="tel"
              />
              {profileErrors.telefoneCliente && (
                <p className="text-red-500 text-xs mt-1">
                  {profileErrors.telefoneCliente.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              <Label
                htmlFor="tel"
                className="text-sm font-semibold text-slate-600"
              >
                Telefone alternativo
              </Label>
              <Input
                {...registerProfile('telefoneClienteAlt')}
                className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-[#137fec] focus:bg-white transition-all"
                type="tel"
              />
              {profileErrors.telefoneClienteAlt && (
                <p className="text-red-500 text-xs mt-1">
                  {profileErrors.telefoneClienteAlt.message}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            disabled={loadingProfile}
            className="w-full mt-2 h-11 hover:bg-[#137fec] hover:text-white text-sm font-bold          bg-[#137fec] text-white rounded-full p-2 hover:scale-105 transition-transform"
          >
            {loadingProfile ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </form>
      <form
        onSubmit={handleSubmitPassword(onSubmitPassword)}
        className="bg-white border border-border-color rounded-xl p-8 shadow-sm border-gray-900/10"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-50 rounded-lg">
            <span className="material-symbols-outlined text-[#137fec]">
              lock_reset
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Segurança</h2>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-1.5">
            <Label
              htmlFor="current-password"
              className="text-sm font-semibold text-slate-600"
            >
              Senha Atual
            </Label>
            <div className="relative">
              <Input
                {...registerPassword('currentPassword')}
                className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-[#137fec] focus:bg-white transition-all"
                type="password"
              />
              {passwordErrors.currentPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {passwordErrors.currentPassword.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            <Label
              htmlFor="password"
              className="text-sm font-semibold text-slate-600"
            >
              Nova Senha
            </Label>
            <Input
              className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-[#137fec] focus:bg-white transition-all"
              type="password"
              {...registerPassword('newPassword')}
            />
            {passwordErrors.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                {passwordErrors.newPassword.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            <Label
              htmlFor="confirm-password"
              className="text-sm font-semibold text-slate-600"
            >
              Confirmar Nova Senha
            </Label>
            <Input
              className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-[#137fec] focus:bg-white transition-all"
              type="password"
              {...registerPassword('confirmPassword')}
            />
            {passwordErrors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {passwordErrors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={loadingPassword}
            className="w-full mt-2 h-11 hover:bg-[#137fec] hover:text-white text-sm font-bold          bg-[#137fec] text-white rounded-full p-2 shadow-lg hover:scale-105 transition-transform"
          >
            {loadingPassword ? 'Atualizando...' : 'Redefinir Senha'}
          </Button>
        </div>
      </form>
    </div>
  );
}
