import { useQuery } from '@tanstack/react-query';
import { Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { api } from '@/lib/axios';
import { Header } from '@/components/layout/Header';
import type { Order, OrderStatus } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
   
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark px-6 md:px-10 py-3 bg-surface-light dark:bg-surface-dark sticky top-0 z-50">
    <div className="flex items-center gap-4 text-text-light dark:text-text-dark">
    <div className="size-6 text-primary">
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2v-2zm0 4h2v6h-2v-6z"></path>
    </svg>
    </div>
    <h2 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em]">Gás Rápido</h2>
    </div>
    <nav className="hidden lg:flex flex-1 justify-center gap-8">
    <Link className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary" to="#">Dashboard</Link>
    <Link className="text-primary dark:text-primary text-sm font-bold leading-normal" to="#">Meus Pedidos</Link>
    <Link className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary" to="#">Novo Pedido</Link>
    <Link className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary" to="#">Minha Conta</Link>
    </nav>
    <div className="flex items-center gap-2">
    <Button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-background-light dark:bg-background-dark text-text-muted-light dark:text-text-muted-dark hover:bg-primary/10 hover:text-primary">
    <span className="material-symbols-outlined text-xl">notifications</span>
    </Button>
    <Button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-background-light dark:bg-background-dark text-text-muted-light dark:text-text-muted-dark hover:bg-primary/10 hover:text-primary">
    <span className="material-symbols-outlined text-xl">help</span>
    </Button>
    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="Avatar de usuário" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBcmK2u45Hm1jxO35YsrdFmpuoo4mir5_5xhKzAKT4Iw7We8jWTIeXXQDxiXUIWzG2n1IMeh_wBykPrAm8TBW28H3IaNaA81c10eVxeiaTaXNLSWPs9hWjJF6bFcCPM_p0xne7nY0jkJPRvHITifpcu6jWQVHZnbm2MFOIboa08DkgcwfY3uHt4JswZjOHHhiLeq8m37wPbL9rol2X4hzFK93DoPXIZ5EYGok9vofZXpzAcmsXnYZMqnwwIJrwX3Gh6UdSu1lszbZk");'}}></div>
    </div>
    </header>
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
   
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
    <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
    <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal">Pedidos em Andamento</p>
    <p className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold leading-tight">2</p>
    </div>
    <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
    <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal">Total de Pedidos</p>
    <p className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold leading-tight">15</p>
    </div>
    <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
    <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal">Pedidos Entregues</p>
    <p className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold leading-tight">12</p>
    </div>
    <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
    <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal">Cancelados</p>
    <p className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold leading-tight">1</p>
    </div>
    </div>
    <div className="flex flex-col lg:flex-row gap-6 mt-4">
    
    <div className="flex-grow w-full lg:w-3/5">
   
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-4">
    <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
    <h2 className="text-text-light dark:text-text-dark text-xl font-bold leading-tight tracking-[-0.015em]">Histórico de Compras</h2>
    <div className="flex gap-2">
    <Button className="text-sm font-medium px-3 py-1.5 rounded-lg bg-primary/10 text-primary">Todos</Button>
    <Button className="text-sm font-medium px-3 py-1.5 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:bg-gray-100 dark:hover:bg-gray-700">Processando</Button>
    <Button className="text-sm font-medium px-3 py-1.5 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:bg-gray-100 dark:hover:bg-gray-700">Enviado</Button>
    <Button className="text-sm font-medium px-3 py-1.5 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:bg-gray-100 dark:hover:bg-gray-700">Entregue</Button>
    </div>
    </div>
    <div className="py-3">
    <Label className="flex flex-col min-w-40 h-12 w-full">
    <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
    <div className="text-text-muted-light dark:text-text-muted-dark flex border-none bg-background-light dark:bg-background-dark items-center justify-center pl-4 rounded-l-lg border-r-0">
    <span className="material-symbols-outlined text-xl">search</span>
    </div>
    <Input 
      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-background-light dark:bg-background-dark h-full placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark px-4 pl-2 text-base font-normal leading-normal" placeholder="Pesquisar por ID do pedido..." value=""/>
    </div>
    </Label>
    </div>
   
    <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">
    <thead className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase bg-background-light dark:bg-background-dark">
    <tr>
    <th className="px-4 py-3" scope="col">ID do Pedido</th>
    <th className="px-4 py-3" scope="col">Data</th>
    <th className="px-4 py-3" scope="col">Produto</th>
    <th className="px-4 py-3" scope="col">Valor</th>
    <th className="px-4 py-3" scope="col">Status</th>
    <th className="px-4 py-3" scope="col">Ações</th>
    </tr>
    </thead>
    <tbody>
    <tr className="border-b border-border-light dark:border-border-dark bg-primary/5 dark:bg-primary/10">
    <td className="px-4 py-3 font-bold text-primary">#34562</td>
    <td className="px-4 py-3">03/08/2024</td>
    <td className="px-4 py-3">Botijão P13</td>
    <td className="px-4 py-3">R$ 110,00</td>
    <td className="px-4 py-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 dark:bg-blue-900/50 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-300">A Caminho</span></td>
    <td className="px-4 py-3 flex gap-2"><Button className="text-sm font-medium text-primary hover:underline">Ver Detalhes</Button><Button className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:underline">Pedir Novamente</Button></td>
    </tr>
    <tr className="border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800/50">
    <td className="px-4 py-3 font-medium">#34561</td>
    <td className="px-4 py-3">02/08/2024</td>
    <td className="px-4 py-3">Botijão P13</td>
    <td className="px-4 py-3">R$ 110,00</td>
    <td className="px-4 py-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 dark:bg-yellow-900/50 px-2 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-300">Processando</span></td>
    <td className="px-4 py-3 flex gap-2"><Button className="text-sm font-medium text-primary hover:underline">Ver Detalhes</Button><Button className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:underline">Pedir Novamente</Button></td>
    </tr>
    <tr className="border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800/50">
    <td className="px-4 py-3 font-medium">#33998</td>
    <td className="px-4 py-3">15/07/2024</td>
    <td className="px-4 py-3">Botijão P13</td>
    <td className="px-4 py-3">R$ 105,00</td>
    <td className="px-4 py-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/50 px-2 py-1 text-xs font-medium text-green-800 dark:text-green-300">Entregue</span></td>
    <td className="px-4 py-3 flex gap-2"><Button className="text-sm font-medium text-primary hover:underline">Ver Detalhes</Button><Button className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:underline">Pedir Novamente</Button></td>
    </tr>
    <tr className="border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800/50">
    <td className="px-4 py-3 font-medium">#33124</td>
    <td className="px-4 py-3">01/06/2024</td>
    <td className="px-4 py-3">Botijão P13</td>
    <td className="px-4 py-3">R$ 105,00</td>
    <td className="px-4 py-3"><span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 dark:bg-red-900/50 px-2 py-1 text-xs font-medium text-red-800 dark:text-red-300">Cancelado</span></td>
    <td className="px-4 py-3 flex gap-2">
      <Button className="text-sm font-medium text-primary hover:underline">Ver Detalhes</Button>
    <Button className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:underline">Pedir Novamente</Button></td>
    </tr>
    </tbody>
    </table>
    </div>
    </div>
    </div>
   
    <div className="flex-shrink-0 w-full lg:w-2/5">
    <div className="sticky top-24">
    <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark">
    <div className="p-4 border-b border-border-light dark:border-border-dark">
    <h3 className="text-lg font-bold">Detalhes do Pedido #34562</h3>
    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Status: <span className="text-blue-600 dark:text-blue-300 font-semibold">A Caminho</span></p>
    </div>
    <div className="p-4">
    <div className="h-64 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden">
    <img className="w-full h-full object-cover" data-alt="Mapa mostrando rota de entrega" data-location="São Paulo, Brazil" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG_7EeAVtj0kdLCceEaFKuHbMeMlhKpdVsYyfKYwooJihVxTAKeQoo-abz-lM0ab7pxGzTV1LvACrvS87v6QDngGWIK3wMMLweXvtuYXdCtra1Vf2Y-j-CBdhaBLjj3ozLhhEWaoAjMUfIYuuRWVneQuEU9WZI1MVed9oR7pET_R8nXVsEIIe6EfFxuftmVDvWz_UmaNj1JXb4QYJStCmZtgd3ulfdjAm1x3XKNeAHLY1zGL7cYUNL02LD4P7-sV1NA_XuyccxJ2Y"/>
    </div>
    <div className="mt-4 flex items-center gap-4">
    <img className="w-12 h-12 rounded-full object-cover" data-alt="Foto do entregador" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF43OT0iIQEvNvnmVxQamnaejCMj2aeF5n9UcstkBQAUiX0VRRkhUFolmZGQ6JRzMSNdbYK89oKgnF1O3hUDjkwl1Abib-d49JwJYwr5klqRKSMFEjx3BUHdVZPA6hXwF8awfYuMWaCnQcvosqVrE8-caN7hkFW3wzVs2ZpKDcb6zTwH05BbPhfclSUfoI-HV-dhssv7sSDmM_S9Qqf0gTYeGPoRZ2nMg78fuc8bEUMSuGspFU1KlPlk6OdmllVlJgtBSmMFPC-WE"/>
    <div>
    <p className="font-semibold">Carlos Silva</p>
    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Entregador</p>
    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Previsão: 10-15 min</p>
    </div>
    </div>
    <div className="mt-4 space-y-3">
    <div>
    <h4 className="font-semibold text-sm">Endereço de Entrega</h4>
    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Rua das Flores, 123, Bairro Jardim, São Paulo - SP</p>
    </div>
    <div>
    <h4 className="font-semibold text-sm">Itens</h4>
    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">1x Botijão de Gás P13</p>
    </div>
    <div>
    <h4 className="font-semibold text-sm">Resumo Financeiro</h4>
    <div className="flex justify-between text-sm text-text-muted-light dark:text-text-muted-dark"><span>Subtotal:</span><span>R$ 105,00</span></div>
    <div className="flex justify-between text-sm text-text-muted-light dark:text-text-muted-dark"><span>Taxa de Entrega:</span><span>R$ 5,00</span></div>
    <div className="flex justify-between font-bold text-base text-text-light dark:text-text-dark mt-1"><span>Total:</span><span>R$ 110,00</span></div>
    </div>
    </div>
    <div className="mt-6 flex flex-col sm:flex-row gap-2">
    <Button className="flex-1 flex items-center justify-center gap-2 h-10 px-4 bg-primary/10 text-primary rounded-lg text-sm font-bold hover:bg-primary/20 transition-colors">
    <span>Ajuda com o Pedido</span>
    </Button>
    <Button className="flex-1 flex items-center justify-center gap-2 h-10 px-4 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors">
    <span className="material-symbols-outlined text-xl">replay</span>
    <span>Pedir Novamente</span>
    </Button>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </main>
    </div>
    </div>
    </div>
  );
}