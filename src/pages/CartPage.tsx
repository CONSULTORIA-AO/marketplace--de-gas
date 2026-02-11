import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartstore';
import { useAuthStore } from '@/store/authStrore';
import { Header } from '@/components/Header';
import { ProductsTables } from '@/components/chackoutSummary/ProducsTable';
import { OrderSummary } from '@/components/chackoutSummary/OrderSummary';

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
/*
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
*/
  return (
    <div className="font-display">
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
    <div className="layout-container flex h-full grow flex-col">

    <Header />
    
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

              <ProductsTables />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">

              <OrderSummary />
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