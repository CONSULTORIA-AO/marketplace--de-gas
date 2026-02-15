export function HowWorkSection() {
  return (
    <section>
      <h2 className="text-3xl font-bold leading-tight tracking-tight text-center mb-8">
        Como Funciona
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-pink-200 text-orange-400">
            <span className="material-symbols-outlined text-4xl">search</span>
          </div>
          <h3 className="text-lg font-bold mb-2">1. Busque</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Informe o produto que você precisa e sua localização.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-pink-200 text-orange-400">
            <span className="material-symbols-outlined text-4xl">
              compare_arrows
            </span>
          </div>
          <h3 className="text-lg font-bold mb-2">2. Compare</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Veja as ofertas dos melhores fornecedores da sua região.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-pink-200 text-orange-400">
            <span className="material-symbols-outlined text-4xl">
              shopping_bag
            </span>
          </div>
          <h3 className="text-lg font-bold mb-2">3. Compre</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Escolha a melhor opção e pague com segurança na plataforma.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-pink-200 text-orange-400">
            <span className="material-symbols-outlined text-4xl">
              local_shipping
            </span>
          </div>
          <h3 className="text-lg font-bold mb-2">4. Receba</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Aguarde a entrega rápida no seu endereço.
          </p>
        </div>
      </div>
    </section>
  );
}
