import type { OrderStatus } from '@/types';
import { mockOrders } from '@/data/prodct';

export function ClientOrder() {
  const pedidosEmAndamento = mockOrders.filter(
    (order) =>
      order.status === 'pending' ||
      order.status === 'processing' ||
      order.status === 'shipped'
  ).length;

  const totalPedidos = mockOrders.length;

  const pedidosEntregues = mockOrders.filter(
    (order) => order.status === 'delivered'
  ).length;

  const pedidosCancelados = mockOrders.filter(
    (order) => order.status === 'cancelled'
  ).length;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
      <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-xl border-slate-100 dark:border-slate-800">
        <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal">
          Pedidos em Andamento
        </p>
        <p className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold leading-tight">
          {pedidosEmAndamento}
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-xl border-slate-100 dark:border-slate-800">
        <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal">
          Total de Pedidos
        </p>
        <p className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold leading-tight">
          {totalPedidos}
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-xl border-slate-100 dark:border-slate-800">
        <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal">
          Pedidos Entregues
        </p>
        <p className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold leading-tight">
          {pedidosEntregues}
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-xl border-slate-100 dark:border-slate-800">
        <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal">
          Cancelados
        </p>
        <p className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold leading-tight">
          {pedidosCancelados}
        </p>
      </div>
    </div>
  );
}
