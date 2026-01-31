import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function ProductDetails(){
    return(
        <div className="font-display">
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <header className="w-full bg-white border-b border-border-soft sticky top-0 z-50">
        <div className="container mx-auto px-8">
        <div className="flex items-center justify-between whitespace-nowrap py-4">
        <div className="flex items-center gap-10">
        <div className="flex items-center gap-3 text-primary">
        <span className="material-symbols-outlined text-4xl">local_fire_department</span>
        <h2 className="text-2xl font-extrabold tracking-tight">Gás Rápido</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-text-secondary">
        <Link className="hover:text-primary transition-colors" to="#">Início</Link>
        <Link className="hover:text-primary transition-colors" to="#">Categorias</Link>
        <Link className="hover:text-primary transition-colors" to="#">Promoções</Link>
        <Link className="hover:text-primary transition-colors" to="#">Meu Perfil</Link>
        </nav>
        </div>
        <div className="flex items-center gap-6">
        <Button className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
        <span className="material-symbols-outlined mr-2 text-xl">shopping_cart</span>
        <span className="truncate">Carrinho</span>
        </Button>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-11 ring-2 ring-border-soft cursor-pointer" data-alt="User avatar" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDVPjjCjJ4hwxeQlbmzGkvMxNoklffwnynHc0xrQUdOEXdN93wNy3Ko85uvYGhbtLbxQUwKt_iaQK5Q7R4TrcH_QqPeRuctRdhK8ngAThInK6POydgVTGTIhZ4ZXAMjzwJhiONAHnDMrYN2_wt7NhGQrg7xaN3L__77iO6DnN2wm_pzhgYYJm2GfRw2EUIrzErREU15utskDaQYVQtZ4TGlKxaqJnkGTzkQw85nkLhIuWDY5Xbl9Wyczoo56bEZA89fryTta8ttN2k');"}}></div>
        </div>
        </div>
        </div>
        </header>
        <main className="flex-1">
        <div className="container mx-auto px-8 py-12">
        <nav className="flex flex-wrap gap-2 mb-10 text-sm font-medium">
        <Link className="text-text-secondary hover:text-primary" to="#">Início</Link>
        <span className="text-gray-300">/</span>
        <Link className="text-text-secondary hover:text-primary" to="#">Botijões de 13kg</Link>
        <span className="text-gray-300">/</span>
        <span className="text-primary font-semibold">Gás do Bairro</span>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border-soft">
        <div className="w-full bg-center bg-no-repeat bg-contain aspect-[4/3] rounded-xl" data-alt="Large image" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPMfoiNSwjDKSaLZvCb8lcnR4HQdWQduN8xwnvG1N38uKr8j_XCgY6aZooo4zy-J873_yhmZjJEEjc6EBrLsutWON5wgDec-mveRZRzxoppaMib9uWKkVS0K_pPdWD8ILEsT0K9Hd9dNe_Au8DZPAaFwH_zsHzqoCIKsIpyCf-xKnylKP41P_rMgUjXAU6Nq8uumSsAtZ3-2dGivja2lJURFYCClutw8ckP48w9B-FD3uiPUmtdkXhEJ2zLobrtKLbmAFht2gTTsE');"}}></div>
        </div>
        <div className="grid grid-cols-4 gap-4">
        <div className="aspect-square rounded-xl border-2 border-primary overflow-hidden cursor-pointer shadow-sm">
        <div className="w-full h-full bg-center bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWfPnZgLGqqXpY_UK7s0FRFq_puxnaIYDJNxf2TgV80kX83AYQdOgmLVUBPlpWmaeljIFgwV42A1bfBwCmE_X2LPOeJs853yRzy25tw_hrtXWJDuKkRRjwaAzjv4t14ysZVwrbO2ktVpHEaDaWvCnK0qYCCeIFatSeabwAgZOXbiJiOUrJnU9XRHTsfV_bwyu3WLdngK04RADqwHazKDAcvpMiXib3cmmePPDMo3uu7yBz7DjC-ZEsL6LqEQplYas8y0g1L4JdTog");'}}></div>
        </div>
        <div className="aspect-square rounded-xl border border-border-soft overflow-hidden cursor-pointer hover:border-primary/50 transition-colors shadow-sm">
        <div className="w-full h-full bg-center bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBurdG_1iCCKzF_eCK0BY46eqcwlqidAShNaG1VAVFuo4FQze0uGWMbgoGuD7EuLWrjolSrnE9rDuy6D10lN9jYbwxghry6bamUMZdgadc4Z3KIYZrKljdquJirr1TqoloSXBiIvn1VFbhIucL-p3T7Q3zIbrvEZJKdNU-B6a5TbGwpK_M4WpRTe9TaBdK1qgUcc3bb0S-VyZQ6u3odX2Eqwn5vIG8T0mvWJCjOEhq95pzEBtpEGgW7y5MEjNefVX3coLBUALikehQ");'}}></div>
        </div>
        <div className="aspect-square rounded-xl border border-border-soft overflow-hidden cursor-pointer hover:border-primary/50 transition-colors shadow-sm">
        <div className="w-full h-full bg-center bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBhuDXu_66_yKrzrplbJ1qQcuZrKnc0IAjEythlGx-UmJzAJo0gZyJ8ZBvbcNO8OglYo7-ahbpZOKRboJ4LcZMMRgWCifRuD_-AdaBzKGlGrx1pW_FR90p4JkIwcbQ92oPiQnY8EWF40lBCHCdy16Lx73K7GaeFz_sTCfrys7w0MjO32Opk8fsfOEMmx3xjqomh1B2M0sZWxFI_0A8kK8aCU7mPL5yMnSPWtbvALjtbeuBehXJPDWwHyVuZutiMgWWb3yv197PXtTI");'}}></div>
        </div>
        <div className="aspect-square rounded-xl border border-border-soft overflow-hidden cursor-pointer hover:border-primary/50 transition-colors shadow-sm">
        <div className="w-full h-full bg-center bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDv6NWpsT7mdhKzl13dYZRT7HLNU75dC4WwRt242twi_RNIjFTyqsGmN30VgPZ01nXadgl5vUPm7Z7H2sIR7dHbFLf5Vq-c9SGPV1n4z0cxBwOyt2p7hdW3pSPEmQ7WHDq39X6d5ZywGti4u94Ca5YpXsBPFsUmgrE-nltn4VKGDrr1akrbr9_QXC8YXpL2WYuWhFhJ9olDcC8ozeacVzLxRsFqyZxg0r8K1P6d3Tm61xjJQu2RxDyaqh0BiyGXgrxl5-d1YpH66lw");'}}></div>
        </div>
        </div>
        </div>
        <div className="lg:col-span-5 flex flex-col gap-8">
        <div>
        <h1 className="text-4xl font-extrabold text-text-primary leading-tight mb-4">Botijão de Gás P13 - SuperGás</h1>
        <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5">
        <div className="flex text-secondary-action">
        <span className="material-symbols-outlined fill text-xl">star</span>
        <span className="material-symbols-outlined fill text-xl">star</span>
        <span className="material-symbols-outlined fill text-xl">star</span>
        <span className="material-symbols-outlined fill text-xl">star</span>
        <span className="material-symbols-outlined text-xl">star_half</span>
        </div>
        <span className="text-sm font-bold text-text-primary">4.5</span>
        <span className="text-sm text-text-secondary">(128 avaliações)</span>
        </div>
        <span className="text-border-soft">|</span>
        <p className="text-sm font-medium">Vendido por <Link className="text-primary hover:underline font-bold" to="#">Gás do Bairro</Link></p>
        </div>
        </div>
        <div className="bg-white rounded-2xl p-10 shadow-xl shadow-gray-200/50 border border-border-soft space-y-8">
        <div className="space-y-1">
        <p className="text-sm text-text-secondary font-semibold uppercase tracking-wider">Preço Atual</p>
        <div className="flex items-baseline gap-2">
        <span className="text-5xl font-black text-text-primary">R$ 105,00</span>
        </div>
        <div className="flex items-center gap-2 text-green-600 font-bold mt-2">
        <span className="material-symbols-outlined text-xl">check_circle</span>
        <span className="text-sm uppercase">Em estoque e pronto para entrega</span>
        </div>
        </div>
        <div className="space-y-4">
        <Label className="text-sm font-bold text-text-primary block" htmlFor="quantity">Quantidade</Label>
        <div className="flex items-center">
        <select className="form-select w-full rounded-xl border-border-soft bg-gray-50 focus:ring-primary focus:border-primary h-14 text-lg font-medium" id="quantity">
        <option>1 Unidade</option>
        <option>2 Unidades</option>
        <option>3 Unidades</option>
        <option>4 Unidades</option>
        </select>
        </div>
        </div>
        <div className="flex flex-col gap-4">
        <Button className="flex w-full items-center justify-center rounded-xl h-16 px-8 bg-secondary-action text-white text-lg font-extrabold shadow-lg shadow-secondary-action/25 hover:scale-[1.02] transition-all">
        <span>COMPRAR AGORA</span>
        </Button>
        <Button className="flex w-full items-center justify-center rounded-xl h-16 px-8 bg-primary text-white text-lg font-extrabold shadow-lg shadow-primary/25 hover:scale-[1.02] transition-all">
        <span>ADICIONAR AO CARRINHO</span>
        </Button>
        </div>
        <div className="pt-6 border-t border-border-soft">
        <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl">
        <span className="material-symbols-outlined text-primary text-2xl">local_shipping</span>
        <div>
        <p className="font-bold text-sm text-primary">Entrega ultra-rápida</p>
        <p className="text-sm text-text-secondary">Chega em sua casa entre <strong>30-45 minutos</strong> após o pedido.</p>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        <div className="mt-20">
        <div className="border-b border-border-soft mb-12">
        <nav className="flex gap-12 overflow-x-auto">
        <Button className="pb-6 border-b-4 border-primary text-primary font-bold text-lg whitespace-nowrap">Descrição Geral</Button>
        <Button className="pb-6 border-b-4 border-transparent text-text-secondary font-semibold text-lg hover:text-text-primary whitespace-nowrap transition-colors">Especificações Técnicas</Button>
        <Button className="pb-6 border-b-4 border-transparent text-text-secondary font-semibold text-lg hover:text-text-primary whitespace-nowrap transition-colors">Avaliações (128)</Button>
        </nav>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-10">
        <div className="prose prose-slate max-w-none bg-white p-10 rounded-2xl border border-border-soft shadow-sm">
        <h3 className="text-2xl font-bold text-text-primary mb-6">Sobre o Produto</h3>
        <p className="text-text-secondary text-lg leading-relaxed mb-6">O botijão de gás P13 da SuperGás é Link escolha ideal para uso residencial, garantindo segurança e eficiência para o seu fogão e forno. Este produto segue todas as normas de segurança da ANP (Agência Nacional do Petróleo, Gás Natural e Biocombustíveis), vindo com lacre de segurança intacto.</p>
        <p className="text-text-secondary text-lg leading-relaxed mb-8">O serviço de entrega inclui Link instalação gratuita do botijão por um técnico qualificado, que realizará o teste de vazamento para garantir Link sua tranquilidade.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="flex items-center gap-3 p-4 bg-background-main rounded-xl border border-border-soft">
        <span className="material-symbols-outlined text-primary">speed</span>
        <span className="font-semibold text-text-secondary">Entrega em minutos</span>
        </div>
        </div>
        </div>
        <div className="bg-white p-10 rounded-2xl border border-border-soft shadow-sm">
        <h3 className="text-2xl font-bold text-text-primary mb-8">Avaliações Recentes</h3>
        <div className="space-y-8">
        <div className="border-b border-border-soft pb-8 last:border-0 last:pb-0">
        <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4 items-center">
        <div className="size-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-primary">JD</div>
        <div>
        <p className="font-bold text-text-primary">João Delgado</p>
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
        <p className="text-text-secondary leading-relaxed">Entrega extremamente rápida e o rapaz foi muito educado, fez Link instalação e o teste de sabão para garantir que não havia vazamentos. Recomendo muito!</p>
        </div>
        </div>
        </div>
        </div>
        <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl p-8 border border-border-soft shadow-lg sticky top-28 space-y-6">
        <h3 className="text-xl font-extrabold text-text-primary">Sobre o Fornecedor</h3>
        <div className="flex items-center gap-4 py-4">
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-2xl size-20 shadow-md ring-4 ring-background-main" data-alt="Vendor Logo" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWuWl2OrqcJYLe8Zo9YsNLtcCSHf84-yDyAqyy1p6v1LureRKTw7Mms_qhid148ziBl_5dRvaqO10x4wlSXLza-TssCRq97arjncCKPVWmazH2YefBN1_QlHhJ-OVQfZXLNoyCZBAoWaHiS1AWBNhcgbBwUvCXWkt9QBW7VLxBv5sD8ZvomcVakNV5wpYUwgrno3xXu2XltFESyQc4AML4PL4P4WwA0Q3QlLUsbBcWKOgMEfIq_1Ftpzis0l5m6m30P1_zHMsgr2A")'}}></div>
        <div>
        <h4 className="font-extrabold text-xl text-text-primary">Gás do Bairro</h4>
        <p className="text-sm font-medium text-text-secondary">Parceiro desde Jun/2022</p>
        </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-background-main rounded-xl text-center border border-border-soft">
        <div className="flex items-center justify-center gap-1 text-secondary-action mb-1">
        <span className="material-symbols-outlined fill text-base">star</span>
        <span className="font-black">4.8</span>
        </div>
        <p className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">Avaliação</p>
        </div>
        <div className="p-4 bg-background-main rounded-xl text-center border border-border-soft">
        <div className="flex items-center justify-center gap-1 text-primary mb-1">
        <span className="font-black">+500</span>
        </div>
        <p className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">Vendas</p>
        </div>
        </div>
        <Button className="flex w-full items-center justify-center rounded-xl h-12 px-4 bg-primary/5 text-primary font-bold hover:bg-primary/10 transition-colors border border-primary/20">
        <span className="truncate">Ver Perfil Completo</span>
        </Button>
        <div className="flex items-center gap-2 justify-center text-xs text-text-secondary font-medium">
        <span className="material-symbols-outlined text-sm">verified_user</span>
        Fornecedor Verificado
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </main>
        <footer className="bg-white border-t border-border-soft py-12">
        <div className="container mx-auto px-8 text-center">
        <div className="flex items-center justify-center gap-2 text-primary mb-6 opacity-50">
        <span className="material-symbols-outlined text-2xl">local_fire_department</span>
        <h2 className="text-lg font-bold tracking-tight">Gás Rápido</h2>
        </div>
        <p className="text-sm text-text-secondary font-medium">© 2024 Gás Rápido Marketplace. Todos os direitos reservados.</p>
        </div>
        </footer>
        </div>
        </div>
    )
}