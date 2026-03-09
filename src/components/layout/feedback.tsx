'use client';
import { testimonials } from '@/data/home';
import React, { useState, useEffect } from 'react';

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToTestimonial = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section
      className="py-20 px-4 md:px-8 lg:px-16 xl:px-32 relative overflow-hidden"
      id="testemunhos"
    >
      {/* Efeitos de fundo atmosféricos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#000]/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-orange-500/10 rounded-full mb-6">
            <div className="flex items-center space-x-2 bg-orange-500/20 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-[#FFA500] rounded-full animate-pulse"></div>
              <span className="text-[#FFA500] font-semibold text-sm uppercase tracking-wider">
                Testemunhos
              </span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-[#FFA500]">
            O que Nossos{' '}
            <span className="text-orange-500 relative">
              Clientes
              <div className="absolute -bottom-2 left-0 right-0 h-1 text-blue-600 to-transparent rounded-full"></div>
            </span>{' '}
            Dizem
          </h2>
        </div>

        {/* Carrossel de testemunhos */}
        <div className="relative">
          {/* Container principal do carrossel */}
          <div
            className="relative bg-white/5 backdrop-blur-md border border-[#FFA500]/20 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden group"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Efeito shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-3xl"></div>

            {/* Aspas decorativas */}
            <div className="absolute top-6 left-6 text-[#FFA500] text-6xl font-serif">
              (")
            </div>
            <div className="absolute bottom-6 right-6 text-[#FFA500] text-6xl font-serif rotate-180">
              (")
            </div>

            {/* Conteúdo do testemunho */}
            <div className="relative z-10 text-center">
              {/* Avatar */}
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FFA500] to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-lg">
                  {testimonials[currentIndex].avatar}
                </div>
              </div>

              {/* Comentário */}
              <div className="mb-8">
                <p className="text-[#FFA500] text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
                  {testimonials[currentIndex].comment}
                </p>
              </div>

              {/* Informações do cliente */}
              <div className="space-y-2">
                <h4 className="text-[#FFA500] font-bold text-xl">
                  {testimonials[currentIndex].name}
                </h4>
              </div>
            </div>
          </div>

          {/* Botões de navegação */}
          <button
            onClick={prevTestimonial}
            disabled={isAnimating}
            className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#FFA500]/20 hover:bg-[#FFA500]/30 backdrop-blur-md border border-[#FFA500]/30 rounded-full flex items-center justify-center text-[#FFA500] transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            disabled={isAnimating}
            className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#FFA500]/20 hover:bg-[#FFA500]/30 backdrop-blur-md border border-[#FFA500]/30 rounded-full flex items-center justify-center text-[#FFA500] transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Indicadores de posição */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-[#FFA500] scale-125'
                  : 'bg-[#FFA500]/30 hover:bg-[#FFA500]/50'
              } disabled:cursor-not-allowed`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
