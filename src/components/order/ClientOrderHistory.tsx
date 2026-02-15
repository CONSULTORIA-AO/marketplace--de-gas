import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function ClientOrderHistory() {
  return (
    <div className="flex-grow w-full lg:w-3/5">
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark p-4 shadow-xl border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 ">
          <h2 className="text-text-light dark:text-text-dark text-xl font-bold leading-tight tracking-[-0.015em]">
            Histórico de Compras
          </h2>
          <div className="flex gap-2">
            <Button className="text-sm font-medium px-3 py-1.5 rounded-lg bg-[#137fec]/10 text-[#137fec]">
              Todos
            </Button>
            <Button className="text-sm font-medium px-3 py-1.5 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:bg-gray-100 dark:hover:bg-gray-700">
              Processando
            </Button>
            <Button className="text-sm font-medium px-3 py-1.5 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:bg-gray-100 dark:hover:bg-gray-700">
              Enviado
            </Button>
            <Button className="text-sm font-medium px-3 py-1.5 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:bg-gray-100 dark:hover:bg-gray-700">
              Entregue
            </Button>
          </div>
        </div>
        <div className="py-3">
          <Label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-text-muted-light dark:text-text-muted-dark flex border-none bg-background-light dark:bg-background-dark items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined text-xl">
                  search
                </span>
              </div>
              <Input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-[#137fec]/50 border-none bg-background-light dark:bg-background-dark h-full placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark px-4 pl-2 text-base font-normal leading-normal"
                placeholder="Pesquisar por ID do pedido..."
                value=""
              />
            </div>
          </Label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase bg-background-light dark:bg-background-dark">
              <tr>
                <th className="px-4 py-3" scope="col">
                  ID do Pedido
                </th>
                <th className="px-4 py-3" scope="col">
                  Data
                </th>
                <th className="px-4 py-3" scope="col">
                  Produto
                </th>
                <th className="px-4 py-3" scope="col">
                  Valor
                </th>
                <th className="px-4 py-3" scope="col">
                  Status
                </th>
                <th className="px-4 py-3" scope="col">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light dark:border-border-dark bg-[#137fec]/5 dark:bg-[#137fec]/10">
                <td className="px-4 py-3 font-bold text-[#137fec]">#34562</td>
                <td className="px-4 py-3">03/08/2024</td>
                <td className="px-4 py-3">Botijão P13</td>
                <td className="px-4 py-3">R$ 110,00</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 dark:bg-blue-900/50 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-300">
                    A Caminho
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <Button className="text-sm font-medium text-[#137fec] hover:underline">
                    Ver Detalhes
                  </Button>
                  <Button className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:underline">
                    Pedir Novamente
                  </Button>
                </td>
              </tr>
              <tr className="border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-3 font-medium">#34561</td>
                <td className="px-4 py-3">02/08/2024</td>
                <td className="px-4 py-3">Botijão P13</td>
                <td className="px-4 py-3">R$ 110,00</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 dark:bg-yellow-900/50 px-2 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-300">
                    Processando
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <Button className="text-sm font-medium text-[#137fec] hover:underline">
                    Ver Detalhes
                  </Button>
                  <Button className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:underline">
                    Pedir Novamente
                  </Button>
                </td>
              </tr>
              <tr className="border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-3 font-medium">#33998</td>
                <td className="px-4 py-3">15/07/2024</td>
                <td className="px-4 py-3">Botijão P13</td>
                <td className="px-4 py-3">R$ 105,00</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/50 px-2 py-1 text-xs font-medium text-green-800 dark:text-green-300">
                    Entregue
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <Button className="text-sm font-medium text-[#137fec] hover:underline">
                    Ver Detalhes
                  </Button>
                  <Button className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:underline">
                    Pedir Novamente
                  </Button>
                </td>
              </tr>
              <tr className="border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-3 font-medium">#33124</td>
                <td className="px-4 py-3">01/06/2024</td>
                <td className="px-4 py-3">Botijão P13</td>
                <td className="px-4 py-3">R$ 105,00</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 dark:bg-red-900/50 px-2 py-1 text-xs font-medium text-red-800 dark:text-red-300">
                    Cancelado
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <Button className="text-sm font-medium text-[#137fec] hover:underline">
                    Ver Detalhes
                  </Button>
                  <Button className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:underline">
                    Pedir Novamente
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
