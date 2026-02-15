import { CheckoutFirstStap } from '@/components/chackoutSummary/CheckoutFirstStap';

export function CheckoutMain() {
  return (
    <main className="lg:col-span-2">
      <nav className="flex items-center gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex items-center gap-2 px-4 py-2 bg-step-active rounded-full border border-blue-100">
          <span className="flex items-center justify-center w-6 h-6 bg-#137fec] text-white rounded-full text-xs font-bold">
            1
          </span>
          <span className="text-#137fec] font-semibold text-sm whitespace-nowrap">
            Entrega
          </span>
        </div>
        <div className="h-px w-8 bg-border-gray"></div>
        <div className="flex items-center gap-2 px-4 py-2 bg-step-inactive rounded-full border border-transparent">
          <span className="flex items-center justify-center w-6 h-6 bg-gray-300 text-white rounded-full text-xs font-bold">
            2
          </span>
          <span className="text-gray-500 font-medium text-sm whitespace-nowrap">
            Pagamento
          </span>
        </div>
        <div className="h-px w-8 bg-border-gray"></div>
        <div className="flex items-center gap-2 px-4 py-2 bg-step-inactive rounded-full border border-transparent">
          <span className="flex items-center justify-center w-6 h-6 bg-gray-300 text-white rounded-full text-xs font-bold">
            3
          </span>
          <span className="text-gray-500 font-medium text-sm whitespace-nowrap">
            Confirmação
          </span>
        </div>
      </nav>
      <div className="mb-12">
        <div className="mb-8">
          <h1 className="text-slate-900 text-3xl font-extrabold leading-tight tracking-tight mb-2">
            Onde você quer receber seu gás?
          </h1>
          <p className="text-slate-500 text-base">
            Preencha o endereço para localizarmos o revendedor mais próximo.
          </p>
        </div>
        <div className="bg-white p-6 sm:p-10 rounded-xl border border-border-gray ounded-2xl shadow-xl border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <CheckoutFirstStap />
          </div>
        </div>
        <div className="opacity-50 grayscale-[0.5]">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border-gray"></div>
            <span className="text-slate-900 text-sm font-bold uppercase tracking-widest">
              Próxima Etapa
            </span>
            <div className="h-px flex-1 bg-border-gray"></div>
          </div>
          <div className="bg-slate-50 border border-dashed border-slate-300 p-8 rounded-xl flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2 text-blck">
              payments
            </span>
            <h2 className="font-bold text-lg text-black">Pagamento</h2>
            <p className="text-black text-sm">
              Disponível após confirmar o endereço
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
