import { useCartStore } from '@/store/cartstore';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BackGround from '@/assets/wallpaper.jpg';

interface HeroSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function HeroSection({ searchTerm, onSearchChange }: HeroSectionProps) {
  return (
    <section className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        data-alt="Blue flame from a gas stove burner in a dark kitchen."
      >
        <img
          src={BackGround}
          alt="Blue flame from a gas stove burner in a dark kitchen."
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-primary/40" />
      </div>
      <div className="relative container mx-auto px-4 py-24 sm:py-32 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col gap-4 max-w-3xl">
          <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            O gás que você precisa, com o melhor preço da sua região
          </h1>
          <h2 className="text-white/90 text-lg font-normal leading-normal sm:text-xl">
            Encontre, compare e compre gás de forma rápida e segura.
          </h2>
        </div>
        <div className="mt-8 w-full max-w-2xl ">
          <Label className="flex flex-col h-14 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-lg border border-slate-100 dark:border-slate-800 bg-white">
              <div className="text-gray-500 flex bg-card-light items-center justify-center pl-4 rounded-l-xl border-y border-l border-border-light border border-slate-100 dark:border-slate-800 bg-white">
                <span className="material-symbols-outlined">search</span>
              </div>
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-text-light focus:outline-0 focus:ring-2 focus:ring-primary h-full placeholder:text-gray-500 px-4 border-y border-border-light bg-card-light text-base border-slate-100 dark:border-slate-800"
                placeholder="Buscar por produto ou fornecedor"
              />

              <div className="flex items-center justify-center rounded-r-xl border-y border-r border-border-light bg-card-light pr-2 border border-slate-100 dark:border-slate-800">
                <Button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 ">
                  <span className="truncate">Buscar</span>
                </Button>
              </div>
            </div>
          </Label>
        </div>
      </div>
    </section>
  );
}
