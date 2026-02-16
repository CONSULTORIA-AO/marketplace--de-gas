import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ProductListAside({ filters, setFilters }) {
  const toggleGasType = (type: string) => {
    if (filters.gasTypes.includes(type)) {
      setFilters({
        ...filters,
        gasTypes: filters.gasTypes.filter((t) => t !== type),
      });
    } else {
      setFilters({
        ...filters,
        gasTypes: [...filters.gasTypes, type],
      });
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      location: e.target.value,
    });
  };

  const handleRatingChange = (rating: number) => {
    setFilters({
      ...filters,
      minRating: rating,
    });
  };

  const clearFilters = () => {
    setFilters({
      gasTypes: [],
      minPrice: 0,
      maxPrice: 9999,
      location: '',
      minRating: 0,
    });
  };

  //Filtro range
  const MIN = 0;
  const MAX = 400;

  const handleMinPrice = (value: number) => {
    if (value <= filters.maxPrice) {
      setFilters((prev) => ({
        ...prev,
        minPrice: value,
      }));
    }
  };

  const handleMaxPrice = (value: number) => {
    if (value >= filters.minPrice) {
      setFilters((prev) => ({
        ...prev,
        maxPrice: value,
      }));
    }
  };

  return (
    <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
      <div className="sticky top-24 space-y-6 rounded-xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Filtros
        </h3>

        <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200">
            Tipo de Gás
          </h4>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Input
                id="gas-type-1"
                checked={filters.gasTypes.includes('GLP13')}
                onChange={() => toggleGasType('GLP13')}
                className="form-checkbox h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec]/50 dark:border-slate-700 dark:bg-slate-800"
                type="checkbox"
              />
              <span className="text-slate-600 dark:text-slate-300">
                GLP (13kg)
              </span>
            </Label>

            <Label className="flex items-center gap-2">
              <Input
                id="gas-type-2"
                className="form-checkbox h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec]/50 dark:border-slate-700 dark:bg-slate-800"
                type="checkbox"
                checked={filters.gasTypes.includes('GLP45')}
                onChange={() => toggleGasType('GLP45')}
              />
              <span className="text-slate-600 dark:text-slate-300">
                GLP (45kg)
              </span>
            </Label>

            <Label className="flex items-center gap-2">
              <Input
                id="gas-type-3"
                className="form-checkbox h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec]/50 dark:border-slate-700 dark:bg-slate-800"
                type="checkbox"
                checked={filters.gasTypes.includes('NATURAL')}
                onChange={() => toggleGasType('NATURAL')}
              />
              <span className="text-slate-600 dark:text-slate-300">
                Gás Natural
              </span>
            </Label>
          </div>
        </div>

        <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200">
            Faixa de Preço
          </h4>

          <div className="relative h-2 rounded-full bg-slate-200 dark:bg-slate-700">
            {/* Barra azul ativa */}
            <div
              className="absolute h-2 rounded-full bg-[#137fec] transition-all"
              style={{
                left: `${(filters.minPrice / MAX) * 100}%`,
                right: `${100 - (filters.maxPrice / MAX) * 100}%`,
              }}
            />

            {/* Thumb mínimo */}
            <div
              className="absolute -top-1.5 h-5 w-5 rounded-full bg-white border-2 border-[#137fec] shadow transition-all"
              style={{
                left: `${(filters.minPrice / MAX) * 100}%`,
              }}
            />

            {/* Thumb máximo */}
            <div
              className="absolute -top-1.5 h-5 w-5 rounded-full bg-white border-2 border-[#137fec] shadow transition-all"
              style={{
                left: `${(filters.maxPrice / MAX) * 100}%`,
              }}
            />

            {/* Range invisível MIN */}
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={filters.minPrice}
              onChange={(e) => handleMinPrice(Number(e.target.value))}
              className="absolute w-full opacity-0 cursor-pointer"
            />

            {/* Range invisível MAX */}
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={filters.maxPrice}
              onChange={(e) => handleMaxPrice(Number(e.target.value))}
              className="absolute w-full opacity-0 cursor-pointer"
            />
          </div>

          <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>R$ {filters.minPrice}</span>
            <span>R$ {filters.maxPrice}</span>
          </div>
        </div>

        <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200">
            Localização
          </h4>
          <Label className="flex flex-col">
            <div className="relative flex w-full flex-1 items-stretch rounded-lg">
              <div className="text-slate-500 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 transform">
                <span className="material-symbols-outlined text-xl">
                  location_on
                </span>
              </div>
              <Input
                type="text"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-slate-100 py-2.5 pl-10 pr-4 text-slate-900 placeholder:text-slate-500 focus:outline-0 focus:ring-2 focus:ring-[#137fec]/50 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 border-none h-full text-base font-normal leading-normal"
                placeholder="Cidade ou bairro"
                value={filters.location}
                onChange={handleLocationChange}
              />
            </div>
          </Label>
        </div>

        <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200">
            Classificação Mínima
          </h4>
          <div className="flex items-center gap-1 text-slate-300 dark:text-slate-600">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`material-symbols-outlined cursor-pointer rating-star ${
                  star <= filters.minRating
                    ? 'text-yellow-400'
                    : 'text-slate-400'
                }`}
              >
                star
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <Button className="flex w-full cursor-pointer items-center justify-center rounded-lg h-10 bg-[#137fec] hover:bg-blue-600 text-white gap-2 text-sm font-bold leading-normal tracking-wide">
            Aplicar Filtros
          </Button>

          <Button
            onClick={clearFilters}
            className="flex w-full cursor-pointer items-center justify-center rounded-lg h-10 bg-transparent text-slate-200 dark:text-slate-300 gap-2 text-sm font-medium leading-normal dark:hover:bg-slate-800 bg-red-500 hover:bg-red-600"
          >
            Limpar Filtros
          </Button>
        </div>
      </div>
    </aside>
  );
}
