import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header"; 

export function ProfilePage() {
  return(
        
    <main className="bg-background-light text-slate-800 min-h-screen">
    <Header />
    <div className="flex max-w-[1440px] mx-auto px-10 py-8 gap-8">
    <aside className="w-64 flex-shrink-0">
    <div className="flex flex-col h-[calc(100vh-160px)] justify-between bg-white p-6 rounded-xl border border-gray-900/10 shadow-sm">
    <div className="flex flex-col gap-6">
    <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 shadow-sm" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjicGJhn0kFO_7ejkZiGIF2J5j_AfU1HmpVXdcUM8IRTruKizXfX_Z9BJie87L1NeYc1dlAANvvGlAAiuw9C97EoAlbN3h1sjbMSmevspwNcHAT5PPE8akyzmrdrIBiIK-wKuzqduo9ezop0ja4pUqfjuKvz60TFErNC9F6ZUVqVpXyuzsj_QTW294nUsmTvPB0wyA0hnff5TgabtWboZGauL4VTCJvpjTkRUS7m4xcDfi5B5BNfTxB1jqjQiBD30eJgk2Sv4Sek4");'}}></div>
    <div className="flex flex-col">
    <h1 className="text-slate-900 text-base font-bold leading-none">João Silva</h1>
    <p className="text-primary text-xs font-semibold mt-1">Cliente VIP</p>
    </div>
    </div>
    <nav className="flex flex-col gap-1">
    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white shadow-md shadow-primary/10" to="#">
    <span className="material-symbols-outlined">person</span>
    <p className="text-sm font-semibold">Meu Perfil</p>
    </Link>
    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-primary transition-all" to="/carrinho">
    <span className="material-symbols-outlined">package_2</span>
    <p className="text-sm font-medium">Meus Pedidos</p>
    </Link>
    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-primary transition-all" to="/enderecos">
    <span className="material-symbols-outlined">location_on</span>
    <p className="text-sm font-medium">Endereços</p>
    </Link>
    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-primary transition-all" to="/checkout">
    <span className="material-symbols-outlined">credit_card</span>
    <p className="text-sm font-medium">Pagamentos</p>
    </Link>
    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-primary transition-all" to="#">
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
    <div className="flex-1 flex flex-col gap-6">
    <div className="flex items-center gap-2">
  
    </div>
    <div className="flex flex-wrap justify-between items-end gap-3">
    <div className="flex flex-col gap-1">
    <h1 className="text-slate-900 text-3xl font-black leading-tight tracking-[-0.033em]">Meu Perfil</h1>
    <p className="text-slate-500 text-base font-normal">Gerencie suas informações pessoais e configurações de segurança.</p>
    </div>
    </div>
    <section className="bg-white border border-border-color p-8 rounded-xl shadow-sm border-gray-900/10">
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 ">
    <div className="flex items-center gap-8 ">
    <div className="relative group">
    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-28 w-28 ring-4 ring-slate-50 shadow-inner" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCBcSJd-D4Cc5tbywWVmJ9AqfbmD1pemQmYZqNPacjhL351XxMNJHWIBbL8FfSmj4zbs-0pLJ4uouUUpwb2_2wPPulvFAtJaMT_-r0ydz5OEwOVoFqh-HMPdJthsUI4NJzYhx2cHZvdAIqr2LZGcACIYE52Ao0yhKOQ1ej6ok3wodcL0cEPeFCSZSqh3fD65jGc-Krc88fkJNdla3sIX3L4oi3PWYWFOfkSxm0bTRXZTpDQpfNlE5pQI3GrJ9D6Ia9eRXh_EG8GOhg");'}}></div>
    <Button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-lg hover:scale-105 transition-transform border-4 border-white">
    <span className="material-symbols-outlined text-[20px]">photo_camera</span>
    </Button>
    </div>
    <div className="flex flex-col justify-center">
    <h2 className="text-slate-900 text-2xl font-bold leading-tight">João Silva</h2>
    <div className="flex items-center gap-2 mt-2">
    <span className="material-symbols-outlined text-slate-400 text-sm">mail</span>
    <p className="text-slate-600 text-base">joao.silva@email.com</p>
    </div>
    <div className="flex items-center gap-2 mt-1">
    <span className="material-symbols-outlined text-slate-400 text-sm">location_on</span>
    <p className="text-slate-600 text-base">São Paulo, SP</p>
    </div>
    </div>
    </div>
    <div className="flex gap-3">
    <Button className="flex items-center justify-center rounded-lg h-11 px-8 bg-primary text-white text-sm font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
        Salvar Alterações
    </Button>
    </div>
    </div>
    </section>
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Link className="group bg-white border border-border-color p-6 rounded-xl hover:border-primary hover:shadow-md transition-all border-gray-900/10" to="/enderecos">
    <div className="bg-blue-50 text-primary p-3 rounded-lg w-fit mb-4 group-hover:bg-primary group-hover:text-white transition-all ">
    <span className="material-symbols-outlined">location_home</span>
    </div>
    <h3 className="font-bold text-slate-900">Meus Endereços</h3>
    <p className="text-xs text-slate-500 mt-1">2 endereços cadastrados</p>
    </Link>
    <Link className="group bg-white border border-border-color p-6 rounded-xl hover:border-primary hover:shadow-md transition-all border-gray-900/10" to="#">
    <div className="bg-blue-50 text-primary p-3 rounded-lg w-fit mb-4 group-hover:bg-primary group-hover:text-white transition-all">
    <span className="material-symbols-outlined">payments</span>
    </div>
    <h3 className="font-bold text-slate-900">Formas de Pagamento</h3>
    <p className="text-xs text-slate-500 mt-1">Visa final 4242 • Principal</p>
    </Link>
    <Link className="group bg-white border border-border-color p-6 rounded-xl hover:border-primary hover:shadow-md transition-all border-gray-900/10" to="#">
    <div className="bg-blue-50 text-primary p-3 rounded-lg w-fit mb-4 group-hover:bg-primary group-hover:text-white transition-all">
    <span className="material-symbols-outlined">history</span>
    </div>
    <h3 className="font-bold text-slate-900">Histórico de Pedidos</h3>
    <p className="text-xs text-slate-500 mt-1">Último pedido há 15 dias</p>
    </Link>
    </section>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
    <div className="bg-white border border-border-color rounded-xl p-8 shadow-sm border-gray-900/10">
    <div className="flex items-center gap-3 mb-8">
    <div className="p-2 bg-blue-50 rounded-lg">
    <span className="material-symbols-outlined text-primary">edit_note</span>
    </div>
    <h2 className="text-xl font-bold text-slate-900">Informações Pessoais</h2>
    </div>
    <div className="space-y-5">
    <div className="grid grid-cols-1 gap-1.5">
    <Label 
        htmlFor="name"
        className="text-sm font-semibold text-slate-600">Nome Completo</Label>
    <Input className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-primary focus:bg-white transition-all" type="text" value="João Silva de Oliveira"/>
    </div>
    <div className="grid grid-cols-1 gap-1.5">
    <Label 
        htmlFor="email"
        className="text-sm font-semibold text-slate-600">E-mail</Label>
    <Input className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-primary focus:bg-white transition-all" type="email" value="joao.silva@email.com"/>
    </div>
    <div className="grid grid-cols-2 gap-4">
    <div className="grid grid-cols-1 gap-1.5">
    <Label 
        htmlFor="tel"
        className="text-sm font-semibold text-slate-600">Telefone</Label>
    <Input 
        className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-primary focus:bg-white transition-all" type="tel" value="(11) 98765-4321"/>
    </div>
    </div>
    </div>
    </div>
    <div className="bg-white border border-border-color rounded-xl p-8 shadow-sm border-gray-900/10">
    <div className="flex items-center gap-3 mb-8">
    <div className="p-2 bg-blue-50 rounded-lg">
    <span className="material-symbols-outlined text-primary">lock_reset</span>
    </div>
    <h2 className="text-xl font-bold text-slate-900">Segurança</h2>
    </div>
    <div className="space-y-5">
    <div className="grid grid-cols-1 gap-1.5">
    <Label htmlFor="current-password" className="text-sm font-semibold text-slate-600">Senha Atual</Label>
    <div className="relative">
    <Input className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-primary focus:bg-white transition-all" placeholder="••••••••" type="password"/>
    <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 cursor-pointer hover:text-primary transition-colors">visibility</span>
    </div>
    </div>
    <div className="grid grid-cols-1 gap-1.5">
    <Label 
        htmlFor="password"
        className="text-sm font-semibold text-slate-600">Nova Senha</Label>
    <Input 
        className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-primary focus:bg-white transition-all" type="password"/>
    </div>
    <div className="grid grid-cols-1 gap-1.5">
    <Label htmlFor="confirm-password" className="text-sm font-semibold text-slate-600">Confirmar Nova Senha</Label>
    <Input className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-primary focus:bg-white transition-all" type="password"/>
    </div>
    <Button className="w-full mt-2 h-11 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg text-sm font-bold transition-all">
        Redefinir Senha
    </Button>
    </div>
    </div>
    </div>
    </div>
    </div>
    </main>
  )
}