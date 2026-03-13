import { motion, AnimatePresence } from 'framer-motion';
import BackGroundImage from '@/assets/botja.png';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();
  const currentSlide = 0;

  return (
    <div className="relative w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative w-full bg-gradient-to-br from-[#FFA500] via-orange-600 to-amber-600 min-h-[380px] sm:min-h-[420px] md:min-h-[480px] lg:min-h-[520px] flex items-center justify-center"
        >
          {/* Overlay sutil para melhorar contraste */}
          <div className="absolute inset-0 bg-black/15 z-0" />

          {/* Conteúdo principal */}
          <div className="relative z-10 container mx-auto px-5 sm:px-8 py-12 md:py-16 lg:py-20 max-w-7xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
              {/* Lado esquerdo - texto (se quiser adicionar) */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                className="text-center md:text-left max-w-lg"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg">
                  Descubra o Melhor
                  <br />
                  <span className="text-amber-200">Gás</span>
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-white/90 font-medium max-w-md mx-auto md:mx-0">
                  O marketplace mais completo de Angola. Produtos incríveis,
                  preços justos, entrega rápida.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button
                    onClick={() => navigate('/iniciar-sessao')}
                    className="px-8 py-4 bg-white text-orange-600 font-bold rounded-full shadow-xl hover:bg-gray-100 transition-all transform hover:scale-105"
                  >
                    Comprar Agora
                  </button>
                </div>
              </motion.div>

              {/* Imagem principal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.9,
                  type: 'spring',
                  stiffness: 80,
                  damping: 12,
                }}
                className="relative w-full max-w-md md:max-w-lg lg:max-w-xl"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white/20">
                  <img
                    src={BackGroundImage}
                    alt="Hero Product"
                    className="w-full h-auto object-cover select-none"
                    style={{
                      filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.4))',
                    }}
                  />
                </div>

                {/* Efeito de brilho sutil */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-amber-300/30 via-orange-300/20 to-transparent rounded-full blur-3xl opacity-60 animate-pulse-slow pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Animação extra de pulse (opcional) */}
    </div>
  );
}
