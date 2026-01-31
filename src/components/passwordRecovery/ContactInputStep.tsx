import { motion } from "framer-motion";
import { Mail, Phone, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ContactInputStepProps {
  method: "email" | "sms";
  onSubmit: (contact: string) => void;
  onBack: () => void;
}

const ContactInputStep = ({ method, onSubmit, onBack }: ContactInputStepProps) => {
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

  const validateInput = () => {
    if (method === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact)) {
        setError("Por favor, insira um e-mail válido");
        return false;
      }
    } else {
      const phoneRegex = /^\+?[0-9]{9,15}$/;
      if (!phoneRegex.test(contact.replace(/\s/g, ""))) {
        setError("Por favor, insira um número de telefone válido");
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInput()) {
      onSubmit(contact);
    }
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
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full gradient-primary flex items-center justify-center mb-4">
          {method === "email" ? (
            <Mail className="w-7 h-7 sm:w-9 sm:h-9 text-primary-foreground" />
          ) : (
            <Phone className="w-7 h-7 sm:w-9 sm:h-9 text-primary-foreground" />
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
          {method === "email" ? "Insira seu E-mail" : "Insira seu Telefone"}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          {method === "email"
            ? "Enviaremos um código de verificação para o seu e-mail"
            : "Enviaremos um código de verificação via SMS"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type={method === "email" ? "email" : "tel"}
            placeholder={method === "email" ? "seu@email.com" : "+55 11 99999-9999"}
            value={contact}
            onChange={(e) => {
              setContact(e.target.value);
              setError("");
            }}
            className="h-12 sm:h-14 text-sm sm:text-base px-4 rounded-xl border focus:border-primary focus:ring-primary text-black"
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-xs sm:text-sm"
            >
              {error}
            </motion.p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={onBack}
            className="flex-1 h-12 sm:h-14 rounded-xl text-sm sm:text-base bg-blue-500 hover:bg-blue-600 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            type="submit"
            className="flex-1 h-12 sm:h-14 rounded-xl gradient-primary text-primary-foreground text-sm sm:text-base hover:opacity-90 transition-opacity bg-green-500 hover:bg-green-600"
          >
            Enviar Código
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactInputStep;
