export function AboutProduct(){
    return(
        <div 
            className="prose prose-slate max-w-none bg-white p-10 rounded-2xl border-border-soft border-border-light dark:border-border-dark border border-slate-100 dark:border-slate-900 shadow-xl">
            <h3 className="text-2xl font-bold text-text-primary mb-6">Sobre o Produto</h3>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">O botijão de gás P13 da SuperGás é Link escolha ideal para uso residencial, garantindo segurança e eficiência para o seu fogão e forno. Este produto segue todas as normas de segurança da ANP (Agência Nacional do Petróleo, Gás Natural e Biocombustíveis), vindo com lacre de segurança intacto.</p>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">O serviço de entrega inclui Link instalação gratuita do botijão por um técnico qualificado, que realizará o teste de vazamento para garantir Link sua tranquilidade.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <div className="flex items-center gap-3 p-4 bg-background-main rounded-xl border border-border-soft">
                    <span className="material-symbols-outlined text-primary">verified</span>
                    <span className="font-semibold text-text-secondary">Gás GLP Alta Pureza</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-background-main rounded-xl border border-border-soft">
                    <span className="material-symbols-outlined text-primary">construction</span>
                    <span className="font-semibold text-text-secondary">Instalação Gratuita</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-background-main rounded-xl border border-border-soft">
                    <span className="material-symbols-outlined text-primary">security</span>
                    <span className="font-semibold text-text-secondary">Lacre de Segurança ANP</span>
                </div>
                <div 
                    className="flex items-center gap-3 p-4 bg-background-main rounded-xl border border-border-soft">
                    <span className="material-symbols-outlined text-primary">speed</span>
                    <span className="font-semibold text-text-secondary">Entrega em minutos</span>
                </div>
            </div>
        </div>
    )
}