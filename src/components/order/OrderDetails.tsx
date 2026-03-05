import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';
import type { Pedido, RespostaPedidoPorId } from '@/types/order';
import {
  STATUS_CONFIG,
  calcularTotalPedido,
  formatarData,
  formatarDataHora,
} from '@/types/order';

interface OrderDetailsProps {
  pedidoId: number;
}

const TIMELINE_STEPS = [
  { key: 'Pendente', label: 'Pedido Feito', icon: 'receipt' },
  { key: 'Processando', label: 'Preparando', icon: 'inventory_2' },
  { key: 'A Caminho', label: 'A Caminho', icon: 'local_shipping' },
  { key: 'Entregue', label: 'Entregue', icon: 'check_circle' },
];

const TAXA_ENTREGA = 500;

export function OrderDetails({ pedidoId }: OrderDetailsProps) {
  const { toast } = useToast();

  const { data: pedido, isLoading } = useQuery<Pedido>({
    queryKey: ['pedido', pedidoId],
    queryFn: async () => {
      const res = await api.get<RespostaPedidoPorId>(`pedidos/${pedidoId}`);
      return res.data.mensagem;
    },
    enabled: !!pedidoId,
  });

  const handleAjuda = () =>
    toast({
      variant: 'destructive',
      title: 'Pedido de suporte',
      description: 'Nossa equipe foi notificada. Entraremos em contato!',
    });

  if (isLoading) {
    return (
      <div className="flex-shrink-0 w-full lg:w-2/5">
        <div
          className="sticky top-24 rounded-3xl p-7 space-y-5 animate-pulse"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1.5px solid rgba(249,115,22,0.2)',
          }}
        >
          {[80, 180, 120, 60].map((h, i) => (
            <div
              key={i}
              className="rounded-2xl"
              style={{ height: h, background: 'rgba(255,255,255,0.05)' }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!pedido) return null;

  const cfg = STATUS_CONFIG[pedido.statusPedido];
  const subtotal = calcularTotalPedido(pedido.itens);
  const total = subtotal + TAXA_ENTREGA;

  return (
    <motion.div
      key={pedidoId}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex-shrink-0 w-full lg:w-2/5"
    >
      <div
        className="sticky top-24 rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1.5px solid rgba(249,115,22,0.3)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* ── Header ── */}
        <div
          className="px-7 py-5 flex items-center justify-between gap-4 flex-wrap"
          style={{ borderBottom: '1px solid rgba(249,115,22,0.15)' }}
        >
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Pedido
            </p>
            <h3 className="text-lg font-extrabold" style={{ color: '#ffffff' }}>
              #{pedido.pedidoCotacaoId}
            </h3>
            <p
              className="text-xs mt-0.5 font-mono"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              {pedido.numero_cotacao}
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
            style={{
              background: cfg.bg,
              border: `1px solid ${cfg.border}`,
              color: cfg.color,
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 13 }}
            >
              {cfg.icon}
            </span>
            {cfg.label}
          </span>
        </div>

        <div className="p-7 space-y-6">
          {/* ── Timeline ── */}
          {pedido.statusPedido !== 'Cancelado' && (
            <div className="space-y-3">
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Rastreamento
              </p>
              <div className="flex items-center gap-1">
                {TIMELINE_STEPS.map(({ key, label, icon }, i) => {
                  const done = cfg.step >= i;
                  const active = cfg.step === i;
                  return (
                    <div
                      key={key}
                      className="flex items-center flex-1 last:flex-none"
                    >
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                          style={{
                            background: done
                              ? 'rgba(249,115,22,0.2)'
                              : 'rgba(255,255,255,0.04)',
                            border: `1.5px solid ${done ? '#f97316' : 'rgba(255,255,255,0.1)'}`,
                            boxShadow: active
                              ? '0 0 14px rgba(249,115,22,0.4)'
                              : 'none',
                          }}
                        >
                          <span
                            className="material-symbols-outlined"
                            style={{
                              fontSize: 14,
                              color: done ? '#f97316' : 'rgba(255,255,255,0.2)',
                            }}
                          >
                            {icon}
                          </span>
                        </div>
                        <span
                          className="text-[9px] font-bold text-center leading-tight"
                          style={{
                            color: done
                              ? 'rgba(255,255,255,0.7)'
                              : 'rgba(255,255,255,0.2)',
                          }}
                        >
                          {label}
                        </span>
                      </div>
                      {i < TIMELINE_STEPS.length - 1 && (
                        <div
                          className="flex-1 h-0.5 mx-1 mb-4 rounded-full transition-all"
                          style={{
                            background:
                              cfg.step > i
                                ? '#f97316'
                                : 'rgba(255,255,255,0.08)',
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{ height: 1, background: 'rgba(249,115,22,0.12)' }} />

          {/* ── Dados do cliente ── */}
          <div className="space-y-2">
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Cliente
            </p>
            <div
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(249,115,22,0.3), rgba(249,115,22,0.1))',
                  border: '1.5px solid rgba(249,115,22,0.4)',
                  color: '#f97316',
                }}
              >
                {pedido.nomeCliente.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p
                  className="font-bold text-sm truncate"
                  style={{ color: '#ffffff' }}
                >
                  {pedido.nomeCliente}
                </p>
                <p
                  className="text-xs truncate"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {pedido.emailCliente}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  {pedido.telefoneCliente}
                  {pedido.telefoneClienteAlt
                    ? ` · ${pedido.telefoneClienteAlt}`
                    : ''}
                </p>
              </div>
            </div>
          </div>

          {/* ── Datas ── */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: 'Criado em',
                value: formatarDataHora(pedido.criado_em),
                icon: 'calendar_today',
              },
              {
                label: 'Atualizado em',
                value: formatarData(pedido.actualizado_em),
                icon: 'update',
              },
            ].map(({ label, value, icon }) => (
              <div
                key={label}
                className="p-3 rounded-2xl flex flex-col gap-1"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 13, color: '#f97316' }}
                  >
                    {icon}
                  </span>
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    {label}
                  </span>
                </div>
                <p
                  className="text-xs font-semibold"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* ── Itens ── */}
          <div className="space-y-2">
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Itens do Pedido
            </p>
            <div className="space-y-2">
              {pedido.itens.map((item) => (
                <div
                  key={item.id_itens_pedido}
                  className="flex items-center justify-between p-3.5 rounded-2xl"
                  style={{
                    background: 'rgba(249,115,22,0.05)',
                    border: '1px solid rgba(249,115,22,0.15)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
                      style={{
                        background: 'rgba(249,115,22,0.15)',
                        color: '#f97316',
                      }}
                    >
                      ×{item.quantidade}
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: '#ffffff' }}
                      >
                        Produto #{item.produto_id}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: 'rgba(255,255,255,0.4)' }}
                      >
                        KZ {item.preco_unitario.toLocaleString('pt-AO')} / un.
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-sm" style={{ color: '#f97316' }}>
                    KZ {item.preco_total.toLocaleString('pt-AO')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Resumo financeiro ── */}
          <div
            className="rounded-2xl p-5 space-y-3"
            style={{
              background: 'rgba(249,115,22,0.05)',
              border: '1px solid rgba(249,115,22,0.2)',
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Resumo Financeiro
            </p>
            {[
              { label: 'Subtotal', value: subtotal },
              { label: 'Taxa de Entrega', value: TAXA_ENTREGA },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center">
                <span
                  className="text-sm"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  {label}
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  KZ {value.toLocaleString('pt-AO')}
                </span>
              </div>
            ))}
            <div style={{ height: 1, background: 'rgba(249,115,22,0.2)' }} />
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold" style={{ color: '#ffffff' }}>
                Total
              </span>
              <span className="text-xl font-black" style={{ color: '#f97316' }}>
                KZ {total.toLocaleString('pt-AO')}
              </span>
            </div>
          </div>

          {/* ── CTAs ── */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAjuda}
              className="flex-1 h-11 rounded-2xl text-sm font-bold flex items-center justify-center gap-2"
              style={{
                background: 'transparent',
                border: '1.5px solid rgba(249,115,22,0.3)',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 16 }}
              >
                help
              </span>
              Ajuda
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                toast({
                  title: 'Em breve!',
                  description:
                    'Funcionalidade de reordenar em desenvolvimento.',
                })
              }
              className="flex-1 h-11 rounded-2xl text-sm font-extrabold flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                color: '#ffffff',
                boxShadow: '0 6px 20px rgba(249,115,22,0.3)',
                border: 'none',
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 16 }}
              >
                replay
              </span>
              Pedir Novamente
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
