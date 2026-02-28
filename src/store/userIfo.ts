import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Cliente {
  clienteId: number;
  enderecoCliente: string;
  endereco_mac_unico: string;
  arquivoIdentificacao: string | null;
  bloqueio: string;
  nomeCliente: string;
  responsavel: string | null;
  emailCliente: string;
  fotoCliente: string;
  telefoneCliente: string;
  telefoneClienteAlt: string;
  referenciaEMIS: string;
  criado_em: string;
  actualizado_em: string;
  observacoes: string | null;
  ultimo_login: string;
  novo_cliente: string;
  id_conf: number;
  clienteIdConf: string;
  tentativas_login: number;
  codigo_seguranca: string;
  codigo_confirmacao: string;
  tempo_de_vida_codigo_seguranca: string;
  servico_mensagens: string;
  servico_email: string;
  servico_principal: string;
  config_time: string;
  config_update: string;
}

interface UserState {
  cliente: Cliente | null;
  setCliente: (cliente: Cliente) => void;
  clearCliente: () => void;
  setPhoto: (url: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      cliente: null,

      setCliente: (cliente) => set({ cliente }),

      clearCliente: () => set({ cliente: null }),

      setPhoto: (url) =>
        set((state) => ({
          cliente: state.cliente
            ? { ...state.cliente, fotoCliente: url }
            : null,
        })),
    }),
    {
      name: 'user-storage', // nome no localStorage
      partialize: (state) => ({
        cliente: state.cliente,
      }),
    }
  )
);
