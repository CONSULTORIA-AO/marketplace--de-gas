"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
//import { NAV_ITEMS } from "@/data/product";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const router = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="w-full px-4 lg:px-8 py-3 flex items-center gap-4">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <span className="text-2xl font-black text-[#FFA500] tracking-tight">Jágás</span>
        </a>

        {/* Search — grows to fill space */}
        <div className="flex-1 flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
          style={{ boxShadow: searchFocused ? "0 0 0 2px #FFA500" : undefined }}>
          <svg className="ml-3 flex-shrink-0 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Pesquisa produtos, categorias e serviços"
            className="flex-1 px-3 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 bg-transparent"
          />
          <button className="px-5 py-2.5 bg-[#FFA500] hover:cursor-pointer text-white text-sm font-semibold hover:bg-[#FFA500] transition-colors flex-shrink-0">
            Procurar
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button 
            className="text-gray-600 hover:cursor-pointer hover:text-[#FFA500]/90 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
          </button>

          <button
            onClick={()=> router("/iniciar-sessao")} 
            className="hidden md:flex items-center gap-2 cursor-pointer">
            <span className="text-xs text-gray-600 hover:text-[#FFA500] font-medium">Acessar conta</span>
          </button>
          <button className="md:hidden hover:cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          <button 
            onClick={()=> router("/cadastrar")}
            className="hidden md:flex hover:cursor-pointer items-center gap-1.5 text-gray-600 hover:text-[#FFA500] text-sm font-medium transition-colors">
            <span className="hidden lg:inline">Criar conta</span>
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="bg-[#FFA500] w-full"> 
        {/*<div className="w-full px-4 lg:px-8 hidden md:flex items-center overflow-x-auto">
          <div>
            <select 
              className="hidden sm:block text-xs text-gray-600 border-l border-gray-200 rounded-md hover:cursor-pointer py-[8px] bg-gray-50 outline-none cursor-pointer">
              <option>Todas Categorias</option>
              {NAV_ITEMS.map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
          
          {NAV_ITEMS.map(item => (
            <a key={item} href="#"
              className="px-5 py-3 text-white text-sm font-medium whitespace-nowrap hover:bg-white/10 transition-colors border-b-2 border-transparent hover:border-white flex-shrink-0">
              {item}
            </a>
          ))}
        </div>*/}
        {/* Mobile nav */}
        <AnimatePresence>
          {/*
          {menuOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
              className="md:hidden overflow-hidden">
              {NAV_ITEMS.map(item => (
                <a key={item} href="#" className="block px-5 py-3 text-white text-sm border-b border-white/10 hover:bg-white/10 transition-colors">{item}</a>
              ))}
            </motion.div>
          )}*/}
        </AnimatePresence>
      </nav>
    </header>
  );
}