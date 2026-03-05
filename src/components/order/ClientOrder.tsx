import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import type { Pedido, RespostaListaPedidos } from '@/types/order';
import { useUserStore } from '@/store/userIfo';

export function ClientOrder() {
  const entidade = useUserStore((state) => state.cliente.clienteId);

  const { data: pedidos = [], isLoading } = useQuery<Pedido[]>({
    queryKey: ['pedidos', 'cliente', entidade],
    queryFn: async () => {
      const res = await api.get<RespostaListaPedidos>(
        `pedidos/cliente/${entidade}`
      );
      return res.data.mensagem;
    },
  });

  const stats = [
    {
      label: 'Em Andamento',
      icon: 'local_shipping',
      value: pedidos.filter((p) =>
        ['Pendente', 'Processando', 'A Caminho'].includes(p.statusPedido)
      ).length,
      color: '#f97316',
      bg: 'rgba(249,115,22,0.1)',
      border: 'rgba(249,115,22,0.3)',
      glow: 'rgba(249,115,22,0.15)',
    },
    {
      label: 'Total de Pedidos',
      icon: 'receipt_long',
      value: pedidos.length,
      color: 'rgba(255,255,255,0.85)',
      bg: 'rgba(255,255,255,0.04)',
      border: 'rgba(255,255,255,0.1)',
      glow: 'transparent',
    },
    {
      label: 'Entregues',
      icon: 'check_circle',
      value: pedidos.filter((p) => p.statusPedido === 'Entregue').length,
      color: '#4ade80',
      bg: 'rgba(74,222,128,0.08)',
      border: 'rgba(74,222,128,0.25)',
      glow: 'rgba(74,222,128,0.1)',
    },
    {
      label: 'Cancelados',
      icon: 'cancel',
      value: pedidos.filter((p) => p.statusPedido === 'Cancelado').length,
      color: '#f87171',
      bg: 'rgba(248,113,113,0.08)',
      border: 'rgba(248,113,113,0.25)',
      glow: 'rgba(248,113,113,0.1)',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4">
      {stats.map(({ label, icon, value, color, bg, border, glow }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4, ease: 'easeOut' }}
          className="relative rounded-2xl p-6 flex flex-col gap-4 overflow-hidden"
          style={{
            background: bg,
            border: `1.5px solid ${border}`,
            boxShadow: `0 8px 32px ${glow}`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${glow}, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: bg, border: `1px solid ${border}` }}
          >
            <span
              className="material-symbols-outlined"
              style={{ color, fontSize: 18 }}
            >
              {icon}
            </span>
          </div>
          <div>
            {isLoading ? (
              <div
                className="h-9 w-12 rounded-lg animate-pulse"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              />
            ) : (
              <p
                className="text-4xl font-black tracking-tight leading-none"
                style={{ color }}
              >
                {value}
              </p>
            )}
            <p
              className="text-xs font-semibold uppercase tracking-widest mt-2"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              {label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
