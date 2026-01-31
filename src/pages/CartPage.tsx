import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/store/cartstore';
import { useAuthStore } from '@/store/authStrore';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/input';

export function CartPage() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto text-center">
            <CardHeader>
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <CardTitle>Seu carrinho está vazio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Adicione produtos ao seu carrinho para continuar comprando.
              </p>
              <Link to="/">
                <Button size="lg">Ver Produtos</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="font-display">
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
    <div className="layout-container flex h-full grow flex-col">
    <header className="flex w-full items-center justify-center border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-background-dark/50 sticky top-0 z-10 backdrop-blur-sm">
    <div className="flex w-full max-w-7xl items-center justify-between whitespace-nowrap px-4 py-3">
    <div className="flex items-center gap-8">
    <div className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
    <span className="material-symbols-outlined text-primary text-3xl"> local_fire_department </span>
    <h2 className="text-xl font-bold tracking-tight">GásMarket</h2>
    </div>
    <div className="hidden md:flex items-center gap-8">
    <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary" to="/">Home</Link>
    <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary" to="#">Produtos</Link>
    <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary" to="#">Minha Conta</Link>
    <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary" to="#">Ajuda</Link>
    </div>
    </div>
    <div className="flex items-center justify-end gap-4">
    <Button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
    <span className="material-symbols-outlined"> shopping_cart </span>
    </Button>
    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="User profile picture" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6zgagMLAWTf-k00ooja9azi0JI8WTd8w-CbZALUR0XRcEju4HoVbLWkIaa_sdCxaRoRCZtiW_8C7xygq1Bt0c9d4bHL1ZL8G_uaKgVL3cccHayjpU5PFDUirhAAM7rMl453lbtNUjYtdHa9bAtpBigdLTWQN5_XIMyTx9rN2h0MN9fYo1QG2wo26IiVqP1X_eSIeq459_ehEI_Kvtv-UHFYWcMdDdJErbw9A0F-kaJez4AFL-jIvnXSWuDaWfE_tu9P0Dg5e9Ph4');"}}></div>
    </div>
    </div>
    </header>
    <main className="flex w-full flex-1 justify-center px-4 py-8 md:py-12">
    <div className="flex w-full max-w-7xl flex-col gap-8">
    <div className="flex flex-wrap justify-between gap-3">
    <div className="flex min-w-72 flex-col gap-2">
    <p className="text-slate-900 dark:text-slate-50 text-4xl font-black leading-tight tracking-[-0.033em]">Meu Carrinho</p>
    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Revise seus itens antes de finalizar Link compra.</p>
    </div>
    </div>
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
    <div className="lg:col-span-2">
    <div className="flex flex-col gap-4">
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
    <div className="overflow-x-auto">
    <table className="w-full text-left">
    <thead className="bg-slate-50 dark:bg-slate-800/50">
    <tr>
    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400" scope="col">Produto</th>
    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400" scope="col">Preço</th>
    <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400" scope="col">Quantidade</th>
    <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400" scope="col">Subtotal</th>
    <th className="relative px-6 py-3" scope="col"><span className="sr-only">Remover</span></th>
    </tr>
    </thead>
    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
    <tr>
    <td className="whitespace-nowrap px-6 py-4">
    <div className="flex items-center gap-4">
    <div className="h-16 w-16 flex-shrink-0">
    <img className="h-16 w-16 rounded-lg object-cover" data-alt="Blue gas canister" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVUnN3P8v-5o2Mq2iCdX72p5UV14w1EStcDhilQHQg9q-14dPhNF3WsY8zMBB5hWu0Ls63kg1bYfXGtzTXfXgdc6M7obnJCaU5ff474LfpnQtjjyFWlQdPZNyDGZgqbjrjib8pp81qXyyLSylEl1NmfXdYLbrhlm3COWo_6fvfhvuXxDo16oPUdfwDb-tvh1m1WF6ZVvAeCn4DYYqpAWYxzAjsOFqsTBbC9lrDy3KttBFXOLpyUM8DRDl-FQ7Bz2ofQAIJCKsUuOU"/>
    </div>
    <div className="font-medium text-slate-900 dark:text-slate-50">Botijão de Gás P13 - Ultragaz</div>
    </div>
    </td>
    <td className="whitespace-nowrap px-6 py-4 text-slate-600 dark:text-slate-300">R$ 110,00</td>
    <td className="whitespace-nowrap px-6 py-4">
    <div className="flex items-center justify-center gap-2">
    <Button className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">-</Button>
    <Input className="w-12 rounded-lg border-slate-300 bg-transparent text-center text-slate-900 dark:border-slate-700 dark:text-slate-50" type="text" value="1"/>
    <Button className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">+</Button>
    </div>
    </td>
    <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-slate-900 dark:text-slate-50">R$ 110,00</td>
    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
    <Button className="group flex items-center gap-1 px-2 py-1 text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400">
    <span className="material-symbols-outlined text-base">delete</span>
    </Button>
    </td>
    </tr>
    <tr>
    <td className="whitespace-nowrap px-6 py-4">
    <div className="flex items-center gap-4">
    <div className="h-16 w-16 flex-shrink-0">
    <img className="h-16 w-16 rounded-lg object-cover" data-alt="White industrial gas cylinder" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyGiNuNx0L6wS5LtsfURaDg1QzXd0VJYY34pHUuObnr7zkxMy-rwaM3bZpCvD-Qsi9hbYvsTodJZI-rXuBnyYJAYwHliR1ElQ9gBdh2zQ66kyYyjI7Eu6lGrgFyUEyrYin1lfThEzA2izXZfxJ-XSFcuCkPnjumCUFkSEN4kEJ6V4FHGmKFrsxm19E1WGv6EO1USKp8qoQ_2H-vowRCaHBD3tvslH2rcEeznX4zZFD6yk6qfVqyRSVkS6bi_JDS3owM8jE1iHNhL8"/>
    </div>
    <div className="font-medium text-slate-900 dark:text-slate-50">Botijão de Gás P45 - Consigaz</div>
    </div>
    </td>
    <td className="whitespace-nowrap px-6 py-4 text-slate-600 dark:text-slate-300">R$ 450,00</td>
    <td className="whitespace-nowrap px-6 py-4">
    <div className="flex items-center justify-center gap-2">
    <Button className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">-</Button>
    <Input className="w-12 rounded-lg border-slate-300 bg-transparent text-center text-slate-900 dark:border-slate-700 dark:text-slate-50" type="text" value="1"/>
    <Button className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">+</Button>
    </div>
    </td>
    <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-slate-900 dark:text-slate-50">R$ 450,00</td>
    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
    <Button className="group flex items-center gap-1 px-2 py-1 text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400">
    <span className="material-symbols-outlined text-base">delete</span>
    </Button>
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    </div>
    </div>
    </div>
    <div className="lg:col-span-1">
    <div className="sticky top-24">
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Resumo do Pedido</h3>
    <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
    <div className="flex justify-between">
    <p className="text-slate-500 dark:text-slate-400">Subtotal</p>
    <p className="font-medium text-slate-800 dark:text-slate-200">R$ 560,00</p>
    </div>
    <div className="flex justify-between">
    <p className="text-slate-500 dark:text-slate-400">Taxa de Entrega</p>
    <p className="font-medium text-slate-800 dark:text-slate-200">R$ 15,00</p>
    </div>
    </div>
    <div className="flex justify-between">
    <p className="text-lg font-bold text-slate-900 dark:text-slate-50">Total</p>
    <p className="text-lg font-bold text-slate-900 dark:text-slate-50">R$ 575,00</p>
    </div>
    <div className="flex flex-col items-stretch gap-3 pt-2">
    <Button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-wide hover:bg-primary/90">
    <span className="truncate">Finalizar Compra</span>
    </Button>
    <Button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 text-primary text-base font-bold leading-normal tracking-wide hover:bg-primary/10">
    <span className="truncate">Continuar Comprando</span>
    </Button>
    </div>
    <div className="flex items-center justify-center gap-2 pt-2">
    <span className="material-symbols-outlined text-green-600 text-base">lock</span>
    <p className="text-xs text-slate-500 dark:text-slate-400">Compra 100% segura.</p>
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