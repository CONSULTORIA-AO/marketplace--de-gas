import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function ProductInfo(){
    return(
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-8">
                <div className="bg-white rounded-2xl p-6 border-border-soft border-border-light dark:border-border-dark border border-slate-100 dark:border-slate-900 shadow-xl">
                    <div className="w-full bg-center bg-no-repeat bg-contain aspect-[4/3] rounded-xl" data-alt="Large image" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPMfoiNSwjDKSaLZvCb8lcnR4HQdWQduN8xwnvG1N38uKr8j_XCgY6aZooo4zy-J873_yhmZjJEEjc6EBrLsutWON5wgDec-mveRZRzxoppaMib9uWKkVS0K_pPdWD8ILEsT0K9Hd9dNe_Au8DZPAaFwH_zsHzqoCIKsIpyCf-xKnylKP41P_rMgUjXAU6Nq8uumSsAtZ3-2dGivja2lJURFYCClutw8ckP48w9B-FD3uiPUmtdkXhEJ2zLobrtKLbmAFht2gTTsE');"}}></div>
                </div>
                <div className="grid grid-cols-4 gap-4 ">
                    <div className="aspect-square rounded-xl border-2 border-primary overflow-hidden cursor-pointer border-border-light dark:border-border-dark border-slate-100 dark:border-slate-800 shadow-xl">
                        <div className="w-full h-full bg-center bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWfPnZgLGqqXpY_UK7s0FRFq_puxnaIYDJNxf2TgV80kX83AYQdOgmLVUBPlpWmaeljIFgwV42A1bfBwCmE_X2LPOeJs853yRzy25tw_hrtXWJDuKkRRjwaAzjv4t14ysZVwrbO2ktVpHEaDaWvCnK0qYCCeIFatSeabwAgZOXbiJiOUrJnU9XRHTsfV_bwyu3WLdngK04RADqwHazKDAcvpMiXib3cmmePPDMo3uu7yBz7DjC-ZEsL6LqEQplYas8y0g1L4JdTog");'}}></div>
                    </div>
                    <div 
                        className="aspect-square rounded-xl border-border-soft overflow-hidden cursor-pointer hover:border-primary/50 transition-colors border-border-light dark:border-border-dark border border-slate-100 dark:border-slate-800 shadow-xl">
                        <div className="w-full h-full bg-center bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBurdG_1iCCKzF_eCK0BY46eqcwlqidAShNaG1VAVFuo4FQze0uGWMbgoGuD7EuLWrjolSrnE9rDuy6D10lN9jYbwxghry6bamUMZdgadc4Z3KIYZrKljdquJirr1TqoloSXBiIvn1VFbhIucL-p3T7Q3zIbrvEZJKdNU-B6a5TbGwpK_M4WpRTe9TaBdK1qgUcc3bb0S-VyZQ6u3odX2Eqwn5vIG8T0mvWJCjOEhq95pzEBtpEGgW7y5MEjNefVX3coLBUALikehQ");'}}></div>
                    </div>
                    <div className="aspect-square rounded-xl border-border-soft overflow-hidden cursor-pointer hover:border-primary/50 transition-colors border-border-light dark:border-border-dark border border-slate-100 dark:border-slate-800 shadow-xl">
                        <div className="w-full h-full bg-center bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBhuDXu_66_yKrzrplbJ1qQcuZrKnc0IAjEythlGx-UmJzAJo0gZyJ8ZBvbcNO8OglYo7-ahbpZOKRboJ4LcZMMRgWCifRuD_-AdaBzKGlGrx1pW_FR90p4JkIwcbQ92oPiQnY8EWF40lBCHCdy16Lx73K7GaeFz_sTCfrys7w0MjO32Opk8fsfOEMmx3xjqomh1B2M0sZWxFI_0A8kK8aCU7mPL5yMnSPWtbvALjtbeuBehXJPDWwHyVuZutiMgWWb3yv197PXtTI");'}}></div>
                    </div>
                    <div className="aspect-square rounded-xl border-border-soft overflow-hidden cursor-pointer hover:border-primary/50 transition-color border-border-light dark:border-border-dark border border-slate-100 dark:border-slate-800 shadow-xl">
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
            <div 
                className="bg-white rounded-2xl p-10 shadow-xl shadow-gray-200/50 border-border-soft space-y-8 border-border-light dark:border-border-dark border border-slate-100 dark:border-slate-900">
                    <div className="space-y-1 ">
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
                    <Button className="flex w-full items-center justify-center rounded-xl h-16 px-8 bg-[#137fec] text-white text-lg font-extrabold shadow-lg shadow-secondary-action/25 hover:bg-[#137fec]/90 transition-all">
                        <span>COMPRAR AGORA</span>
                    </Button>
                    <Button className="flex w-full items-center justify-center rounded-xl h-16 px-8 bg-green-700  hover:bg-green-600 text-white text-lg font-extrabold shadow-lg shadow-primary/25 hover:scale-[1.02] transition-all">
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
    )
}