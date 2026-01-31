import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function AddressesPage() {
    return (                 
        <main 
            className="font-display bg-background-light dark:bg-background-dark text-text-light-primary dark:text-dark-primary">
            <div className="relative flex min-h-screen w-full flex-col">
                <header 
                    className="sticky top-0 z-10 w-full bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
                    <div className="container mx-auto px-4">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span   className="material-symbols-outlined text-primary text-3xl">local_fire_department</span>
                                <h2 className="text-lg font-bold">GásMarket</h2>
                            </div>
                            <nav className="hidden md:flex items-center gap-8">
                                <Link className="text-sm font-medium hover:text-primary" to="#">Início</Link>
                                <Link className="text-sm font-medium hover:text-primary" to="#">Meus Pedidos</Link>
                                <Link className="text-sm font-medium hover:text-primary" to="#">Ajuda</Link>
                            </nav>
                            <div className="flex items-center gap-3">
                                <Button className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-background-light dark:bg-background-dark hover:bg-primary/10">
                                    <span className="material-symbols-outlined text-xl">notifications</span>
                                </Button>
                                <Button className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-background-light dark:bg-background-dark hover:bg-primary/10">
                                    <span className="material-symbols-outlined text-xl">shopping_cart</span>
                                </Button>
                                <div className="h-10 w-10 rounded-full bg-cover bg-center" data-alt="User avatar image" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD78IyG3TWwE0E9fVhYmZ6dm4tnhwkcIPwGZ_WMZIBxvxAhTEwlyg6P-WOfYDI9SXw0OISUHJWaPqwnaAxPD_uxNTRdTVioTg5UnRUrxBkNXBYhJqnaEyMIqjTXE2Cp-GCERCtdvDA0jokvH58avWmX7wxtEfDG7ZwwErnRzD1HsV7E9vaEh3mKxzt70ooOaNaq-1AMGhuWudEWZHWV3_i4y7qrIp0_zyul_GosSIl1wpwT2YHvq4SCJR9PNuW2TxKgG5Zefvfm6Pw")'}}>
                            </div>
                        </div>
                    </div>
                 </div>
            </header>
            <div className="flex-grow container mx-auto px-4 py-8">
                <div className="mx-auto max-w-4xl">

                <div className="flex flex-wrap gap-2 mb-6">
                    <Link 
                        className="text-sm font-medium text-text-light-secondary dark:text-dark-secondary hover:text-primary" to="#">Painel
                    </Link>
                    <span 
                        className="text-sm font-medium text-text-light-secondary dark:text-dark-secondary">/</span>
                    <span className="text-sm font-medium text-text-light-primary dark:text-dark-primary">Meus Endereços</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-black tracking-tight">Meus Endereços</h1>
                        <p className="text-base font-normal text-text-light-secondary dark:text-dark-secondary">Gerencie seus endereços para entrega.</p>
                    </div>
                    <Button 
                        className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary/90">
                        <span className="material-symbols-outlined text-xl">add</span>
                        <span className="truncate">Adicionar Novo Endereço</span>
                    </Button>
                </div>

            <div className="flex flex-col gap-4">

            <div 
                className="flex flex-col sm:flex-row items-stretch justify-between gap-4 rounded-xl bg-card-light dark:bg-card-dark p-4 md:p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                    <div 
                        className="flex flex-[2_2_0px] flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <div 
                                className="flex items-center gap-2">
                                <h3 className="text-base font-bold">Rua das Flores, 123</h3>
                                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">Padrão</span>
                            </div>
                        <p className="text-sm font-normal text-text-light-secondary dark:text-dark-secondary">Centro, São Paulo - SP</p>
                        <p className="text-sm font-normal text-text-light-secondary dark:text-dark-secondary">CEP: 01001-000</p>
                    </div>
                    <div className="flex items-center gap-2">
                    <Button 
                        className="flex h-9 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-lg bg-background-light dark:bg-background-dark px-3 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700">
                        <span className="material-symbols-outlined text-base">edit</span>
                        <span>Editar</span>
                    </Button>
                    <Button 
                        className="flex h-9 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-lg px-3 text-sm font-medium text-danger hover:bg-danger/10">
                        <span className="material-symbols-outlined text-base">delete</span>
                        <span>Remover</span>
                 </Button>
            </div>
        </div>
        <div 
            className="w-full sm:flex-1 rounded-lg bg-cover bg-center min-h-[120px]" data-alt="Map view showing the location of the address" data-location="São Paulo, SP" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDZcSqDHH0LH-esioRmUD-vPF39BmPkFcdIxWqHXcN7XFnqdZfAt7DR4MfR-hqxrUcuBo0qBESPxwWor4EWCvn1LkZkKCojXGfCdbaQn9KKj33Qt5auECOFbQ424EQzQkZPQZridDXsVXJGAtlTP2xLz9g6jcgUNc77uey_dFk5q0D6q86YxA0w8-TwjnpMH-i-TVjaUrD6VaXYnjAB9cA0KLophTMwS07k3PjcqwEa94rMMjrHE84d4aGU_q571j6mF5KepeSBIBE")'}}>

        </div>
    </div>

    <div 
        className="flex flex-col sm:flex-row items-stretch justify-between gap-4 rounded-xl bg-card-light dark:bg-card-dark p-4 md:p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex flex-[2_2_0px] flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold">Avenida Paulista, 1500</h3>
                <p className="text-sm font-normal text-text-light-secondary dark:text-dark-secondary">Bela Vista, São Paulo - SP</p>
                <p 
                className="text-sm font-normal text-text-light-secondary dark:text-dark-secondary">CEP: 01310-200</p>
            </div>
            <div className="flex items-center gap-2">
                <Button 
                    className="flex h-9 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-lg bg-background-light dark:bg-background-dark px-3 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700">
                    <span className="material-symbols-outlined text-base">edit</span>
                    <span>Editar</span>
                </Button>
                <Button 
                    className="flex h-9 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-lg px-3 text-sm font-medium text-danger hover:bg-danger/10">
                    <span 
                        className="material-symbols-outlined text-base">delete</span>
                    <span>Remover</span>
                </Button>
                <Button 
                    className="flex h-9 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-lg bg-background-light dark:bg-background-dark px-3 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700">
                    <span>Definir como padrão</span>
                </Button>
            </div>
        </div>
        <div
            className="w-full sm:flex-1 rounded-lg bg-cover bg-center min-h-[120px]" data-alt="Map view showing the location of the address" data-location="São Paulo, SP" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDZcSqDHH0LH-esioRmUD-vPF39BmPkFcdIxWqHXcN7XFnqdZfAt7DR4MfR-hqxrUcuBo0qBESPxwWor4EWCvn1LkZkKCojXGfCdbaQn9KKj33Qt5auECOFbQ424EQzQkZPQZridDXsVXJGAtlTP2xLz9g6jcgUNc77uey_dFk5q0D6q86YxA0w8-TwjnpMH-i-TVjaUrD6VaXYnjAB9cA0KLophTMwS07k3PjcqwEa94rMMjrHE84d4aGU_q571j6mF5KepeSBIBE");'}}>

        </div>
    </div>

    <div 
        className="hidden flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-card-light dark:bg-card-dark p-8 text-center mt-4">
            <span className="material-symbols-outlined text-5xl text-slate-400 dark:text-slate-500">location_off</span>
            <h3 className="text-lg font-bold">Nenhum endereço cadastrado</h3>
            <p className="max-w-xs text-sm text-text-light-secondary dark:text-dark-secondary">Você ainda não tem endereços salvos. Adicione um para agilizar suas futuras compras.</p>
            <Button className="mt-2 flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary/90">
            <span className="material-symbols-outlined text-xl">add</span>
            <span className="truncate">Adicionar Primeiro Endereço</span>
            </Button>
            </div>
            </div>
        </div>
        </div>
        </div>
    </main>
    )
}