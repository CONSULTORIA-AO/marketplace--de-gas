'use client';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, LiaGooglePlay } from '@/constants/icons';
import { links } from '@/constants/routes';

export function Footer() {
  return (
    <footer className="bg-[#FFA500]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer mb-3"
            >
              <span className="text-2xl font-black text-white tracking-tight">
                Jágás.
              </span>
            </motion.div>
            <p className="text-white/60 text-xs leading-relaxed">
              A sua Plataforma de vendas, onde você encontra gás
            </p>
          </div>

          {/* Links úteis */}
          <div>
            <p className="text-white font-bold text-sm mb-4">Links Úteis</p>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.id}>
                  <motion.a
                    whileHover={{ x: 4 }}
                    href={link.url}
                    className="text-white/70 text-sm hover:text-white transition-colors block"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-bold text-sm mb-3">
              Baixe o Nosso Aplicativo
            </p>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-orange-400 text-white px-4 py-2.5 rounded-lg cursor-pointer"
            >
              <span className="text-xl">
                <LiaGooglePlay />
              </span>
              <div>
                <p className="text-[9px] text-gray-600 leading-none">
                  GET IT ON
                </p>
                <p className="text-sm font-bold leading-tight">Google Play</p>
              </div>
            </motion.div>
          </div>

          <div>
            <p className="text-white font-bold text-sm mb-3">Siga nos</p>
            <div className="flex gap-3 text-blue-500">
              {[
                {
                  icon: <FaFacebook style={{ color: '#3B82F6' }} />,
                  label: 'WhatsApp',
                },
                {
                  icon: <FaInstagram style={{ color: 'rgb(221, 42, 123)' }} />,
                  label: 'Facebook',
                },
              ].map((s) => (
                <motion.button
                  key={s.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 bg-white/15 hover:bg-white/25 cursor-pointer rounded-full flex items-center justify-center text-lg transition-colors"
                  title={s.label}
                >
                  {s.icon}
                </motion.button>
              ))}
            </div>

            <div>
              <p className="text-white font-bold text-sm mb-3">Contactos</p>
              <div className="space-y-1.5">
                <motion.a
                  whileHover={{ x: 3 }}
                  href="tel:+244949888222"
                  className="block text-white/80 text-sm hover:text-white transition-colors"
                >
                  +244 949 888 222
                </motion.a>
                <motion.a
                  whileHover={{ x: 3 }}
                  href="mailto:angoverso@geral.com"
                  className="block text-white/80 text-sm hover:text-white transition-colors"
                >
                  jagas@geral.com
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-white/15 py-4">
        <p className="text-center text-white text-xs">
          © {new Date().getFullYear()} Jágás. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
