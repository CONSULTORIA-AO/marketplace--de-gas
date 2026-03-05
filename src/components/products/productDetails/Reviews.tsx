import { motion } from 'framer-motion';

const reviews = [
  {
    initials: 'JD',
    name: 'João Delgado',
    rating: 5,
    time: '2 dias atrás',
    text: 'Entrega extremamente rápida e o rapaz foi muito educado, fez a instalação e o teste de sabão para garantir que não havia vazamentos. Recomendo muito!',
  },
  {
    initials: 'MA',
    name: 'Maria Antónia',
    rating: 5,
    time: '5 dias atrás',
    text: 'Serviço impecável! Chegou em menos de 30 minutos. O técnico foi super profissional e explicou tudo direitinho. Com certeza vou pedir de novo.',
  },
  {
    initials: 'CR',
    name: 'Carlos Rocha',
    rating: 4,
    time: '1 semana atrás',
    text: 'Boa qualidade e entrega dentro do prazo. O aplicativo é fácil de usar e o preço é justo para o serviço oferecido.',
  },
];

export function Reviews() {
  const avgRating = 4.8;
  const totalReviews = 124;

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
      <div className="flex items-center justify-between flex-wrap gap-4">
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
              reviews
            </span>
          </div>
          <h3
            className="text-2xl font-extrabold tracking-tight"
            style={{ color: '#ffffff' }}
          >
            Avaliações Recentes
          </h3>
        </div>

        {/* Average score pill */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-2xl"
          style={{
            background: 'rgba(249,115,22,0.08)',
            border: '1px solid rgba(249,115,22,0.25)',
          }}
        >
          <span
            className="material-symbols-outlined text-base"
            style={{ color: '#f97316' }}
          >
            star
          </span>
          <span className="text-xl font-black" style={{ color: '#f97316' }}>
            {avgRating}
          </span>
          <span
            className="text-xs font-semibold"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            ({totalReviews} avaliações)
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background:
            'linear-gradient(90deg, rgba(249,115,22,0.4), transparent)',
        }}
      />

      {/* Review list */}
      <div className="space-y-6">
        {reviews.map(({ initials, name, rating, time, text }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
            className="p-5 rounded-2xl space-y-4"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(249,115,22,0.15)',
            }}
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black flex-shrink-0"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(249,115,22,0.3), rgba(249,115,22,0.1))',
                    border: '1.5px solid rgba(249,115,22,0.4)',
                    color: '#f97316',
                  }}
                >
                  {initials}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#ffffff' }}>
                    {name}
                  </p>
                  {/* Stars */}
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span
                        key={s}
                        className="material-symbols-outlined text-sm"
                        style={{
                          color:
                            s < rating ? '#f97316' : 'rgba(255,255,255,0.15)',
                          fontSize: 14,
                        }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <span
                className="text-xs font-medium flex-shrink-0"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {time}
              </span>
            </div>

            {/* Text */}
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              {text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Load more */}
      <button
        className="w-full h-11 rounded-2xl text-sm font-bold tracking-wide transition-all"
        style={{
          background: 'transparent',
          border: '1px solid rgba(249,115,22,0.25)',
          color: 'rgba(255,255,255,0.5)',
        }}
      >
        Ver todas as avaliações
      </button>
    </motion.div>
  );
}
