import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AsideProps {
  step: number;
  cartItems: {
    productId: string;
    quantity: number;
    product: { price: number; name: string; image?: string };
  }[];
}

export function Aside({ step, cartItems }: AsideProps) {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );
  const deliveryFee = 15;
  const total = subtotal + deliveryFee;

  return (
    <aside className="lg:col-span-1 mt-12 lg:mt-0">
      <div className="sticky top-8">
        <div className="bg-white p-6 rounded-xl border border-border-gray shadow-xl border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#137fec]">
              shopping_basket
            </span>
            Resumo do Pedido
          </h2>

          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 pb-6 border-b border-slate-100"
            >
              <div className="w-16 h-16 flex-shrink-0 bg-accent-pastel rounded-lg p-2 flex items-center justify-center">
                {item.product.image ? (
                  <img
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                    src={item.product.image}
                  />
                ) : (
                  <span className="text-xs font-bold text-slate-700">
                    Imagem
                  </span>
                )}
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800 text-sm">
                  {item.product.name}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  Quantidade: {item.quantity}
                </p>
              </div>
              <p className="font-bold text-slate-900 text-sm whitespace-nowrap">
                KZ {(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="py-6 space-y-4 border-b border-slate-100">
            <div className="flex justify-between text-sm">
              <p className="text-slate-500">Subtotal</p>
              <p className="font-semibold text-slate-800">
                KZ {subtotal.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-slate-500">Taxa de entrega</p>
              <p className="font-semibold text-green-600">
                KZ {deliveryFee.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 mb-8">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                Total
              </p>
              <p className="text-3xl font-black text-[#137fec]">
                KZ {total.toFixed(2)}
              </p>
            </div>
          </div>

          <Button
            className="w-full bg-[#137fec] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#00427c] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#137fec]/20"
            onClick={() => alert('Continuar para pagamento')} // Aqui você pode chamar onNext ou navegar
          >
            Continuar para Pagamento
            <span className="material-symbols-outlined text-xl">
              arrow_forward
            </span>
          </Button>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
              <span className="material-symbols-outlined text-sm">
                verified_user
              </span>
              <span>Checkout 100% Seguro</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 py-2 rounded-lg">
              <span className="material-symbols-outlined text-sm">
                schedule
              </span>
              <span>Entrega em até 45 minutos</span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 text-center">
          <p className="text-xs text-slate-400">
            Precisa de ajuda com seu pedido?
          </p>
          <Link
            className="text-xs font-bold text-[#137fec] hover:underline"
            to="#"
          >
            Fale com nosso suporte
          </Link>
        </div>
      </div>
    </aside>
  );
}
