import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';

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

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="hidden lg:block"
    >
      <div className="sticky top-6 w-72 rounded-2xl border border-border bg-card p-6 shadow-lg shadow-primary/5">
        <h2 className="mb-6 text-xl font-bold text-foreground font-['Space_Grotesk']">
          Filtros
        </h2>

        {/* Tipo de Gás */}
        <div className="mb-6">
          <Label className="mb-3 block text-sm font-semibold text-foreground">
            Tipo de Gás
          </Label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer rounded-lg border border-border p-2.5 transition-colors hover:border-primary/50">
              <input
                checked={filters.gasTypes.includes('GLP13')}
                onChange={() => toggleGasType('GLP13')}
                className="h-4 w-4 rounded border-border accent-[hsl(25,95%,53%)]"
                type="checkbox"
              />
              <span className="text-sm text-foreground">GLP (13kg)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer rounded-lg border border-border p-2.5 transition-colors hover:border-primary/50">
              <input
                checked={filters.gasTypes.includes('GLP45')}
                onChange={() => toggleGasType('GLP45')}
                className="h-4 w-4 rounded border-border accent-[hsl(25,95%,53%)]"
                type="checkbox"
              />
              <span className="text-sm text-foreground">GLP (45kg)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer rounded-lg border border-border p-2.5 transition-colors hover:border-primary/50">
              <input
                checked={filters.gasTypes.includes('NATURAL')}
                onChange={() => toggleGasType('NATURAL')}
                className="h-4 w-4 rounded border-border accent-[hsl(25,95%,53%)]"
                type="checkbox"
              />
              <span className="text-sm text-foreground">Gás Natural</span>
            </label>
          </div>
        </div>

        <div className="h-px bg-border mb-6" />

        {/* Localização */}
        <div className="mb-6">
          <Label className="mb-3 block text-sm font-semibold text-foreground">
            Localização
          </Label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
              location_on
            </span>
            <Input
              placeholder="Buscar localização..."
              value={filters.location}
              onChange={handleLocationChange}
              className="bg-background border-border pl-10 focus:border-primary"
            />
          </div>
        </div>

        <div className="h-px bg-border mb-6" />

        {/* Classificação Mínima */}
        <div className="mb-6">
          <Label className="mb-3 block text-sm font-semibold text-foreground">
            Classificação Mínima
          </Label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRatingChange(star)}
              >
                <Star
                  className={`h-6 w-6 transition-colors ${
                    star <= filters.minRating
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  }`}
                />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="h-px bg-border mb-6" />

        {/* Botões */}
        <div className="space-y-2">
          <Button className="w-full font-semibold rounded-xl text-white">
            Aplicar Filtros
          </Button>
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full bg-red-600 rounded-xl border-0 text-white"
          >
            Limpar Filtros
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
