import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import { useUserStore } from '@/store/userIfo';

export function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const cliente = useUserStore((state) => state.cliente);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-primary' : 'text-slate-600 hover:text-primary'
    }`;

  return (
    <header className="bg-background/70 backdrop-blur-xl border-b border-glow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 text-primary">
            <div className="size-8">{/* svg */}</div>
            <h2 className="text-lg font-bold text-primary/90">JáGás</h2>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/produtos" end={false} className={navLinkClass}>
              Produtos
            </NavLink>
            <NavLink to="/pedidos" className={navLinkClass}>
              Meus Pedidos
            </NavLink>
            <NavLink to="/checkout" className={navLinkClass}>
              Checkout
            </NavLink>
            <NavLink to="/avaliacao" className={navLinkClass}>
              Avaliação
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/carrinho')}
              className="hover:bg-primary"
            >
              <span className="material-symbols-outlined text-xl">
                shopping_cart
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent"
              onClick={() => navigate('/perfil')}
            >
              <img
                src={cliente?.fotoCliente ?? ''}
                alt="User profile"
                className="rounded-full size-9"
              />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-primary hover:text-white"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-foreground">
          <nav className="flex flex-col gap-4 px-4 py-4">
            <NavLink
              onClick={() => setMenuOpen(false)}
              to="/produtos"
              className={navLinkClass}
            >
              Produtos
            </NavLink>
            <NavLink
              onClick={() => setMenuOpen(false)}
              to="/pedidos"
              className={navLinkClass}
            >
              Meus Pedidos
            </NavLink>
            <NavLink
              onClick={() => setMenuOpen(false)}
              to="/enderecos"
              className={navLinkClass}
            >
              Endereço
            </NavLink>
            <NavLink
              onClick={() => setMenuOpen(false)}
              to="/checkout"
              className={navLinkClass}
            >
              Checkout
            </NavLink>
            <NavLink
              onClick={() => setMenuOpen(false)}
              to="/avaliacao"
              className={navLinkClass}
            >
              Avaliação
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
