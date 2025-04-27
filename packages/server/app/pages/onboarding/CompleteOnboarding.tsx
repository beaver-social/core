import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Icon from "@/shared/components/Icon";

interface CompleteOnboardingProps {
    onComplete: () => void;
}

export default function CompleteOnboarding({ onComplete }: CompleteOnboardingProps) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-2">
                <motion.div
                    className="flex justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.3
                    }}
                >
                    <span className="text-6xl">🎉</span>
                </motion.div>

                <h2 className="text-3xl font-extrabold tracking-tight">
                    Welcome to Beaver Social!
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Your account has been successfully set up. You're all ready to start connecting, sharing, and exploring!
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <Button
                    size="lg"
                    className="px-8"
                    onClick={() => navigate("/")}
                >
                    Let's Begin
                </Button>
            </motion.div>
        </div>
    );
} 