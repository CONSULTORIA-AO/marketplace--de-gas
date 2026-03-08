'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SuccessStepProps {
  onComplete: () => void;
}

const SuccessStep = ({ onComplete }: SuccessStepProps) => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const checkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  const confettiColors = [
    'hsl(var(--primary))',
    'hsl(var(--success))',
    'hsl(217, 91%, 70%)',
    'hsl(142, 76%, 50%)',
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4 }}
      className="space-y-6 text-center relative overflow-hidden"
    >
      {/* Confetti animation */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            y: -20,
            x: Math.random() * 200 - 100,
            rotate: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [0, 100, 200],
            x: Math.random() * 100 - 50,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 2,
            delay: 0.3 + Math.random() * 0.5,
            ease: 'easeOut',
          }}
          className="absolute top-0 left-1/2 w-2 h-2 rounded-full"
          style={{
            backgroundColor: confettiColors[i % confettiColors.length],
          }}
        />
      ))}

      <motion.div
        variants={checkVariants}
        className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full flex items-center justify-center"
        style={{ backgroundColor: 'hsl(var(hsl(217, 91%, 70%)) / 0.1)' }}
      >
        <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-500">
          Senha Redefinida!
        </h2>
        <p className="text-sm sm:text-base text-black">
          Sua senha foi alterada com sucesso. Agora você pode fazer login com
          sua nova senha.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          onClick={() => {
            navigate('/iniciar-sessao');
            onComplete();
          }}
          className="w-full h-12 sm:h-14 rounded-xl gradient-blue-500 text-blue-500 text-sm sm:text-base hover:opacity-90 transition-opacity bg-blue-500 hover:bg-blue-700 text-white cursor-pointer"
        >
          Ir para Login
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default SuccessStep;
