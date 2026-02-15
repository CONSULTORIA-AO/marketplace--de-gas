import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { user } from '@/data/user';
import { FormsProfile } from './FormsProfile';
import { useToast } from '@/components/ui/use-toast';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Input } from '../ui/input';

export function UserInformation() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>(user.photo);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  function handleOpenFilePicker() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validação simples
    if (!file.type.startsWith('image/')) {
      toast({ description: 'Selecione apenas imagens' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({ description: 'Imagem muito grande (máx 5MB)' });
      return;
    }

    // Preview imediato
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('photo', file);

      await axios.put('/api/user/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization: `Bearer ${token}` se necessário
        },
      });

      toast({ description: 'Foto atualizada com sucesso 📸' });
    } catch (error) {
      toast({ description: 'Erro ao enviar foto' });
      setPreview(user.photo); // volta para original
    } finally {
      setUploading(false);
    }
  }
  return (
    <div>
      <section className="bg-white border border-border-color p-8 rounded-xl shadow-sm border-gray-900/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 ">
          <div className="flex items-center gap-8 ">
            <div className="relative group">
              <img
                className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full h-28 w-28 ring-4 ring-slate-50 shadow-inner ${
                  uploading ? 'opacity-60' : ''
                }`}
                src={preview}
              />
              <Button
                type="button"
                onClick={handleOpenFilePicker}
                disabled={uploading}
                className="absolute bottom-0 right-0 bg-[#137fec] text-white rounded-full p-2 shadow-lg hover:scale-105 transition-transform border-4 border-white">
                <span className="material-symbols-outlined text-[20px]">
                  {uploading ? 'hourglass_top' : 'photo_camera'}
                </span>
              </Button>
              <Input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-slate-900 text-2xl font-bold leading-tight">
                {user.full_name}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="material-symbols-outlined text-slate-400 text-sm">
                  mail
                </span>
                <p className="text-slate-600 text-base">{user.email}</p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="material-symbols-outlined text-slate-400 text-sm">
                  location_on
                </span>
                <p className="text-slate-600 text-base">{user.localization}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="flex items-center justify-center rounded-lg h-11 px-8 bg-[#137fec] text-white text-sm font-bold hover:bg-[#137fec]/90 shadow-lg shadow-[#137fec]/20 transition-all">
              Salvar Alterações
            </Button>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          className="group bg-white border border-border-color p-6 rounded-xl hover:border-[#137fec] hover:shadow-md transition-all border-gray-900/10"
          to="/enderecos"
        >
          <div className="bg-blue-50 text-[#137fec] p-3 rounded-lg w-fit mb-4 group-hover:bg-[#137fec] group-hover:text-white transition-all ">
            <span className="material-symbols-outlined">location_home</span>
          </div>
          <h3 className="font-bold text-slate-900">Meus Endereços</h3>
          <p className="text-xs text-slate-500 mt-1">2 endereços cadastrados</p>
        </Link>
        <Link
          className="group bg-white border border-border-color p-6 rounded-xl hover:border-[#137fec] hover:shadow-md transition-all border-gray-900/10"
          to="#"
        >
          <div className="bg-blue-50 text-[#137fec] p-3 rounded-lg w-fit mb-4 group-hover:bg-[#137fec] group-hover:text-white transition-all">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <h3 className="font-bold text-slate-900">Formas de Pagamento</h3>
          <p className="text-xs text-slate-500 mt-1">
            Visa final 4242 • Principal
          </p>
        </Link>
        <Link
          className="group bg-white border border-border-color p-6 rounded-xl hover:border-[#137fec] hover:shadow-md transition-all border-gray-900/10"
          to="#"
        >
          <div className="bg-blue-50 text-[#137fec] p-3 rounded-lg w-fit mb-4 group-hover:bg-[#137fec] group-hover:text-white transition-all">
            <span className="material-symbols-outlined">history</span>
          </div>
          <h3 className="font-bold text-slate-900">Histórico de Pedidos</h3>
          <p className="text-xs text-slate-500 mt-1">
            Último pedido há 15 dias
          </p>
        </Link>
      </section>
      <FormsProfile />
    </div>
  );
}
