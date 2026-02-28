import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HeaderHome() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-glow">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary text-3xl">
              local_fire_department
            </span>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">
              GásMarket
            </h2>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link className="hover:text-primary" to="/">
              Início
            </Link>
            <Link className="hover:text-primary" to="/">
              Ofertas
            </Link>
            <Link className="hover:text-primary" to="/sobre-nos">
              Sobre Nós
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate('/login')}
              className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 text-primary dark:bg-primary/30 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/30 dark:hover:bg-primary/40"
            >
              <span className="truncate">Entrar</span>
            </Button>

            <Button
              onClick={() => navigate('/cadastro')}
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-primary/90 text-white text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Cadastre-se</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
