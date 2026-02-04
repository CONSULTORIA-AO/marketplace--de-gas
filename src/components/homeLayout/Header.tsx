import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cartstore';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/lib/axios';
import type { GasProduct } from '@/types/index';
import { Footer } from '@/components/layout/Footer';
import { Label } from '@/components/ui/label';
import BackGround from "@/assets/wallpaper.jpg";
import { OffersSection } from '@/components/homeLayout/Offers';


export function HeaderHome (){
    const navigate = useNavigate();
    return(
        <header 
            className="sticky top-0 z-50 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark border border-slate-100 dark:border-slate-800">
            <div 
                className="container mx-auto px-4">
    
                <div 
                    className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-primary text-3xl">local_fire_department</span>
                        <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">GásMarket</h2>
    </div>
    <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
    <Link className="hover:text-primary" to="/">Início</Link>
    <Link className="hover:text-primary" to="#offers">Ofertas</Link>
    <Link className="hover:text-primary" to="#about">Sobre Nós</Link>
    </nav>
    <div className="flex items-center gap-2">
    <Button onClick={() => navigate('/login')} className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 text-primary dark:bg-primary/30 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/30 dark:hover:bg-primary/40">
    <span className="truncate">Entrar</span>
    </Button>
    <Button onClick={() => navigate('/cadastro')} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#137fec] hover:bg-[#137fec]/90 text-white text-sm font-bold leading-normal tracking-[0.015em]">
    <span className="truncate">Cadastre-se</span>
    </Button>
    <Button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark hover:bg-gray-200 dark:hover:bg-gray-700">
    <span className="material-symbols-outlined text-xl">shopping_cart</span>
    </Button>
    </div>
    </div>
    </div>
    </header> 
    )
}