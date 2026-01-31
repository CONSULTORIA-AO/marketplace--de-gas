import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, Check, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewPasswordStepProps {
  onSubmit: (password: string) => void;
  onBack: () => void;
}

const NewPasswordStep = ({ onSubmit, onBack }: NewPasswordStepProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const requirements = [
    { label: "Mínimo 8 caracteres", valid: password.length >= 8 },
    { label: "Uma letra maiúscula", valid: /[A-Z]/.test(password) },
    { label: "Uma letra minúscula", valid: /[a-z]/.test(password) },
    { label: "Um número", valid: /[0-9]/.test(password) },
    { label: "Um caractere especial", valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const allRequirementsMet = requirements.every((req) => req.valid);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRequirementsMet) {
      setError("A senha não atende a todos os requisitos");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    onSubmit(password);
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full gradient-primary flex items-center justify-center mb-4"
        >
          <span className="text-2xl sm:text-3xl">🔒</span>
        </motion.div>
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
          Nova Senha
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Crie uma senha forte para proteger sua conta
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Nova senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="h-12 sm:h-14 text-sm sm:text-base px-4 pr-12 rounded-xl border-2 focus:border-primary focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              className="h-12 sm:h-14 text-sm sm:text-base px-4 pr-12 rounded-xl border-2 focus:border-primary focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-xs sm:text-sm font-medium text-foreground mb-3">
            Requisitos da senha:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {requirements.map((req, index) => (
              <motion.div
                key={req.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-2"
              >
                {req.valid ? (
                  <Check className="w-4 h-4 text-success flex-shrink-0" />
                ) : (
                  <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
                <span
                  className={`text-xs sm:text-sm ${
                    req.valid ? "text-success" : "text-muted-foreground"
                  }`}
                >
                  {req.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-destructive text-center text-xs sm:text-sm"
          >
            {error}
          </motion.p>
        )}

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 h-12 sm:h-14 rounded-xl text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            type="submit"
            disabled={!allRequirementsMet || password !== confirmPassword}
            className="flex-1 h-12 sm:h-14 rounded-xl gradient-primary text-primary-foreground text-sm sm:text-base hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Redefinir Senha
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default NewPasswordStep;
