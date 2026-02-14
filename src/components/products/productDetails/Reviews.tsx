export function Reviews() {
  return (
    <div className="bg-white p-10 rounded-2xl border-border-soft border-border-light dark:border-border-dark border border-slate-100 dark:border-slate-800 shadow-xl">
      <h3 className="text-2xl font-bold text-text-#137fec] mb-8">
        Avaliações Recentes
      </h3>
      <div className="space-y-8">
        <div className="border-b border-border-soft pb-8 last:border-0 last:pb-0">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-4 items-center">
              <div className="size-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-#137fec]">
                JD
              </div>
              <div>
                <p className="font-bold text-text-#137fec]">João Delgado</p>
                <div className="flex text-secondary-action scale-75 origin-left">
                  <span className="material-symbols-outlined fill">star</span>
                  <span className="material-symbols-outlined fill">star</span>
                  <span className="material-symbols-outlined fill">star</span>
                  <span className="material-symbols-outlined fill">star</span>
                  <span className="material-symbols-outlined fill">star</span>
                </div>
              </div>
            </div>
            <span className="text-sm text-text-secondary">2 dias atrás</span>
          </div>
          <p className="text-text-secondary leading-relaxed">
            Entrega extremamente rápida e o rapaz foi muito educado, fez Link
            instalação e o teste de sabão para garantir que não havia
            vazamentos. Recomendo muito!
          </p>
        </div>
      </div>
    </div>
  );
}
