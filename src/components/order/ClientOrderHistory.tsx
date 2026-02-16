import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { Order, OrderStatusType } from '@/types';

interface ClientOrderHistoryProps {
  orders: Order[];
  onSelectOrder: (orderId: string) => void;
}

export function ClientOrderHistory({
  orders,
  onSelectOrder,
}: ClientOrderHistoryProps) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | OrderStatusType>(
    'all'
  );

  const filteredOrders = useMemo(() => {
    const safeOrders = orders || [];
    return safeOrders.filter((order) => {
      const matchesSearch = order.id.includes(search);
      const matchesFilter =
        activeFilter === 'all' || order.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [orders, search, activeFilter]);

  const getStatusBadge = (status: OrderStatusType) => {
    switch (status) {
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 dark:bg-yellow-900/50 px-2 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-300">
            Processando
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 dark:bg-blue-900/50 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-300">
            A Caminho
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/50 px-2 py-1 text-xs font-medium text-green-800 dark:text-green-300">
            Entregue
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 dark:bg-red-900/50 px-2 py-1 text-xs font-medium text-red-800 dark:text-red-300">
            Cancelado
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800/50 px-2 py-1 text-xs font-medium text-gray-800 dark:text-gray-300">
            Pendente
          </span>
        );
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="flex-grow w-full lg:w-3/5 p-6">
        Nenhum pedido encontrado.
      </div>
    );
  }

  return (
    <div className="flex-grow w-full lg:w-3/5 bg-surface-light dark:bg-surface-dark rounded-xl border-border-light dark:border-border-dark p-4 shadow-xl dark:text-white focus:outline-0 focus:ring-1 border border-slate-200 dark:border-slate-700">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
        <h2 className="text-xl font-bold">Histórico de Compras</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setActiveFilter('all')}
            className="text-sm font-medium px-3 py-1.5 rounded-lg bg-[#137fec]/10 text-[#137fec]"
          >
            Todos
          </Button>
          <Button
            onClick={() => setActiveFilter('processing')}
            className="text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Processando
          </Button>
          <Button
            onClick={() => setActiveFilter('shipped')}
            className="text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Enviado
          </Button>
          <Button
            onClick={() => setActiveFilter('delivered')}
            className="text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Entregue
          </Button>
        </div>
      </div>

      <div className="py-3">
        <Label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full items-stretch rounded-lg h-full">
            <div className="text-text-muted-light dark:text-text-muted-dark flex items-center justify-center pl-4 rounded-l-lg bg-background-light dark:bg-background-dark border-r-0">
              <span className="material-symbols-outlined text-xl">search</span>
            </div>
            <Input
              placeholder="Pesquisar por ID do pedido..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex w-full rounded-lg px-4 dark:text-white focus:outline-0 focus:ring-1 border border-slate-200 dark:border-slate-700 bg-white focus:border-[#137fec] h-14 placeholder:text-slate-500/60 p-[15px] text-base font-normal leading-normal transition-all"
            />
          </div>
        </Label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase bg-background-light dark:bg-background-dark">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Produto</th>
              <th className="px-4 py-3">Valor</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="px-4 py-3 font-medium">#{order.id}</td>
                <td className="px-4 py-3">{order.createdAt}</td>
                <td className="px-4 py-3">Botijão P13</td>
                <td className="px-4 py-3">R$ {order.total.toFixed(2)}</td>
                <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                <td className="px-4 py-3 flex gap-2">
                  <Button
                    onClick={() => onSelectOrder(order.id)}
                    className="text-sm text-[#137fec] hover:underline"
                  >
                    Ver Detalhes
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
