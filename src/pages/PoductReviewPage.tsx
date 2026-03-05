import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { reviewSchema, type ReviewFormData } from '@/lib/validations';
import { Header } from '@/components/layout/Header';
import { api } from '@/lib/axios';
import { RatingStars } from '@/components/productReview/RatingStar';
import { Loader2, ArrowLeft } from 'lucide-react';
import { ToastAction } from '@/components/ui/toast';
import { AxiosError } from 'axios';

interface Pedido {
  pedidoId: number;
  status: string;
  itens: Array<{
    produtoId: number;
    descricao: string;
    quantidade: number;
    precoUnitario: number;
  }>;
}

export function ProductReviewPage() {
  const { pedidoId } = useParams<{ pedidoId: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loadingPedido, setLoadingPedido] = useState(true);
  const [errorPedido, setErrorPedido] = useState<string | null>(null);

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

  // Fetch do pedido específico
  useEffect(() => {
    if (!pedidoId) return;

    const fetchPedido = async () => {
      try {
        setLoadingPedido(true);
        const response = await api.get<Pedido>(`pedidos/${pedidoId}`);
        setPedido(response.data);

        // Opcional: pré-preencher se já tiver avaliação ou algo
      } catch (err) {
        setErrorPedido('Não foi possível carregar os detalhes do pedido.');
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Pedido não encontrado ou erro no servidor.',
        });
      } finally {
        setLoadingPedido(false);
      }
    };

    fetchPedido();
  }, [pedidoId, toast]);

  async function onSubmit(data: ReviewFormData) {
    if (!pedidoId) return;

    try {
      await api.post('/api/reviews', {
        pedidoId: Number(pedidoId),
        ...data,
      });

      toast({
        description: (
          <div className="flex items-center gap-4 bg-white">
            <span className="text-[#717F96]">Enviado com sucesso!</span>
          </div>
        ),
        action: (
          <ToastAction
            altText="close"
            className="shadow-none border-none text-[#717F96] hover:bg-transparent"
          >
            .
          </ToastAction>
        ),
        className:
          'border-l-4 border-l-[#ff8300] border-t-0 border-b-0 border-r-0',
      });

      navigate('/produtos'); // ou para meus pedidos
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          description: (
            <div className="flex items-center gap-4 ">
              <div className="rounded-full w-8 h-8 flex justify-center items-center bg-[fill: rgba(251, 55, 72, 0.16)]"></div>

              <span className="text-[#717F96]">
                {error?.response?.data.mensagem}
              </span>
            </div>
          ),
          action: (
            <ToastAction
              altText="close"
              className="shadow-none border-none text-[#717F96] hover:bg-transparent"
            >
              .
            </ToastAction>
          ),
          className:
            'border-l-4 border-l-[#FB3748] border-t-0 border-b-0 border-r-0',
        });
      }
    }
  }

  if (loadingPedido) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-950 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
      </div>
    );
  }

  if (errorPedido || !pedido) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
        <Header />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h1 className="text-3xl font-bold text-orange-400">Ops...</h1>
          <p className="text-lg text-gray-300">
            {errorPedido || 'Pedido não encontrado.'}
          </p>
          <Button
            onClick={() => navigate('/produtos')}
            className="bg-orange-600 hover:bg-orange-500 text-white"
          >
            Voltar para Produtos
          </Button>
        </motion.div>
      </div>
    );
  }

  const produtoPrincipal = pedido.itens?.[0]; // assume primeiro item como principal

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
      <Header />

      <main className="flex items-center justify-center px-4 py-12 md:py-20">
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, scale: 0.95, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-2xl backdrop-blur-xl bg-black/40 border border-orange-500/30 rounded-3xl p-8 md:p-10 shadow-2xl shadow-orange-900/20 space-y-10"
        >
          {/* Cabeçalho */}
          <div className="text-center space-y-3">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
            >
              Como foi sua experiência?
            </motion.h1>
            <p className="text-gray-300 text-lg">
              Pedido #{pedido.pedidoId} •{' '}
              {produtoPrincipal?.descricao || 'Produto'}
            </p>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-orange-500 to-orange-400 rounded-full" />
          </div>

          {/* Qualidade do Produto */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              Qualidade do Produto
            </h2>
            <div className="flex justify-center scale-125 md:scale-150 my-4">
              <RatingStars
                value={productQuality}
                onChange={(value) =>
                  setValue('productQuality', value, { shouldValidate: true })
                }
              />
            </div>
            {errors.productQuality && (
              <p className="text-red-400 text-sm text-center font-medium">
                {errors.productQuality.message}
              </p>
            )}
          </div>

          {/* Atendimento */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Atendimento e Entrega
            </h2>
            <div className="flex justify-center scale-125 md:scale-150 my-4">
              <RatingStars
                value={serviceQuality}
                onChange={(value) =>
                  setValue('serviceQuality', value, { shouldValidate: true })
                }
              />
            </div>
            {errors.serviceQuality && (
              <p className="text-red-400 text-sm text-center font-medium">
                {errors.serviceQuality.message}
              </p>
            )}
          </div>

          {/* Comentário */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Deixe seu comentário (opcional)
            </h2>
            <Textarea
              placeholder="Conte como foi a entrega, qualidade do gás, atendimento..."
              rows={5}
              onChange={(e) => setValue('comment', e.target.value)}
              className="bg-black/50 border-orange-500/40 focus:border-orange-500 focus:ring-orange-500/30 text-white placeholder:text-gray-500 rounded-xl resize-none"
            />
          </div>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold text-lg py-7 rounded-2xl shadow-lg shadow-orange-600/30 transition-all duration-300 hover:shadow-orange-500/50 hover:scale-[1.02]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Avaliação'
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/produtos')}
              className="flex-1 border-orange-500/50 text-orange-400 hover:bg-orange-950/50 hover:text-orange-300 rounded-2xl py-7 text-lg transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Agora não
            </Button>
          </div>
        </motion.form>
      </main>
    </div>
  );
}
