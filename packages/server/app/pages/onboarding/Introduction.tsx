import { Button } from "@/shared/components/ui/button";
import { motion } from "framer-motion";

type Props = {
    onComplete: () => void;
}

export default function Introduction({ onComplete }: Props) {
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
                        d="M15 3H9C7.89543 3 7 3.89543 7 5V19C7 20.1046 7.89543 21 9 21H15C16.1046 21 17 20.1046 17 19V5C17 3.89543 16.1046 3 15 3Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z"
                        fill="currentColor"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    />
                    <motion.path
                        d="M10 7H14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2, duration: 0.3 }}
                    />
                </svg>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold mb-4">Create Your Beaver Identity</h1>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    We're about to set up your <span className="text-primary font-semibold">Decentralized Identifier (DID)</span>,
                    which gives you complete control over your digital identity.
                </p>
            </motion.div>

            <motion.div
                className="space-y-8 bg-card/50 p-6 rounded-lg border border-border/50 w-full max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <div className="flex items-start space-x-3">
                    <div className="bg-primary/20 rounded-full p-2 mt-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="font-medium">No Central Authority</h3>
                        <p className="text-sm text-muted-foreground">Your identity belongs to you, not controlled by any corporation or government.</p>
                    </div>
                </div>

                <div className="flex items-start space-x-3">
                    <div className="bg-primary/20 rounded-full p-2 mt-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                            <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="font-medium">Full Ownership</h3>
                        <p className="text-sm text-muted-foreground">You control who can access your data and how they can use it.</p>
                    </div>
                </div>

                <div className="flex items-start space-x-3">
                    <div className="bg-primary/20 rounded-full p-2 mt-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="font-medium">Enhanced Privacy</h3>
                        <p className="text-sm text-muted-foreground">Share only the information you want without exposing all your personal details.</p>
                    </div>
                </div>
            </motion.div>

            <Button onClick={onComplete}>
                Continue
            </Button>
        </div>
    );
}