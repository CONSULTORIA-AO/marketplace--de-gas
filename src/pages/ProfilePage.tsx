import { Header } from "@/components/Header"; 
import { AsideProfile } from "@/components/profile/AsideProfile";
import { UserInformation } from "@/components/profile/UserInformation";

export function ProfilePage() {
  return(
        <main className="bg-background-light text-slate-800 min-h-screen">
            <Header />
            <div className="flex max-w-[1440px] mx-auto px-10 py-8 gap-8">
                <AsideProfile/>
                <div className="flex-1 flex flex-col gap-6">
                    <div className="flex items-center gap-2"></div>
                    <div className="flex flex-wrap justify-between items-end gap-3">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-slate-900 text-3xl font-black leading-tight tracking-[-0.033em]">Meu Perfil</h1>
                            <p className="text-slate-500 text-base font-normal">Gerencie suas informações pessoais e configurações de segurança.</p>
                        </div>
                    </div>
                    <UserInformation/>
                </div>
            </div>
        </main>
  )
}