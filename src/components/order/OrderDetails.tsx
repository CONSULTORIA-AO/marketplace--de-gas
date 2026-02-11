import { Button } from '@/components/ui/button';


export function OrderDetails(){
    return(
        <div className="flex-shrink-0 w-full lg:w-2/5">
            <div className="sticky top-24">
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-xl border-slate-100 dark:border-slate-800">
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
                                <div className="flex justify-between text-sm text-text-muted-light dark:text-text-muted-dark">
                                <span>Subtotal:</span><span>R$ 105,00</span>
                            </div>
                            <div 
                                 className="flex justify-between text-sm text-text-muted-light dark:text-text-muted-dark"><span>Taxa de Entrega:</span><span>R$ 5,00</span>
                            </div>
                            <div 
                                className="flex justify-between font-bold text-base text-text-light dark:text-text-dark mt-1"><span>Total:</span><span>R$ 110,00</span>
                            </div>
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
    )
}