import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { api } from '@/lib/axios';
import { useAuthStore } from '@/store/authStrore';
import { useUserStore } from '@/store/userIfo';

export function AsideProfile() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const session = useAuthStore((state) => state.session);
  const cliente = useUserStore((state) => state.cliente);

  const menuItems = useMemo(
    () => [
      { label: 'Meu Perfil', icon: 'person', path: '/perfil' },
      { label: 'Meus Pedidos', icon: 'package_2', path: '/pedidos' },
      { label: 'Pagamentos', icon: 'credit_card', path: '/checkout' },
    ],
    []
  );

  const handleLogout = async () => {
    if (!session) return;
    try {
      await api.post('/clientes/logout', { entidade: session.user.id });
    } catch (err) {
      console.error('Erro ao invalidar sessão no backend', err);
    }
    logout();
    navigate('/login');
  };

  const currentPath = window.location.pathname;

  return (
    <aside className="w-64 flex-shrink-0">
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex flex-col rounded-3xl overflow-hidden"
        style={{
          height: 'calc(100vh - 160px)',
          background: 'rgba(255,255,255,0.03)',
          border: '1.5px solid rgba(249,115,22,0.25)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
        }}
      >
        {/* Profile header */}
        <div
          className="p-6"
          style={{ borderBottom: '1px solid rgba(249,115,22,0.15)' }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative flex-shrink-0"
            >
              <img
                className="w-12 h-12 rounded-2xl object-cover"
                src={cliente?.fotoCliente ?? ''}
                style={{ border: '2px solid rgba(249,115,22,0.4)' }}
                alt={cliente?.nomeCliente ?? ''}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(cliente?.nomeCliente ?? 'U')}&background=f97316&color=000`;
                }}
              />
              <div
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
                style={{ background: '#4ade80', borderColor: '#000' }}
              />
            </motion.div>
            <div className="min-w-0">
              <p
                className="text-sm font-extrabold truncate"
                style={{ color: '#ffffff' }}
              >
                {cliente?.nomeCliente ?? 'Utilizador'}
              </p>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-lg inline-block mt-0.5"
                style={{
                  background: 'rgba(249,115,22,0.15)',
                  color: '#f97316',
                }}
              >
                Cliente VIP
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, i) => {
            const isActive = currentPath === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={item.path}
                  className="relative flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all"
                  style={{
                    background: isActive
                      ? 'rgba(249,115,22,0.15)'
                      : 'transparent',
                    border: `1px solid ${isActive ? 'rgba(249,115,22,0.4)' : 'transparent'}`,
                    color: isActive ? '#f97316' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebarItem"
                      className="absolute inset-0 rounded-2xl"
                      style={{ background: 'rgba(249,115,22,0.08)' }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className="material-symbols-outlined relative z-10"
                    style={{
                      fontSize: 20,
                      color: isActive ? '#f97316' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-semibold relative z-10">
                    {item.label}
                  </span>
                  {isActive && (
                    <span
                      className="ml-auto relative z-10 w-1.5 h-1.5 rounded-full"
                      style={{ background: '#f97316' }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Logout */}
        <div
          className="p-4"
          style={{ borderTop: '1px solid rgba(249,115,22,0.1)' }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl h-11 text-sm font-bold transition-all"
            style={{
              background: 'rgba(248,113,113,0.1)',
              border: '1px solid rgba(248,113,113,0.25)',
              color: '#f87171',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18 }}
            >
              logout
            </span>
            Sair da conta
          </motion.button>
        </div>
      </motion.div>
    </aside>
  );
}
