export function CategorySection(){
    return(
        <section className="mb-16">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-center mb-8">Categoria</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div 
                    className="group flex flex-col items-center gap-4 p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-xl text-center hover:bg-[#137fec]/10 dark:hover:bg-[#137fec]/20">
                    <div 
                      className="flex items-center justify-center w-20 h-20 rounded-full bg-[#137fec]/20 group-hover:bg-[#137fec] text-[#137fec] transition-colors">
                        <span className="material-symbols-outlined text-4xl">propane_tank</span>
                      </div>
                      <p className="text-lg font-bold">Gás de Cozinha (GLP)</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">O tradicional para residências e pequenos comércios.</p>
                </div>

                <div 
                    className="group flex flex-col items-center gap-4 p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-xl text-center  dark:hover:bg-[#137fec]/20">
                    <div 
                        className="flex items-center justify-center w-20 h-20 rounded-full bg-[#137fec]/20 group-hover:bg-[#137fec] text-[#137fec]  transition-colors">
                        <span className="material-symbols-outlined text-4xl">gas_meter</span>
                    </div>
                    <p className="text-lg font-bold">Gás Natural (GN)</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Soluções para condomínios e indústrias com gás encanado.</p>
                </div>

                <div 
                    className="group flex flex-col items-center gap-4 p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-xl text-center hover:bg-[#137fec]/10 dark:hover:bg-[#137fec]/20">
                    <div 
                    className="flex items-center justify-center w-20 h-20 rounded-full bg-[#137fec]/20 group-hover:bg-[#137fec] text-[#137fec] transition-colors">
                        <span className="material-symbols-outlined text-4xl">factory</span>
                    </div>
                    <p className="text-lg font-bold">Cilindros Industriais</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cilindros de alta capacidade para uso industrial e comercial.</p>
                </div>
            </div>
        </section>
    )
}