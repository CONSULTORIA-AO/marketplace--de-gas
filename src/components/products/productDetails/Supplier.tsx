import { Button } from "@/components/ui/button";

export function SupplierInfo(){
    return(
        <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 border-border-soft sticky top-28 space-y-6 border-border-light dark:border-border-dark border border-slate-100 dark:border-slate-800 shadow-xl">
                <h3 className="text-xl font-extrabold text-text-primary">Sobre o Fornecedor</h3>
                <div className="flex items-center gap-4 py-4">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-2xl size-20 shadow-md ring-4 ring-background-main" data-alt="Vendor Logo" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWuWl2OrqcJYLe8Zo9YsNLtcCSHf84-yDyAqyy1p6v1LureRKTw7Mms_qhid148ziBl_5dRvaqO10x4wlSXLza-TssCRq97arjncCKPVWmazH2YefBN1_QlHhJ-OVQfZXLNoyCZBAoWaHiS1AWBNhcgbBwUvCXWkt9QBW7VLxBv5sD8ZvomcVakNV5wpYUwgrno3xXu2XltFESyQc4AML4PL4P4WwA0Q3QlLUsbBcWKOgMEfIq_1Ftpzis0l5m6m30P1_zHMsgr2A")'}}></div>
                    <div>
                        <h4 className="font-extrabold text-xl text-text-primary">Gás do Bairro</h4>
                        <p className="text-sm font-medium text-text-secondary">Parceiro desde Jun/2022</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-background-main rounded-xl text-center border border-border-soft">
                        <div className="flex items-center justify-center gap-1 text-secondary-action mb-1">
                            <span className="material-symbols-outlined fill text-base">star</span>
                                <span className="font-black">4.8</span>
                        </div>
                        <p className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">Avaliação</p>
                    </div>
                    <div className="p-4 bg-background-main rounded-xl text-center border border-border-soft">
                        <div className="flex items-center justify-center gap-1 text-primary mb-1">
                            <span className="font-black">+500</span>
                        </div>
                        <p className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">Vendas</p>
                    </div>
                </div>
                <Button 
                    className="flex w-full items-center justify-center rounded-xl h-12 px-4 bg-primary/5 text-primary font-bold hover:bg-primary/10 transition-colors border border-primary/20">
                    <span className="truncate">Ver Perfil Completo</span>
                </Button>
                <div className="flex items-center gap-2 justify-center text-xs text-text-secondary font-medium">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                            <span>Fornecedor Verificado</span> 
                </div>
            </div>
        </div>
    )
}