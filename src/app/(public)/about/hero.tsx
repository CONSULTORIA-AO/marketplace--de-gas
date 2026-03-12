import { Flame, ArrowDown } from 'lucide-react';
import BackGroundImage from '@/assets/botja.png';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={BackGroundImage}
          alt="Infraestrutura de distribuição de gás ao pôr do sol"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, hsla(220, 20%, 7%, 0.4) 0%, hsla(220, 20%, 7%, 0.97) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow bg-[#FFA500]/50 mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          <Flame className="w-4 h-4 text-[#FFA500]" />
          <span className="text-sm font-medium text-[#FFA500]">
            Líder em distribuição de gás
          </span>
        </div>

        <h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-800 leading-tight mb-6 animate-fade-in-up text-white font-semibold"
          style={{ animationDelay: '0.4s' }}
        >
          Energia que <span className="text-[#FFA500]">move</span>
          <br />o seu negócio
        </h1>

        <p
          className="text-lg md:text-xl text-[#FFA500] max-w-2xl mx-auto mb-10 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          Fornecimento confiável de gás para residências, comércios e
          indústrias. Rede de agências em todo o país com atendimento de
          excelência.
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in border border-[#FFA500] py-2 px-2 rounded-full"
        style={{ animationDelay: '1.2s' }}
      >
        <ArrowDown className="w-5 h-5 text-[#FFA500] animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
