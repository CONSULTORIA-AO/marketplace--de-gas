import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { reviewSchema, type ReviewFormData } from '@/lib/validations';
import { Header } from '@/components/Header';

import { api } from '@/lib/axios';

import { RatingStars } from '@/components/productReview/RatingStar';

export function ProductReviewPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      productQuality: 0,
      serviceQuality: 0,
      comment: '',
    },
  });

  const productQuality = watch('productQuality');
  const serviceQuality = watch('serviceQuality');

  async function onSubmit(data: ReviewFormData) {
    // simulação de backend
    await api.post('/api/reviews', {
      orderId: '12345',
      ...data,
    });
    toast({
      title: 'Avaliação!',
      description: `Avaliação enviada com sucesso!`,
    });
  }
  return (
    <div>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4">
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white dark:bg-background-dark p-8 rounded-xl shadow space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black">Como foi sua experiência?</h1>
            <p className="text-muted-foreground">
              Pedido #12345 - Gás P13 da Revenda XYZ
            </p>
          </div>

          {/* Produto */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Qualidade do Produto</h2>
            <RatingStars
              value={productQuality}
              onChange={(value) =>
                setValue('productQuality', value, {
                  shouldValidate: true,
                })
              }
            />
            {errors.productQuality && (
              <p className="text-destructive text-sm">
                {errors.productQuality.message}
              </p>
            )}
          </div>

          {/* Atendimento */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Atendimento e Entrega</h2>
            <RatingStars
              value={serviceQuality}
              onChange={(value) =>
                setValue('serviceQuality', value, {
                  shouldValidate: true,
                })
              }
            />
            {errors.serviceQuality && (
              <p className="text-destructive text-sm">
                {errors.serviceQuality.message}
              </p>
            )}
          </div>

          {/* Comentário */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold">
              Deixe um comentário (opcional)
            </h2>
            <Textarea
              placeholder="Conte-nos mais sobre sua experiência..."
              rows={4}
              onChange={(e) => setValue('comment', e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row-reverse gap-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-yellow-500 text-white hover:bg-yellow-600 rounded-md"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
            </Button>

            <Button
              onClick={() => navigate('/produtos')}
              type="button"
              className="bg-blue-600 text-white hover:bg-blue-500 rounded-md"
            >
              Agora não
            </Button>
          </div>
        </motion.form>
      </main>
    </div>
  );
}
