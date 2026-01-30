import { useQuery } from '@tanstack/react-query';
import { Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/axios';
import { Header } from '@/components/layout/Header';
import type { Order, OrderStatus } from '@/types';

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Meus Pedidos</h1>
          <Link to="/">
            <Button>Continuar Comprando</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-1/3" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon;
              
              return (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg">
                          Pedido #{order.id.slice(0, 8).toUpperCase()}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          Realizado em {formatDate(order.createdAt)}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[order.status].color}`}>
                          <StatusIcon className="w-4 h-4" />
                          {statusConfig[order.status].label}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Produtos */}
                      <div>
                        <h4 className="font-medium mb-2">Produtos:</h4>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.productId} className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                <img
                                  src={item.product.imageUrl}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-sm text-gray-600">
                                  Quantidade: {item.quantity} x R$ {item.price.toFixed(2)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  R$ {(item.quantity * item.price).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Endereço de Entrega */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Endereço de Entrega:</h4>
                        <p className="text-sm text-gray-700">
                          {order.address.street}, {order.address.number}
                          {order.address.complement && ` - ${order.address.complement}`}
                        </p>
                        <p className="text-sm text-gray-700">
                          {order.address.neighborhood} - {order.address.city}/{order.address.state}
                        </p>
                        <p className="text-sm text-gray-700">CEP: {order.address.zipCode}</p>
                      </div>

                      {/* Total */}
                      <div className="border-t pt-4 flex justify-between items-center">
                        <span className="font-semibold">Total do Pedido:</span>
                        <span className="text-2xl font-bold text-primary">
                          R$ {order.total.toFixed(2)}
                        </span>
                      </div>

                      {/* Ações */}
                      {order.status === 'delivered' && (
                        <div className="flex gap-2">
                          <Link to={`/avaliar-pedido/${order.id}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              Avaliar Pedido
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum pedido encontrado</h3>
              <p className="text-gray-600 mb-6">
                Você ainda não realizou nenhum pedido.
              </p>
              <Link to="/">
                <Button>Ver Produtos</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}