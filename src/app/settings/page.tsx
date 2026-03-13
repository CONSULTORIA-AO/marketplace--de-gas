'use client';
import { ORANJE } from '@/constants/costumer';
import { Card } from '@/components/card';
import { useAuthStore } from '@/hooks/auth';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import {
  type PasswordProfileFormData,
  passwordProfileSchema,
} from '@/schema/customer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/utils/api';
import { AxiosError } from 'axios';
import { ToastAction } from '@/components/ui/toast';
import { AuthHeader } from '@/components/header';
import { View } from '@/types/customer';
import { useState } from 'react';
import { GasProduct } from '@/types/product';
import { Sidebar } from '../../components/sidebar';

export function SettingsView() {
  const entidade = useAuthStore((state) => state.session.user.id);
  const { toast } = useToast();
  const [view, setView] = useState<View>('produtos');
  const [favorites, setFavorites] = useState<GasProduct[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sidebarOpen, setSidebar] = useState<boolean>(false);

  {
    /*
  const [notifs, setNotifs] = useState<NotifSettings>({
    email: true,
    sms: true,
    promo: false,
    orders: true,
  });
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    showProfile: true,
    shareData: false,
  });*/
  }

  // Password form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: epw },
  } = useForm<PasswordProfileFormData>({
    resolver: zodResolver(passwordProfileSchema),
  });

  const onSubmitPassword = async (data: PasswordProfileFormData) => {
    try {
      const res = await api.patch(`clientes/${entidade}/alterar-senha`, {
        senha_actual: data.currentPassword,
        senha: data.newPassword,
        confirmar_senha: data.confirmPassword,
      });
      toast({
        description: (
          <div className="flex items-center gap-4 bg-white">
            <span className="text-[#717F96]">{res.data?.mensagem}</span>
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

      reset();
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

  return (
    <div>
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 400, display: 'flex' }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
            }}
            onClick={() => setSidebar(false)}
          />
          <Sidebar
            favorites={favorites.length}
            close={() => setSidebar(false)}
            currentView={view}
          />
        </div>
      )}

      <AuthHeader
        search={search}
        setSearch={setSearch}
        //cartCount={cartCount}
        favCount={favorites.length}
        onMenu={() => setSidebar(true)}
      />
      <div
        className="fade-in"
        style={{
          maxWidth: 680,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, margin: 30 }}>
            Altere a sua senha
          </h2>
        </div>

        <Card title="Segurança · Alterar Password" icon="lock">
          <form
            onSubmit={handleSubmit(onSubmitPassword)}
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
          >
            <input
              type="password"
              placeholder="Senha atual"
              className="w-full rounded-md h-10 border-2 border-gray-100 p-2"
              {...register('currentPassword')}
            />
            <input
              type="password"
              placeholder="Senha nova"
              className="w-full rounded-md h-10 border-2 border-gray-100 p-2"
              {...register('newPassword')}
            />
            <input
              type="password"
              placeholder="Confirmar senha nova"
              className="w-full rounded-md h-10 border-2 border-gray-100 p-2"
              {...register('confirmPassword')}
            />

            <button
              type="submit"
              style={{
                padding: '10px 24px',
                borderRadius: 8,
                background: ORANJE,
                border: 'none',
                color: 'white',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                alignSelf: 'flex-start',
              }}
            >
              Alterar Password
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
