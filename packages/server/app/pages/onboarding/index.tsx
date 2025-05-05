import { useState, useEffect } from "react";
import Introduction from "./Introduction";
import ConnectSuiNS from "./ConnectSuiNS";
import { Progress } from "@/shared/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/shared/components/ui/card";
import ChooseUsername from "./ChooseUsername";
import UpdateProfile from "./UpdateProfile";
import { useGlobalUIStore } from "@/shared/stores/zustand";
import { useGlobalUI } from "@/shared/hooks/useGlobalUI";
import ThemeSwitch from "@/shared/components/ThemeSwitch";
import { useNavigate } from "react-router";
import CompleteOnboarding from "./CompleteOnboarding";
import Disconnect from "@/shared/components/Disconnect";
import { useBeaver } from "@beaver/react";
// import { useAuth } from "@beaver/react";
const TOTAL_STEPS = 5;

export default function Onboarding() {
  const { onboardingProgress, setOnboardingProgress } = useGlobalUIStore();
  const { setScreen } = useGlobalUI();
  const beaver = useBeaver();
  const [step, setStep] = useState(beaver.wallet.hasIdentity ? onboardingProgress?.currentStep || 4 : onboardingProgress?.currentStep || 1);
  const [completedSteps, setCompletedSteps] = useState<number[]>(
    onboardingProgress?.completed || []
  );
  // const { userId, isConnected } = useAuth();
  const navigate = useNavigate();

  console.log(onboardingProgress);

  // Set the screen to onboarding
  useEffect(() => {
    setScreen("onboarding");
  }, []);

  useEffect(() => {
    setOnboardingProgress({
      currentStep: step,
      completed: completedSteps,
      lastUpdated: new Date().toISOString(),
      checkpoint: getCheckpointName(step)
    });
  }, [step, completedSteps, setOnboardingProgress]);

  // Helper function to get checkpoint name based on step
  const getCheckpointName = (stepNum: number): string => {
    switch (stepNum) {
      case 1: return "introduction";
      case 2: return "choose-username";
      case 3: return "update-profile";
      case 4: return "connect-suins";
      case 5: return "complete";
      default: return "introduction";
    }
  };

  const handleNext = () => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
    // For the last regular step, show completion screen
    if (step === TOTAL_STEPS) {
      setStep(TOTAL_STEPS + 1); // Move to completion screen
    } else if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSkip = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const progressPercentage = (Math.max(1, completedSteps.length) / TOTAL_STEPS) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Introduction onComplete={handleNext} />;
      case 2:
        return <ChooseUsername onComplete={handleNext} handleBack={handleBack} />;
      case 3:
        return <UpdateProfile onComplete={handleNext} handleBack={handleBack} />;
      case 4:
        return <ConnectSuiNS onComplete={handleNext} handleBack={handleBack} handleSkip={handleSkip} />;
      case 5:
        return <CompleteOnboarding onComplete={() => navigate("/")} />;
      default:
        return <Introduction onComplete={handleNext} />;
    }
  };

  if (onboardingProgress?.completed.length === TOTAL_STEPS && step !== 6) {
    navigate("/");
  }

  // if (!isConnected || userId) {
  //   navigate("/");
  // }

  return (
    <div className="min-h-screen bg-[url(/images/tailwind-gradient-light.png)] dark:bg-[url(/images/tailwind-gradient-dark.png)] flex flex-col items-center justify-center p-4 bg-no-repeat bg-cover">
      <Card className="w-full max-w-2xl bg-background/30 glass border rounded-xl overflow-hidden shadow-lg">
        {/* Progress Bar - Hide on completion screen */}
        {step <= TOTAL_STEPS && (
          <div className="px-6 pt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Step {step} of {TOTAL_STEPS}</span>
              <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}

        {/* Step Content */}
        <div className="p-6 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </Card>

      <div className="flex gap-2 absolute bottom-4 right-4">
        <Disconnect />
        <ThemeSwitch />
      </div>
    </div>
  );
}