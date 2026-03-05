import { Header } from '@/components/layout/Header';
import { AsideProfile } from '@/components/profile/AsideProfile';
import { UserInformation } from '@/components/profile/UserInformation';
import { motion } from 'framer-motion';

export function ProfilePage() {
  return (
    <main
      style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        minHeight: '100vh',
      }}
    >
      <Header />
      <div className="flex max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 gap-8">
        {/* Sidebar — hidden on mobile, shown on lg+ */}
        <div className="hidden lg:block flex-shrink-0">
          <AsideProfile />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mb-1"
              style={{ color: 'rgba(249,115,22,0.7)' }}
            >
              Gás Rápido
            </p>
            <h1
              className="text-3xl sm:text-4xl font-black tracking-tight"
              style={{ color: '#ffffff', letterSpacing: '-0.02em' }}
            >
              Meu Perfil
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Gerencie suas informações pessoais e configurações de segurança.
            </p>
          </motion.div>

          <UserInformation />
        </div>
      </div>

      {/* Footer */}
      <footer
        className="mt-16 py-8"
        style={{ borderTop: '1px solid rgba(249,115,22,0.15)' }}
      >
        <div className="container mx-auto px-6 text-center">
          <div
            className="flex items-center justify-center gap-2 mb-2"
            style={{ color: '#f97316' }}
          >
            <span className="material-symbols-outlined text-lg">
              local_fire_department
            </span>
            <span className="text-sm font-bold">JáGás</span>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} Gás Rápido Marketplace.
          </p>
        </div>
      </footer>
    </main>
  );
}
