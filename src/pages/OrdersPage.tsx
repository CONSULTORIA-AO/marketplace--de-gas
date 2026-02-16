import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import type { Order } from '@/types';
import { Header } from '@/components/Header';
import { ClientOrder } from '@/components/order/ClientOrder';
import { ClientOrderHistory } from '@/components/order/ClientOrderHistory';
import { OrderDetails } from '@/components/order/OrderDetails';
import { useState } from 'react';
import { mockOrders } from '@/data/prodct';

export function OrdersPage() {
  const navigate = useNavigate();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [orderss, setOrders] = useState<Order[]>([
    { id: '34562', createdAt: '03/08/2024', total: 110, status: 'shipped' },
    { id: '34561', createdAt: '02/08/2024', total: 110, status: 'processing' },
    { id: '33998', createdAt: '15/07/2024', total: 105, status: 'delivered' },
    { id: '33124', createdAt: '01/06/2024', total: 105, status: 'cancelled' },
  ]);

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await api.get<Order[]>('/orders');
      return response.data;
    },
  });

  // 🔹 Função para “pedir novamente”
  const handleReorder = (orderToRepeat: Order) => {
    const newOrder: Order = {
      ...orderToRepeat,
      id: uuidv4(), // gera novo id
      status: 'pending',
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };
    setOrders((prev) => [newOrder, ...prev]);
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
                  <p className="text-text-light dark:text-text-dark text-3xl font-black leading-tight tracking-[-0.033em]">
                    Meus Pedidos
                  </p>
                  <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal leading-normal">
                    Acompanhe e gerencie seus pedidos de gás.
                  </p>
                </div>
                <Button
                  onClick={() => navigate('/produtos')}
                  className="flex items-center justify-center gap-2 h-10 px-5 bg-[#137fec] text-white rounded-lg text-sm font-bold shadow-sm hover:bg-[#137fec]/90 transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    add_circle
                  </span>
                  <span>Novo Pedido</span>
                </Button>
              </div>
              <ClientOrder />
              <div className="flex flex-col lg:flex-row gap-6 mt-4">
                <ClientOrderHistory
                  orders={mockOrders}
                  onSelectOrder={(id) => setSelectedOrderId(id)}
                />
                {selectedOrderId && (
                  <OrderDetails
                    orderId={selectedOrderId}
                    onReorder={handleReorder}
                  />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
