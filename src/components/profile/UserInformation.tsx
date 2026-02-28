import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FormsProfile } from './FormsProfile';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { useUserStore } from '@/store/userIfo';
import { api } from '@/lib/axios';
import { useAuthStore } from '@/store/authStrore';
import { ToastAction } from '../ui/toast';
import { useToast } from '@/hooks/use-toast';
import { AxiosError } from 'axios';

export function UserInformation() {
  const { toast } = useToast();
  const setCliente = useUserStore((state) => state.setCliente);
  const cliente = useUserStore((state) => state.cliente);
  const entidade = useAuthStore((state) => state.session.user.id);
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('foto_perfil', file);
    try {
      const response = await api.patch(
        `clientes/mudar/foto/${entidade}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status == 202) {
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
        setUploading(false);
      }
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
      setUploading(false);
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      uploadImage(file);
    } else {
      toast({
        description: (
          <div className="flex items-center gap-4 ">
            <div className="rounded-full w-8 h-8 flex justify-center items-center"></div>

            <span className="text-[#FB3748]">Nenhuma imagem inserida!</span>
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
          'border-l-4 border-l-[#FB3748] border-b-0 border-r-0 border-t-0',
      });
    }
  };

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await api.get(`clientes/${entidade}`);
        setCliente(response.data.mensagem);

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
                src={cliente?.fotoCliente ?? ''}
              />
              <Button
                type="button"
                onClick={() => document.getElementById('fileInput')?.click()}
                disabled={uploading}
                className="absolute bottom-0 right-0 bg-[#137fec] text-white rounded-full p-2 shadow-lg hover:scale-105 transition-transform border-4 border-white"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {uploading ? 'hourglass_top' : 'photo_camera'}
                </span>
              </Button>
              <Input
                type="file"
                id="fileInput"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                accept="image/*"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-slate-900 text-2xl font-bold leading-tight">
                {cliente?.nomeCliente ?? ''}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="material-symbols-outlined text-slate-400 text-sm">
                  mail
                </span>
                <p className="text-slate-600 text-base">
                  {cliente?.emailCliente ?? ''}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="material-symbols-outlined text-slate-400 text-sm">
                  location_on
                </span>
                <p className="text-slate-600 text-base">
                  {cliente?.enderecoCliente ?? ''}
                </p>
              </div>
            </div>
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
            Cash | Mult final 4242 • Principal
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
