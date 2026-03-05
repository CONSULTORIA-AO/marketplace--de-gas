import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import type {
  Pedido,
  StatusPedidoAPI,
  RespostaListaPedidos,
} from '@/types/order';
import {
  STATUS_CONFIG,
  calcularTotalPedido,
  formatarData,
} from '@/types/order';
import { useUserStore } from '@/store/userIfo';

type FiltroStatus = 'Todos' | StatusPedidoAPI;

const FILTROS: { key: FiltroStatus; label: string }[] = [
  { key: 'Todos', label: 'Todos' },
  { key: 'Pendente', label: 'Pendente' },
  { key: 'Processando', label: 'Processando' },
  { key: 'A Caminho', label: 'A Caminho' },
  { key: 'Entregue', label: 'Entregue' },
  { key: 'Cancelado', label: 'Cancelado' },
];

interface ClientOrderHistoryProps {
  onSelectOrder: (pedidoId: number) => void;
  selectedOrderId: number | null;
}

export function ClientOrderHistory({
  onSelectOrder,
  selectedOrderId,
}: ClientOrderHistoryProps) {
  const [search, setSearch] = useState('');
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroStatus>('Todos');
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

  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter((p) => {
      const matchSearch =
        p.pedidoCotacaoId.toString().includes(search) ||
        p.numero_cotacao.toLowerCase().includes(search.toLowerCase());
      const matchFiltro =
        filtroAtivo === 'Todos' || p.statusPedido === filtroAtivo;
      return matchSearch && matchFiltro;
    });
  }, [pedidos, search, filtroAtivo]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-grow w-full lg:w-3/5 rounded-3xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1.5px solid rgba(249,115,22,0.25)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
      }}
    >
      {/* Header */}
      <div
        className="px-6 pt-6 pb-4"
        style={{ borderBottom: '1px solid rgba(249,115,22,0.15)' }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: 'rgba(249,115,22,0.15)',
              border: '1px solid rgba(249,115,22,0.35)',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ color: '#f97316', fontSize: 18 }}
            >
              receipt_long
            </span>
          </div>
          <h2
            className="text-xl font-extrabold tracking-tight"
            style={{ color: '#ffffff' }}
          >
            Histórico de Compras
          </h2>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 flex-wrap">
          {FILTROS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFiltroAtivo(key)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
              style={{
                background:
                  filtroAtivo === key
                    ? 'rgba(249,115,22,0.2)'
                    : 'rgba(255,255,255,0.04)',
                border: `1px solid ${filtroAtivo === key ? 'rgba(249,115,22,0.5)' : 'rgba(255,255,255,0.1)'}`,
                color:
                  filtroAtivo === key ? '#f97316' : 'rgba(255,255,255,0.45)',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Busca */}
      <div className="px-6 py-4">
        <div
          className="flex items-center gap-3 rounded-2xl px-4 h-12"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(249,115,22,0.2)',
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ color: 'rgba(249,115,22,0.6)', fontSize: 18 }}
          >
            search
          </span>
          <input
            placeholder="Pesquisar por ID ou nº de cotação..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: '#ffffff' }}
          />
          {search && (
            <button onClick={() => setSearch('')}>
              <span
                className="material-symbols-outlined"
                style={{ color: 'rgba(255,255,255,0.3)', fontSize: 16 }}
              >
                close
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto px-2 pb-6">
        {isLoading ? (
          <div className="space-y-3 px-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-14 rounded-2xl animate-pulse"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              />
            ))}
          </div>
        ) : pedidosFiltrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span
              className="material-symbols-outlined text-5xl"
              style={{ color: 'rgba(249,115,22,0.25)' }}
            >
              inbox
            </span>
            <p
              className="text-sm font-medium"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Nenhum pedido encontrado
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-sm min-w-[620px]">
            <thead>
              <tr>
                {['ID', 'Cotação', 'Data', 'Itens', 'Total', 'Status', ''].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-xs font-bold uppercase tracking-widest"
                      style={{ color: 'rgba(255,255,255,0.25)' }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {pedidosFiltrados.map((pedido, i) => {
                  const cfg = STATUS_CONFIG[pedido.statusPedido];
                  const isSelected = selectedOrderId === pedido.pedidoCotacaoId;
                  const total = calcularTotalPedido(pedido.itens);

                  return (
                    <motion.tr
                      key={pedido.pedidoCotacaoId}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => onSelectOrder(pedido.pedidoCotacaoId)}
                      className="cursor-pointer transition-all"
                      style={{
                        background: isSelected
                          ? 'rgba(249,115,22,0.08)'
                          : 'transparent',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <td
                        className="px-4 py-3.5 font-bold"
                        style={{ color: '#f97316' }}
                      >
                        #{pedido.pedidoCotacaoId}
                      </td>
                      <td
                        className="px-4 py-3.5 text-xs font-mono"
                        style={{ color: 'rgba(255,255,255,0.35)' }}
                      >
                        {pedido.numero_cotacao.slice(0, 8)}…
                      </td>
                      <td
                        className="px-4 py-3.5 text-xs"
                        style={{ color: 'rgba(255,255,255,0.45)' }}
                      >
                        {formatarData(pedido.criado_em)}
                      </td>
                      <td
                        className="px-4 py-3.5 text-xs font-semibold"
                        style={{ color: 'rgba(255,255,255,0.55)' }}
                      >
                        {pedido.itens.length}{' '}
                        {pedido.itens.length === 1 ? 'item' : 'itens'}
                      </td>
                      <td
                        className="px-4 py-3.5 font-bold"
                        style={{ color: '#ffffff' }}
                      >
                        KZ {total.toLocaleString('pt-AO')}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold"
                          style={{
                            background: cfg.bg,
                            border: `1px solid ${cfg.border}`,
                            color: cfg.color,
                          }}
                        >
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: 12 }}
                          >
                            {cfg.icon}
                          </span>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <button
                          className="text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                          style={{
                            background: 'rgba(249,115,22,0.1)',
                            border: '1px solid rgba(249,115,22,0.3)',
                            color: '#f97316',
                          }}
                        >
                          Detalhes
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
}
