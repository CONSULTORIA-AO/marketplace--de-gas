import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { mockOrders, mockProducts } from '@/data/prodct';
import { useCartStore } from '@/store/cartstore';
import { useToast } from '@/hooks/use-toast';
import { Order } from '@/types';

interface OrderDetailsProps {
  orderId: string;
  onReorder: (order: Order) => void;
}

export function OrderDetails({ orderId, onReorder }: OrderDetailsProps) {
  const { toast } = useToast();
  const addItem = useCartStore((state) => state.addItem);

  //Encontrar o pedido
  const order = useMemo(
    () => mockOrders.find((o) => o.id === orderId),
    [orderId]
  );
  const product = useMemo(() => {
    if (!order) return null;
    return mockProducts.find((p) => p.price === order.total);
  }, [order]);

  if (!order || !product)
    return <div className="p-6">Pedido não encontrado.</div>;

  const deliveryFee = 5;
  const subtotal = product.price;
  const total = subtotal + deliveryFee;

  const handleHelp = () =>
    toast({
      variant: 'destructive',
      title: 'Pedido de suporte',
      description: 'Nossa equipe foi notificada. Entraremos em contato!',
    });

  const handleReorder = () => {
    addItem(product, 1);
    toast({ 
      variant: 'destructive',
      title: 'Pedido',
      description: 'Produto adicionado ao carrinho!' 
    });

    onReorder({
      id: order.id,
      total: order.total,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      status: 'pending',
    });
  };

  const getStatusLabel = () => {
    switch (order.status) {
      case 'pending':
        return 'Pendente';
      case 'processing':
        return 'Processando';
      case 'shipped':
        return 'A Caminho';
      case 'delivered':
        return 'Entregue';
      case 'cancelled':
        return 'Cancelado';
    }
  };

  return (
    <div className="flex-shrink-0 w-full lg:w-2/5">
      <div className="sticky top-24 bg-surface-light dark:bg-surface-dark rounded-xl border-border-light dark:border-border-dark shadow-xl dark:text-white focus:outline-0 focus:ring-1 border border-slate-200 dark:border-slate-700">
        <div className="p-4 border-border-light dark:border-border-dark">
          <h3 className="text-lg font-bold">Detalhes do Pedido #{order.id}</h3>
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
            Status:{' '}
            <span className="text-blue-600 dark:text-blue-300 font-semibold">
              {getStatusLabel()}
            </span>
          </p>
        </div>

        <div className="p-4">
          <div className="h-64 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={product.imageUrl}
            />
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <h4 className="font-semibold text-sm">Endereço de Entrega</h4>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                Rua das Flores, 123, Bairro Jardim, São Paulo - SP
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm">Itens</h4>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                1x {product.name}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm">Resumo Financeiro</h4>
              <div className="flex justify-between text-sm text-text-muted-light dark:text-text-muted-dark">
                <span>Subtotal:</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-text-muted-light dark:text-text-muted-dark">
                <span>Taxa de Entrega:</span>
                <span>R$ {deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-text-light dark:text-text-dark mt-1">
                <span>Total:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleHelp}
              className="flex-1 flex justify-center bg-[#137fec]/10 text-[#137fec] rounded-lg h-10 font-bold hover:bg-[#137fec]/20 transition-colors"
            >
              Ajuda com o Pedido
            </Button>
            <Button
              onClick={handleReorder}
              className="flex-1 flex justify-center gap-2 h-10 px-4 bg-[#137fec] text-white rounded-lg font-bold shadow-sm hover:bg-[#137fec]/90 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">replay</span>
              Pedir Novamente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
