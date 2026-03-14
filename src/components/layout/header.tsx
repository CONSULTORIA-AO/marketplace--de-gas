'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { BadgeCount } from '../badgeCount';
import { useCartStore } from '@/hooks/cartstore';
import { Icon } from '../icon';
import { ORANJE } from '@/constants/costumer';

export function Header({ onSearch }: { onSearch: (term: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const cartCount = useCartStore((state) => state.getItemCount());
  const navigate = useNavigate();

  const handleSearch = () => {
    onSearch(searchValue.trim());
  };

  const handleMobileNavigate = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  // Desktop nav link styles
  const desktopNavClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-medium transition-colors duration-200 group ${
      isActive ? 'text-[#FFA500]' : 'text-gray-700 hover:text-[#FFA500]'
    }`;

  // Mobile nav link styles
  const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
    `block px-5 py-3 text-sm font-medium border-b border-white/10 transition-colors duration-200 ${
      isActive
        ? 'text-[#FFA500] bg-white/95'
        : 'text-white hover:text-[#FFA500] hover:bg-white/95'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="w-full px-4 lg:px-8 py-3 flex items-center gap-4">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <span className="text-2xl font-black text-[#FFA500] tracking-tight">
            Jagás
          </span>
        </a>

        {/* Search — grows to fill space, hidden on mobile */}
        <div
          className="flex-1 hidden sm:flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
          style={{ boxShadow: searchFocused ? '0 0 0 2px #FFA500' : undefined }}
        >
          <svg
            className="ml-3 flex-shrink-0 text-gray-400 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Pesquisa produtos"
            className="flex-1 px-3 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 bg-transparent"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-2.5 bg-[#FFA500] hover:cursor-pointer text-white text-sm font-semibold hover:bg-orange-600 transition-colors flex-shrink-0"
          >
            Procurar
          </button>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          {[
            { to: '/', label: 'Início', end: true },
            { to: '/sobre-nos', label: 'Sobre', end: false },
            { to: '/produtos', label: 'Produtos', end: false },
            { to: '/contacto', label: 'Contactos', end: false },
          ].map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={desktopNavClass}>
              {({ isActive }) => (
                <>
                  <span>{label}</span>
                  {/* Animated underline */}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] bg-[#FFA500] rounded-full transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}

          {/* Produtos is an anchor link 
          <a
            href="/#produtos"
            className="relative text-sm font-medium text-gray-700 hover:text-[#FFA500] transition-colors duration-200 group"
          >
            <span>Produtos</span>
            <span className="absolute -bottom-0.5 left-0 h-[2px] bg-[#FFA500] rounded-full w-0 group-hover:w-full transition-all duration-300" />
          </a>*/}

          <button
            onClick={() => navigate('/carrinho')}
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
            }}
          >
            <Icon
              name="cart"
              color={cartCount > 0 ? ORANJE : '#6B7280'}
              size={20}
            />
            {cartCount > 0 && (
              <BadgeCount n={cartCount > 99 ? 99 : cartCount} />
            )}
          </button>

          <button
            onClick={() => navigate('/iniciar-sessao')}
            className="flex items-center gap-2 cursor-pointer bg-[#FFA500] hover:bg-orange-600 text-white hover:text-white px-5 py-2.5 rounded-lg"
          >
            <span className="text-xs font-medium">Fazer login</span>
          </button>

          <button
            onClick={() => navigate('/cadastrar')}
            className="flex hover:cursor-pointer items-center gap-1.5 hover:text-white text-white bg-[#FFA500] hover:bg-orange-600 text-xs font-medium transition-colors px-5 py-2.5 rounded-lg"
          >
            <span>Criar conta</span>
          </button>
        </div>

        {/* Mobile right side: cart + hamburger */}
        <div className="flex md:hidden items-center gap-3 flex-shrink-0 ml-auto">
          <button
            onClick={() => navigate('/carrinho')}
            className="text-gray-600 hover:cursor-pointer hover:text-[#FFA500]/90 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
              />
            </svg>
          </button>

          <button
            className="hover:cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="sm:hidden px-4 pb-3">
        <div
          className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
          style={{ boxShadow: searchFocused ? '0 0 0 2px #FFA500' : undefined }}
        >
          <svg
            className="ml-3 flex-shrink-0 text-gray-400 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Pesquisa produtos"
            className="flex-1 px-3 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 bg-transparent"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2.5 bg-[#FFA500] hover:cursor-pointer text-white text-sm font-semibold hover:bg-orange-600 transition-colors flex-shrink-0"
          >
            Procurar
          </button>
        </div>
      </div>

      {/* Orange nav bar */}
      <nav className="bg-[#FFA500] w-full">
        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col">
                {[
                  { to: '/', label: 'Início', end: true },
                  { to: '/sobre-nos', label: 'Sobre', end: false },
                  { to: '/produtos', label: 'Produtos', end: false },
                  { to: '/contacto', label: 'Contactos', end: false },
                ].map(({ to, label, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={() => setMenuOpen(false)}
                    className={mobileNavClass}
                  >
                    {label}
                  </NavLink>
                ))}

                {/*<a
                  href="/#produtos"
                  onClick={() => setMenuOpen(false)}
                  className="block px-5 py-3 text-white text-sm font-medium border-b border-white/10 hover:text-[#FFA500] hover:bg-white/95 transition-colors duration-200"
                >
                  Produtos
                </a>*/}

                <div className="flex gap-3 px-5 py-4">
                  <button
                    onClick={() => handleMobileNavigate('/iniciar-sessao')}
                    className="flex-1 cursor-pointer bg-white text-[#FFA500] font-semibold text-sm py-2.5 rounded-lg hover:bg-orange-50 transition-colors"
                  >
                    Fazer login
                  </button>
                  <button
                    onClick={() => handleMobileNavigate('/cadastrar')}
                    className="flex-1 hover:cursor-pointer bg-white/20 text-white font-semibold text-sm py-2.5 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    Criar conta
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
