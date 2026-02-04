import botijaLaranja from "@/assets/botijas/laranja-1.png";
import botijaCompridaCinza from "@/assets/botijas/comprida-cinza.jpg";
import botijaBaixinha from "@/assets/botijas/pequena-cinzenta.png";
import botijaGrande from "@/assets/botijas/grande-azul.png";


export function OffersSection() {
    return(
        <section className="mb-16">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-center mb-8">Ofertas Imperdíveis da Semana</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col gap-3 rounded-xl bg-card-light dark:bg-card-dark shadow-md overflow-hidden transition-transform hover:-translate-y-1">
                    <div className="w-full bg-center bg-no-repeat aspect-square bg-cover" data-alt="A standard 13kg LPG gas cylinder" style={{backgroundImage: `url(${botijaLaranja})`}}></div>
                        <div className="p-4">
                            <p className="text-lg font-bold">Botijão GLP 13kg</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Fornecedor A</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1"><span className="line-through">De R$110,00</span> por</p>
                            <p className="text-2xl font-bold text-[#137fec]">R$99,90</p>
                        </div>
                    </div>
                <div className="flex flex-col gap-3 rounded-xl bg-card-light dark:bg-card-dark shadow-md overflow-hidden transition-transform hover:-translate-y-1">
            <div className="w-full bg-center bg-no-repeat aspect-square bg-cover" data-alt="A standard 13kg LPG gas cylinder" style={{backgroundImage: `url(${botijaCompridaCinza})`}}></div>
                <div className="p-4">
                    <p className="text-lg font-bold">Botijão GLP 13kg</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fornecedor B</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1"><span className="line-through">De R$115,00</span> por</p>
                    <p className="text-2xl font-bold text-[#137fec]">R$105,00</p>
                </div>
            </div>
            <div className="flex flex-col gap-3 rounded-xl bg-card-light dark:bg-card-dark shadow-md overflow-hidden transition-transform hover:-translate-y-1">
                <div className="w-full bg-center bg-no-repeat aspect-square bg-cover" data-alt="A larger 45kg industrial gas cylinder" style={{backgroundImage: `url(${botijaGrande})`}}></div>
                    <div className="p-4">
                        <p className="text-lg font-bold">Cilindro GLP 45kg</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Fornecedor C</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1"><span className="line-through">De R$450,00</span> por</p>
                        <p className="text-2xl font-bold text-[#137fec]">R$425,00</p>
                    </div>
                </div>
            <div 
                className="flex flex-col gap-3 rounded-xl bg-card-light dark:bg-card-dark shadow-md overflow-hidden transition-transform hover:-translate-y-1">
                <div className="w-full bg-center bg-no-repeat aspect-square bg-cover" data-alt="A standard 13kg LPG gas cylinder" style={{backgroundImage: `url(${botijaBaixinha})`}}></div>
                     <div className="p-4">
                        <p className="text-lg font-bold">Botijão GLP 13kg</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Fornecedor D</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1"><span className="line-through">De R$112,00</span> por</p>
                        <p className="text-2xl font-bold text-[#137fec]">R$102,50</p>
                    </div>
                </div>
            </div>
        </section>
    )
}