import { Link } from 'react-router-dom';
import { FormsProfile } from './FormsProfile';
import React, { useEffect, useState, useRef } from 'react';
import { useUserStore } from '@/store/userIfo';
import { api } from '@/lib/axios';
import { useAuthStore } from '@/store/authStrore';
import { useToast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const QUICK_LINKS = [
  {
    icon: 'location_home',
    title: 'Meus Endereços',
    desc: '2 endereços cadastrados',
    path: '/enderecos',
  },
  {
    icon: 'payments',
    title: 'Formas de Pagamento',
    desc: 'Cash · Multicaixa Express',
    path: '#',
  },
  {
    icon: 'history',
    title: 'Histórico de Pedidos',
    desc: 'Último pedido há 15 dias',
    path: '/pedidos',
  },
];

export function UserInformation() {
  const { toast } = useToast();
  const setCliente = useUserStore((state) => state.setCliente);
  const cliente = useUserStore((state) => state.cliente);
  const entidade = useAuthStore((state) => state.session.user.id);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      }
    };
    fetchCliente();
  }, [entidade, setCliente]);

  const uploadImage = async (file: File) => {
    setUploading(true);
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
      if (response.status === 202) {
        toast({ description: response.data.mensagem });
      }
    } catch (error) {
      setPreview(null);
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          description: error?.response?.data.mensagem,
        });
      }
    } finally {
      setUploading(false);
    }
  };

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

  return (
    <div className="space-y-6">
      {/* ── Hero profile card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-3xl p-7 sm:p-9"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1.5px solid rgba(249,115,22,0.3)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
        }}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-7">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative w-28 h-28 rounded-3xl overflow-hidden cursor-pointer"
              style={{ border: '2.5px solid rgba(249,115,22,0.45)' }}
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={avatarSrc}
                alt={cliente?.nomeCliente ?? ''}
                className="w-full h-full object-cover"
                style={{
                  opacity: uploading ? 0.5 : 1,
                  transition: 'opacity 0.2s',
                }}
              />
              {/* Upload overlay */}
              <AnimatePresence>
                {uploading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.6)' }}
                  >
                    <span
                      className="material-symbols-outlined animate-spin"
                      style={{ color: '#f97316', fontSize: 28 }}
                    >
                      autorenew
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Camera button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: '#f97316',
                border: '2px solid #000',
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

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 text-center sm:text-left space-y-3">
            <div>
              <h2
                className="text-2xl font-black tracking-tight"
                style={{ color: '#ffffff', letterSpacing: '-0.02em' }}
              >
                {cliente?.nomeCliente ?? '—'}
              </h2>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xl mt-1"
                style={{
                  background: 'rgba(249,115,22,0.12)',
                  color: '#f97316',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 12 }}
                >
                  verified
                </span>
                Cliente VIP
              </span>
            </div>

            <div className="space-y-1.5">
              {[
                { icon: 'mail', value: cliente?.emailCliente },
                { icon: 'phone', value: cliente?.telefoneCliente },
                { icon: 'location_on', value: cliente?.enderecoCliente },
              ]
                .filter(({ value }) => !!value)
                .map(({ icon, value }) => (
                  <div
                    key={icon}
                    className="flex items-center justify-center sm:justify-start gap-2"
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 15, color: '#f97316' }}
                    >
                      {icon}
                    </span>
                    <span
                      className="text-sm truncate"
                      style={{ color: 'rgba(255,255,255,0.55)' }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Status badges */}
          <div className="flex sm:flex-col gap-2">
            {[
              {
                icon: 'check_circle',
                label: 'Conta Verificada',
                color: '#4ade80',
                bg: 'rgba(74,222,128,0.1)',
                border: 'rgba(74,222,128,0.25)',
              },
              {
                icon: 'local_fire_department',
                label: 'VIP Ativo',
                color: '#f97316',
                bg: 'rgba(249,115,22,0.1)',
                border: 'rgba(249,115,22,0.25)',
              },
            ].map(({ icon, label, color, bg, border }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-2 rounded-2xl"
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 14, color }}
                >
                  {icon}
                </span>
                <span
                  className="text-xs font-bold whitespace-nowrap"
                  style={{ color }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Quick access cards ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {QUICK_LINKS.map(({ icon, title, desc, path }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <Link
              to={path}
              className="flex flex-col gap-4 p-5 rounded-2xl transition-all group"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1.5px solid rgba(255,255,255,0.08)',
                display: 'flex',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(249,115,22,0.35)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(255,255,255,0.08)';
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: 'rgba(249,115,22,0.1)',
                  border: '1px solid rgba(249,115,22,0.25)',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: '#f97316', fontSize: 20 }}
                >
                  {icon}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: '#ffffff' }}>
                  {title}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  {desc}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Forms ── */}
      <FormsProfile />
    </div>
  );
}
