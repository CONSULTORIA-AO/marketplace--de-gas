import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function UserInformation(){
    return(
        <div>
        <section className="bg-white border border-border-color p-8 rounded-xl shadow-sm border-gray-900/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 ">
                <div className="flex items-center gap-8 ">
                    <div className="relative group">
                        <div 
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-28 w-28 ring-4 ring-slate-50 shadow-inner" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCBcSJd-D4Cc5tbywWVmJ9AqfbmD1pemQmYZqNPacjhL351XxMNJHWIBbL8FfSmj4zbs-0pLJ4uouUUpwb2_2wPPulvFAtJaMT_-r0ydz5OEwOVoFqh-HMPdJthsUI4NJzYhx2cHZvdAIqr2LZGcACIYE52Ao0yhKOQ1ej6ok3wodcL0cEPeFCSZSqh3fD65jGc-Krc88fkJNdla3sIX3L4oi3PWYWFOfkSxm0bTRXZTpDQpfNlE5pQI3GrJ9D6Ia9eRXh_EG8GOhg");'}}></div>
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
                        <Button 
                            className="flex items-center justify-center rounded-lg h-11 px-8 bg-primary text-white text-sm font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
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
                            className="text-sm font-semibold text-slate-600">
                                Nome Completo
                        </Label>
                        <Input className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-primary focus:bg-white transition-all" type="text" value="João Silva de Oliveira"/>
                    </div>
                    <div className="grid grid-cols-1 gap-1.5">
                        <Label 
                            htmlFor="email"
                            className="text-sm font-semibold text-slate-600">
                                E-mail
                        </Label>
                        <Input className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-primary focus:bg-white transition-all" type="email" value="joao.silva@email.com"/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-1 gap-1.5">
                            <Label 
                                htmlFor="tel"
                                className="text-sm font-semibold text-slate-600">
                                Telefone
                            </Label>
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
                        <Label htmlFor="current-password" className="text-sm font-semibold text-slate-600">
                            Senha Atual
                        </Label>
                        <div className="relative">
                            <Input 
                                className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-primary focus:bg-white transition-all" placeholder="••••••••" type="password"/>
                            <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 cursor-pointer hover:text-primary transition-colors">visibility</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-1.5">
                        <Label 
                            htmlFor="password"
                            className="text-sm font-semibold text-slate-600">
                                Nova Senha
                        </Label>
                        <Input 
                            className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-primary focus:bg-white transition-all" type="password"/>
                    </div>
                    <div className="grid grid-cols-1 gap-1.5">
                        <Label htmlFor="confirm-password" className="text-sm font-semibold text-slate-600">
                            Confirmar Nova Senha
                        </Label>
                        <Input className="w-full bg-slate-50 border-slate-200 rounded-lg text-slate-900 px-4 py-2.5 focus:border-primary focus:bg-white transition-all" type="password"/>
                    </div>
                    <Button className="w-full mt-2 h-11 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg text-sm font-bold transition-all">
                        Redefinir Senha
                    </Button>
                </div>
            </div>
        </div>
        </div>
    )
}