import { Cliente } from '@/types/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  cliente: Cliente | null;
  setCliente: (cliente: Cliente) => void;
  clearCliente: () => void;
  setEntidade: (entidade: number) => void;
  setPhoto: (url: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      cliente: null,

      setCliente: (cliente) => set({ cliente }),

      setEntidade: (entidade) =>
        set((state) => ({
          cliente: state.cliente
            ? {
                ...state.cliente,
                clienteId: entidade,
              }
            : ({
                clienteId: entidade,
              } as Cliente),
        })),

      clearCliente: () => set({ cliente: null }),

      setPhoto: (url) =>
        set((state) => ({
          cliente: state.cliente
            ? {
                ...state.cliente,
                fotoCliente: url,
              }
            : null,
        })),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        cliente: state.cliente,
      }),
    }
  )
);