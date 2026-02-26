import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { user } from '@/data/user';
import { api } from '@/lib/axios';
import { useAuthStore } from '@/store/authStrore';

export function AsideProfile() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const session = useAuthStore((state) => state.session);

  const menuItems = useMemo(
    () => [
      {
        label: 'Meu Perfil',
        icon: 'person',
        path: '/perfil',
      },
      {
        label: 'Meus Pedidos',
        icon: 'package_2',
        path: '/carrinho',
      },
      {
        label: 'Endereços',
        icon: 'location_on',
        path: '/enderecos',
      },
      {
        label: 'Pagamentos',
        icon: 'credit_card',
        path: '/checkout',
      },
      {
        label: 'Segurança',
        icon: 'security',
        path: '/seguranca',
      },
    ],
    []
  );

  const handleLogout = async () => {
    if (!session) return;
    //Pegamos a entidade
    const entidade = session.user.id;
    try {
      await api.post('/clientes/logout', {
        entidade,
      });
    } catch (error) {
      console.error('Erro ao invalidar sessão no backend', error);
    }
    logout();
    // Redireciona para login
    navigate('/login');
  };

  return (
    <aside className="w-64 flex-shrink-0">
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex flex-col h-[calc(100vh-160px)] justify-between bg-white p-6 rounded-xl border border-gray-900/10 shadow-sm"
      >
        <div className="flex flex-col gap-6">
          {/* PROFILE HEADER */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <motion.img
              whileHover={{ scale: 1.05 }}
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 shadow-sm"
              src={user.photo}
            />
            <div className="flex flex-col">
              <h1 className="text-slate-900 text-base font-bold leading-none">
                {user.full_name}
              </h1>
              <p className="text-[#137fec] text-xs font-semibold mt-1">
                {user.client_type}
              </p>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="flex flex-col gap-1 relative">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-[#137fec]'
                  }`}
                >
                  {/* ACTIVE BACKGROUND ANIMADO */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebarItem"
                      className="absolute inset-0 bg-[#137fec] rounded-lg shadow-md shadow-[#137fec]/20"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="material-symbols-outlined relative z-10">
                    {item.icon}
                  </span>

                  <p className="text-sm font-semibold relative z-10">
                    {item.label}
                  </p>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* LOGOUT BUTTON */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-lg h-11 bg-red-500 text-slate-50 text-sm font-bold hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">
              logout
            </span>
            <span>Sair da conta</span>
          </Button>
        </motion.div>
      </motion.div>
    </aside>
  );
}
