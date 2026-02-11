import { useQuery } from '@tanstack/react-query';
import { Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/axios';

import type { Order, OrderStatus } from '@/types';
import { Header } from '@/components/Header';
import { ClientOrder } from '@/components/order/ClientOrder';
import { ClientOrderHistory } from "@/components/order/ClientOrderHistory";
import { OrderDetails } from '@/components/order/OrderDetails';

const statusConfig: Record<OrderStatus, { label: string; icon: any; color: string }> = {
  pending: { 
    label: 'Pendente', 
    icon: Clock, 
    color: 'text-yellow-600 bg-yellow-50' 
  },
  processing: { 
    label: 'Em Processamento', 
    icon: Package, 
    color: 'text-blue-600 bg-blue-50' 
  },
  shipped: { 
    label: 'Em Transporte', 
    icon: Truck, 
    color: 'text-purple-600 bg-purple-50' 
  },
  delivered: { 
    label: 'Entregue', 
    icon: CheckCircle, 
    color: 'text-green-600 bg-green-50' 
  },
  cancelled: { 
    label: 'Cancelado', 
    icon: XCircle, 
    color: 'text-red-600 bg-red-50' 
  },
};

export function OrdersPage() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await api.get<Order[]>('/orders');
      return response.data;
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (

    <div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="px-4 sm:px-6 lg:px-10 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-7xl flex-1">
            <div className="flex flex-wrap justify-between items-center gap-4 py-4">
              <div className="flex flex-col gap-1">
                <p className="text-text-light dark:text-text-dark text-3xl font-black leading-tight tracking-[-0.033em]">Meus Pedidos</p>
                <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal leading-normal">Acompanhe e gerencie seus pedidos de gás.</p>
              </div>
              <Button className="flex items-center justify-center gap-2 h-10 px-5 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors">
                <span className="material-symbols-outlined text-xl">add_circle</span>
                <span>Novo Pedido</span>
              </Button>
            </div>
            <ClientOrder/>
            <div className="flex flex-col lg:flex-row gap-6 mt-4">
              <ClientOrderHistory/>
              <OrderDetails/>
            </div>
          </div>
        </main>
      </div>
    </div>
    </div>
  );
}