export function ProductReviewPage(){
    return(
        <main className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
            <div 
                className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    <div className="flex flex-1 justify-center py-10 sm:py-16 px-4">
                        <div className="layout-content-container flex flex-col max-w-2xl flex-1">
                            <div 
                                className="flex flex-col gap-8 w-full bg-white dark:bg-background-dark dark:border dark:border-gray-700/50 p-6 sm:p-10 rounded-xl shadow-sm">
                
                                <div className="flex flex-col gap-2 text-center">
                                    <p className="text-slate-900 dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Como foi sua experiência?</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Pedido #12345 - Gás P13 da Revenda XYZ</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h1 className="text-slate-900 dark:text-white text-lg sm:text-xl font-bold leading-tight tracking-[-0.015em] text-left">
                                        Qualidade do Produto
                                    </h1>
                                    <div className="flex items-center gap-1">
                                        <button className="p-2 rounded-full hover:bg-yellow-400/10 group">
                                            <span className="material-symbols-outlined text-yellow-400 filled text-3xl">star</span>
                                        </button>
                    
                                        <button className="p-2 rounded-full hover:bg-yellow-400/10 group">
                                            <span className="material-symbols-outlined text-yellow-400 filled text-3xl">star</span>
                                        </button>
                    
                                        <button className="p-2 rounded-full hover:bg-yellow-400/10 group">
                                            <span className="material-symbols-outlined text-yellow-400 filled text-3xl">star</span>
                                        </button>
                                        
                                        <button className="p-2 rounded-full hover:bg-yellow-400/10 group">
                                            <span className="material-symbols-outlined text-yellow-400 filled text-3xl">star</span>
                                        </button>
                    
                                        <button className="p-2 rounded-full hover:bg-yellow-400/10 group">
                                            <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-yellow-400 text-3xl">star</span>
                                        </button>
                                    </div>
                                </div>
                
                                <div className="flex flex-col gap-3">
                                    <h1 className="text-slate-900 dark:text-white text-lg sm:text-xl font-bold leading-tight tracking-[-0.015em] text-left">Atendimento e Entrega</h1>
                                    
                                    <div className="flex items-center gap-1">
                                        <button className="p-2 rounded-full hover:bg-yellow-400/10 group">
                                            <span className="material-symbols-outlined text-yellow-400 filled text-3xl">star</span>
                                        </button>
                            
                                        <button className="p-2 rounded-full hover:bg-yellow-400/10 group">
                                            <span className="material-symbols-outlined text-yellow-400 filled text-3xl">star</span>
                                        </button>
                            
                                        <button className="p-2 rounded-full hover:bg-yellow-400/10 group">
                                            <span className="material-symbols-outlined text-yellow-400 filled text-3xl">star</span>
                                        </button>
                            
                                        <button className="p-2 rounded-full hover:bg-yellow-400/10 group">
                                        <span className="material-symbols-outlined text-yellow-400 filled text-3xl">star</span>
                                        </button>
                            
                                        <button className="p-2 rounded-full hover:bg-yellow-400/10 group">
                                            <span className="material-symbols-outlined text-yellow-400 filled text-3xl">star</span>
                                        </button>
                                    </div>
                                </div>
                
                                <div className="flex flex-col gap-3">
                                    <label 
                                        className="text-slate-900 dark:text-white text-lg sm:text-xl font-bold leading-tight tracking-[-0.015em] text-left" htmlFor="comment">Deixe um comentário (opcional)
                                    </label>
                                            
                                    <textarea 
                                        className="w-full rounded-lg border border-slate-300      dark:border-slate-700 bg-transparent px-4 py-3 text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:border-primary focus:ring-primary/20 focus:ring-2" id="comment" name="comment" placeholder="Conte-nos mais sobre sua experiência..." rows={4}>
                                    </textarea>
                                </div>
                
                                <div 
                                    className="flex flex-col sm:flex-row-reverse gap-3 pt-4">
                                    <button 
                                        className="w-full sm:w-auto flex items-center justify-center gap-2      rounded-lg bg-primary px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark">
                                            Enviar Avaliação
                                    </button>
                                                
                                    <button 
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-transparent px-6 py-3 text-base font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark">
                                            Agora Não
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}