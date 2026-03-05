import { motion } from 'framer-motion';

const features = [
  { icon: 'verified', label: 'Gás GLP Alta Pureza' },
  { icon: 'construction', label: 'Instalação Gratuita' },
  { icon: 'security', label: 'Lacre de Segurança ANP' },
  { icon: 'speed', label: 'Entrega em Minutos' },
];

export function AboutProduct() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="rounded-3xl p-8 sm:p-10 space-y-8"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1.5px solid rgba(249,115,22,0.3)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: 'rgba(249,115,22,0.15)',
            border: '1px solid rgba(249,115,22,0.35)',
          }}
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{ color: '#f97316' }}
          >
            info
          </span>
        </div>
        <h3
          className="text-2xl font-extrabold tracking-tight"
          style={{ color: '#ffffff' }}
        >
          Sobre o Produto
        </h3>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background:
            'linear-gradient(90deg, rgba(249,115,22,0.4), transparent)',
        }}
      />

      {/* Description */}
      <div className="space-y-4">
        <p
          className="text-base leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          O botijão de gás P13 da SuperGás é a escolha ideal para uso
          residencial, garantindo segurança e eficiência para o seu fogão e
          forno. Este produto segue todas as normas de segurança da{' '}
          <span style={{ color: '#f97316', fontWeight: 600 }}>
            ANP (Agência Nacional do Petróleo, Gás Natural e Biocombustíveis)
          </span>
          , vindo com lacre de segurança intacto.
        </p>
        <p
          className="text-base leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          O serviço de entrega inclui a{' '}
          <span style={{ color: '#ffffff', fontWeight: 600 }}>
            instalação gratuita do botijão
          </span>{' '}
          por um técnico qualificado, que realizará o teste de vazamento para
          garantir a sua tranquilidade.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {features.map(({ icon, label }, i) => (
          <motion.div
            key={icon}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
            className="flex items-center gap-4 p-4 rounded-2xl"
            style={{
              background: 'rgba(249,115,22,0.06)',
              border: '1px solid rgba(249,115,22,0.2)',
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(249,115,22,0.12)' }}
            >
              <span
                className="material-symbols-outlined text-lg"
                style={{ color: '#f97316' }}
              >
                {icon}
              </span>
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: 'rgba(255,255,255,0.85)' }}
            >
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
