import { Button } from '../ui/button';

export function CheckoutConfirmStep() {
  return (
    <div className="bg-white p-6 sm:p-10 rounded-xl border border-border-gray shadow-xl border-slate-100 dark:border-slate-800 text-center">
      <span className="material-symbols-outlined text-6xl text-green-500 mb-4">
        check_circle
      </span>
      <h2 className="text-slate-900 text-2xl font-bold mb-2">
        Compra Confirmada!
      </h2>
      <p className="text-slate-500 text-base mb-6">
        Seu pedido foi concluído com sucesso. Em breve, você receberá a
        confirmação de entrega.
      </p>

      <Button
        type="button"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
      >
        Voltar para a loja
      </Button>
    </div>
  );
}
