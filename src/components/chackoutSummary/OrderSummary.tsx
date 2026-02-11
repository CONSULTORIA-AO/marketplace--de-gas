import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from "@/store/cartstore";

export function OrderSummary(){
    const navigate = useNavigate();
    const { getTotal } = useCartStore();

    const subtotal = getTotal();
    const deliveryFee = 15;
    const total = subtotal + deliveryFee;
    
    return(
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Resumo do Pedido</h3>
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
                <div className="flex justify-between">
                    <p className="text-slate-500 dark:text-slate-400">Subtotal</p>
                    <p className="font-medium text-slate-800 dark:text-slate-200">Kz {subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-slate-500 dark:text-slate-400">Taxa de Entrega</p>
                    <p className="font-medium text-slate-800 dark:text-slate-200">Kz {deliveryFee.toFixed(2)}</p>
                </div>
            </div>
            <div className="flex justify-between">
                <p className="text-lg font-bold text-slate-900 dark:text-slate-50">Total</p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-50">Kz {total.toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-stretch gap-3 pt-2">
                <Button
                    onClick={() => navigate("/checkout")} 
                    className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-orange-500 text-white text-base font-bold leading-normal tracking-wide hover:bg-orange-500/90">
                   <span className="truncate">Finalizar Compra</span>
                </Button>
                <Button
                    onClick={() => navigate("/produtos")}
                    className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 text-white text-base font-bold bg-[#137fec] leading-normal tracking-wide hover:bg-[#137fec]/90">
                    <span className="truncate">Continuar Comprando</span>
                </Button>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
                <span className="material-symbols-outlined text-green-600 text-base">lock</span>
                <p className="text-xs text-slate-500 dark:text-slate-400">Compra 100% segura.</p>
            </div>
        </div>
    )
}