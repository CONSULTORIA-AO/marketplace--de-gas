import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

import User from "@/assets/user.jpg"

export function Header(){
    const navigate = useNavigate()

     const navLinkClass = ({ isActive }: { isActive: boolean }) =>
            `text-sm font-medium leading-normal hover:text-[#137fec] transition-colors ${
            isActive
            ? "text-[#137fec]" : "text-slate-600" 
        }`;
    
    return(
        <header 
            className="flex items-center justify-between whitespace-nowrap border-b border-border-color px-10 py-3 bg-white sticky top-0 z-50 shadow-xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-4 text-[#137fec]">
                    <div className="size-8">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-[-0.015em]">GasMarket</h2>
                </div>
                <nav className="flex items-center justify-center gap-9">
                    <NavLink className={navLinkClass} to="/produtos">Produtos</NavLink>

                    <NavLink 
                        className={navLinkClass}
                        to="/pedidos">Meus Pedidos</NavLink>    

                    <NavLink
                        className={navLinkClass}
                        to="/enderecos">Endereço</NavLink>

                    <NavLink 
                        className={navLinkClass}
                        to="/checkout">Checkout</NavLink>

                    <NavLink
                        className={navLinkClass}
                        to="/avaliacao">
                        Avaliação
                    </NavLink>
                </nav>
                
            </div>
            <div className="flex">
                <Button
                    onClick={() => navigate("/carrinho")} 
                    className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-background-light dark:bg-background-dark hover:bg-primary/10">
                    <span className="material-symbols-outlined text-xl">shopping_cart</span>
                </Button>
                <Button onClick={() => navigate("/perfil")}>
                    <img src={User} alt="User profile picture" 
                        className="bg-center hover:cursor-pointer bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="User profile picture"
                    />
                </Button>
            </div>
            
        </header>
    )
}