import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent } from "@/shared/components/ui/card";

type Props = {
    onComplete: () => void;
    handleBack: () => void;
}

export default function ChooseUsername({ onComplete, handleBack }: Props) {
    const [username, setUsername] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Validate username format
    const isValidFormat = /^[a-zA-Z0-9_]{3,16}$/.test(username);

    const handleCheckAvailability = () => {
        if (!isValidFormat) return;

        setIsChecking(true);

        // Placeholder for SDK logic to check username availability
        // This would be replaced with actual implementation
        setTimeout(() => {
            // Simulate a check - in real implementation this would query your backend
            const mockIsAvailable = username !== 'admin' && username !== 'test';
            setIsAvailable(mockIsAvailable);
            setIsChecking(false);
        }, 800);
    };

    const handleSaveUsername = () => {
        if (!isValidFormat || !isAvailable) return;

        setIsSaving(true);

        // Placeholder for SDK logic to save username
        // This would be replaced with actual implementation
        setTimeout(() => {
            setIsSaving(false);
            onComplete();
        }, 1200);
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
                        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M16 7H16.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.3 }}
                    />
                </svg>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold mb-4">Choose Your Username</h1>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Select a unique username that will identify you on the platform.
                    This will be part of your decentralized identity.
                </p>
            </motion.div>

            <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <Card className="bg-card/60 backdrop-blur-sm border border-border/60">
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="relative group">
                                <div className="absolute inset-0 rounded-md -m-1 p-1 group-focus-within:bg-primary/5 transition-all duration-300 opacity-0 group-focus-within:opacity-100"></div>
                                <Input
                                    className="relative z-10 border-border/60 font-medium"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        setIsAvailable(null);
                                    }}
                                    onBlur={handleCheckAvailability}
                                />

                                {username && (
                                    <div className="absolute right-3 top-0 bottom-0 flex items-center z-20">
                                        {isChecking ? (
                                            <svg className="animate-spin h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : isAvailable === true ? (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
                                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ) : isAvailable === false ? (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500">
                                                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ) : null}
                                    </div>
                                )}
                            </div>

                            <div className="text-xs text-muted-foreground">
                                {!username ? (
                                    "Your username should be 3-16 characters and can include letters, numbers, and underscores"
                                ) : !isValidFormat ? (
                                    <span className="text-destructive">Username must be 3-16 characters with only letters, numbers, and underscores</span>
                                ) : isAvailable === false ? (
                                    <span className="text-destructive">This username is already taken</span>
                                ) : isAvailable === true ? (
                                    <span className="text-green-500">Username is available!</span>
                                ) : (
                                    "Checking availability..."
                                )}
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                className="w-full relative overflow-hidden"
                                onClick={handleSaveUsername}
                                disabled={!isValidFormat || isAvailable !== true || isSaving}
                            >
                                {isSaving ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    "Save Username"
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                className="text-xs text-muted-foreground mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
            >
                Your username will be how others find and refer to you
            </motion.div>
        </div>
    );
} 