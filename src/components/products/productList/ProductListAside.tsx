import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ProductListAside() {
  return (
    <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
      <div className="sticky top-24 space-y-6 rounded-xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Filtros
        </h3>

        <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200">
            Tipo de Gás
          </h4>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Input
                id="gas-type-1"
                checked={true}
                className="form-checkbox h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec]/50 dark:border-slate-700 dark:bg-slate-800"
                type="checkbox"
              />
              <span className="text-slate-600 dark:text-slate-300">
                GLP (13kg)
              </span>
            </Label>

            <Label className="flex items-center gap-2">
              <Input
                id="gas-type-2"
                className="form-checkbox h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec]/50 dark:border-slate-700 dark:bg-slate-800"
                type="checkbox"
              />
              <span className="text-slate-600 dark:text-slate-300">
                GLP (45kg)
              </span>
            </Label>

            <Label className="flex items-center gap-2">
              <Input
                id="gas-type-3"
                className="form-checkbox h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec]/50 dark:border-slate-700 dark:bg-slate-800"
                type="checkbox"
              />
              <span className="text-slate-600 dark:text-slate-300">
                Gás Natural
              </span>
            </Label>
          </div>
        </div>

        <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200">
            Faixa de Preço
          </h4>
          <div className="relative h-2 rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="absolute h-2 rounded-full bg-[#137fec]"
              style={{ left: '10%', right: '25%' }}
            ></div>
            <div
              className="absolute -top-1.5 h-5 w-5 rounded-full bg-white border-2 border-[#137fec] shadow"
              style={{ left: '10%' }}
            ></div>
            <div
              className="absolute -top-1.5 h-5 w-5 rounded-full bg-white border-2 border-[#137fec] shadow"
              style={{ left: '75%' }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>R$ 90</span>
            <span>R$ 120</span>
          </div>
        </div>

        <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200">
            Localização
          </h4>
          <Label className="flex flex-col">
            <div className="relative flex w-full flex-1 items-stretch rounded-lg">
              <div className="text-slate-500 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 transform">
                <span className="material-symbols-outlined text-xl">
                  location_on
                </span>
              </div>
              <Input
                type="text"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-slate-100 py-2.5 pl-10 pr-4 text-slate-900 placeholder:text-slate-500 focus:outline-0 focus:ring-2 focus:ring-[#137fec]/50 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 border-none h-full text-base font-normal leading-normal"
                placeholder="Cidade ou bairro"
                value=""
              />
            </div>
          </Label>
        </div>

        <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200">
            Classificação Mínima
          </h4>
          <div className="flex items-center gap-1 text-slate-300 dark:text-slate-600">
            <span className="material-symbols-outlined rating-star filled cursor-pointer">
              star
            </span>
            <span className="material-symbols-outlined rating-star filled cursor-pointer">
              star
            </span>
            <span className="material-symbols-outlined rating-star filled cursor-pointer">
              star
            </span>
            <span className="material-symbols-outlined rating-star filled cursor-pointer">
              star
            </span>
            <span className="material-symbols-outlined cursor-pointer hover:text-yellow-400">
              star
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <Button className="flex w-full cursor-pointer items-center justify-center rounded-lg h-10 bg-[#137fec] text-white gap-2 text-sm font-bold leading-normal tracking-wide">
            Aplicar Filtros
          </Button>

          <Button className="flex w-full cursor-pointer items-center justify-center rounded-lg h-10 bg-transparent text-slate-600 dark:text-slate-300 gap-2 text-sm font-medium leading-normal hover:bg-slate-100 dark:hover:bg-slate-800">
            Limpar Filtros
          </Button>
        </div>
      </div>
    </aside>
  );
}
