import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

type Props = {
    onComplete: () => void;
    handleBack: () => void;
}

export default function CreateIdentity({ onComplete, handleBack }: Props) {
    const [isCreating, setIsCreating] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleCreateIdentity = async () => {
        setIsCreating(true);

        // Placeholder for SDK logic to create identity
        // This would be replaced with actual implementation
        setTimeout(() => {
            setIsCreating(false);
            setIsComplete(true);
            onComplete();
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center text-center space-y-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-full bg-primary/10 p-6"
            >
                <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary"
                >
                    <motion.path
                        d="M16 16V18C16 19.1046 15.1046 20 14 20H6C4.89543 20 4 19.1046 4 18V10C4 8.89543 4.89543 8 6 8H8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M10 4H18C19.1046 4 20 4.89543 20 6V14C20 15.1046 19.1046 16 18 16H10C8.89543 16 8 15.1046 8 14V6C8 4.89543 8.89543 4 10 4Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M12 11L15 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.8, duration: 0.4 }}
                    />
                    <motion.path
                        d="M13 12L16 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1, duration: 0.4 }}
                    />
                </svg>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold mb-4">Create Your On-Chain Identity</h1>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Your decentralized identity will be created by signing a message with your wallet.
                    This doesn't cost any gas and securely links your wallet to your new DID.
                </p>
            </motion.div>

            <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <Card className="bg-card/60 backdrop-blur-sm border border-border/60">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center space-y-6">
                            <div className="text-left w-full space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-primary/10 rounded-full mt-0.5 text-primary">
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm">Connect your wallet</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className={`rounded-full mt-0.5 ${isCreating || isComplete ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            {isComplete ? (
                                                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            ) : (
                                                <path d="M12 12L12 12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            )}
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-sm ${isCreating || isComplete ? 'text-foreground' : 'text-muted-foreground'}`}>
                                            Sign message to create your DID
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className={`rounded-full mt-0.5 ${isComplete ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            {isComplete ? (
                                                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            ) : (
                                                <path d="M12 12L12 12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            )}
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-sm ${isComplete ? 'text-foreground' : 'text-muted-foreground'}`}>
                                            Generate and verify your DID
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Button
                                className="w-full relative overflow-hidden group"
                                onClick={handleCreateIdentity}
                                disabled={isCreating || isComplete}
                            >
                                {isCreating && (
                                    <motion.div
                                        className="absolute inset-0 bg-primary/10"
                                        animate={{
                                            x: ["0%", "100%"],
                                            opacity: [0, 1, 0]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />
                                )}

                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isCreating ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating Identity...
                                        </>
                                    ) : isComplete ? (
                                        <>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Identity Created
                                        </>
                                    ) : (
                                        "Create My Identity"
                                    )}
                                </span>
                            </Button>
                        </div>
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

            {!isComplete && (
                <motion.div
                    className="text-xs text-muted-foreground mt-2 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                >
                    This process requires your signature to link your account.
                </motion.div>
            )}
        </div>
    );
} 