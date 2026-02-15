import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RatingStarsProps {
  value: number;
  onChange: (value: number) => void;
}

export function RatingStars({ value, onChange }: RatingStarsProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= value;

        return (
          <motion.div
            key={star}
            whileTap={{ scale: 1.4 }}
            whileHover={{ scale: 1.2 }}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onChange(value === star ? 0 : star)}
              className="p-2 rounded-full hover:bg-yellow-400/10 group"
            >
              <Star
                className={`h-7 w-7 transition-colors ${
                  isActive
                    ? 'fill-yellow-400 text-yellow-400 text-3xl'
                    : 'text-slate-300 dark:text-slate-600'
                }`}
              />
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}
