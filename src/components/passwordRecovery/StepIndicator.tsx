import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const StepIndicator = ({ currentStep, totalSteps, steps }: StepIndicatorProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isCompleted
                      ? "hsl(var(--success))"
                      : isActive
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted))",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold"
                  style={{
                    color: isCompleted || isActive ? "white" : "hsl(var(--muted-foreground))",
                  }}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                  ) : (
                    stepNumber
                  )}
                </motion.div>
                <span className="text-[10px] sm:text-xs mt-1 text-muted-foreground text-center max-w-[60px] sm:max-w-[80px] hidden xs:block">
                  {step}
                </span>
              </div>
              {index < totalSteps - 1 && (
                <motion.div
                  className="w-6 sm:w-12 md:w-16 h-0.5 mx-1 sm:mx-2"
                  initial={false}
                  animate={{
                    backgroundColor: isCompleted
                      ? "hsl(var(--success))"
                      : "hsl(var(--muted))",
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
