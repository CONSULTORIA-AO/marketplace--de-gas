"use client"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { NewsletterFormData, newsletterSchema } from '@/schema/newslatter.schema'

export function Newsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    mode: 'onChange'
  })

  const watchedEmail = watch('email');

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    
    // Simular chamada de API
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Newsletter data:', { ...data, interests: selectedInterests })
    
    setSubmitted(true)
    setIsSubmitting(false)
    reset()
    setSelectedInterests([])
  }

  const resetForm = () => {
    setSubmitted(false)
    reset()
    setSelectedInterests([])
  }

  if (submitted) {
    return (
      <section>
        {/* Efeitos de fundo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FFA500]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFA500]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-md border border-[#FFA500]/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            
            {/* Ícone de sucesso animado */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from- to-[#FFA500]/70 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>

            {/* Mensagem de sucesso */}
            <h3 className="text-2xl md:text-3xl font-bold text-[#FFA500] mb-4">
              🎉 Inscrição Realizada!
            </h3>
            <p className="text-[#FFA500] text-lg mb-6 leading-relaxed">
              Obrigado por se inscrever na nossa newsletter! Em breve você receberá 
              conteúdos exclusivos e novidades.
            </p>
            
            {/* Benefícios */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-center space-x-3 text-[#FFA500]">
                <svg className="w-5 h-5 text-[#FFA500]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span>Conteúdo exclusivo toda semana</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-[#FFA500]">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span>Acesso antecipado a novos recursos</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-[#FFA500]">
                <svg className="w-5 h-5 text-[#FFA500]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span>Dicas e melhores práticas educacionais</span>
              </div>
            </div>

            {/* Botão para nova inscrição */}
            <Button
              onClick={resetForm}
              className="bg-blue-500/20 hover:bg-[#FFA500]/30 text-blue-400 border border-[#FFA500]/30 px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
            >
              Fazer Nova Inscrição
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section  id="newsletter" className='mb-4'>
      
      {/* Efeitos de fundo atmosféricos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FFA500]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFA500]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFA500]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Cabeçalho da seção */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-[#FFA500]/10 rounded-full mb-6">
            <div className="flex items-center space-x-2 bg-[#FFA500]/20 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-[#FFA500] rounded-full animate-pulse"></div>
              <span className="text-[#FFA500] font-semibold text-sm uppercase tracking-wider">Newsletter</span>
            </div>
          </div>
        </div>

        {/* Formulário principal */}
        <div className="bg-white border rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
          
          {/* Efeito shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-3xl"></div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-6">
            
            {/* Campo de Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[#FFA500] font-medium text-sm">
                Email *
              </label>
              <div className="relative">
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  placeholder="seu@email.com"
                  className={`w-full px-4 py-3 border rounded-xl text-white placeholder-[#FFA500] transition-all duration-300 focus:outline-none focus:ring-2 focus:scale-[1.02] ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : watchedEmail 
                        ? 'border-[#FFA500] focus:ring-[#FFA500]/50' 
                        : 'border-[#FFA500]/30 focus:ring-[#FFA500]/50'
                  }`}
                />
                {watchedEmail && !errors.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            {/* Botão de submissão */}
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`w-full py-4 hover:cursor-pointer rounded-xl cursor-pointer font-semibold text-lg transition-all duration-300 ${
                isSubmitting
                  ? 'bg-[#FFA500] cursor-not-allowed'
                  : isValid
                    ? 'bg-[#FFA500] hover:from-[#FFA500] hover:to-[#FFA500] shadow-sm'
                    : 'bg-[#FFA500] cursor-not-allowed'
              } text-white`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Inscrevendo...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>Inscrever-se na Newsletter</span>
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}