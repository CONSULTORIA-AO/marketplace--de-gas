import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface VerificationCodeStepProps {
  contact: string;
  method: "email" | "sms";
  onVerify: (code: string) => void;
  onBack: () => void;
  onResend: () => void;
}

const VerificationCodeStep = ({
  contact,
  method,
  onVerify,
  onBack,
  onResend,
}: VerificationCodeStepProps) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every((digit) => digit !== "")) {
      onVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split("").forEach((digit, index) => {
      if (index < 6) newCode[index] = digit;
    });
    setCode(newCode);

    if (newCode.every((digit) => digit !== "")) {
      onVerify(newCode.join(""));
    }
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    onResend();
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const maskContact = () => {
    if (method === "email") {
      const [user, domain] = contact.split("@");
      return `${user.slice(0, 2)}***@${domain}`;
    }
    return `***${contact.slice(-4)}`;
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
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full gradient-[#137fec] flex items-center justify-center mb-4"
        >
          <span className="text-2xl sm:text-3xl">🔐</span>
        </motion.div>
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
          Código de Verificação
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Insira o código enviado para{" "}
          <span className="font-medium text-foreground">{maskContact()}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center gap-2 sm:gap-3">
          {code.map((digit, index) => (
            <motion.input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 text-center text-lg sm:text-xl md:text-2xl font-semibold rounded-xl border-2 border-border bg-card bg-white text-black border-blue-600 focus:border-[#137fec] focus:ring-2 focus:ring-[#137fec]/20 outline-none transition-all"
            />
          ))}
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-destructive text-center text-xs sm:text-sm"
          >
            {error}
          </motion.p>
        )}

        <div className="text-center">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-[#137fec] hover:underline text-sm sm:text-base inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reenviar código
            </button>
          ) : (
            <p className="text-muted-foreground text-sm sm:text-base">
              Reenviar em{" "}
              <span className="font-semibold text-foreground">{countdown}s</span>
            </p>
          )}
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        className="w-full h-12 sm:h-14 rounded-xl text-sm sm:text-base border bg-blue-600 hover:bg-blue-700 text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>
    </motion.div>
  );
};

export default VerificationCodeStep;
