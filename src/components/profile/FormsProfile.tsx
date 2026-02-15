import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { user } from '@/data/user';
import {
  profileSchema,
  type ProfileFormData,
  type PasswordProfileFormData,
  passwordProfileSchema,
} from '@/lib/validations';

export function FormsProfile() {
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const { toast } = useToast();

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: user.full_name,
      email: user.email,
      phone: user.phone || '',
    },
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

      await axios.put('/api/user/profile', data); // mock endpoint

      toast({
        description: 'Perfil atualizado com sucesso 🎉',
      });
    } catch (error) {
      toast({
        description: 'Erro ao atualizar perfil',
      });
    } finally {
      setLoadingProfile(false);
    }
  }

  async function onSubmitPassword(data: PasswordProfileFormData) {
    try {
      setLoadingPassword(true);

      await axios.put('/api/user/password', data); // mock endpoint
      toast({
        description: 'Senha atualizada com sucesso 🔐',
      });
      resetPassword();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar senha',
        description: error.response?.data?.message || 'Erro ao atualizar senha',
      });
    } finally {
      setLoadingPassword(false);
    }
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
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
              {...registerProfile('full_name')}
              className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-[#137fec] focus:bg-white transition-all"
              type="text"
              value="João Silva de Oliveira"
            />
            {profileErrors.full_name && (
              <p className="text-red-500 text-xs mt-1">
                {profileErrors.full_name.message}
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
              {...registerProfile('email')}
              className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-[#137fec] focus:bg-white transition-all"
              type="email"
              value="joao.silva@email.com"
            />
            {profileErrors.email && (
              <p className="text-red-500 text-xs mt-1">
                {profileErrors.email.message}
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
                {...registerProfile('phone')}
                className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-[#137fec] focus:bg-white transition-all"
                type="tel"
                value="(+244) 943558106 "
              />
              {profileErrors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {profileErrors.phone.message}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            disabled={loadingProfile}
            className="w-full mt-2 h-11 hover:bg-[#137fec] hover:text-white text-sm font-bold          bg-[#137fec] text-white rounded-full p-2 shadow-lg hover:scale-105 transition-transform border-4 border-white"
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
                placeholder="••••••••"
                type="password"
              />
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 cursor-pointer hover:text-[#137fec] transition-colors">
                visibility
              </span>
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
            className="w-full mt-2 h-11 hover:bg-[#137fec] hover:text-white text-sm font-bold          bg-[#137fec] text-white rounded-full p-2 shadow-lg hover:scale-105 transition-transform border-4 border-white"
          >
            {loadingPassword ? 'Atualizando...' : 'Redefinir Senha'}
          </Button>
        </div>
      </form>
    </div>
  );
}
