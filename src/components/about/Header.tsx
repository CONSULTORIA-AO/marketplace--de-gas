import { Flame, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useNavigation } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-glow">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2 font-display font-bold text-xl"
        >
          <Flame className="w-6 h-6 text-primary" />
          <span>GásEnergia</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#servicos"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Serviços
          </a>
          <a
            href="#sobre"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sobre
          </a>
          <a
            href="#contato"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contato
          </a>
          <Button
            size="sm"
            className="font-semibold shadow-[var(--shadow-warm)]"
            onClick={() => navigate('/')}
          >
            <Flame className="w-4 h-4 mr-1" />
            Peça Gás
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-glow px-6 py-6 space-y-4 animate-fade-in">
          <a
            href="#servicos"
            className="block text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Serviços
          </a>
          <a
            href="#sobre"
            className="block text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Sobre
          </a>
          <a
            href="#contato"
            className="block text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Contato
          </a>
          <Button
            className="w-full font-semibold shadow-[var(--shadow-warm)]"
            onClick={() => setMenuOpen(false)}
          >
            <Flame className="w-4 h-4 mr-1" />
            Peça Gás
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
