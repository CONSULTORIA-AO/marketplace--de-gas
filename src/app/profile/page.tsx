'use client';

import { ORANJE, WHITE } from '@/constants/costumer';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/icon';
import { AxiosError } from 'axios';
import { type ProfileFormData, profileSchema } from '@/schema/customer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { api } from '@/utils/api';
import { ToastAction } from '@radix-ui/react-toast';
import { useToast } from '@/hooks/use-toast';
import { useUserStore } from '@/hooks/customer';
import { useAuthStore } from '@/hooks/auth';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { AuthHeader } from '@/components/header';
import { View } from '@/types/customer';
import { GasProduct } from '@/types/product';
import { Sidebar } from '../../components/sidebar';
import { format } from 'date-fns';

export default function ProfileView() {
  const entidade = useAuthStore((state) => state.session.user.id);
  const cliente = useUserStore((state) => state.cliente);
  const setCliente = useUserStore((state) => state.setCliente);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [view, setView] = useState<View>('produtos');
  const [favorites, setFavorites] = useState<GasProduct[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sidebarOpen, setSidebar] = useState<boolean>(false);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await api.get(`clientes/${entidade}`);
        const dados = response.data.mensagem;
        setCliente({
          ...dados,
          fotoCliente: dados.fotoCliente
            ? `${import.meta.env.VITE_API_URL}images/${dados.fotoCliente}?${Date.now()}`
            : null,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCliente();
  }, [entidade, setCliente]);

  const uploadImage = async (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    const formData = new FormData();
    formData.append('foto_perfil', file);
    try {
      const response = await api.patch(
        `clientes/mudar/foto/${entidade}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      toast({
        description: (
          <div className="flex items-center gap-4 bg-white">
            <span className="text-[#717F96]">{response.data?.mensagem}</span>
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
    } catch (error) {
      setPreview(null);
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

  const {
    register,
    handleSubmit,
    formState: { errors: ep },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nomeCliente: cliente?.nomeCliente ?? '',
      emailCliente: cliente?.emailCliente ?? '',
      telefoneCliente: cliente?.telefoneCliente ?? '',
      telefoneClienteAlt: cliente?.telefoneClienteAlt ?? '',
      enderecoCliente: cliente?.enderecoCliente ?? '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadImage(file);
    else
      toast({
        variant: 'destructive',
        description: 'Nenhuma imagem selecionada.',
      });
  };

  const avatarSrc =
    preview ??
    cliente?.fotoCliente ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(cliente?.nomeCliente ?? 'U')}&background=f97316&color=000&size=128`;

  const onSubmitProfile = async (data: ProfileFormData) => {
    try {
      const res = await api.patch(`clientes/${entidade}`, {
        emailCliente: data.emailCliente,
        nomeCliente: data.nomeCliente,
        telefoneCliente: data.telefoneCliente,
        telefoneClienteAlt: data.telefoneClienteAlt,
        enderecoCliente: data.enderecoCliente,
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

  if (loading) {
    return (
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20,
          }}
        >
          <Skeleton className="h-[22px] w-32 rounded-md" />
        </div>

        {/* Avatar card */}
        <div
          style={{
            background: 'white',
            borderRadius: 16,
            padding: 24,
            marginBottom: 16,
            border: '1px solid #F3F4F6',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {/* Spinner + avatar skeleton */}
            <div style={{ position: 'relative', width: 96, height: 96 }}>
              {/* Anel girante */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '3px solid #f97316',
                  borderTopColor: 'transparent',
                  animation: 'spin 0.9s linear infinite',
                }}
              />
              {/* Skeleton do avatar dentro */}
              <div
                style={{
                  position: 'absolute',
                  inset: 10,
                  borderRadius: '50%',
                  overflow: 'hidden',
                }}
              >
                <Skeleton className="w-full h-full rounded-full" />
              </div>
            </div>

            <Skeleton className="h-[18px] w-40 rounded-lg" />
            <Skeleton className="h-[14px] w-52 rounded-lg" />
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-3 w-36 rounded-lg" />
          </div>
        </div>

        {/* Form card */}
        <div
          style={{
            background: 'white',
            borderRadius: 16,
            padding: 24,
            border: '1px solid #F3F4F6',
          }}
        >
          <Skeleton className="h-4 w-44 rounded-md mb-5" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
              gap: 14,
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-[11px] w-28 rounded mb-2" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
            <Skeleton className="h-10 w-full rounded-xl self-end" />
          </div>
        </div>

        {/* Keyframe para o spinner — injeta uma vez */}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

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
      <div className="fade-in" style={{ maxWidth: 700, margin: '0 auto' }}>
        <div
          style={{
            background: 'white',
            borderRadius: 16,
            padding: 24,
            marginBottom: 16,
            border: '1px solid #F3F4F6',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                overflow: 'hidden',
                border: `4px solid ${ORANJE}`,
                margin: '0 auto',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative w-28 h-28 rounded-3xl overflow-hidden cursor-pointer"
                style={{ border: '2.5px solid rgba(249,115,22,0.45)' }}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <img
                  src={avatarSrc}
                  alt={cliente?.nomeCliente ?? ''}
                  style={{
                    width: '100%',
                    height: '100%',
                    transition: 'opacity 0.2s',
                    objectFit: 'cover',
                    opacity: uploading ? 0.5 : 1,
                  }}
                />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: '#f97316',
                  border: '2px solid #f97316',
                  boxShadow: '0 4px 12px rgba(249,115,22,0.4)',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 16, color: '#fff' }}
                >
                  photo_camera
                </span>
              </motion.button>
            </div>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px' }}>
            {cliente?.nomeCliente ?? ''}
          </h3>
          <p style={{ color: '#6B7280', fontSize: 13, margin: '0 0 8px' }}>
            {cliente?.emailCliente ?? ''}
          </p>
          <span
            style={{
              display: 'inline-block',
              padding: '4px 14px',
              borderRadius: 20,
              background: WHITE,
              color: ORANJE,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {cliente?.telefoneCliente ?? ''}
          </span>
          <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 8 }}>
            Membro desde{' '}
            {cliente?.criado_em
              ? format(new Date(cliente.criado_em), 'dd/MM/yyyy')
              : ''}
          </p>
        </div>

        <div
          style={{
            background: 'white',
            borderRadius: 16,
            padding: 24,
            border: '1px solid #F3F4F6',
          }}
        >
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
            Informações Pessoais
          </h3>
          <form
            onSubmit={handleSubmit(onSubmitProfile)}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
              gap: 14,
            }}
          >
            <div>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#374151',
                  display: 'block',
                  marginBottom: 5,
                }}
              >
                Nome completo
              </label>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <Icon name="user" size={14} color="#9CA3AF" />
                </div>
                <input
                  {...register('nomeCliente')}
                  type="text"
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 32px',
                    border: `1.5px solid'#E5E7EB`,
                    borderRadius: 8,
                    fontSize: 13,
                    background: '#F9FAFB',
                    boxSizing: 'border-box',
                    color: '#111',
                    placeContent: cliente?.nomeCliente,
                  }}
                />
              </div>
            </div>
            <div>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#374151',
                  display: 'block',
                  marginBottom: 5,
                }}
              >
                E-mail
              </label>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <Icon name="" size={14} color="#9CA3AF" />
                </div>
                <input
                  {...register('emailCliente')}
                  type="email"
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 32px',
                    border: `1.5px solid #E5E7EB`,
                    borderRadius: 8,
                    fontSize: 13,
                    background: '#F9FAFB',
                    boxSizing: 'border-box',
                    color: '#111',
                    placeContent: cliente?.emailCliente,
                  }}
                />
              </div>
            </div>
            <div>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#374151',
                  display: 'block',
                  marginBottom: 5,
                }}
              >
                Telefone
              </label>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <Icon name="phone" size={14} color="#9CA3AF" />
                </div>
                <input
                  {...register('telefoneCliente')}
                  type="tel"
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 32px',
                    border: `1.5px solid '#E5E7EB'`,
                    borderRadius: 8,
                    fontSize: 13,
                    background: '#F9FAFB',
                    boxSizing: 'border-box',
                    color: '#111',
                    placeContent: cliente?.telefoneCliente,
                  }}
                />
              </div>
            </div>
            <div>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#374151',
                  display: 'block',
                  marginBottom: 5,
                }}
              >
                Telefone alternativo
              </label>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <Icon name="phone" size={14} color="#9CA3AF" />
                </div>
                <input
                  {...register('telefoneClienteAlt')}
                  type="tel"
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 32px',
                    border: `1.5px solid #E5E7EB`,
                    borderRadius: 8,
                    fontSize: 13,
                    background: '#F9FAFB',
                    boxSizing: 'border-box',
                    color: '#111',
                    placeContent: cliente?.telefoneClienteAlt,
                  }}
                />
              </div>
            </div>
            <div>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#374151',
                  display: 'block',
                  marginBottom: 5,
                }}
              >
                Endereço
              </label>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <Icon name="home" size={14} color="#9CA3AF" />
                </div>
                <input
                  {...register('enderecoCliente')}
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
                />
              </div>
            </div>
            <button
              type="submit"
              className={`bg-[${ORANJE}] text-white w-full rounded-xl`}
            >
              Atualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
