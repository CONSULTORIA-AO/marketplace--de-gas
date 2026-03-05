import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'fixed',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(249,115,22,0.07), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="text-center max-w-lg w-full space-y-10 relative">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p
            className="font-black leading-none select-none"
            style={{
              fontSize: 'clamp(100px, 25vw, 180px)',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(249,115,22,0.35)',
              letterSpacing: '-0.05em',
              lineHeight: 1,
            }}
          >
            404
          </p>
        </motion.div>

        {/* Icon + card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-3xl p-8 sm:p-10 space-y-6 mx-auto"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1.5px solid rgba(249,115,22,0.3)',
            boxShadow: '0 8px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Icon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="flex justify-center"
          >
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto"
              style={{
                background: 'rgba(249,115,22,0.1)',
                border: '2px solid rgba(249,115,22,0.3)',
                boxShadow: '0 0 40px rgba(249,115,22,0.12)',
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 42, color: '#f97316' }}
              >
                search_off
              </span>
            </div>
          </motion.div>

          {/* Text */}
          <div className="space-y-3">
            <h1
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{ color: '#ffffff', letterSpacing: '-0.02em' }}
            >
              Página não encontrada
            </h1>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              A rota{' '}
              <code
                className="px-2 py-0.5 rounded-lg text-sm font-mono"
                style={{
                  background: 'rgba(249,115,22,0.12)',
                  border: '1px solid rgba(249,115,22,0.25)',
                  color: '#f97316',
                }}
              >
                {location.pathname}
              </code>{' '}
              não existe ou foi movida.
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background:
                'linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)',
            }}
          />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/"
                className="flex items-center justify-center gap-2 h-12 px-7 rounded-2xl text-sm font-extrabold w-full sm:w-auto"
                style={{
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  color: '#ffffff',
                  boxShadow: '0 6px 20px rgba(249,115,22,0.3)',
                  textDecoration: 'none',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 16 }}
                >
                  home
                </span>
                Voltar ao Início
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/produtos"
                className="flex items-center justify-center gap-2 h-12 px-7 rounded-2xl text-sm font-bold w-full sm:w-auto"
                style={{
                  background: 'transparent',
                  border: '1.5px solid rgba(249,115,22,0.3)',
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 16 }}
                >
                  storefront
                </span>
                Ver Produtos
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer brand */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2"
          style={{ color: 'rgba(249,115,22,0.4)' }}
        >
          <span className="material-symbols-outlined text-lg">
            local_fire_department
          </span>
          <span className="text-sm font-bold tracking-tight">JáGás</span>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
