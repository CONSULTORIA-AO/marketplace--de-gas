import { motion } from 'framer-motion';

export function SupplierInfo() {
  return (
    <div className="lg:col-span-1">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-28 rounded-3xl p-7 space-y-6"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1.5px solid rgba(249,115,22,0.3)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'rgba(249,115,22,0.15)',
              border: '1px solid rgba(249,115,22,0.35)',
            }}
          >
            <span
              className="material-symbols-outlined text-base"
              style={{ color: '#f97316' }}
            >
              storefront
            </span>
          </div>
          <h3
            className="text-lg font-extrabold tracking-tight"
            style={{ color: '#ffffff' }}
          >
            Sobre o Fornecedor
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

        {/* Supplier identity */}
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex-shrink-0 bg-center bg-cover shadow-lg"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWuWl2OrqcJYLe8Zo9YsNLtcCSHf84-yDyAqyy1p6v1LureRKTw7Mms_qhid148ziBl_5dRvaqO10x4wlSXLza-TssCRq97arjncCKPVWmazH2YefBN1_QlHhJ-OVQfZXLNoyCZBAoWaHiS1AWBNhcgbBwUvCXWkt9QBW7VLxBv5sD8ZvomcVakNV5wpYUwgrno3xXu2XltFESyQc4AML4PL4P4WwA0Q3QlLUsbBcWKOgMEfIq_1Ftpzis0l5m6m30P1_zHMsgr2A")',
              border: '2px solid rgba(249,115,22,0.4)',
              boxShadow: '0 0 20px rgba(249,115,22,0.15)',
            }}
          />
          <div>
            <h4
              className="font-extrabold text-lg leading-tight"
              style={{ color: '#ffffff' }}
            >
              Gás do Bairro
            </h4>
            <p
              className="text-xs font-medium mt-0.5"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Parceiro desde Jun/2022
            </p>
            {/* Verified badge */}
            <div
              className="flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full w-fit"
              style={{
                background: 'rgba(249,115,22,0.1)',
                border: '1px solid rgba(249,115,22,0.3)',
              }}
            >
              <span
                className="material-symbols-outlined text-xs"
                style={{ color: '#f97316', fontSize: 12 }}
              >
                verified
              </span>
              <span className="text-xs font-bold" style={{ color: '#f97316' }}>
                Verificado
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: 'star', value: '4.8', label: 'Avaliação', orange: true },
            {
              icon: 'shopping_bag',
              value: '+500',
              label: 'Vendas',
              orange: false,
            },
          ].map(({ icon, value, label, orange }) => (
            <div
              key={label}
              className="p-4 rounded-2xl text-center space-y-1"
              style={{
                background: orange
                  ? 'rgba(249,115,22,0.08)'
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${orange ? 'rgba(249,115,22,0.25)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              <div className="flex items-center justify-center gap-1">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{
                    color: orange ? '#f97316' : 'rgba(255,255,255,0.5)',
                    fontSize: 15,
                  }}
                >
                  {icon}
                </span>
                <span
                  className="font-black text-xl"
                  style={{ color: orange ? '#f97316' : '#ffffff' }}
                >
                  {value}
                </span>
              </div>
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Response time */}
        <div
          className="flex items-center gap-3 p-4 rounded-2xl"
          style={{
            background: 'rgba(249,115,22,0.05)',
            border: '1px solid rgba(249,115,22,0.15)',
          }}
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{ color: '#f97316' }}
          >
            timer
          </span>
          <div>
            <p className="text-sm font-bold" style={{ color: '#ffffff' }}>
              Responde em ~5 min
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Tempo médio de resposta
            </p>
          </div>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full h-12 rounded-2xl text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2"
          style={{
            background: 'transparent',
            border: '1.5px solid rgba(249,115,22,0.45)',
            color: '#f97316',
          }}
        >
          <span className="material-symbols-outlined text-base">person</span>
          Ver Perfil Completo
        </motion.button>
      </motion.div>
    </div>
  );
}
