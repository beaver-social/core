import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useGlobalUIStore } from "@/shared/stores/zustand";
import { useRegister, useLogin } from "@beaver/react";
import { toast } from "sonner";

// import { useAuth } from "@beaver/react";
type Props = {
  onComplete: () => void;
  handleBack: () => void;
};

export default function UpdateProfile({ onComplete, handleBack }: Props) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const { onboardingData, setOnboardingData } = useGlobalUIStore();
  const { mutateAsync: register, isPending } = useRegister();
  const { mutate: login, isPending: isLoginPending, isSuccess: isLoginSuccess } = useLogin();

  useEffect(() => {
    if (isLoginSuccess) {
      window.location.href = "/app";
    }
  }, [isLoginSuccess]);

  async function handleSubmit() {
    if (!name || name.length < 3) {
      return toast.error("Invalid Name");
    }

    if (!onboardingData?.username) {
      return toast.error("Set Username first");
    }

    register({
      fullName: name,
      username: onboardingData?.username,
      about,
    })
      .then(() => {
        onComplete();
      })
      .catch((error) => {
        toast.error(error.message);
        error.message.includes("User already exists") && login();
      });
  }

  const canSubmit = name.trim().length > 0;

  if (!onboardingData || onboardingData.username === null) {
    handleBack();
    return;
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Add some personal details to help others recognize you
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="bg-card/60 backdrop-blur-sm border border-border/60">
          <CardContent className="p-6 space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-border/60"
              />
            </div>

            {/* About Input */}
            <div className="space-y-2">
              <label
                htmlFor="bio"
                className="text-sm font-medium flex justify-between"
              >
                <span>About</span>
                <span className="text-muted-foreground text-xs">
                  {about.length}/160
                </span>
              </label>
              <Textarea
                id="bio"
                placeholder="Tell others a bit about yourself"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                maxLength={160}
                className="border-border/60 min-h-[100px] resize-none"
              />
            </div>

            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={!canSubmit || isPending || isLoginPending}
            >
              {isPending || isLoginPending ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Profile"
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.button
        onClick={handleBack}
        className="text-xs text-muted-foreground mt-2 underline underline-offset-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        Go Back
      </motion.button>

      <motion.div
        className="text-xs text-muted-foreground mt-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        You can always update these details later from your profile settings
      </motion.div>
    </div>
  );
}
