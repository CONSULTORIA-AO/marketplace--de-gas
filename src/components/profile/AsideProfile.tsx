import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function AsideProfile() {
  return (
    <aside className="w-64 flex-shrink-0">
      <div className="flex flex-col h-[calc(100vh-160px)] justify-between bg-white p-6 rounded-xl border border-gray-900/10 shadow-sm">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 shadow-sm"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjicGJhn0kFO_7ejkZiGIF2J5j_AfU1HmpVXdcUM8IRTruKizXfX_Z9BJie87L1NeYc1dlAANvvGlAAiuw9C97EoAlbN3h1sjbMSmevspwNcHAT5PPE8akyzmrdrIBiIK-wKuzqduo9ezop0ja4pUqfjuKvz60TFErNC9F6ZUVqVpXyuzsj_QTW294nUsmTvPB0wyA0hnff5TgabtWboZGauL4VTCJvpjTkRUS7m4xcDfi5B5BNfTxB1jqjQiBD30eJgk2Sv4Sek4");',
              }}
            ></div>
            <div className="flex flex-col">
              <h1 className="text-slate-900 text-base font-bold leading-none">
                João Silva
              </h1>
              <p className="text-[#137fec] text-xs font-semibold mt-1">
                Cliente VIP
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            <Link
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#137fec] text-white shadow-md shadow-[#137fec]/10"
              to="#"
            >
              <span className="material-symbols-outlined">person</span>
              <p className="text-sm font-semibold">Meu Perfil</p>
            </Link>
            <Link
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-[#137fec] transition-all"
              to="/carrinho"
            >
              <span className="material-symbols-outlined">package_2</span>
              <p className="text-sm font-medium">Meus Pedidos</p>
            </Link>
            <Link
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-[#137fec] transition-all"
              to="/enderecos"
            >
              <span className="material-symbols-outlined">location_on</span>
              <p className="text-sm font-medium">Endereços</p>
            </Link>
            <Link
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-[#137fec] transition-all"
              to="/checkout"
            >
              <span className="material-symbols-outlined">credit_card</span>
              <p className="text-sm font-medium">Pagamentos</p>
            </Link>
            <Link
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-[#137fec] transition-all"
              to="#"
            >
              <span className="material-symbols-outlined">security</span>
              <p className="text-sm font-medium">Segurança</p>
            </Link>
          </nav>
        </div>
        <Button className="flex w-full items-center justify-center gap-2 rounded-lg h-11 bg-red-500 text-slate-50 text-sm font-bold hover:bg-red-50 hover:text-red-500 transition-all">
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Sair da conta</span>
        </Button>
      </div>
    </aside>
  );
}
