export function ClientOrder(){
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-xl border-slate-100 dark:border-slate-800">
                <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal">Pedidos em Andamento</p>
                <p className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold leading-tight">2</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-xl border-slate-100 dark:border-slate-800">
                <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal">Total de Pedidos</p>
                <p className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold leading-tight">15</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-xl border-slate-100 dark:border-slate-800">
                <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal">Pedidos Entregues</p>
                <p className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold leading-tight">12</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-xl border-slate-100 dark:border-slate-800">
                <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium leading-normal">Cancelados</p>
                <p className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold leading-tight">1</p>
            </div>
        </div>
    )
}