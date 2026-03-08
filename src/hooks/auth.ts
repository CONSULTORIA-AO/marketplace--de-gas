import { create } from 'zustand';
import { AuthSession, AuthInfo, AuthMensagem } from '@/types';

interface AuthState {
  session: AuthSession | null;
  isAuthenticated: boolean;

  setAuth: (info: AuthInfo, mensagem: AuthMensagem) => void;
  logout: () => void;
  updateUser: (user: Partial<AuthSession['user']>) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const storedSession = localStorage.getItem('session');

  return {
    session: storedSession ? JSON.parse(storedSession) : null,
    isAuthenticated: !!storedSession,

    setAuth: (info, mensagem) => {
      const session: AuthSession = {
        token: mensagem.hash,
        info,
        user: {
          id: mensagem.entidade,
          ultimoLogin: mensagem.ultimo_login,
          novoCliente: mensagem.novo_cliente === '1',
        },
      };

      localStorage.setItem('session', JSON.stringify(session));

      set({
        session,
        isAuthenticated: true,
      });
    },

    logout: () => {
      localStorage.removeItem('session');
      set({
        session: null,
        isAuthenticated: false,
      });
    },

    updateUser: (updatedUser) =>
      set((state) => {
        if (!state.session) return state;

        const newSession = {
          ...state.session,
          user: {
            ...state.session.user,
            ...updatedUser,
          },
        };

        localStorage.setItem('session', JSON.stringify(newSession));

        return { session: newSession };
      }),
  };
});
